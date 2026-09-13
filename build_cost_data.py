#!/usr/bin/env python3
"""
Rebuild the encrypted cost table embedded in profit_analyzer.html.

The page calculates without asking for anything, so it must be able to
decrypt the cost list on its own. Two separate secrets are therefore built
in, and they protect different things:

  1. A random AES-256 data key, embedded in the page, encrypting the product
     list (AES-GCM). This keeps product names, codes and costs out of the
     page source, out of `view-source`, out of Ctrl+F and out of this
     repository -- everything on disk is ciphertext. It does NOT hide the
     list from someone who runs JavaScript in the page: the key sits beside
     the data, so devtools can recover it. That is inherent to a page that
     decrypts unattended, not a flaw in the build.

  2. The Settings passphrase, stored ONLY as a PBKDF2-HMAC-SHA256 hash with
     its own random salt. The passphrase itself is never written to the page
     or to this repository, so reading the file cannot reveal it. It gates
     the panel that views and edits costs. Being a client-side check, a
     determined user can step around it; it stops casual access, not an
     attacker.

Usage:
    PROFIT_COST_PASSPHRASE='...' python3 build_cost_data.py path/to/Cost.xlsx

PROFIT_COST_PASSPHRASE is the Settings passphrase. The .xlsx needs a product
name, an internal reference and a cost column (Arabic or English headers); a
product category column is optional.
"""

import base64
import getpass
import json
import os
import re
import sys

import openpyxl
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

TARGET = os.path.join(os.path.dirname(os.path.abspath(__file__)), "profit_analyzer.html")
MARK_START = "/* COST-DATA-START */"
MARK_END = "/* COST-DATA-END */"
ITERATIONS = 250_000

HEADERS = {
    "name": ["name", "product", "product name", "item", "description",
             "اسم", "اسم المنتج", "المنتج", "الصنف", "البيان", "اسم الصنف"],
    "ref": ["internal reference", "reference", "internal ref", "code", "item code",
            "product code", "sku", "default code", "المرجع الداخلي", "المرجع",
            "الرمز", "رمز المنتج", "الكود", "كود", "رمز الصنف", "رقم الصنف"],
    "cost": ["cost", "unit cost", "cost price", "standard price",
             "التكلفه", "تكلفه", "سعر التكلفه", "الكلفه", "كلفه", "سعر الكلفه"],
    "cat": ["product category", "category", "categ", "group", "product group",
            "فئه المنتج", "الفئه", "فئه", "التصنيف", "المجموعه", "مجموعه المنتج"],
}


def norm(s):
    s = re.sub(r"[ً-ْـ]", "", str(s).lower())
    s = re.sub(r"[آأإٱ]", "ا", s)
    s = s.replace("ة", "ه").replace("ى", "ي")
    return re.sub(r"[^a-z0-9؀-ۿ]+", " ", s).strip()


def find_columns(rows):
    for r, row in enumerate(rows[:25]):
        found = {"name": -1, "ref": -1, "cost": -1, "cat": -1}
        for c, cell in enumerate(row):
            if cell is None or isinstance(cell, (int, float)):
                continue
            v = norm(cell)
            if not v:
                continue
            for key in ("ref", "cat", "cost", "name"):
                if found[key] == -1 and any(h == v or h in v for h in HEADERS[key]):
                    found[key] = c
                    break
        if found["ref"] != -1 and found["cost"] != -1:
            found["header_row"] = r
            return found
    raise SystemExit("Could not find the product-reference and cost columns in that sheet.")


def read_products(path):
    ws = openpyxl.load_workbook(path, data_only=True).active
    rows = [list(r) for r in ws.iter_rows(values_only=True)]
    cols = find_columns(rows)
    items, seen = [], {}
    for row in rows[cols["header_row"] + 1:]:
        if not row:
            continue
        ref = str(row[cols["ref"]]).strip() if row[cols["ref"]] is not None else ""
        if not ref or row[cols["cost"]] is None:
            continue
        item = {
            "c": ref,
            "n": str(row[cols["name"]]).strip() if cols["name"] != -1 and row[cols["name"]] else "",
            "u": float(row[cols["cost"]]),
            "g": str(row[cols["cat"]]).strip() if cols["cat"] != -1 and row[cols["cat"]] else "",
        }
        key = ref.upper()
        if key in seen:            # last row wins, matching the app's own rule
            items[seen[key]] = item
        else:
            seen[key] = len(items)
            items.append(item)
    if not items:
        raise SystemExit("No priced products found in that sheet.")
    return items


def main():
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    items = read_products(sys.argv[1])

    passphrase = os.environ.get("PROFIT_COST_PASSPHRASE") or getpass.getpass("Settings passphrase: ")
    if not passphrase:
        raise SystemExit("A Settings passphrase is required.")

    plaintext = json.dumps({"v": 2, "items": items}, ensure_ascii=False,
                           separators=(",", ":")).encode("utf-8")

    # 1. Random data key, embedded so the page can decrypt unattended.
    data_key = os.urandom(32)
    iv = os.urandom(12)
    ciphertext = AESGCM(data_key).encrypt(iv, plaintext, None)

    # 2. Verifier for the Settings passphrase. Only the hash ships.
    gate_salt = os.urandom(16)
    gate_hash = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=gate_salt,
                           iterations=ITERATIONS).derive(passphrase.encode("utf-8"))

    b64 = lambda b: base64.b64encode(b).decode("ascii")
    blob = {
        "v": 2, "cipher": "AES-GCM", "count": len(items),
        "key": b64(data_key), "iv": b64(iv), "ct": b64(ciphertext),
        "gate": {"kdf": "PBKDF2-SHA256", "it": ITERATIONS,
                 "salt": b64(gate_salt), "hash": b64(gate_hash)},
    }

    block = "%s\nvar COST_BLOB = %s;\n%s" % (
        MARK_START, json.dumps(blob, indent=0).replace("\n", ""), MARK_END)

    with open(TARGET, encoding="utf-8") as fh:
        html = fh.read()
    if MARK_START not in html or MARK_END not in html:
        raise SystemExit("Markers not found in %s" % TARGET)
    start = html.index(MARK_START)
    end = html.index(MARK_END) + len(MARK_END)
    with open(TARGET, "w", encoding="utf-8") as fh:
        fh.write(html[:start] + block + html[end:])

    print("Embedded %d products (%d KB of ciphertext) into %s"
          % (len(items), len(blob["ct"]) // 1024, os.path.basename(TARGET)))
    print("The Settings passphrase ships only as a PBKDF2 hash; the passphrase")
    print("itself is not stored in this repository.")


if __name__ == "__main__":
    main()
