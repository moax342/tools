

let currentLang = localStorage.getItem('eastCrescentLang') || 'ar';
let currentTheme = localStorage.getItem('eastCrescentTheme') || 'dark';
const MONEY_INPUT_IDS = ['priceInput', 'editOrig', 'editTarget', 'editCost'];

const arabicDigitMap = {
    '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
};

document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    initMoneyInputFormatters();
    applyLanguage();
    setupSettingsModal();
    initGiftTableSort();
    initGiftPaginationControls();
    initGiftClearButton();
    switchTab('cakeTab');
});

function normalizeDigits(value) {
    return String(value ?? '').replace(/[٠-٩۰-۹]/g, ch => arabicDigitMap[ch] || ch);
}

function stripThousands(value) {
    return normalizeDigits(value).replace(/[٬،]/g, ',').replaceAll(',', '').trim();
}

function formatNumber(value, decimals = 0, fixed = false) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) return 'N/A';
    const options = fixed
        ? { minimumFractionDigits: decimals, maximumFractionDigits: decimals }
        : { minimumFractionDigits: 0, maximumFractionDigits: decimals };
    return new Intl.NumberFormat('en-US', options).format(Number(value));
}

function formatMoney(value, decimals = 2, fixed = false) {
    return formatNumber(value, decimals, fixed);
}

function formatQuantity(value, decimals = 4) {
    return formatNumber(value, decimals, false);
}

function formatInteger(value) {
    return formatNumber(value, 0, false);
}

function formatMoneyInputText(raw) {
    let value = normalizeDigits(raw).replace(/[٬،]/g, ',').replaceAll(',', '').replace(/[^0-9.]/g, '');
    const firstDot = value.indexOf('.');
    if (firstDot !== -1) {
        value = value.slice(0, firstDot + 1) + value.slice(firstDot + 1).replaceAll('.', '');
    }
    if (!value) return '';

    const hasDecimal = value.includes('.');
    let [whole, decimal = ''] = value.split('.');
    whole = whole.replace(/^0+(?=\d)/, '');
    const formattedWhole = whole ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : (hasDecimal ? '0' : '');
    return hasDecimal ? `${formattedWhole}.${decimal}` : formattedWhole;
}

function parseMoneyInput(id) {
    const el = document.getElementById(id);
    return parseFloat(stripThousands(el?.value ?? ''));
}

function initMoneyInputFormatters() {
    MONEY_INPUT_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute('autocomplete', 'off');
        el.addEventListener('input', () => {
            const previousValue = el.value;
            const previousCaret = el.selectionStart ?? previousValue.length;
            const nextValue = formatMoneyInputText(previousValue);
            if (previousValue !== nextValue) {
                el.value = nextValue;
                const diff = nextValue.length - previousValue.length;
                const nextCaret = Math.max(0, previousCaret + diff);
                try { el.setSelectionRange(nextCaret, nextCaret); } catch (_) {}
            }
        });
        el.addEventListener('blur', () => {
            if (el.value === '0.' || el.value === '.') el.value = '';
            else el.value = formatMoneyInputText(el.value);
        });
        if (el.value) el.value = formatMoneyInputText(el.value);
    });
}

function applyTheme(theme) {
    currentTheme = theme === 'light' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('eastCrescentTheme', currentTheme);
    updateSettingsControls();
}

function toggleTheme() {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('eastCrescentLang', currentLang);
    applyLanguage();
}

function applyLanguage() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    const headerText = document.getElementById('header-text');
    if (headerText) headerText.style.textAlign = currentLang === 'ar' ? 'right' : 'left';

    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });

    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
        el.placeholder = el.getAttribute(`data-placeholder-${currentLang}`);
    });

    document.title = currentLang === 'ar' ? 'East Crescent Tools - هلال الشرق' : 'East Crescent Tools - Management & Operations Tools';
    updateSettingsControls();
    if (document.getElementById('giftPageInfo')) renderGiftPagination();
}

function updateSettingsControls() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) langToggle.textContent = currentLang === 'ar' ? 'English' : 'العربية';

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = currentTheme === 'light'
            ? (currentLang === 'ar' ? 'الوضع الداكن' : 'Dark mode')
            : (currentLang === 'ar' ? 'الوضع الأبيض' : 'White mode');
    }
}

function openSettings() {
    const modal = document.getElementById('settingsModal');
    if (!modal) return;
    updateSettingsControls();
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
}

function closeSettings() {
    const modal = document.getElementById('settingsModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
}

function setupSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (!modal) return;
    modal.addEventListener('click', event => {
        if (event.target === modal) closeSettings();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeSettings();
    });
}

function switchTab(tabId) {
    document.querySelectorAll('.tool-tab').forEach(tab => tab.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById('btn-' + tabId);
    if (activeBtn) activeBtn.classList.add('active');
}

function showError(arMsg, enMsg) {
    document.getElementById('errorText').textContent = currentLang === 'ar' ? arMsg : enMsg;
    document.getElementById('errorModal').classList.remove('hidden');
}
function hideError() {
    document.getElementById('errorModal').classList.add('hidden');
}

// --- CAKE CALCULATOR ---
const BOXES_PER_PACKAGE = 8;
const PCS_PER_BOX = 12;
const TOTAL_PCS_PER_PACKAGE = BOXES_PER_PACKAGE * PCS_PER_BOX;

function calculateCake() {
    const pkg = parseFloat(document.getElementById('inputPkg').value) || 0;
    const box = parseFloat(document.getElementById('inputBox').value) || 0;
    const pcs = parseFloat(document.getElementById('inputPcs').value) || 0;

    if (pkg < 0 || box < 0 || pcs < 0) {
        showError("يرجى إدخال قيم موجبة.", "Please enter positive values.");
        return;
    }

    const totalPcs = (pkg * TOTAL_PCS_PER_PACKAGE) + (box * PCS_PER_BOX) + pcs;
    const totalDecimal = totalPcs / TOTAL_PCS_PER_PACKAGE;

    const resPkg = Math.floor(totalPcs / TOTAL_PCS_PER_PACKAGE);
    const remainingPcsAfterPkg = totalPcs % TOTAL_PCS_PER_PACKAGE;
    const resBox = Math.floor(remainingPcsAfterPkg / PCS_PER_BOX);
    const resPcs = remainingPcsAfterPkg % PCS_PER_BOX;

    document.getElementById('cakeDecimalVal').textContent = Number(totalDecimal.toFixed(4)).toString();
    document.getElementById('cakeTotalPcs').textContent = totalPcs;

    const formatStr = currentLang === 'ar'
        ? `${resPkg} بالة - ${resBox} كرتونة - ${resPcs} قطعة`
        : `${resPkg} Pkg - ${resBox} Box - ${resPcs} Pcs`;

    document.getElementById('cakeFormatVal').textContent = formatStr;
}

function clearCake() {
    document.getElementById('inputPkg').value = '';
    document.getElementById('inputBox').value = '';
    document.getElementById('inputPcs').value = '';
    document.getElementById('cakeDecimalVal').textContent = '0';
    document.getElementById('cakeTotalPcs').textContent = '0';
    document.getElementById('cakeFormatVal').textContent = '-';
}

// --- RETURN CALCULATOR ---
function calculateReturn() {
    const pVal = document.getElementById('paidInput').value;
    const gVal = document.getElementById('giftInput').value;
    const rVal = document.getElementById('returnQtyInput').value;
    const prVal = stripThousands(document.getElementById('priceInput').value);

    if (!pVal || !gVal || !rVal || !prVal) {
        showError("الرجاء إدخال كافة البيانات المطلوبة.", "Please enter all required data.");
        return;
    }

    const paid = parseFloat(pVal);
    const gifts = parseFloat(gVal);
    const returnedQty = parseFloat(rVal);
    const price = parseFloat(prVal);

    if (paid < 0 || gifts < 0 || returnedQty < 0 || price <= 0) {
        showError("تأكد من إدخال قيم موجبة.", "Please ensure positive values.");
        return;
    }

    const totalUnits = paid + gifts;
    if (totalUnits === 0) {
        showError("مجموع القطع لا يمكن أن يكون صفراً.", "Total units cannot be zero.");
        return;
    }

    const piecePrice = (paid * price) / totalUnits;
    const paidInReturnRaw = (piecePrice * returnedQty) / price;
    let paidInReturn = Math.round(paidInReturnRaw);

    if (paidInReturn > returnedQty) paidInReturn = returnedQty;
    if (paidInReturn < 0) paidInReturn = 0;

    const freeInReturn = returnedQty - paidInReturn;

    const returnTotalValue = piecePrice * returnedQty;

    document.getElementById('piecePriceLbl').textContent = formatMoney(piecePrice, 4);
    document.getElementById('paidInReturnLbl').textContent = formatQuantity(paidInReturn);
    document.getElementById('freeInReturnLbl').textContent = formatQuantity(freeInReturn);
    document.getElementById('returnTotalLbl').textContent = formatMoney(returnTotalValue, 4);
}

function clearReturn() {
    ['paidInput', 'giftInput', 'returnQtyInput', 'priceInput'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('piecePriceLbl').textContent = '-';
    document.getElementById('paidInReturnLbl').textContent = '-';
    document.getElementById('freeInReturnLbl').textContent = '-';
    document.getElementById('returnTotalLbl').textContent = '-';
}

// --- GIFT CALCULATOR (faithful Python port) ---
const NMAX_DEFAULT = 2000;
let giftSortStates = {};
let currentGiftResultsOriginal = [];
let currentGiftResults = [];
let currentGiftPage = 1;
const GIFT_PAGE_SIZE = 50;

function toCents(value) {
    return Math.round(value * 100);
}

function roundSmart(n) {
    if (n >= 100) {
        return Math.round(n / 50.0) * 50;
    } else if (n >= 10) {
        return Math.round(n / 5.0) * 5;
    }
    return Math.round(n);
}

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const t = b;
        b = a % b;
        a = t;
    }
    return a;
}

function fmt(v, decimals) {
    if (v === null || v === undefined || Number.isNaN(Number(v))) return 'N/A';
    return formatNumber(v, decimals, true);
}

function populateGiftTable(results) {
    currentGiftResults = [...results];
    const tbody = document.querySelector('#giftTable tbody');
    tbody.innerHTML = '';

    results.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${formatInteger(row.N)}</td>
            <td>${formatInteger(row.a)}</td>
            <td>${formatInteger(row.b)}</td>
            <td>${formatMoney(row.eff, 4, true)}</td>
            <td>${formatMoney(row.err, 6, true)}</td>
            <td>${row.margin === null ? 'N/A' : fmt(row.margin, 2)}</td>
            <td>${row.markup === null ? 'N/A' : fmt(row.markup, 2)}</td>
        `;
        tbody.appendChild(tr);
    });
}

function getGiftTotalPages() {
    return Math.max(1, Math.ceil(currentGiftResultsOriginal.length / GIFT_PAGE_SIZE));
}

function renderGiftPagination() {
    const pageInfo = document.getElementById('giftPageInfo');
    const pager = document.getElementById('giftPagination');
    if (!pageInfo || !pager) return;

    const totalPages = getGiftTotalPages();
    currentGiftPage = Math.min(Math.max(currentGiftPage, 1), totalPages);
    const start = currentGiftResultsOriginal.length ? ((currentGiftPage - 1) * GIFT_PAGE_SIZE + 1) : 0;
    const end = Math.min(currentGiftPage * GIFT_PAGE_SIZE, currentGiftResultsOriginal.length);

    pageInfo.textContent = currentLang === 'ar'
        ? `الصفحة ${currentGiftPage} من ${totalPages} — النتائج ${start} إلى ${end} من ${currentGiftResultsOriginal.length}`
        : `Page ${currentGiftPage} of ${totalPages} — results ${start} to ${end} of ${currentGiftResultsOriginal.length}`;

    pager.innerHTML = '';

    const makeBtn = (label, page, disabled = false, active = false) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'page-btn' + (active ? ' active' : '');
        btn.textContent = label;
        btn.disabled = disabled;
        btn.addEventListener('click', () => goToGiftPage(page));
        return btn;
    };

    const makeEllipsis = () => {
        const span = document.createElement('span');
        span.className = 'page-ellipsis';
        span.textContent = '…';
        return span;
    };

    pager.appendChild(makeBtn(currentLang === 'ar' ? 'السابق' : 'Prev', currentGiftPage - 1, currentGiftPage === 1));

    const pagesToShow = [];
    if (totalPages <= 9) {
        for (let i = 1; i <= totalPages; i++) pagesToShow.push(i);
    } else {
        pagesToShow.push(1);
        const startPage = Math.max(2, currentGiftPage - 1);
        const endPage = Math.min(totalPages - 1, currentGiftPage + 1);
        if (startPage > 2) pagesToShow.push('...');
        for (let i = startPage; i <= endPage; i++) pagesToShow.push(i);
        if (endPage < totalPages - 1) pagesToShow.push('...');
        pagesToShow.push(totalPages);
    }

    pagesToShow.forEach(item => {
        if (item === '...') {
            pager.appendChild(makeEllipsis());
        } else {
            pager.appendChild(makeBtn(String(item), item, false, item === currentGiftPage));
        }
    });

    pager.appendChild(makeBtn(currentLang === 'ar' ? 'التالي' : 'Next', currentGiftPage + 1, currentGiftPage === totalPages));
}

function goToGiftPage(page) {
    const totalPages = getGiftTotalPages();
    currentGiftPage = Math.min(Math.max(page, 1), totalPages);
    renderCurrentGiftPage();
}

function renderCurrentGiftPage() {
    const start = (currentGiftPage - 1) * GIFT_PAGE_SIZE;
    const pageRows = currentGiftResultsOriginal.slice(start, start + GIFT_PAGE_SIZE);
    populateGiftTable(pageRows);
    renderGiftPagination();
}

function initGiftPaginationControls() {
    const topk = document.getElementById('comboTopk');
    if (topk) {
        topk.value = 'auto';
    }
}

function initGiftClearButton() {
    const btn = document.getElementById('giftClearBtn');
    if (!btn) return;
    btn.addEventListener('click', clearGiftData);
}


function clearGiftData(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const setValue = (id, value) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.value = value;
        el.defaultValue = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
    };

    setValue('editOrig', '');
    setValue('editTarget', '');
    setValue('editCost', '');
    setValue('spinTol', '1.00');
    setValue('comboTopk', 'auto');

    const checkRound = document.getElementById('checkRound');
    if (checkRound) {
        checkRound.checked = false;
        checkRound.defaultChecked = false;
        checkRound.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const exactLabel = document.getElementById('lblExact');
    if (exactLabel) {
        exactLabel.textContent = currentLang === 'ar'
            ? 'اضغط على (احسب) للحصول على النتيجة.'
            : 'Press Calculate to get the result.';
    }

    currentGiftResultsOriginal = [];
    currentGiftResults = [];
    currentGiftPage = 1;
    giftSortStates = {};

    const tbody = document.querySelector('#giftTable tbody');
    if (tbody) tbody.innerHTML = '';

    const pageInfo = document.getElementById('giftPageInfo');
    if (pageInfo) {
        pageInfo.textContent = currentLang === 'ar'
            ? 'الصفحة 1 من 1 — النتائج 0 إلى 0 من 0'
            : 'Page 1 of 1 — results 0 to 0 of 0';
    }

    const pager = document.getElementById('giftPagination');
    if (pager) pager.innerHTML = '';

    populateGiftTable([]);
    renderGiftPagination();
}

window.clearGiftData = clearGiftData;

function onGiftCalculate() {
    try {
        const pText = stripThousands(document.getElementById('editOrig').value);
        const tText = stripThousands(document.getElementById('editTarget').value);
        const costText = stripThousands(document.getElementById('editCost').value);

        if (!pText || !tText) return;

        const p = parseFloat(pText);
        const t = parseFloat(tText);

        let cost = null;
        if (costText) {
            cost = parseFloat(costText);
            if (Number.isNaN(cost) || cost < 0) {
                showError("التكلفة يجب أن تكون قيمة موجبة أو اتركها فارغة.", "The cost must be a positive value or leave it empty.");
                return;
            }
        }

        if (!(p > 0) || !(t > 0) || !(t < p)) {
            showError("تأكد من صحة الأسعار (السعر المراد يجب أن يكون أقل من الأصلي).", "Check the prices (target price must be lower than the original price).");
            return;
        }

        const P_cents = toCents(p);
        const T_cents = toCents(t);
        const D_cents = P_cents - T_cents;
        const g = gcd(T_cents, D_cents);
        const a_ex = Math.floor(T_cents / g);
        const b_ex = Math.floor(D_cents / g);
        const n_ex = a_ex + b_ex;
        const eff_ex = (a_ex * p) / n_ex;

        let margin_ex = null;
        let markup_ex = null;
        if (cost !== null && cost > 0) {
            margin_ex = eff_ex !== 0 ? (eff_ex - cost) / eff_ex * 100.0 : null;
            markup_ex = cost !== 0 ? (eff_ex - cost) / cost * 100.0 : null;
        }

        let exactMsg = currentLang === 'ar'
            ? `دقيق: ادفع ${formatInteger(a_ex)} واحصل على ${formatInteger(n_ex)} (${formatInteger(b_ex)} مجانية).\nالسعر الفعلي = ${formatMoney(eff_ex, 4, true)} دينار.`
            : `Exact: pay ${formatInteger(a_ex)} and get ${formatInteger(n_ex)} total (${formatInteger(b_ex)} free).\nEffective price = ${formatMoney(eff_ex, 4, true)} IQD.`;
        if (margin_ex !== null) exactMsg += currentLang === 'ar' ? `  الهامش = ${formatNumber(margin_ex, 2, true)}%.` : `  Margin = ${formatNumber(margin_ex, 2, true)}%.`;
        if (markup_ex !== null) exactMsg += currentLang === 'ar' ? `  العلامة = ${formatNumber(markup_ex, 2, true)}%.` : `  Markup = ${formatNumber(markup_ex, 2, true)}%.`;
        document.getElementById('lblExact').textContent = exactMsg;

        const results = [];
        const doRound = document.getElementById('checkRound').checked;
        const tolPercent = parseFloat(document.getElementById('spinTol').value || '0');
        const isAny = tolPercent >= 100.0;
        const isStrict = tolPercent === 0;
        const tolThreshold = (tolPercent / 100.0) * t;
        const ratio = t / p;

        for (let N = 2; N <= NMAX_DEFAULT; N++) {
            let a = Math.round(ratio * N);
            if (a < 1 || a >= N) continue;

            let b = N - a;

            let effA = a, effB = b, effN = N;
            if (doRound) {
                effA = roundSmart(a);
                effB = roundSmart(b);
                if (effA <= 0) effA = 1;
                effN = effA + effB;
                if (effN <= effA) continue;
            }

            const eff = (effA * p) / effN;
            const err = Math.abs(eff - t);

            let ok = false;
            if (isAny) ok = true;
            else if (isStrict) ok = (err < 1e-7);
            else ok = (err <= tolThreshold);

            if (!ok) continue;

            let margin_pct = null;
            let markup_pct = null;
            if (cost !== null && cost > 0) {
                if (eff !== 0) margin_pct = (eff - cost) / eff * 100.0;
                if (cost !== 0) markup_pct = (eff - cost) / cost * 100.0;
            }

            results.push({ N: effN, a: effA, b: effB, eff, err, margin: margin_pct, markup: markup_pct });
        }

        const unique = new Map();
        results.forEach(res => {
            const key = `${res.a}|${res.b}`;
            if (!unique.has(key) || res.err < unique.get(key).err) {
                unique.set(key, res);
            }
        });

        let selectedResults = [...unique.values()].sort((x, y) => (x.err - y.err) || (x.N - y.N));

        const selection = (document.getElementById('comboTopk')?.value || 'auto').trim();
        if (selection !== 'auto') {
            const topk = parseInt(selection, 10);
            if (!Number.isNaN(topk) && topk > 0) {
                selectedResults = selectedResults.slice(0, topk);
            }
        }

        currentGiftResultsOriginal = selectedResults;
        currentGiftPage = 1;

        if (currentGiftResultsOriginal.length === 0) {
            populateGiftTable([]);
            renderGiftPagination();
            if (isStrict) {
                showError("لا يوجد نتائج دقيقة تماماً في هذا النطاق. جرب رفع نسبة الخطأ المسموح.", "There are no exact results in this range. Try increasing the allowed error.");
            } else {
                showError("لم يتم العثور على نتائج ضمن النطاق والخطأ المسموح.", "No results were found within the allowed range and error.");
            }
            return;
        }

        giftSortStates = {};
        renderCurrentGiftPage();

    } catch (e) {
        showError(`حدث خطأ: ${e.message}`, `An error occurred: ${e.message}`);
    }
}

function onGiftHeaderDoubleClick(index) {
    if (!currentGiftResultsOriginal.length) return;
    giftSortStates[index] = ((giftSortStates[index] || 0) + 1) % 3;
    const state = giftSortStates[index];

    if (state === 0) {
        currentGiftResultsOriginal = [...currentGiftResultsOriginal].sort((x, y) => (x.err - y.err) || (x.N - y.N));
    } else {
        currentGiftResultsOriginal = [...currentGiftResultsOriginal].sort((x, y) => {
            const xv = x[headerIndexToKey(index)];
            const yv = y[headerIndexToKey(index)];
            const xComp = xv === null || xv === undefined ? Infinity : xv;
            const yComp = yv === null || yv === undefined ? Infinity : yv;
            if (xComp < yComp) return state === 2 ? 1 : -1;
            if (xComp > yComp) return state === 2 ? -1 : 1;
            return 0;
        });
    }

    currentGiftPage = 1;
    renderCurrentGiftPage();
}

function headerIndexToKey(index) {
    return ['N', 'a', 'b', 'eff', 'err', 'margin', 'markup'][index] || 'N';
}

function initGiftTableSort() {
    document.querySelectorAll('#giftTable thead th').forEach((th, idx) => {
        th.addEventListener('dblclick', () => onGiftHeaderDoubleClick(idx));
    });
}

function onGiftExport() {
    if (!currentGiftResultsOriginal.length) return;

    const pathName = currentLang === 'ar' ? 'النتائج' : 'results';
    const header = ["N", "Paid", "Free", "Effective Price", "Error", "Margin (%)", "Markup (%)"];
    const rows = currentGiftResultsOriginal.map(r => ([
        r.N, r.a, r.b, r.eff, r.err,
        r.margin === null ? '' : r.margin,
        r.markup === null ? '' : r.markup
    ]));

    const wantsXlsx = false; // toggled by save dialog-less export via CSV default
    if (wantsXlsx && window.XLSX) {
        const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Results');
        XLSX.writeFile(wb, `${pathName}.xlsx`);
        return;
    }

    // CSV fallback/default, matching the Python export behavior
    const esc = (v) => {
        const s = String(v ?? '');
        if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
        return s;
    };
    const csv = [header, ...rows].map(row => row.map(esc).join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = currentLang === 'ar' ? 'النتائج.csv' : 'results.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
