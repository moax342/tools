const REQUIRED_COLUMNS = [
  "المنتج",
  "فئة المنتج",
  "الموقع",
  "رقم الدفعة/الرقم التسلسلي",
  "تاريخ الإزالة",
  "الكمية في المخزون",
  "الكمية المتوفرة",
  "وحدة القياس",
  "القيمة"
];

const FIELDS = {
  product: REQUIRED_COLUMNS[0],
  category: REQUIRED_COLUMNS[1],
  location: REQUIRED_COLUMNS[2],
  lot: REQUIRED_COLUMNS[3],
  removalDate: REQUIRED_COLUMNS[4],
  onHand: REQUIRED_COLUMNS[5],
  available: REQUIRED_COLUMNS[6],
  uom: REQUIRED_COLUMNS[7],
  value: REQUIRED_COLUMNS[8]
};

const OPTIONAL_IMPORT_COLUMNS = new Set([FIELDS.removalDate]);
const HEADER_ALIASES = {
  [FIELDS.product]: ["Product", "المنتج"],
  [FIELDS.category]: ["Product Category", "Category", "فئة المنتج"],
  [FIELDS.location]: ["Location", "الموقع"],
  [FIELDS.lot]: ["Lot/Serial Number", "Lot / Serial Number", "Lot/Serial", "Serial Number", "Batch / Serial", "رقم الدفعة/الرقم التسلسلي", "رقم الدفعة / الرقم التسلسلي"],
  [FIELDS.removalDate]: ["Removal Date", "Removal date", "Removal Date To", "Removal Date From", "تاريخ الإزالة"],
  [FIELDS.onHand]: ["Inventoried Quantity", "On Hand Quantity", "On-hand Quantity", "Quantity On Hand", "الكمية في المخزون"],
  [FIELDS.available]: ["Available Quantity", "الكمية المتوفرة"],
  [FIELDS.uom]: ["Unit of Measure", "UoM", "UOM", "وحدة القياس"],
  [FIELDS.value]: ["Value", "القيمة"]
};

const IGNORED_IMPORT_COLUMNS = new Set([
  "Company",
  "Company Name",
  "الشركة",
  "اسم الشركة"
]);

const I18N = {
  ar: {
    appTitle: "لوحة مراقبة المخزون — هلال الشرق",
    settings: "الإعدادات",
    home: "الرئيسية",
    appearance: "المظهر",
    lightMode: "☀️ فاتح",
    darkMode: "🌙 داكن",
    language: "اللغة",
    dataActions: "الملفات",
    importFile: "📁 استيراد ملف",
    importCompareFile: "📊 استيراد ملف مقارنة XLSX",
    templateXlsx: "⬇ قالب XLSX",
    templateCsv: "⬇ قالب CSV",
    emptySubtitle: "استورد ملف المخزون لعرض لوحة تحليل تفاعلية.",
    importXlsxCsv: "استيراد XLSX / CSV",
    importWorking: "جارٍ استيراد الملف...",
    comparisonWorking: "جارٍ استيراد ملف المقارنة...",
    renderWarning: "تم تحميل البيانات، لكن حدث خطأ أثناء رسم بعض عناصر اللوحة. تم عرض الجدول والبيانات الأساسية.",
    downloadTemplate: "تنزيل القالب",
    searchPlaceholder: "اكتب قيمة ثم اضغط Enter لإضافتها كتصفية بحث...",
    searchTagRemove: "إزالة",
    searchSuggestionHint: "اضغط لإضافة هذا البحث",
    suggestionProduct: "منتج",
    suggestionCategory: "فئة",
    suggestionLocation: "موقع",
    suggestionLot: "دفعة / تسلسل",
    suggestionUom: "وحدة قياس",
    suggestionStatus: "حالة",
    suggestionRemovalDate: "تاريخ إزالة",
    allRemovalDates: "كل تواريخ الإزالة",
    removalDateHas: "له تاريخ إزالة",
    removalDateMissing: "بدون تاريخ إزالة",
    exportCsv: "⬇ تصدير CSV",
    exportXlsx: "⬇ تصدير XLSX",
    resetFilters: "إعادة التصفية",
    advancedOptions: "خيارات إضافية",
    dateFrom: "تاريخ الإزالة من",
    dateTo: "تاريخ الإزالة إلى",
    lowStockThreshold: "حد المخزون المنخفض",
    productTotals: "🧮 إجمالي كل منتج",
    productTotalsActive: "✓ إجمالي كل منتج",
    clearData: "مسح البيانات",
    kpiProducts: "إجمالي المنتجات",
    kpiOut: "نفاد المخزون",
    kpiOutSub: "كمية متاحة = 0",
    kpiNegative: "مخزون سالب",
    kpiNegativeSub: "كمية أقل من 0",
    kpiLow: "مخزون منخفض",
    kpiLowSub: "حسب الحد المحدد",
    kpiOnHand: "إجمالي الكميات",
    kpiOnHandSub: "وحدات موجودة",
    kpiValue: "إجمالي القيمة",
    kpiValueSub: "القيمة الإجمالية",
    kpiLocations: "عدد الفروع",
    kpiLocationsSub: "فرع / موقع مخزن",
    optionalKpis: "مؤشرات إضافية",
    kpiRowsOptional: "السجلات المعروضة",
    kpiRowsOptionalSub: "بعد التصفية",
    kpiAvailable: "إجمالي المتاح",
    kpiAvailableSub: "كمية متاحة",
    kpiReserved: "إجمالي المحجوز",
    kpiReservedSub: "غير متاح / محجوز",
    kpiCategories: "عدد الفئات",
    kpiCategoriesSub: "فئات ضمن العرض",
    kpiUoms: "وحدات القياس",
    kpiUomsSub: "أنواع وحدات",
    kpiBatches: "الدُفعات",
    kpiBatchesSub: "دفعات / أرقام تسلسل",
    kpiDated: "بتاريخ إزالة",
    kpiDatedSub: "صفوف لها تاريخ",
    kpiAvgUnitValue: "متوسط قيمة الوحدة",
    kpiAvgUnitValueSub: "القيمة ÷ الكمية",
    kpiReservedValue: "قيمة المحجوز",
    kpiReservedValueSub: "قيمة صفوف محجوزة",
    productDetails: "تفاصيل المنتجات",
    rowsPerPage: "عدد الصفوف",
    columns: "الأعمدة",
    showAllColumns: "إظهار الكل",
    hideAllColumns: "إخفاء الكل",
    resetColumnWidths: "إعادة الأحجام",
    resizeColumnHint: "اسحب حافة عنوان العمود لتغيير الحجم. انقر مرتين على الحافة لإعادة حجم العمود.",
    next: "التالي",
    previous: "السابق",
    allCategories: "كل الفئات",
    allLocations: "كل الفروع / المواقع",
    allUoms: "كل وحدات القياس",
    allStatuses: "كل الحالات",
    statusReady: "متاح",
    statusLow: "مخزون منخفض",
    statusOut: "نفاد المخزون",
    statusNegative: "مخزون سالب",
    statusReserved: "محجوز",
    statusDated: "له تاريخ إزالة",
    lastUpdatedNever: "آخر تحديث: لم يتم الاستيراد بعد",
    lastUpdated: "آخر تحديث: {time} - {date} • {file}",
    rowsShown: "{shown} سجل معروض / {total} إجمالي",
    tableInfo: "{shown} سجل معروض من أصل {total}",
    pageInfo: "صفحة {page} من {pages}",
    importSuccess: "تم استيراد {count} سجل مخزون من {file}.",
    skippedSummary: " وتم تجاهل {count} صف تجميعي لمنع تكرار الحساب.",
    comparisonSuccess: "تمت مقارنة {count} صف/عنصر مع {file}.",
    comparisonNeedsMain: "استورد ملف المخزون الأساسي أولًا، ثم استورد ملف XLSX للمقارنة.",
    comparisonXlsxOnly: "ملف المقارنة يجب أن يكون بصيغة XLSX.",
    exportNoRows: "لا توجد سجلات مطابقة للتصفية الحالية للتصدير.",
    comparisonExportEmpty: "لا توجد بيانات مقارنة للتصدير.",
    clearConfirm: "هل تريد مسح كل بيانات المخزون المستوردة من هذه الصفحة؟",
    comparisonClearConfirm: "هل تريد مسح نتائج المقارنة فقط؟",
    chartValueByCategory: "القيمة حسب الفئة",
    chartQtyByCategory: "توزيع الكميات حسب الفئة",
    chartQtyByLocation: "الكميات حسب الموقع",
    chartTopProducts: "أعلى المنتجات حسب القيمة",
    chartStockStatus: "حالة المخزون",
    chartRemovalTimeline: "تاريخ الإزالة حسب الشهر",
    chartsTitle: "الرسوم البيانية",
    chartsInfo: "القيمة حسب الفئة وتوزيع الكميات حسب الفئة ظاهران دائمًا. اختر أي رسوم إضافية من القائمة.",
    selectCharts: "اختيار الرسوم",
    chartSelectorHint: "اختر أكثر من رسم، ثم أغلق القائمة يدويًا.",
    defaultChart: "أساسي",
    optionalChart: "اختياري",
    moreCharts: "عرض المزيد من الرسوم",
    lessCharts: "إخفاء الرسوم الإضافية",
    expandChart: "تكبير الرسم",
    closeExpanded: "إغلاق",
    chartValueByLocation: "القيمة حسب الموقع",
    chartAvailableReservedByCategory: "المتاح والمحجوز حسب الفئة",
    chartProductsByCategory: "عدد المنتجات حسب الفئة",
    chartUomDistribution: "الكميات حسب وحدة القياس",
    chartReservedByLocation: "الكميات المحجوزة حسب الموقع",
    chartLowStockProducts: "أقل المنتجات توفرًا",
    chartBatchCountByCategory: "عدد الدُفعات حسب الفئة",
    chartUnitValueProducts: "أعلى المنتجات حسب قيمة الوحدة",
    emptyValueLocation: "لا توجد بيانات قيمة حسب الموقع",
    emptyAvailableReservedCategory: "لا توجد بيانات متاح ومحجوز",
    emptyProductsCategory: "لا توجد بيانات منتجات حسب الفئة",
    emptyUom: "لا توجد بيانات وحدات قياس",
    emptyReservedLocation: "لا توجد كميات محجوزة",
    emptyLowStockProducts: "لا توجد منتجات منخفضة المخزون",
    emptyBatchCategory: "لا توجد بيانات دُفعات",
    emptyUnitValueProducts: "لا توجد بيانات قيمة وحدة",
    reservedQty: "المحجوزة",
    productCount: "منتج",
    batchCount: "دفعة",
    emptyValueCategory: "لا توجد بيانات قيمة حسب الفئة",
    emptyQtyCategory: "لا توجد بيانات كميات حسب الفئة",
    emptyLocations: "لا توجد بيانات مواقع",
    emptyProducts: "لا توجد بيانات منتجات",
    emptyStatus: "لا توجد بيانات حالة",
    emptyTimeline: "لا توجد تواريخ إزالة",
    existingQty: "الموجودة",
    availableQty: "المتاحة",
    unitSuffix: " وحدة",
    colProduct: "المنتج",
    colCategory: "الفئة",
    colLocation: "الموقع",
    colLot: "رقم الدفعة / التسلسل",
    colRemovalDate: "تاريخ الإزالة",
    colOnHand: "الكمية الموجودة",
    colAvailable: "الكمية المتاحة",
    colReserved: "محجوز / غير متاح",
    colUom: "وحدة القياس",
    colValue: "القيمة (IQD)",
    colValuePerUnit: "قيمة الوحدة",
    colStatus: "الحالة",
    importedRowsFallback: "0 سجل",
    quickProducts: "عرض صفوف المنتجات",
    quickOutStock: "عرض نفاد المخزون",
    quickTotalStock: "عرض إجمالي الكميات",
    quickLowStock: "عرض المخزون المنخفض",
    quickNegativeStock: "عرض المخزون السالب",
    quickValue: "عرض صفوف القيمة",
    quickLocations: "عرض صفوف المواقع",
    quickRows: "عرض السجلات المعروضة",
    quickAvailable: "عرض الكمية المتاحة",
    quickReserved: "عرض الكمية المحجوزة",
    quickCategories: "عرض صفوف الفئات",
    quickUoms: "عرض وحدات القياس",
    quickBatches: "عرض الدُفعات / أرقام التسلسل",
    quickDated: "عرض الصفوف ذات تاريخ الإزالة",
    quickAvgUnitValue: "عرض صفوف قيمة الوحدة",
    quickReservedValue: "عرض قيمة المحجوز",
    clearQuickView: "إلغاء العرض",
    locationsBadge: "{count} مواقع",
    locationsBadgeOne: "{count} موقع",
    productLocationsTitle: "مواقع {product} — {count} موقع",
    locationPopupOnHand: "الموجود",
    locationPopupAvailable: "المتاح",
    noRowsMatch: "لا توجد صفوف تطابق عوامل التصفية الحالية.",
    comparisonTitle: "مقارنة بيانات المخزون",
    comparisonEmptyHint: "استورد ملف XLSX آخر من الإعدادات لمقارنته مع البيانات الحالية.",
    comparisonInfo: "تمت المقارنة مع {file} • {count} صف مقارنة",
    comparisonNoRows: "لا توجد نتائج مقارنة.",
    comparisonTableCapped: "تم عرض أول {shown} نتيجة من أصل {total}. استخدم التصدير لرؤية كل النتائج.",
    exportComparisonCsv: "⬇ تصدير CSV",
    exportComparisonXlsx: "⬇ تصدير XLSX",
    clearComparison: "مسح المقارنة",
    comparisonNew: "جديد في ملف المقارنة",
    comparisonRemoved: "غير موجود في ملف المقارنة",
    comparisonIncreased: "زيادة",
    comparisonDecreased: "نقصان",
    comparisonChanged: "تغير",
    comparisonUnchanged: "بدون تغيير",
    comparisonMetricRows: "صفوف المقارنة",
    comparisonMetricChanged: "تغيرات",
    comparisonMetricNew: "جديدة",
    comparisonMetricRemoved: "محذوفة",
    comparisonMetricQtyDelta: "فرق الكمية",
    comparisonMetricValueDelta: "فرق القيمة",
    comparisonMetricIncreased: "زيادات",
    comparisonMetricDecreased: "نقصانات",
    comparisonMetricUnchanged: "بدون تغيير",
    comparisonMetricQtyChanged: "تغيرت كميتها",
    comparisonMetricAvailableChanged: "تغير المتاح",
    comparisonMetricReservedChanged: "تغير المحجوز",
    comparisonMetricValueChanged: "تغيرت قيمتها",
    comparisonMetricQtyOnly: "تغير كمية فقط",
    comparisonMetricValueOnly: "تغير قيمة فقط",
    comparisonMetricQtyAndValue: "تغير كمية وقيمة",
    comparisonMetricValueGain: "زيادة قيمة",
    comparisonMetricValueLoss: "نقصان قيمة",
    comparisonMetricMatched: "مطابقة بين الملفين",
    comparisonMetricBaseQty: "كمية الملف الحالي",
    comparisonMetricCompareQty: "كمية ملف المقارنة",
    comparisonMetricBaseValue: "قيمة الملف الحالي",
    comparisonMetricCompareValue: "قيمة ملف المقارنة",
    comparisonMetricQtyMovement: "حركة الكمية المطلقة",
    comparisonMetricValueMovement: "حركة القيمة المطلقة",
    comparisonMetricQtyPercent: "نسبة تغير الكمية",
    comparisonMetricValuePercent: "نسبة تغير القيمة",
    comparisonMetricAffectedProducts: "منتجات متأثرة",
    comparisonMetricAffectedLocations: "مواقع متأثرة",
    comparisonMetricAvailableDelta: "فرق المتاح",
    comparisonMetricReservedDelta: "فرق المحجوز",
    comparisonMetricAvailablePercent: "نسبة تغير المتاح",
    comparisonMetricReservedPercent: "نسبة تغير المحجوز",
    comparisonMetricQtyGainRows: "صفوف زيادة الكمية",
    comparisonMetricQtyLossRows: "صفوف نقصان الكمية",
    comparisonMetricUnitValueChanged: "تغير قيمة الوحدة",
    comparisonMetricNewQty: "كمية جديدة",
    comparisonMetricRemovedQty: "كمية محذوفة",
    comparisonMetricNewValue: "قيمة جديدة",
    comparisonMetricRemovedValue: "قيمة محذوفة",
    comparisonMetricBaseImportedRows: "صفوف الملف الحالي",
    comparisonMetricCompareImportedRows: "صفوف ملف المقارنة",
    comparisonMetricSelectors: "مؤشرات المقارنة",
    comparisonMetricSelectorHint: "اختر مؤشرات المقارنة التي تريد عرضها. المؤشرات التفصيلية مخفية افتراضيًا.",
    comparisonChartsTitle: "رسوم المقارنة",
    comparisonChartsEmpty: "اختر رسوم المقارنة من القائمة لعرضها.",
    comparisonChartSelectors: "رسوم المقارنة",
    comparisonChartSelectorHint: "اختر رسوم المقارنة التي تريد عرضها. كل رسوم المقارنة مخفية افتراضيًا.",
    comparisonChartStatus: "حالات صفوف المقارنة",
    comparisonChartQtyByStatus: "حركة الكمية حسب الحالة",
    comparisonChartValueByStatus: "حركة القيمة حسب الحالة",
    comparisonChartTopQtyGains: "أعلى زيادات كمية",
    comparisonChartTopQtyLosses: "أعلى نقصانات كمية",
    comparisonChartTopValueGains: "أعلى زيادات قيمة",
    comparisonChartTopValueLosses: "أعلى نقصانات قيمة",
    comparisonChartQtyByCategory: "الكمية الحالية مقابل المقارنة حسب الفئة",
    comparisonChartValueByCategory: "القيمة الحالية مقابل المقارنة حسب الفئة",
    comparisonChartChangedByLocation: "الصفوف المتغيرة حسب الموقع",
    comparisonChartQtyMovementByLocation: "حركة الكمية حسب الموقع",
    comparisonChartValueMovementByLocation: "حركة القيمة حسب الموقع",
    comparisonChartChangedByCategoryLine: "الصفوف المتغيرة حسب الفئة",
    comparisonChartQtyMovementByCategoryLine: "حركة الكمية حسب الفئة",
    comparisonChartValueMovementByCategoryLine: "حركة القيمة حسب الفئة",
    comparisonChartNoData: "لا توجد بيانات كافية لهذا الرسم.",
    comparisonChartCurrent: "الحالي",
    comparisonChartComparison: "المقارنة",
    comparisonViewPositiveQty: "صفوف زادت كميتها",
    comparisonViewNegativeQty: "صفوف نقصت كميتها",
    comparisonViewUnitValueChanged: "صفوف تغيرت قيمة الوحدة فيها",
    comparisonClickHint: "اضغط لعرض الصفوف",
    comparisonViewAll: "كل نتائج المقارنة",
    comparisonViewChanged: "الصفوف المتغيرة",
    comparisonViewNew: "الصفوف الجديدة",
    comparisonViewRemoved: "الصفوف المحذوفة",
    comparisonViewIncreased: "صفوف الزيادة",
    comparisonViewDecreased: "صفوف النقصان",
    comparisonViewUnchanged: "الصفوف بدون تغيير",
    comparisonViewQtyChanged: "صفوف تغير الكمية",
    comparisonViewAvailableChanged: "صفوف تغير المتاح",
    comparisonViewReservedChanged: "صفوف تغير المحجوز",
    comparisonViewValueChanged: "صفوف تغير القيمة",
    comparisonViewQtyOnly: "صفوف تغيرت فيها الكمية فقط",
    comparisonViewValueOnly: "صفوف تغيرت فيها القيمة فقط",
    comparisonViewQtyAndValue: "صفوف تغيرت فيها الكمية والقيمة",
    comparisonViewPositiveValue: "صفوف زادت قيمتها",
    comparisonViewNegativeValue: "صفوف انخفضت قيمتها",
    comparisonViewMatched: "الصفوف الموجودة في الملفين",
    comparisonViewAffectedProducts: "المنتجات المتأثرة",
    comparisonViewAffectedLocations: "المواقع المتأثرة",
    comparisonActiveView: "العرض الحالي: {view} • {shown} من {total}",
    clearComparisonView: "عرض كل المقارنة",
    colCompareProduct: "المنتج",
    colCompareCategory: "الفئة",
    colCompareLocation: "الموقع",
    colCompareLot: "الدفعة / التسلسل",
    colCompareUom: "وحدة القياس",
    colBaseOnHand: "الكمية الحالية",
    colCompareOnHand: "كمية ملف المقارنة",
    colDeltaOnHand: "فرق الكمية",
    colBaseAvailable: "المتاح الحالي",
    colCompareAvailable: "متاح المقارنة",
    colDeltaAvailable: "فرق المتاح",
    colBaseValue: "القيمة الحالية",
    colCompareValue: "قيمة المقارنة",
    colDeltaValue: "فرق القيمة",
    colBaseReserved: "المحجوز الحالي",
    colCompareReserved: "محجوز المقارنة",
    colDeltaReserved: "فرق المحجوز",
    colDeltaQtyPercent: "٪ تغير الكمية",
    colDeltaValuePercent: "٪ تغير القيمة",
    colBaseUnitValue: "قيمة الوحدة الحالية",
    colCompareUnitValue: "قيمة وحدة المقارنة",
    colDeltaUnitValue: "فرق قيمة الوحدة",
    colCurrentRows: "صفوف حالية",
    colComparisonRows: "صفوف المقارنة",
    colCompareStatus: "نوع التغيير"
  },
  en: {
    appTitle: "Inventory Monitoring Dashboard — EC",
    settings: "Settings",
    home: "Home",
    appearance: "Appearance",
    lightMode: "☀️ Light",
    darkMode: "🌙 Dark",
    language: "Language",
    dataActions: "Files",
    importFile: "📁 Import file",
    importCompareFile: "📊 Import comparison XLSX",
    templateXlsx: "⬇ XLSX template",
    templateCsv: "⬇ CSV template",
    emptySubtitle: "Import the inventory file to open the interactive dashboard.",
    importXlsxCsv: "Import XLSX / CSV",
    importWorking: "Importing file...",
    comparisonWorking: "Importing comparison file...",
    renderWarning: "Data was loaded, but part of the dashboard failed to render. The table and core data were still displayed.",
    downloadTemplate: "Download template",
    searchPlaceholder: "Type a value, then press Enter to add it as a search filter...",
    searchTagRemove: "Remove",
    searchSuggestionHint: "Click to add this search",
    suggestionProduct: "Product",
    suggestionCategory: "Category",
    suggestionLocation: "Location",
    suggestionLot: "Batch / serial",
    suggestionUom: "UOM",
    suggestionStatus: "Status",
    suggestionRemovalDate: "Removal date",
    allRemovalDates: "All removal dates",
    removalDateHas: "Has removal date",
    removalDateMissing: "No removal date",
    exportCsv: "⬇ Export CSV",
    exportXlsx: "⬇ Export XLSX",
    resetFilters: "Reset filters",
    advancedOptions: "More options",
    dateFrom: "Removal date from",
    dateTo: "Removal date to",
    lowStockThreshold: "Low-stock threshold",
    productTotals: "🧮 Total by product",
    productTotalsActive: "✓ Total by product",
    clearData: "Clear data",
    kpiProducts: "Total products",
    kpiOut: "Out of stock",
    kpiOutSub: "Available qty = 0",
    kpiNegative: "Negative stock",
    kpiNegativeSub: "Quantity below 0",
    kpiLow: "Low stock",
    kpiLowSub: "Based on threshold",
    kpiOnHand: "Total quantity",
    kpiOnHandSub: "On-hand units",
    kpiValue: "Total value",
    kpiValueSub: "Total inventory value",
    kpiLocations: "Locations",
    kpiLocationsSub: "Branch / stock location",
    optionalKpis: "Optional KPIs",
    kpiRowsOptional: "Visible rows",
    kpiRowsOptionalSub: "After filters",
    kpiAvailable: "Total available",
    kpiAvailableSub: "Available quantity",
    kpiReserved: "Total reserved",
    kpiReservedSub: "Reserved / unavailable",
    kpiCategories: "Categories",
    kpiCategoriesSub: "Categories in view",
    kpiUoms: "Units of measure",
    kpiUomsSub: "UOM types",
    kpiBatches: "Batches",
    kpiBatchesSub: "Batch / serial values",
    kpiDated: "Removal-dated",
    kpiDatedSub: "Rows with dates",
    kpiAvgUnitValue: "Average unit value",
    kpiAvgUnitValueSub: "Value ÷ quantity",
    kpiReservedValue: "Reserved value",
    kpiReservedValueSub: "Value of reserved rows",
    productDetails: "Product details",
    rowsPerPage: "Rows per page",
    columns: "Columns",
    showAllColumns: "Show all",
    hideAllColumns: "Hide all",
    resetColumnWidths: "Reset widths",
    resizeColumnHint: "Drag a column header edge to resize it. Double-click the edge to reset that column width.",
    next: "Next",
    previous: "Previous",
    allCategories: "All categories",
    allLocations: "All branches / locations",
    allUoms: "All units of measure",
    allStatuses: "All statuses",
    statusReady: "Available",
    statusLow: "Low stock",
    statusOut: "Out of stock",
    statusNegative: "Negative stock",
    statusReserved: "Reserved",
    statusDated: "Has removal date",
    lastUpdatedNever: "Last update: not imported yet",
    lastUpdated: "Last update: {time} - {date} • {file}",
    rowsShown: "{shown} shown / {total} total",
    tableInfo: "{shown} records shown from {total}",
    pageInfo: "Page {page} of {pages}",
    importSuccess: "Imported {count} inventory records from {file}.",
    skippedSummary: " Skipped {count} grouped summary rows to prevent double-counting.",
    comparisonSuccess: "Compared {count} row/item(s) with {file}.",
    comparisonNeedsMain: "Import the main inventory file first, then import another XLSX file for comparison.",
    comparisonXlsxOnly: "The comparison file must be an XLSX file.",
    exportNoRows: "There are no records matching the current filters to export.",
    comparisonExportEmpty: "There is no comparison data to export.",
    clearConfirm: "Clear all imported inventory data from this page?",
    comparisonClearConfirm: "Clear comparison results only?",
    chartValueByCategory: "Value by category",
    chartQtyByCategory: "Quantity distribution by category",
    chartQtyByLocation: "Quantity by location",
    chartTopProducts: "Top products by value",
    chartStockStatus: "Stock status",
    chartRemovalTimeline: "Removal date by month",
    chartsTitle: "Charts",
    chartsInfo: "Value by category and quantity distribution by category are always visible. Select any extra charts from the menu.",
    selectCharts: "Select charts",
    chartSelectorHint: "Select multiple charts, then close the menu manually.",
    defaultChart: "Default",
    optionalChart: "Optional",
    moreCharts: "See more charts",
    lessCharts: "Show fewer charts",
    expandChart: "Expand chart",
    closeExpanded: "Close",
    chartValueByLocation: "Value by location",
    chartAvailableReservedByCategory: "Available and reserved by category",
    chartProductsByCategory: "Product count by category",
    chartUomDistribution: "Quantity by unit of measure",
    chartReservedByLocation: "Reserved quantity by location",
    chartLowStockProducts: "Lowest available products",
    chartBatchCountByCategory: "Batch count by category",
    chartUnitValueProducts: "Top products by unit value",
    emptyValueLocation: "No location value data",
    emptyAvailableReservedCategory: "No available/reserved data",
    emptyProductsCategory: "No product-by-category data",
    emptyUom: "No unit-of-measure data",
    emptyReservedLocation: "No reserved quantity",
    emptyLowStockProducts: "No low-stock products",
    emptyBatchCategory: "No batch data",
    emptyUnitValueProducts: "No unit-value data",
    reservedQty: "Reserved",
    productCount: "products",
    batchCount: "batches",
    emptyValueCategory: "No category value data",
    emptyQtyCategory: "No category quantity data",
    emptyLocations: "No location data",
    emptyProducts: "No product data",
    emptyStatus: "No status data",
    emptyTimeline: "No removal dates",
    existingQty: "On hand",
    availableQty: "Available",
    unitSuffix: " units",
    colProduct: "Product",
    colCategory: "Category",
    colLocation: "Location",
    colLot: "Batch / serial",
    colRemovalDate: "Removal date",
    colOnHand: "On-hand qty",
    colAvailable: "Available qty",
    colReserved: "Reserved / unavailable",
    colUom: "Unit of measure",
    colValue: "Value (IQD)",
    colValuePerUnit: "Unit value",
    colStatus: "Status",
    importedRowsFallback: "0 records",
    quickProducts: "Viewing product rows",
    quickOutStock: "Viewing out-of-stock rows",
    quickTotalStock: "Viewing total quantity rows",
    quickLowStock: "Viewing low stock",
    quickNegativeStock: "Viewing negative stock",
    quickValue: "Viewing value rows",
    quickLocations: "Viewing location rows",
    quickRows: "Viewing visible rows",
    quickAvailable: "Viewing available quantity rows",
    quickReserved: "Viewing reserved quantity rows",
    quickCategories: "Viewing category rows",
    quickUoms: "Viewing unit-of-measure rows",
    quickBatches: "Viewing batch / serial rows",
    quickDated: "Viewing removal-dated rows",
    quickAvgUnitValue: "Viewing unit-value rows",
    quickReservedValue: "Viewing reserved-value rows",
    clearQuickView: "Clear view",
    locationsBadge: "{count} locations",
    locationsBadgeOne: "{count} location",
    productLocationsTitle: "{product} locations — {count}",
    locationPopupOnHand: "On hand",
    locationPopupAvailable: "Available",
    noRowsMatch: "No rows match the active filters.",
    comparisonTitle: "Inventory data comparison",
    comparisonEmptyHint: "Import another XLSX file from Settings to compare it against the current data.",
    comparisonInfo: "Compared with {file} • {count} comparison rows",
    comparisonNoRows: "No comparison results were found.",
    comparisonTableCapped: "Showing the first {shown} results out of {total}. Export to see every result.",
    exportComparisonCsv: "⬇ Export CSV",
    exportComparisonXlsx: "⬇ Export XLSX",
    clearComparison: "Clear comparison",
    comparisonNew: "New in comparison file",
    comparisonRemoved: "Missing from comparison file",
    comparisonIncreased: "Increased",
    comparisonDecreased: "Decreased",
    comparisonChanged: "Changed",
    comparisonUnchanged: "Unchanged",
    comparisonMetricRows: "Comparison rows",
    comparisonMetricChanged: "Changes",
    comparisonMetricNew: "New",
    comparisonMetricRemoved: "Removed",
    comparisonMetricQtyDelta: "Quantity delta",
    comparisonMetricValueDelta: "Value delta",
    comparisonMetricIncreased: "Increases",
    comparisonMetricDecreased: "Decreases",
    comparisonMetricUnchanged: "Unchanged",
    comparisonMetricQtyChanged: "Qty changed",
    comparisonMetricAvailableChanged: "Available changed",
    comparisonMetricReservedChanged: "Reserved changed",
    comparisonMetricValueChanged: "Value changed",
    comparisonMetricQtyOnly: "Qty-only changes",
    comparisonMetricValueOnly: "Value-only changes",
    comparisonMetricQtyAndValue: "Qty + value changes",
    comparisonMetricValueGain: "Value gains",
    comparisonMetricValueLoss: "Value losses",
    comparisonMetricMatched: "Matched rows",
    comparisonMetricBaseQty: "Current qty",
    comparisonMetricCompareQty: "Comparison qty",
    comparisonMetricBaseValue: "Current value",
    comparisonMetricCompareValue: "Comparison value",
    comparisonMetricQtyMovement: "Absolute qty movement",
    comparisonMetricValueMovement: "Absolute value movement",
    comparisonMetricQtyPercent: "Quantity change %",
    comparisonMetricValuePercent: "Value change %",
    comparisonMetricAffectedProducts: "Affected products",
    comparisonMetricAffectedLocations: "Affected locations",
    comparisonMetricAvailableDelta: "Available delta",
    comparisonMetricReservedDelta: "Reserved delta",
    comparisonMetricAvailablePercent: "Available change %",
    comparisonMetricReservedPercent: "Reserved change %",
    comparisonMetricQtyGainRows: "Quantity gain rows",
    comparisonMetricQtyLossRows: "Quantity loss rows",
    comparisonMetricUnitValueChanged: "Unit value changed",
    comparisonMetricNewQty: "New quantity",
    comparisonMetricRemovedQty: "Removed quantity",
    comparisonMetricNewValue: "New value",
    comparisonMetricRemovedValue: "Removed value",
    comparisonMetricBaseImportedRows: "Current file rows",
    comparisonMetricCompareImportedRows: "Comparison file rows",
    comparisonMetricSelectors: "Comparison KPIs",
    comparisonMetricSelectorHint: "Choose which comparison KPIs to display. Detailed KPIs are hidden by default.",
    comparisonChartsTitle: "Comparison charts",
    comparisonChartsEmpty: "Select comparison charts from the menu to show them.",
    comparisonChartSelectors: "Comparison charts",
    comparisonChartSelectorHint: "Choose which comparison charts to display. All comparison charts are hidden by default.",
    comparisonChartStatus: "Comparison row status",
    comparisonChartQtyByStatus: "Quantity movement by status",
    comparisonChartValueByStatus: "Value movement by status",
    comparisonChartTopQtyGains: "Top quantity gains",
    comparisonChartTopQtyLosses: "Top quantity losses",
    comparisonChartTopValueGains: "Top value gains",
    comparisonChartTopValueLosses: "Top value losses",
    comparisonChartQtyByCategory: "Current vs comparison quantity by category",
    comparisonChartValueByCategory: "Current vs comparison value by category",
    comparisonChartChangedByLocation: "Changed rows by location",
    comparisonChartQtyMovementByLocation: "Quantity movement by location",
    comparisonChartValueMovementByLocation: "Value movement by location",
    comparisonChartChangedByCategoryLine: "Changed rows by category",
    comparisonChartQtyMovementByCategoryLine: "Quantity movement by category",
    comparisonChartValueMovementByCategoryLine: "Value movement by category",
    comparisonChartNoData: "Not enough data for this chart.",
    comparisonChartCurrent: "Current",
    comparisonChartComparison: "Comparison",
    comparisonViewPositiveQty: "Rows with quantity gains",
    comparisonViewNegativeQty: "Rows with quantity losses",
    comparisonViewUnitValueChanged: "Rows with unit value changes",
    comparisonClickHint: "Click to view rows",
    comparisonViewAll: "All comparison results",
    comparisonViewChanged: "Changed rows",
    comparisonViewNew: "New rows",
    comparisonViewRemoved: "Removed rows",
    comparisonViewIncreased: "Increased rows",
    comparisonViewDecreased: "Decreased rows",
    comparisonViewUnchanged: "Unchanged rows",
    comparisonViewQtyChanged: "Quantity-changed rows",
    comparisonViewAvailableChanged: "Available-changed rows",
    comparisonViewReservedChanged: "Reserved-changed rows",
    comparisonViewValueChanged: "Value-changed rows",
    comparisonViewQtyOnly: "Quantity-only changes",
    comparisonViewValueOnly: "Value-only changes",
    comparisonViewQtyAndValue: "Quantity and value changes",
    comparisonViewPositiveValue: "Rows with value gains",
    comparisonViewNegativeValue: "Rows with value losses",
    comparisonViewMatched: "Rows found in both files",
    comparisonViewAffectedProducts: "Affected products",
    comparisonViewAffectedLocations: "Affected locations",
    comparisonActiveView: "Current view: {view} • {shown} of {total}",
    clearComparisonView: "Show all comparison",
    colCompareProduct: "Product",
    colCompareCategory: "Category",
    colCompareLocation: "Location",
    colCompareLot: "Batch / serial",
    colCompareUom: "UOM",
    colBaseOnHand: "Current qty",
    colCompareOnHand: "Comparison qty",
    colDeltaOnHand: "Qty delta",
    colBaseAvailable: "Current available",
    colCompareAvailable: "Comparison available",
    colDeltaAvailable: "Available delta",
    colBaseValue: "Current value",
    colCompareValue: "Comparison value",
    colDeltaValue: "Value delta",
    colBaseReserved: "Current reserved",
    colCompareReserved: "Comparison reserved",
    colDeltaReserved: "Reserved delta",
    colDeltaQtyPercent: "Qty change %",
    colDeltaValuePercent: "Value change %",
    colBaseUnitValue: "Current unit value",
    colCompareUnitValue: "Comparison unit value",
    colDeltaUnitValue: "Unit value delta",
    colCurrentRows: "Current rows",
    colComparisonRows: "Comparison rows",
    colCompareStatus: "Change type"
  }
};

const DISPLAY_COLUMNS = [
  { key: "product", labelKey: "colProduct", rtl: true },
  { key: "category", labelKey: "colCategory", rtl: true },
  { key: "location", labelKey: "colLocation", rtl: true },
  { key: "lot", labelKey: "colLot", rtl: true },
  { key: "removalDateText", labelKey: "colRemovalDate", rtl: true },
  { key: "onHand", labelKey: "colOnHand", type: "number" },
  { key: "available", labelKey: "colAvailable", type: "number" },
  { key: "reserved", labelKey: "colReserved", type: "number" },
  { key: "uom", labelKey: "colUom", rtl: true },
  { key: "value", labelKey: "colValue", type: "currency" },
  { key: "valuePerUnit", labelKey: "colValuePerUnit", type: "currency" },
  { key: "status", labelKey: "colStatus", type: "status" }
];

const DEFAULT_COLUMN_WIDTHS = {
  product: 300,
  category: 210,
  location: 280,
  lot: 210,
  removalDateText: 150,
  onHand: 140,
  available: 140,
  reserved: 145,
  uom: 125,
  value: 150,
  valuePerUnit: 150,
  status: 140
};


const OPTIONAL_KPI_DEFINITIONS = [
  { key: "rows", labelKey: "kpiRowsOptional" },
  { key: "available", labelKey: "kpiAvailable" },
  { key: "reserved", labelKey: "kpiReserved" },
  { key: "categories", labelKey: "kpiCategories" },
  { key: "uoms", labelKey: "kpiUoms" },
  { key: "batches", labelKey: "kpiBatches" },
  { key: "dated", labelKey: "kpiDated" },
  { key: "avgUnitValue", labelKey: "kpiAvgUnitValue" },
  { key: "reservedValue", labelKey: "kpiReservedValue" }
];
const OPTIONAL_KPI_KEYS = new Set(OPTIONAL_KPI_DEFINITIONS.map(item => item.key));

const DEFAULT_CHART_IDS = new Set(["valueCategoryChart", "categoryCountChart"]);
const OPTIONAL_CHART_DEFINITIONS = [
  { id: "locationQtyChart", labelKey: "chartQtyByLocation" },
  { id: "topProductsChart", labelKey: "chartTopProducts" },
  { id: "stockStatusChart", labelKey: "chartStockStatus" },
  { id: "valueLocationChart", labelKey: "chartValueByLocation" },
  { id: "availableReservedCategoryChart", labelKey: "chartAvailableReservedByCategory" },
  { id: "skuCategoryChart", labelKey: "chartProductsByCategory" },
  { id: "uomChart", labelKey: "chartUomDistribution" },
  { id: "reservedLocationChart", labelKey: "chartReservedByLocation" },
  { id: "lowStockProductsChart", labelKey: "chartLowStockProducts" },
  { id: "unitValueChart", labelKey: "chartUnitValueProducts" }
];
const OPTIONAL_CHART_IDS = new Set(OPTIONAL_CHART_DEFINITIONS.map(item => item.id));


const COMPARISON_KPI_DEFINITIONS = [
  { id: "rows", view: "all", labelKey: "comparisonMetricRows", value: summary => numberFormatter.format(summary.totalRows || 0), cls: "blue", defaultVisible: true, primary: true },
  { id: "changed", view: "changed", labelKey: "comparisonMetricChanged", value: summary => numberFormatter.format(summary.changedRows || 0), cls: "amber", defaultVisible: true },
  { id: "new", view: "new", labelKey: "comparisonMetricNew", value: summary => numberFormatter.format(summary.newRows || 0), cls: "green", defaultVisible: true },
  { id: "removed", view: "removed", labelKey: "comparisonMetricRemoved", value: summary => numberFormatter.format(summary.removedRows || 0), cls: "rose", defaultVisible: true },
  { id: "qtyDelta", view: "qtyChanged", labelKey: "comparisonMetricQtyDelta", value: summary => formatSignedNumber(summary.deltaOnHand), cls: summary => deltaClass(summary.deltaOnHand), defaultVisible: true },
  { id: "valueDelta", view: "valueChanged", labelKey: "comparisonMetricValueDelta", value: summary => formatSignedMoney(summary.deltaValue), cls: summary => deltaClass(summary.deltaValue), defaultVisible: true },
  { id: "increased", view: "increased", labelKey: "comparisonMetricIncreased", value: summary => numberFormatter.format(summary.increasedRows || 0), cls: "positive" },
  { id: "decreased", view: "decreased", labelKey: "comparisonMetricDecreased", value: summary => numberFormatter.format(summary.decreasedRows || 0), cls: "negative" },
  { id: "unchanged", view: "unchanged", labelKey: "comparisonMetricUnchanged", value: summary => numberFormatter.format(summary.unchangedRows || 0), cls: "neutral" },
  { id: "matched", view: "matched", labelKey: "comparisonMetricMatched", value: summary => numberFormatter.format(summary.matchedRows || 0), cls: "slate" },
  { id: "qtyChanged", view: "qtyChanged", labelKey: "comparisonMetricQtyChanged", value: summary => numberFormatter.format(summary.changedQuantityRows || 0), cls: "purple" },
  { id: "availableChanged", view: "availableChanged", labelKey: "comparisonMetricAvailableChanged", value: summary => numberFormatter.format(summary.changedAvailableRows || 0), cls: "teal" },
  { id: "reservedChanged", view: "reservedChanged", labelKey: "comparisonMetricReservedChanged", value: summary => numberFormatter.format(summary.changedReservedRows || 0), cls: "indigo" },
  { id: "valueChanged", view: "valueChanged", labelKey: "comparisonMetricValueChanged", value: summary => numberFormatter.format(summary.changedValueRows || 0), cls: "purple" },
  { id: "qtyOnly", view: "qtyOnly", labelKey: "comparisonMetricQtyOnly", value: summary => numberFormatter.format(summary.qtyOnlyRows || 0), cls: "blue" },
  { id: "valueOnly", view: "valueOnly", labelKey: "comparisonMetricValueOnly", value: summary => numberFormatter.format(summary.valueOnlyRows || 0), cls: "amber" },
  { id: "qtyAndValue", view: "qtyAndValue", labelKey: "comparisonMetricQtyAndValue", value: summary => numberFormatter.format(summary.qtyAndValueRows || 0), cls: "green" },
  { id: "positiveValue", view: "positiveValue", labelKey: "comparisonMetricValueGain", value: summary => numberFormatter.format(summary.positiveValueRows || 0), cls: "positive" },
  { id: "negativeValue", view: "negativeValue", labelKey: "comparisonMetricValueLoss", value: summary => numberFormatter.format(summary.negativeValueRows || 0), cls: "negative" },
  { id: "positiveQty", view: "positiveQty", labelKey: "comparisonMetricQtyGainRows", value: summary => numberFormatter.format(summary.positiveQtyRows || 0), cls: "positive" },
  { id: "negativeQty", view: "negativeQty", labelKey: "comparisonMetricQtyLossRows", value: summary => numberFormatter.format(summary.negativeQtyRows || 0), cls: "negative" },
  { id: "unitValueChanged", view: "unitValueChanged", labelKey: "comparisonMetricUnitValueChanged", value: summary => numberFormatter.format(summary.unitValueChangedRows || 0), cls: "purple" },
  { id: "affectedProducts", view: "affectedProducts", labelKey: "comparisonMetricAffectedProducts", value: summary => numberFormatter.format(summary.affectedProducts || 0), cls: "cyan" },
  { id: "affectedLocations", view: "affectedLocations", labelKey: "comparisonMetricAffectedLocations", value: summary => numberFormatter.format(summary.affectedLocations || 0), cls: "slate" },
  { id: "baseQty", view: "all", labelKey: "comparisonMetricBaseQty", value: summary => numberFormatter.format(summary.baseOnHand || 0), cls: "blue" },
  { id: "compareQty", view: "all", labelKey: "comparisonMetricCompareQty", value: summary => numberFormatter.format(summary.compareOnHand || 0), cls: "blue" },
  { id: "qtyMovement", view: "qtyChanged", labelKey: "comparisonMetricQtyMovement", value: summary => numberFormatter.format(summary.absoluteQtyMovement || 0), cls: "teal" },
  { id: "qtyPercent", view: "qtyChanged", labelKey: "comparisonMetricQtyPercent", value: summary => formatSignedPercent(summary.deltaOnHandPct), cls: summary => deltaClass(summary.deltaOnHandPct) },
  { id: "baseValue", view: "all", labelKey: "comparisonMetricBaseValue", value: summary => formatCompactMoney(summary.baseValue), cls: "purple" },
  { id: "compareValue", view: "all", labelKey: "comparisonMetricCompareValue", value: summary => formatCompactMoney(summary.compareValue), cls: "purple" },
  { id: "valueMovement", view: "valueChanged", labelKey: "comparisonMetricValueMovement", value: summary => formatCompactMoney(summary.absoluteValueMovement), cls: "amber" },
  { id: "valuePercent", view: "valueChanged", labelKey: "comparisonMetricValuePercent", value: summary => formatSignedPercent(summary.deltaValuePct), cls: summary => deltaClass(summary.deltaValuePct) },
  { id: "availableDelta", view: "availableChanged", labelKey: "comparisonMetricAvailableDelta", value: summary => formatSignedNumber(summary.deltaAvailable), cls: summary => deltaClass(summary.deltaAvailable) },
  { id: "reservedDelta", view: "reservedChanged", labelKey: "comparisonMetricReservedDelta", value: summary => formatSignedNumber(summary.deltaReserved), cls: summary => deltaClass(summary.deltaReserved) },
  { id: "availablePercent", view: "availableChanged", labelKey: "comparisonMetricAvailablePercent", value: summary => formatSignedPercent(summary.deltaAvailablePct), cls: summary => deltaClass(summary.deltaAvailablePct) },
  { id: "reservedPercent", view: "reservedChanged", labelKey: "comparisonMetricReservedPercent", value: summary => formatSignedPercent(summary.deltaReservedPct), cls: summary => deltaClass(summary.deltaReservedPct) },
  { id: "newQty", view: "new", labelKey: "comparisonMetricNewQty", value: summary => numberFormatter.format(summary.newQty || 0), cls: "green" },
  { id: "removedQty", view: "removed", labelKey: "comparisonMetricRemovedQty", value: summary => numberFormatter.format(summary.removedQty || 0), cls: "rose" },
  { id: "newValue", view: "new", labelKey: "comparisonMetricNewValue", value: summary => formatCompactMoney(summary.newValue), cls: "green" },
  { id: "removedValue", view: "removed", labelKey: "comparisonMetricRemovedValue", value: summary => formatCompactMoney(summary.removedValue), cls: "rose" },
  { id: "baseImportedRows", view: "all", labelKey: "comparisonMetricBaseImportedRows", value: summary => numberFormatter.format(summary.baseImportedRows || 0), cls: "slate" },
  { id: "compareImportedRows", view: "all", labelKey: "comparisonMetricCompareImportedRows", value: summary => numberFormatter.format(summary.compareImportedRows || 0), cls: "slate" }
];
const COMPARISON_KPI_IDS = new Set(COMPARISON_KPI_DEFINITIONS.map(item => item.id));
const DEFAULT_COMPARISON_KPI_IDS = new Set(COMPARISON_KPI_DEFINITIONS.filter(item => item.defaultVisible).map(item => item.id));

const COMPARISON_CHART_DEFINITIONS = [
  { id: "comparisonStatusChart", labelKey: "comparisonChartStatus", type: "doughnut" },
  { id: "comparisonQtyStatusChart", labelKey: "comparisonChartQtyByStatus", type: "bar" },
  { id: "comparisonValueStatusChart", labelKey: "comparisonChartValueByStatus", type: "bar" },
  { id: "comparisonTopQtyGainsChart", labelKey: "comparisonChartTopQtyGains", type: "horizontal" },
  { id: "comparisonTopQtyLossesChart", labelKey: "comparisonChartTopQtyLosses", type: "horizontal" },
  { id: "comparisonTopValueGainsChart", labelKey: "comparisonChartTopValueGains", type: "horizontal" },
  { id: "comparisonTopValueLossesChart", labelKey: "comparisonChartTopValueLosses", type: "horizontal" },
  { id: "comparisonQtyCategoryChart", labelKey: "comparisonChartQtyByCategory", type: "grouped" },
  { id: "comparisonValueCategoryChart", labelKey: "comparisonChartValueByCategory", type: "grouped" },
  { id: "comparisonChangedLocationChart", labelKey: "comparisonChartChangedByLocation", type: "horizontal" },
  { id: "comparisonQtyLocationChart", labelKey: "comparisonChartQtyMovementByLocation", type: "bar" },
  { id: "comparisonValueLocationChart", labelKey: "comparisonChartValueMovementByLocation", type: "bar" },
  { id: "comparisonChangedCategoryLineChart", labelKey: "comparisonChartChangedByCategoryLine", type: "line" },
  { id: "comparisonQtyCategoryLineChart", labelKey: "comparisonChartQtyMovementByCategoryLine", type: "line" },
  { id: "comparisonValueCategoryLineChart", labelKey: "comparisonChartValueMovementByCategoryLine", type: "line" }
];
const COMPARISON_CHART_IDS = new Set(COMPARISON_CHART_DEFINITIONS.map(item => item.id));
const KPI_VIEW_LABEL_KEYS = {
  products: "quickProducts",
  out: "quickOutStock",
  onHand: "quickTotalStock",
  low: "quickLowStock",
  negative: "quickNegativeStock",
  value: "quickValue",
  locations: "quickLocations",
  rows: "quickRows",
  available: "quickAvailable",
  reserved: "quickReserved",
  categories: "quickCategories",
  uoms: "quickUoms",
  batches: "quickBatches",
  dated: "quickDated",
  avgUnitValue: "quickAvgUnitValue",
  reservedValue: "quickReservedValue"
};

const SAMPLE_ROWS = [
  REQUIRED_COLUMNS,
  ["East Crescent Co. (3)", "", "", "", "", 40, 40, "", 400000],
  ["    [BR1] جبس بطاطا الاوربي 120غم *12 (2)", "", "", "", "", 18, 18, "", 180000],
  ["[BR1] جبس بطاطا الاوربي 120غم *12", "جبس بركة الرائد", "WHB/مخزن بغداد الرئيسي", "", "", 11, 11, "(12*ك)", 110000],
  ["[BR1] جبس بطاطا الاوربي 120غم *12", "جبس بركة الرائد", "WHHTM/مخزن حاتم عادل - توب ريتيل - بغداد", "", "", 7, 7, "(12*ك)", 70000],
  ["    [CH1] شبس بطعم البصل 40غم × 20 (1)", "", "", "", "", 22, 22, "", 220000],
  ["[CH1] شبس بطعم البصل 40غم × 20", "توب شيبس", "WHB/مخزن بغداد الرئيسي", "", "", 22, 22, "(20*ك)", 220000]
];

const PREFS_KEY = "inventoryManagerPreferences";
const initialPreferences = loadPreferences();

const state = {
  rows: [],
  filteredRows: [],
  sortKey: "value",
  sortDirection: "desc",
  page: 1,
  pageSize: 25,
  visibleColumns: new Set(initialPreferences.visibleColumns || DISPLAY_COLUMNS.map(column => column.key)),
  columnWidths: { ...(initialPreferences.columnWidths || {}) },
  lowStockThreshold: 5,
  qualityIssues: [],
  language: initialPreferences.language,
  theme: initialPreferences.theme,
  lastUpdatedAt: null,
  lastUpdatedFileName: "",
  importMeta: { sourceFormat: "No data loaded", headerRow: 0, skippedSummaryRows: 0, importedRows: 0, originalDataRows: 0 },
  showMoreCharts: false,
  expandedChartId: null,
  quickView: null,
  productTotals: false,
  searchTags: [],
  visibleOptionalKpis: new Set(initialPreferences.optionalKpis || []),
  selectedCharts: new Set(initialPreferences.selectedCharts || []),
  visibleComparisonKpis: new Set(initialPreferences.visibleComparisonKpis || Array.from(DEFAULT_COMPARISON_KPI_IDS)),
  selectedComparisonCharts: new Set(initialPreferences.selectedComparisonCharts || []),
  comparison: { rows: [], resultRows: [], summary: null, fileName: "", comparedAt: null, activeView: "all" }
};

const palette = ["#2563eb", "#14b8a6", "#f59e0b", "#8b5cf6", "#ef4444", "#22c55e", "#06b6d4", "#f97316", "#64748b", "#ec4899", "#84cc16", "#0ea5e9"];
const statusColors = { Ready: "#22c55e", Low: "#f59e0b", Negative: "#e11d48", Out: "#ef4444", Reserved: "#2563eb" };
let messageTimeoutId = null;
let activeLocationPopoverButton = null;
const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));
let numberFormatter = new Intl.NumberFormat(getLocale(), { maximumFractionDigits: 2 });
let currencyFormatter = new Intl.NumberFormat(getLocale(), { maximumFractionDigits: 2 });

window.addEventListener("DOMContentLoaded", () => {
  applyStoredSettings();
  renderRequiredColumns();
  renderColumnToggles();
  renderOptionalKpiToggles();
  renderChartSelector();
  renderComparisonKpiSelector();
  renderComparisonChartSelector();
  bindEvents();
  setupChartExpandButtons();
  applyChartVisibility();
  updateProductTotalsToggle();
  renderTable();
  updateLastUpdated();
  window.addEventListener("resize", debounce(updateCharts, 160));
});

function bindEvents() {
  $("#importBtn").addEventListener("click", () => $("#fileInput").click());
  $("#settingsBtn")?.addEventListener("click", toggleSettingsPanel);
  $("#themeLightBtn")?.addEventListener("click", () => setTheme("light"));
  $("#themeDarkBtn")?.addEventListener("click", () => setTheme("dark"));
  $("#langArBtn")?.addEventListener("click", () => setLanguage("ar"));
  $("#langEnBtn")?.addEventListener("click", () => setLanguage("en"));
  document.addEventListener("click", closeSettingsWhenClickingOutside);
  document.addEventListener("click", closeLocationPopoverWhenClickingOutside);
  window.addEventListener("resize", debounce(handleViewportChange, 80));
  window.addEventListener("scroll", debounce(handleViewportChange, 80), true);
  $("#fileInput").addEventListener("change", event => handleFileImport(event.target.files[0]));
  const compareImportControl = $("#compareImportBtn");
  compareImportControl?.addEventListener("click", event => {
    if (!state.rows.length) {
      event.preventDefault();
      return showMessage(t("comparisonNeedsMain"));
    }
  });
  compareImportControl?.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    if (!state.rows.length) return showMessage(t("comparisonNeedsMain"));
    $("#compareFileInput")?.click();
  });
  $("#compareFileInput")?.addEventListener("change", event => handleComparisonImport(event.target.files[0]));
  $("#templateXlsxBtn").addEventListener("click", () => downloadXlsx("inventory_import_template.xlsx", SAMPLE_ROWS));
  $("#templateCsvBtn").addEventListener("click", () => downloadCsv("inventory_import_template.csv", SAMPLE_ROWS));
  $("#searchInput").addEventListener("input", () => {
    state.page = 1;
    applyFilters();
    updateSearchSuggestions();
  });
  $("#searchInput").addEventListener("focus", updateSearchSuggestions);
  $("#searchInput").addEventListener("keydown", handleSearchInputKeydown);
  $("#searchTags")?.addEventListener("click", handleSearchTagClick);
  $("#searchSuggestions")?.addEventListener("click", handleSearchSuggestionClick);
  document.addEventListener("click", closeSearchSuggestionsWhenClickingOutside);
  $("#categoryFilter").addEventListener("change", () => { state.page = 1; applyFilters(); });
  $("#locationFilter").addEventListener("change", () => { state.page = 1; applyFilters(); });
  $("#uomFilter").addEventListener("change", () => { state.page = 1; applyFilters(); });
  $("#productTotalsToggle")?.addEventListener("click", () => {
    state.productTotals = !state.productTotals;
    state.page = 1;
    updateProductTotalsToggle();
    applyFilters();
  });
  $("#statusFilter").addEventListener("change", () => { state.page = 1; applyFilters(); });
  $("#removalDateFilter")?.addEventListener("change", () => { state.page = 1; applyFilters(); });
  $("#dateFrom")?.addEventListener("change", () => { state.page = 1; applyFilters(); });
  $("#dateTo")?.addEventListener("change", () => { state.page = 1; applyFilters(); });
  $("#lowStockThreshold").addEventListener("input", () => { state.lowStockThreshold = Math.max(0, parseNumber($("#lowStockThreshold").value)); updateStatuses(); applyFilters(); });
  bindKpiQuickViews();
  $("#clearQuickViewBtn")?.addEventListener("click", clearStockQuickView);
  $("#resetFiltersBtn").addEventListener("click", resetFilters);
  $("#clearBtn").addEventListener("click", clearData);
  $("#exportCsvBtn").addEventListener("click", () => exportFiltered("csv"));
  $("#exportXlsxBtn").addEventListener("click", () => exportFiltered("xlsx"));
  $("#exportComparisonCsvBtn")?.addEventListener("click", () => exportComparison("csv"));
  $("#exportComparisonXlsxBtn")?.addEventListener("click", () => exportComparison("xlsx"));
  $("#clearComparisonBtn")?.addEventListener("click", clearComparisonData);
  $("#clearComparisonViewBtn")?.addEventListener("click", () => applyComparisonView("all"));
  $("#pageSizeSelect").addEventListener("change", event => { state.pageSize = Number(event.target.value); state.page = 1; renderTable(); });
  $("#prevPageBtn").addEventListener("click", () => { state.page = Math.max(1, state.page - 1); renderTable(); });
  $("#nextPageBtn").addEventListener("click", () => { const pages = getPageCount(); state.page = Math.min(pages, state.page + 1); renderTable(); });
  $("#toggleChartsBtn")?.addEventListener("click", toggleMoreCharts);
  $("#chartModalClose")?.addEventListener("click", closeExpandedChart);
  $("#chartModal")?.addEventListener("click", event => { if (event.target.id === "chartModal") closeExpandedChart(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && !$("#chartModal")?.hidden) closeExpandedChart(); });
}

function loadPreferences() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PREFS_KEY) || "{}");
    const validColumnKeys = new Set(DISPLAY_COLUMNS.map(column => column.key));
    const visibleColumns = Array.isArray(parsed.visibleColumns)
      ? parsed.visibleColumns.filter(key => validColumnKeys.has(key))
      : DISPLAY_COLUMNS.map(column => column.key);
    const columnWidths = {};
    if (parsed.columnWidths && typeof parsed.columnWidths === "object") {
      Object.entries(parsed.columnWidths).forEach(([key, value]) => {
        const numericValue = Number(value);
        if (validColumnKeys.has(key) && Number.isFinite(numericValue) && numericValue >= 70 && numericValue <= 900) {
          columnWidths[key] = Math.round(numericValue);
        }
      });
    }
    return {
      language: parsed.language === "en" ? "en" : "ar",
      theme: parsed.theme === "dark" ? "dark" : "light",
      optionalKpis: Array.isArray(parsed.optionalKpis) ? parsed.optionalKpis.filter(key => OPTIONAL_KPI_KEYS.has(key)) : [],
      selectedCharts: Array.isArray(parsed.selectedCharts) ? parsed.selectedCharts.filter(id => OPTIONAL_CHART_IDS.has(id)) : [],
      visibleComparisonKpis: Array.isArray(parsed.visibleComparisonKpis) ? parsed.visibleComparisonKpis.filter(id => COMPARISON_KPI_IDS.has(id)) : Array.from(DEFAULT_COMPARISON_KPI_IDS),
      selectedComparisonCharts: Array.isArray(parsed.selectedComparisonCharts) ? parsed.selectedComparisonCharts.filter(id => COMPARISON_CHART_IDS.has(id)) : [],
      visibleColumns: visibleColumns.length ? visibleColumns : DISPLAY_COLUMNS.map(column => column.key),
      columnWidths
    };
  } catch {
    return {
      language: "ar",
      theme: "light",
      optionalKpis: [],
      selectedCharts: [],
      visibleComparisonKpis: Array.from(DEFAULT_COMPARISON_KPI_IDS),
      selectedComparisonCharts: [],
      visibleColumns: DISPLAY_COLUMNS.map(column => column.key),
      columnWidths: {}
    };
  }
}

function savePreferences() {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify({
      language: state.language,
      theme: state.theme,
      optionalKpis: Array.from(state.visibleOptionalKpis),
      selectedCharts: Array.from(state.selectedCharts),
      visibleComparisonKpis: Array.from(state.visibleComparisonKpis),
      selectedComparisonCharts: Array.from(state.selectedComparisonCharts),
      visibleColumns: Array.from(state.visibleColumns),
      columnWidths: state.columnWidths
    }));
  } catch {
    /* Local storage can be unavailable in hardened browser modes. */
  }
}

function getLocale() {
  return state?.language === "en" ? "en-US" : "ar-IQ";
}

function refreshFormatters() {
  numberFormatter = new Intl.NumberFormat(getLocale(), { maximumFractionDigits: 2 });
  currencyFormatter = new Intl.NumberFormat(getLocale(), { maximumFractionDigits: 2 });
}

function formatCompactMoney(value) {
  const number = Number(value) || 0;
  const abs = Math.abs(number);
  const units = [
    { limit: 1_000_000_000_000, suffix: "T" },
    { limit: 1_000_000_000, suffix: "B" },
    { limit: 1_000_000, suffix: "M" },
    { limit: 1_000, suffix: "K" }
  ];
  const unit = units.find(item => abs >= item.limit);
  if (!unit) return currencyFormatter.format(Math.round(number * 100) / 100);
  const scaled = number / unit.limit;
  const scaledAbs = Math.abs(scaled);
  const fractionDigits = scaledAbs >= 100 ? 0 : 1;
  const rounded = new Intl.NumberFormat(getLocale(), {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits
  }).format(scaled);
  return rounded + unit.suffix;
}

function t(key, values = {}) {
  const dictionary = I18N[state?.language || "ar"] || I18N.ar;
  const fallback = I18N.en[key] || I18N.ar[key] || key;
  const template = dictionary[key] || fallback;
  return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

function isRtl() {
  return state.language === "ar";
}

function applyStoredSettings() {
  setTheme(state.theme, false);
  setLanguage(state.language, false);
}

function setTheme(theme, persist = true) {
  state.theme = theme === "dark" ? "dark" : "light";
  document.body.classList.toggle("dark", state.theme === "dark");
  updateSettingsUi();
  if (persist) savePreferences();
  requestAnimationFrame(() => updateCharts());
}

function setLanguage(language, persist = true) {
  state.language = language === "en" ? "en" : "ar";
  refreshFormatters();
  document.documentElement.lang = state.language;
  document.documentElement.dir = isRtl() ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(element => element.textContent = t(element.dataset.i18n));
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => element.placeholder = t(element.dataset.i18nPlaceholder));
  renderSearchTags();
  updateSearchSuggestions();
  updateSettingsUi();
  updateProductTotalsToggle();
  requestAnimationFrame(positionSettingsPanel);
  updateMoreChartsUi();
  updateChartExpandLabels();
  updateFilterOptions();
  renderColumnToggles();
  renderOptionalKpiToggles();
  renderChartSelector();
  renderComparisonKpiSelector();
  renderComparisonChartSelector();
  applyChartVisibility();
  applyComparisonChartVisibility();
  renderKpis();
  renderTable();
  renderQuickViewBar();
  renderComparisonPanel();
  updateLastUpdated();
  updateCharts();
  if (persist) savePreferences();
}

function updateSettingsUi() {
  $("#settingsBtn")?.setAttribute("aria-expanded", String(!$("#settingsPanel")?.hidden));
  $("#themeLightBtn")?.classList.toggle("active", state.theme === "light");
  $("#themeDarkBtn")?.classList.toggle("active", state.theme === "dark");
  $("#langArBtn")?.classList.toggle("active", state.language === "ar");
  $("#langEnBtn")?.classList.toggle("active", state.language === "en");
  $("#compareImportBtn")?.setAttribute("aria-disabled", String(!state.rows.length));
}

function updateMoreChartsUi() {
  const extraGrid = $("#extraChartsGrid");
  const toggleButton = $("#toggleChartsBtn");
  if (extraGrid) extraGrid.hidden = !state.showMoreCharts;
  if (toggleButton) {
    toggleButton.textContent = t(state.showMoreCharts ? "lessCharts" : "moreCharts");
    toggleButton.setAttribute("aria-expanded", String(state.showMoreCharts));
  }
}

function updateProductTotalsToggle() {
  const button = $("#productTotalsToggle");
  if (!button) return;
  button.classList.toggle("active", state.productTotals);
  button.setAttribute("aria-pressed", String(state.productTotals));
  button.textContent = t(state.productTotals ? "productTotalsActive" : "productTotals");
}

function renderOptionalKpiToggles() {
  const container = $("#optionalKpiToggles");
  if (!container) return;
  container.innerHTML = OPTIONAL_KPI_DEFINITIONS.map(item => {
    const checked = state.visibleOptionalKpis.has(item.key) ? "checked" : "";
    return `<label class="optional-kpi-toggle"><input type="checkbox" value="${escapeHtml(item.key)}" ${checked}><span>${escapeHtml(t(item.labelKey))}</span></label>`;
  }).join("");
  container.querySelectorAll("input[type=checkbox]").forEach(input => {
    input.addEventListener("change", event => {
      const key = event.currentTarget.value;
      if (event.currentTarget.checked) state.visibleOptionalKpis.add(key);
      else state.visibleOptionalKpis.delete(key);
      updateOptionalKpiCards();
      savePreferences();
    });
  });
  updateOptionalKpiCards();
}

function updateOptionalKpiCards() {
  $$(".optional-kpi[data-kpi-card]").forEach(card => {
    card.hidden = !state.visibleOptionalKpis.has(card.dataset.kpiCard);
  });
}

function renderChartSelector() {
  const container = $("#chartSelectorOptions");
  if (!container) return;
  const defaultItems = [
    { id: "valueCategoryChart", labelKey: "chartValueByCategory" },
    { id: "categoryCountChart", labelKey: "chartQtyByCategory" }
  ];
  const defaultHtml = defaultItems.map(item => `
    <label class="chart-option locked">
      <input type="checkbox" checked disabled>
      <span>${escapeHtml(t(item.labelKey))}</span>
      <small>${escapeHtml(t("defaultChart"))}</small>
    </label>
  `).join("");
  const optionalHtml = OPTIONAL_CHART_DEFINITIONS.map(item => {
    const checked = state.selectedCharts.has(item.id) ? "checked" : "";
    return `
      <label class="chart-option">
        <input type="checkbox" value="${escapeHtml(item.id)}" ${checked}>
        <span>${escapeHtml(t(item.labelKey))}</span>
        <small>${escapeHtml(t("optionalChart"))}</small>
      </label>
    `;
  }).join("");
  container.innerHTML = `<p>${escapeHtml(t("chartSelectorHint"))}</p>${defaultHtml}${optionalHtml}`;
  container.querySelectorAll("input[type=checkbox]:not(:disabled)").forEach(input => {
    input.addEventListener("change", event => {
      const id = event.currentTarget.value;
      if (event.currentTarget.checked) state.selectedCharts.add(id);
      else state.selectedCharts.delete(id);
      applyChartVisibility();
      savePreferences();
      requestAnimationFrame(() => updateCharts());
    });
  });
}

function applyChartVisibility() {
  $$(".chart-card[data-chart-id]").forEach(card => {
    const id = card.dataset.chartId;
    const visible = DEFAULT_CHART_IDS.has(id) || state.selectedCharts.has(id);
    card.hidden = !visible;
  });
}


function renderComparisonKpiSelector() {
  const container = $("#comparisonKpiSelectorOptions");
  if (!container) return;
  container.innerHTML = `<p>${escapeHtml(t("comparisonMetricSelectorHint"))}</p>` + COMPARISON_KPI_DEFINITIONS.map(item => {
    const checked = state.visibleComparisonKpis.has(item.id) ? "checked" : "";
    const tag = item.defaultVisible ? t("defaultChart") : t("optionalChart");
    return `
      <label class="chart-option">
        <input type="checkbox" value="${escapeHtml(item.id)}" ${checked}>
        <span>${escapeHtml(t(item.labelKey))}</span>
        <small>${escapeHtml(tag)}</small>
      </label>
    `;
  }).join("");
  container.querySelectorAll("input[type=checkbox]").forEach(input => {
    input.addEventListener("change", event => {
      const id = event.currentTarget.value;
      if (event.currentTarget.checked) state.visibleComparisonKpis.add(id);
      else state.visibleComparisonKpis.delete(id);
      savePreferences();
      renderComparisonPanel();
    });
  });
}

function renderComparisonChartSelector() {
  const container = $("#comparisonChartSelectorOptions");
  if (!container) return;
  container.innerHTML = `<p>${escapeHtml(t("comparisonChartSelectorHint"))}</p>` + COMPARISON_CHART_DEFINITIONS.map(item => {
    const checked = state.selectedComparisonCharts.has(item.id) ? "checked" : "";
    return `
      <label class="chart-option">
        <input type="checkbox" value="${escapeHtml(item.id)}" ${checked}>
        <span>${escapeHtml(t(item.labelKey))}</span>
        <small>${escapeHtml(item.type)}</small>
      </label>
    `;
  }).join("");
  container.querySelectorAll("input[type=checkbox]").forEach(input => {
    input.addEventListener("change", event => {
      const id = event.currentTarget.value;
      if (event.currentTarget.checked) state.selectedComparisonCharts.add(id);
      else state.selectedComparisonCharts.delete(id);
      savePreferences();
      ensureComparisonChartCards();
      applyComparisonChartVisibility();
      requestAnimationFrame(renderComparisonCharts);
    });
  });
  ensureComparisonChartCards();
  applyComparisonChartVisibility();
}

function ensureComparisonChartCards() {
  const grid = $("#comparisonChartsGrid");
  if (!grid) return;
  COMPARISON_CHART_DEFINITIONS.forEach(item => {
    if (grid.querySelector(`[data-chart-id="${item.id}"]`)) return;
    const article = document.createElement("article");
    article.className = "chart-card comparison-chart-card";
    article.dataset.chartId = item.id;
    article.hidden = true;
    article.innerHTML = `<canvas id="${escapeHtml(item.id)}"></canvas>`;
    grid.appendChild(article);
  });
  setupChartExpandButtons();
}

function applyComparisonChartVisibility() {
  const grid = $("#comparisonChartsGrid");
  if (!grid) return;
  let anyVisible = false;
  $$(".comparison-chart-card[data-chart-id]").forEach(card => {
    const visible = state.selectedComparisonCharts.has(card.dataset.chartId) && Boolean(state.comparison.resultRows.length);
    card.hidden = !visible;
    anyVisible = anyVisible || visible;
  });
  const empty = $("#comparisonChartsEmpty");
  if (empty) empty.hidden = anyVisible || !state.comparison.resultRows.length;
}
function toggleMoreCharts() {
  state.showMoreCharts = !state.showMoreCharts;
  updateMoreChartsUi();
  requestAnimationFrame(() => updateCharts());
}

function setupChartExpandButtons() {
  $$(".chart-card").forEach(card => {
    const canvas = card.querySelector("canvas");
    if (!canvas || card.querySelector(".chart-expand-btn")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chart-expand-btn";
    button.innerHTML = `<span aria-hidden="true">⛶</span><span class="expand-label">${escapeHtml(t("expandChart"))}</span>`;
    button.addEventListener("click", event => {
      event.stopPropagation();
      openExpandedChart(canvas.id);
    });
    card.appendChild(button);
  });
  updateChartExpandLabels();
}

function updateChartExpandLabels() {
  $$(".chart-expand-btn").forEach(button => {
    button.title = t("expandChart");
    button.setAttribute("aria-label", t("expandChart"));
    button.innerHTML = `<span aria-hidden="true">⛶</span><span class="expand-label">${escapeHtml(t("expandChart"))}</span>`;
  });
  const closeButton = $("#chartModalClose");
  if (closeButton) closeButton.textContent = t("closeExpanded");
}

function openExpandedChart(chartId) {
  const modal = $("#chartModal");
  const canvas = $("#expandedChartCanvas");
  if (!modal || !canvas) return;
  state.expandedChartId = chartId;
  $("#chartModalTitle").textContent = chartTitleForId(chartId);
  modal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => renderChartById(chartId, canvas, true));
}

function closeExpandedChart() {
  const modal = $("#chartModal");
  if (!modal) return;
  modal.hidden = true;
  state.expandedChartId = null;
  document.body.classList.remove("modal-open");
  hideTooltip();
}

function chartTitleForId(chartId) {
  const map = {
    valueCategoryChart: "chartValueByCategory",
    categoryCountChart: "chartQtyByCategory",
    locationQtyChart: "chartQtyByLocation",
    topProductsChart: "chartTopProducts",
    stockStatusChart: "chartStockStatus",
    removalTimelineChart: "chartRemovalTimeline",
    valueLocationChart: "chartValueByLocation",
    availableReservedCategoryChart: "chartAvailableReservedByCategory",
    skuCategoryChart: "chartProductsByCategory",
    uomChart: "chartUomDistribution",
    reservedLocationChart: "chartReservedByLocation",
    lowStockProductsChart: "chartLowStockProducts",
    batchCategoryChart: "chartBatchCountByCategory",
    unitValueChart: "chartUnitValueProducts",
    comparisonStatusChart: "comparisonChartStatus",
    comparisonQtyStatusChart: "comparisonChartQtyByStatus",
    comparisonValueStatusChart: "comparisonChartValueByStatus",
    comparisonTopQtyGainsChart: "comparisonChartTopQtyGains",
    comparisonTopQtyLossesChart: "comparisonChartTopQtyLosses",
    comparisonTopValueGainsChart: "comparisonChartTopValueGains",
    comparisonTopValueLossesChart: "comparisonChartTopValueLosses",
    comparisonQtyCategoryChart: "comparisonChartQtyByCategory",
    comparisonValueCategoryChart: "comparisonChartValueByCategory",
    comparisonChangedLocationChart: "comparisonChartChangedByLocation",
    comparisonQtyLocationChart: "comparisonChartQtyMovementByLocation",
    comparisonValueLocationChart: "comparisonChartValueMovementByLocation",
    comparisonChangedCategoryLineChart: "comparisonChartChangedByCategoryLine",
    comparisonQtyCategoryLineChart: "comparisonChartQtyMovementByCategoryLine",
    comparisonValueCategoryLineChart: "comparisonChartValueMovementByCategoryLine"
  };
  return t(map[chartId] || "appTitle");
}

function toggleSettingsPanel(event) {
  event.stopPropagation();
  const panel = $("#settingsPanel");
  if (!panel) return;
  panel.hidden = !panel.hidden;
  updateSettingsUi();
  if (!panel.hidden) requestAnimationFrame(positionSettingsPanel);
}

function positionSettingsPanel() {
  const panel = $("#settingsPanel");
  const button = $("#settingsBtn");
  if (!panel || !button || panel.hidden) return;
  panel.style.left = "auto";
  panel.style.right = "auto";
  const panelWidth = Math.min(360, Math.max(280, window.innerWidth - 24));
  panel.style.width = panelWidth + "px";
  const rect = button.getBoundingClientRect();
  let left = rect.right - panelWidth;
  left = Math.max(12, Math.min(left, window.innerWidth - panelWidth - 12));
  panel.style.left = left + "px";
  panel.style.top = Math.min(rect.bottom + 8, window.innerHeight - 20) + "px";
}

function closeSettingsWhenClickingOutside(event) {
  const panel = $("#settingsPanel");
  const wrap = event.target.closest?.(".settings-wrap");
  if (panel && !wrap) {
    panel.hidden = true;
    updateSettingsUi();
  }
}

function updateLastUpdated(fileName = null) {
  const element = $("#lastUpdated");
  if (!element) return;
  if (fileName) {
    state.lastUpdatedAt = new Date();
    state.lastUpdatedFileName = fileName;
  }
  if (!state.lastUpdatedAt) {
    element.textContent = t("lastUpdatedNever");
    return;
  }
  const time = state.lastUpdatedAt.toLocaleTimeString(getLocale(), { hour: "2-digit", minute: "2-digit" });
  const date = state.lastUpdatedAt.toLocaleDateString(getLocale());
  element.textContent = t("lastUpdated", { time, date, file: state.lastUpdatedFileName });
}

function toggleTheme() {
  setTheme(state.theme === "dark" ? "light" : "dark");
}

function renderRequiredColumns() {
  const container = $("#requiredColumns");
  if (!container) return;
  container.innerHTML = REQUIRED_COLUMNS.map(column => `<span class="chip">${escapeHtml(column)}</span>`).join("");
}

function renderColumnToggles() {
  const container = $("#columnToggles");
  if (!container) return;
  container.innerHTML = `
    <div class="column-menu-actions">
      <button id="showAllColumnsBtn" type="button">${escapeHtml(t("showAllColumns"))}</button>
      <button id="hideAllColumnsBtn" type="button">${escapeHtml(t("hideAllColumns"))}</button>
      <button id="resetColumnWidthsBtn" type="button">${escapeHtml(t("resetColumnWidths"))}</button>
    </div>
    <p class="column-menu-hint">${escapeHtml(t("resizeColumnHint"))}</p>
    ${DISPLAY_COLUMNS.map(column => `
      <label><input type="checkbox" value="${column.key}" ${state.visibleColumns.has(column.key) ? "checked" : ""}> ${escapeHtml(columnLabel(column))}</label>
    `).join("")}
  `;
  $("#showAllColumnsBtn")?.addEventListener("click", event => {
    event.preventDefault();
    state.visibleColumns = new Set(DISPLAY_COLUMNS.map(column => column.key));
    savePreferences();
    renderColumnToggles();
    renderTable();
  });
  $("#hideAllColumnsBtn")?.addEventListener("click", event => {
    event.preventDefault();
    state.visibleColumns = new Set(["product"]);
    savePreferences();
    renderColumnToggles();
    renderTable();
  });
  $("#resetColumnWidthsBtn")?.addEventListener("click", event => {
    event.preventDefault();
    state.columnWidths = {};
    savePreferences();
    renderTable();
  });
  $$("#columnToggles input").forEach(input => {
    input.addEventListener("change", event => {
      if (event.target.checked) state.visibleColumns.add(event.target.value);
      else state.visibleColumns.delete(event.target.value);
      if (!state.visibleColumns.size) {
        state.visibleColumns.add("product");
        event.target.checked = true;
      }
      savePreferences();
      renderTable();
    });
  });
}

async function handleFileImport(file) {
  if (!file) return;
  showMessage(t("importWorking"), "info");
  try {
    const extension = file.name.split(".").pop().toLowerCase();
    const matrix = extension === "csv" ? await readCsvFile(file) : await readXlsxFile(file);
    const result = matrixToRows(matrix);

    state.rows = result.rows;
    state.qualityIssues = result.qualityIssues;
    state.importMeta = result.importMeta;
    state.filteredRows = result.rows.slice();
    state.page = 1;
    state.sortKey = "value";
    state.sortDirection = "desc";
    state.productTotals = false;

    $("#dashboard").hidden = false;
    $("#emptyState").hidden = true;

    updateProductTotalsToggle();
    updateFilterOptions();
    resetFilterControls();
    updateMoreChartsUi();
    const settingsPanel = $("#settingsPanel");
    if (settingsPanel) settingsPanel.hidden = true;
    updateSettingsUi();
    updateLastUpdated(file.name);

    const renderedCleanly = safeApplyFilters();
    if (state.comparison.rows.length) runInventoryComparison(state.comparison.rows, state.comparison.fileName);
    else renderComparisonPanel();
    const skippedText = state.importMeta.skippedSummaryRows ? t("skippedSummary", { count: numberFormatter.format(state.importMeta.skippedSummaryRows) }) : "";
    const warningText = renderedCleanly ? "" : ` ${t("renderWarning")}`;
    showMessage(t("importSuccess", { count: numberFormatter.format(state.rows.length), file: escapeHtml(file.name) }) + skippedText + warningText, renderedCleanly ? "success" : "error", renderedCleanly ? 4200 : 0);
  } catch (error) {
    console.error("Inventory import failed", error);
    showMessage(error.message || (state.language === "ar" ? "فشل الاستيراد. تأكد من صيغة الملف والأعمدة المطلوبة." : "Import failed. Check the file format and required columns."));
  } finally {
    $("#fileInput").value = "";
  }
}

async function readCsvFile(file) {
  const text = await file.text();
  return parseCsv(text);
}

async function readXlsxFile(file) {
  const buffer = await file.arrayBuffer();
  const files = await unzip(buffer);
  const workbookXml = textFromFile(files, "xl/workbook.xml");
  const relsXml = textFromFile(files, "xl/_rels/workbook.xml.rels");
  const workbookDoc = parseXml(workbookXml);
  const relsDoc = parseXml(relsXml);
  const relationships = {};
  Array.from(relsDoc.getElementsByTagName("Relationship")).forEach(rel => {
    relationships[rel.getAttribute("Id")] = resolveWorkbookTarget(rel.getAttribute("Target"));
  });

  const sharedStrings = files["xl/sharedStrings.xml"] ? parseSharedStrings(textFromFile(files, "xl/sharedStrings.xml")) : [];
  const sheets = Array.from(workbookDoc.getElementsByTagName("sheet"));
  if (!sheets.length) throw new Error("The workbook does not contain a worksheet.");

  const candidates = [];
  for (let index = 0; index < sheets.length; index += 1) {
    const sheet = sheets[index];
    const rid = sheet.getAttribute("r:id") || sheet.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id");
    const sheetPath = relationships[rid] || `xl/worksheets/sheet${index + 1}.xml`;
    if (!files[sheetPath]) continue;
    try {
      const matrix = parseWorksheet(textFromFile(files, sheetPath), sharedStrings);
      candidates.push({ matrix, score: worksheetHeaderScore(matrix), sheetPath });
    } catch (error) {
      console.warn("Skipping unreadable worksheet", sheetPath, error);
    }
  }

  if (!candidates.length) throw new Error("No readable worksheet was found in the workbook.");
  candidates.sort((a, b) => b.score - a.score);
  return candidates[0].matrix;
}

function worksheetHeaderScore(matrix) {
  const required = REQUIRED_COLUMNS.filter(column => !OPTIONAL_IMPORT_COLUMNS.has(column));
  let bestScore = 0;
  matrix
    .filter(row => row.some(cell => String(cell ?? "").trim() !== ""))
    .slice(0, 40)
    .forEach(row => {
      const headers = row.map(canonicalHeader);
      const score = required.filter(column => headers.includes(column)).length;
      if (score > bestScore) bestScore = score;
    });
  return bestScore;
}

function matrixToRows(matrix) {
  const rowsWithNumbers = matrix
    .map((row, index) => ({ row, rowNumber: index + 1 }))
    .filter(item => item.row.some(cell => String(cell ?? "").trim() !== ""));
  if (!rowsWithNumbers.length) throw new Error("The imported file is empty.");
  const headerIndex = findHeaderRowIndex(rowsWithNumbers);
  if (headerIndex < 0) throw new Error(`The required header row was not found. Supported formats: Arabic stock.quant export, Arabic stock.quant export with company column, or English stock.quant export with company column.`);
  const headerRow = rowsWithNumbers[headerIndex];
  const headers = headerRow.row.map(canonicalHeader);
  const mandatoryColumns = REQUIRED_COLUMNS.filter(column => !OPTIONAL_IMPORT_COLUMNS.has(column));
  const missingColumns = mandatoryColumns.filter(required => !headers.includes(required));
  if (missingColumns.length) throw new Error(`Missing required column(s): ${missingColumns.join("، ")}`);
  const indexByHeader = new Map();
  headers.forEach((header, index) => {
    if (!indexByHeader.has(header)) indexByHeader.set(header, index);
  });
  const sourceRows = rowsWithNumbers.slice(headerIndex + 1).map(item => ({ raw: requiredRawFromRow(item.row, indexByHeader), rowNumber: item.rowNumber }));
  const groupedFormat = detectGroupedOdooFormat(sourceRows);
  const importMeta = {
    sourceFormat: groupedFormat ? "Odoo grouped stock.quant export" : "Flat inventory table",
    headerRow: headerRow.rowNumber,
    skippedSummaryRows: 0,
    importedRows: 0,
    originalDataRows: sourceRows.length,
    companySummary: ""
  };
  const qualityIssues = [];
  const rows = [];
  sourceRows.forEach(item => {
    const raw = item.raw;
    if (isBlankInventoryRaw(raw)) return;
    if (groupedFormat && isGroupedSummaryRaw(raw)) {
      importMeta.skippedSummaryRows += 1;
      if (!importMeta.companySummary && !String(raw[FIELDS.product] || "").startsWith(" ")) importMeta.companySummary = cleanText(raw[FIELDS.product]);
      return;
    }
    const normalized = normalizeInventoryRow(raw, item.rowNumber);
    if (!normalized.product || normalized.product === "Unspecified") qualityIssues.push(`Row ${item.rowNumber}: product is empty.`);
    if (normalized.onHand < 0 || normalized.available < 0 || normalized.value < 0) qualityIssues.push(`Row ${item.rowNumber}: contains a negative numeric value.`);
    if (normalized.available > normalized.onHand && normalized.onHand > 0) qualityIssues.push(`Row ${item.rowNumber}: available quantity is greater than on-hand quantity.`);
    if (groupedFormat && (!normalized.category || normalized.category === "Unspecified" || !normalized.location || normalized.location === "Unspecified" || !normalized.uom || normalized.uom === "Unspecified")) qualityIssues.push(`Row ${item.rowNumber}: looks like a detail row but has missing category, location, or unit.`);
    rows.push(normalized);
  });
  importMeta.importedRows = rows.length;
  if (!rows.length) throw new Error("The required headers exist, but no inventory detail rows were found. If this is an Odoo grouped export, make sure it contains detail rows under the product summary rows.");
  return { rows, qualityIssues: qualityIssues.slice(0, 12), importMeta };
}

function findHeaderRowIndex(rowsWithNumbers) {
  const required = REQUIRED_COLUMNS.filter(column => !OPTIONAL_IMPORT_COLUMNS.has(column));
  let best = { index: -1, score: 0 };
  rowsWithNumbers.slice(0, 30).forEach((item, index) => {
    const headers = item.row.map(canonicalHeader);
    const score = required.filter(column => headers.includes(column)).length;
    if (score > best.score) best = { index, score };
  });
  return best.score >= required.length ? best.index : -1;
}

function requiredRawFromRow(row, indexByHeader) {
  const raw = {};
  REQUIRED_COLUMNS.forEach(column => {
    const index = indexByHeader.get(column);
    raw[column] = index === undefined ? "" : row[index] ?? "";
  });
  return raw;
}

function isBlankInventoryRaw(raw) {
  return REQUIRED_COLUMNS.every(column => String(raw[column] ?? "").trim() === "");
}

function detectGroupedOdooFormat(sourceRows) {
  const nonBlank = sourceRows.filter(item => !isBlankInventoryRaw(item.raw));
  if (!nonBlank.length) return false;
  const summaryCount = nonBlank.filter(item => isGroupedSummaryRaw(item.raw)).length;
  const detailCount = nonBlank.filter(item => hasDetailInventoryMarkers(item.raw)).length;
  return summaryCount > 0 && detailCount > 0;
}

function isGroupedSummaryRaw(raw) {
  const product = String(raw[FIELDS.product] ?? "");
  const productClean = cleanText(product);
  if (!productClean) return false;
  const hasDescriptor = [FIELDS.category, FIELDS.location, FIELDS.lot, FIELDS.removalDate, FIELDS.uom].some(field => cleanText(raw[field] ?? ""));
  if (hasDescriptor) return false;
  const hasNumbers = [FIELDS.onHand, FIELDS.available, FIELDS.value].some(field => parseNumber(raw[field]) !== 0 || String(raw[field] ?? "").trim() === "0");
  if (!hasNumbers) return false;
  return hasNumbers;
}

function hasDetailInventoryMarkers(raw) {
  return Boolean(cleanText(raw[FIELDS.category]) && cleanText(raw[FIELDS.location]) && cleanText(raw[FIELDS.uom]));
}

function normalizeInventoryRow(raw, sourceRow) {
  const removalDate = parseDate(raw[FIELDS.removalDate]);
  const onHand = parseNumber(raw[FIELDS.onHand]);
  const available = parseNumber(raw[FIELDS.available]);
  const value = parseNumber(raw[FIELDS.value]);
  const reserved = Math.max(0, onHand - available);
  const valueBaseQty = onHand > 0 ? onHand : available;
  const row = {
    sourceRow,
    product: cleanText(raw[FIELDS.product]) || "Unspecified",
    category: cleanText(raw[FIELDS.category]) || "Unspecified",
    location: cleanText(raw[FIELDS.location]) || "Unspecified",
    lot: cleanText(raw[FIELDS.lot]) || "",
    removalDate,
    removalDateText: removalDate ? formatDateInput(removalDate) : "",
    onHand,
    available,
    reserved,
    uom: cleanText(raw[FIELDS.uom]) || "Unspecified",
    value,
    valuePerUnit: valueBaseQty ? value / valueBaseQty : 0,
    status: "Ready",
    searchText: ""
  };
  row.status = getStatus(row);
  row.searchText = buildSearchText(row);
  return row;
}

function updateStatuses() {
  state.rows.forEach(row => {
    row.status = getStatus(row);
    row.searchText = buildSearchText(row);
  });
}

function getStatus(row) {
  if (row.onHand < 0 || row.available < 0) return "Negative";
  if (row.onHand <= 0 || row.available <= 0) return "Out";
  if (row.reserved > 0) return "Reserved";
  if (row.available <= state.lowStockThreshold) return "Low";
  return "Ready";
}

function updateFilterOptions() {
  if (!$("#categoryFilter")) return;
  fillSelect("#categoryFilter", t("allCategories"), uniqueValues(state.rows, "category"));
  fillSelect("#locationFilter", t("allLocations"), uniqueValues(state.rows, "location"));
  fillSelect("#uomFilter", t("allUoms"), uniqueValues(state.rows, "uom"));
  const status = $("#statusFilter");
  const current = status.value;
  status.innerHTML = `<option value="">${escapeHtml(t("allStatuses"))}</option><option value="Ready">${escapeHtml(statusLabel("Ready"))}</option><option value="Low">${escapeHtml(statusLabel("Low"))}</option><option value="Negative">${escapeHtml(statusLabel("Negative"))}</option><option value="Reserved">${escapeHtml(statusLabel("Reserved"))}</option><option value="Out">${escapeHtml(statusLabel("Out"))}</option>`;
  if ([...status.options].some(option => option.value === current)) status.value = current;

  const removal = $("#removalDateFilter");
  if (removal) {
    const removalCurrent = removal.value;
    removal.innerHTML = `<option value="">${escapeHtml(t("allRemovalDates"))}</option><option value="has">${escapeHtml(t("removalDateHas"))}</option><option value="missing">${escapeHtml(t("removalDateMissing"))}</option>`;
    if ([...removal.options].some(option => option.value === removalCurrent)) removal.value = removalCurrent;
  }
}

function fillSelect(selector, placeholder, values) {
  const select = $(selector);
  select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>` + values.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
}


function handleSearchInputKeydown(event) {
  const input = event.currentTarget;
  if (event.key === "Enter") {
    event.preventDefault();
    const raw = input.value.trim();
    if (!raw) return;
    addSearchTag(raw);
    input.value = "";
    hideSearchSuggestions();
    return;
  }

  if (event.key === "Escape") {
    hideSearchSuggestions();
    return;
  }

  if (event.key === "Backspace" && !input.value && state.searchTags.length) {
    state.searchTags.pop();
    renderSearchTags();
    state.page = 1;
    applyFilters();
    updateSearchSuggestions();
  }
}

function splitSearchTagInput(value) {
  return String(value || "")
    .split(/[,;،\n]+/)
    .map(part => part.trim())
    .filter(Boolean);
}

function addSearchTag(value) {
  const terms = splitSearchTagInput(value);
  if (!terms.length) return;
  const existing = new Set(state.searchTags.map(tag => tag.toLowerCase()));
  terms.forEach(term => {
    const normalized = term.toLowerCase();
    if (!existing.has(normalized)) {
      state.searchTags.push(term);
      existing.add(normalized);
    }
  });
  renderSearchTags();
  state.page = 1;
  applyFilters();
}

function removeSearchTag(index) {
  state.searchTags.splice(index, 1);
  renderSearchTags();
  state.page = 1;
  applyFilters();
  updateSearchSuggestions();
}

function handleSearchTagClick(event) {
  const button = event.target.closest("[data-remove-search-tag]");
  if (!button) return;
  removeSearchTag(Number(button.dataset.removeSearchTag));
}

function renderSearchTags() {
  const container = $("#searchTags");
  if (!container) return;
  container.innerHTML = state.searchTags.map((tag, index) => `
    <button class="search-tag" type="button" data-remove-search-tag="${index}" title="${escapeHtml(t("searchTagRemove"))}">
      <span>${escapeHtml(tag)}</span>
      <strong aria-hidden="true">×</strong>
    </button>
  `).join("");
}

function handleSearchSuggestionClick(event) {
  const button = event.target.closest("[data-search-suggestion]");
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  const value = button.dataset.searchSuggestion || "";
  if (!value) return;
  addSearchTag(value);
  const input = $("#searchInput");
  if (input) input.value = "";
  hideSearchSuggestions();
}

function updateSearchSuggestions() {
  const container = $("#searchSuggestions");
  const input = $("#searchInput");
  if (!container || !input) return;
  const query = input.value.trim().toLowerCase();
  if (!query || !state.rows.length) {
    hideSearchSuggestions();
    return;
  }

  const suggestions = buildSearchSuggestions(query, 12);
  if (!suggestions.length) {
    hideSearchSuggestions();
    return;
  }

  container.innerHTML = suggestions.map(item => `
    <button class="search-suggestion-item" type="button"
      data-search-suggestion="${escapeHtml(item.value)}"
      title="${escapeHtml(t("searchSuggestionHint"))}">
      <span class="search-suggestion-value">${escapeHtml(item.value)}</span>
      <span class="search-suggestion-type">${escapeHtml(t(item.typeKey))}</span>
    </button>
  `).join("");
  container.hidden = false;
}

function buildSearchSuggestions(query, limit = 12) {
  const existing = new Set(state.searchTags.map(tag => tag.toLowerCase()));
  const added = new Set();
  const suggestions = [];

  const addSuggestion = (value, typeKey) => {
    const text = String(value ?? "").trim();
    if (!text) return;
    const normalized = text.toLowerCase();
    if (existing.has(normalized) || added.has(normalized)) return;
    if (!normalized.includes(query)) return;
    added.add(normalized);
    suggestions.push({
      value: text,
      typeKey,
      score: (normalized.startsWith(query) ? 0 : 1) + Math.min(text.length / 1000, 0.9)
    });
  };

  state.rows.forEach(row => {
    addSuggestion(row.product, "suggestionProduct");
    addSuggestion(row.category, "suggestionCategory");
    addSuggestion(row.location, "suggestionLocation");
    addSuggestion(row.lot, "suggestionLot");
    addSuggestion(row.uom, "suggestionUom");
    addSuggestion(statusLabel(row.status), "suggestionStatus");
    addSuggestion(row.removalDateText, "suggestionRemovalDate");
  });

  return suggestions
    .sort((a, b) => a.score - b.score || a.value.localeCompare(b.value, undefined, { numeric: true, sensitivity: "base" }))
    .slice(0, limit);
}

function hideSearchSuggestions() {
  const container = $("#searchSuggestions");
  if (!container) return;
  container.hidden = true;
  container.innerHTML = "";
}

function closeSearchSuggestionsWhenClickingOutside(event) {
  if (event.target.closest(".search-wrap")) return;
  hideSearchSuggestions();
}

function buildSearchText(row) {
  return [
    row.product,
    row.category,
    row.location,
    row.lot,
    row.uom,
    row.status,
    statusLabel(row.status),
    row.removalDateText,
    row.removalDate ? t("removalDateHas") : ""
  ].join(" ").toLowerCase();
}

function applyFilters() {
  const pendingSearch = $("#searchInput").value.trim().toLowerCase();
  const searchTerms = [...state.searchTags.map(value => value.toLowerCase()), ...(pendingSearch ? [pendingSearch] : [])];
  const category = $("#categoryFilter").value;
  const location = $("#locationFilter").value;
  const uom = $("#uomFilter").value;
  const status = $("#statusFilter").value;
  const removalDateFilter = $("#removalDateFilter")?.value || "";
  const dateFrom = parseDate($("#dateFrom")?.value || "");
  const dateTo = parseDate($("#dateTo")?.value || "");

  let workingRows = state.rows.filter(row => {
    if (searchTerms.length && !searchTerms.every(term => row.searchText.includes(term))) return false;
    if (category && row.category !== category) return false;
    if (location && row.location !== location) return false;
    if (uom && row.uom !== uom) return false;
    if (removalDateFilter === "has" && !row.removalDate) return false;
    if (removalDateFilter === "missing" && row.removalDate) return false;
    if (dateFrom && (!row.removalDate || row.removalDate < dateFrom)) return false;
    if (dateTo && (!row.removalDate || row.removalDate > dateTo)) return false;
    return true;
  });

  if (state.productTotals) workingRows = aggregateRowsByProduct(workingRows);

  state.filteredRows = workingRows.filter(row => {
    if (status && row.status !== status) return false;
    if (state.quickView && !rowMatchesKpiView(row, state.quickView)) return false;
    return true;
  });

  sortRows();
  renderKpis();
  renderInsights();
  updateCharts();
  renderTable();
  renderQuickViewBar();
}

function resetFilterControls() {
  state.quickView = null;
  $("#searchInput").value = "";
  state.searchTags = [];
  renderSearchTags();
  hideSearchSuggestions();
  $("#categoryFilter").value = "";
  $("#locationFilter").value = "";
  $("#uomFilter").value = "";
  $("#statusFilter").value = "";
  if ($("#removalDateFilter")) $("#removalDateFilter").value = "";
  state.productTotals = false;
  updateProductTotalsToggle();
  if ($("#dateFrom")) $("#dateFrom").value = "";
  if ($("#dateTo")) $("#dateTo").value = "";
}

function resetFilters(shouldApply = true) {
  resetFilterControls();
  if (shouldApply) state.page = 1;
  if (shouldApply || state.rows.length) applyFilters();
}

function safeApplyFilters() {
  try {
    applyFilters();
    return true;
  } catch (error) {
    console.error("Dashboard rendering failed after import", error);
    try {
      state.filteredRows = state.productTotals ? aggregateRowsByProduct(state.rows) : state.rows.slice();
      sortRows();
    } catch (fallbackError) {
      console.error("Fallback sorting failed", fallbackError);
      state.filteredRows = state.rows.slice();
    }
    try { renderKpis(); } catch (fallbackError) { console.error("Fallback KPI rendering failed", fallbackError); }
    try { renderTable(); } catch (fallbackError) { console.error("Fallback table rendering failed", fallbackError); renderSimpleTableFallback(); }
    try { renderQuickViewBar(); } catch (fallbackError) { console.error("Fallback quick-view rendering failed", fallbackError); }
    try { updateCharts(); } catch (fallbackError) { console.error("Fallback chart rendering failed", fallbackError); }
    return false;
  }
}

function clearData() {
  if (!state.rows.length) return;
  if (!confirm(t("clearConfirm"))) return;
  state.rows = [];
  state.filteredRows = [];
  state.qualityIssues = [];
  state.importMeta = { sourceFormat: "No data loaded", headerRow: 0, skippedSummaryRows: 0, importedRows: 0, originalDataRows: 0 };
  state.page = 1;
  state.lastUpdatedAt = null;
  state.lastUpdatedFileName = "";
  state.showMoreCharts = false;
  state.quickView = null;
  state.searchTags = [];
  renderSearchTags();
  hideSearchSuggestions();
  state.productTotals = false;
  resetComparisonData();
  updateProductTotalsToggle();
  updateMoreChartsUi();
  renderQuickViewBar();
  $("#dashboard").hidden = true;
  $("#emptyState").hidden = false;
  updateLastUpdated();
  clearMessage();
}

function bindKpiQuickViews() {
  $$('[data-kpi-view]').forEach(element => {
    const kind = element.dataset.kpiView;
    element.addEventListener("click", () => applyKpiQuickView(kind));
    element.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        applyKpiQuickView(kind);
      }
    });
  });
}

function applyKpiQuickView(kind) {
  if (!state.rows.length || !kind) return;
  state.quickView = kind;
  $("#searchInput").value = "";
  state.searchTags = [];
  renderSearchTags();
  hideSearchSuggestions();
  $("#categoryFilter").value = "";
  $("#locationFilter").value = "";
  $("#uomFilter").value = "";
  if ($("#removalDateFilter")) $("#removalDateFilter").value = kind === "dated" ? "has" : "";
  if ($("#dateFrom")) $("#dateFrom").value = "";
  if ($("#dateTo")) $("#dateTo").value = "";
  $("#statusFilter").value = { low: "Low", negative: "Negative", out: "Out" }[kind] || "";
  state.page = 1;
  applyFilters();
  document.querySelector(".table-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearStockQuickView() {
  if (!state.quickView) return;
  const previousQuickView = state.quickView;
  const statusForView = { low: "Low", negative: "Negative", out: "Out" }[previousQuickView];
  state.quickView = null;
  if (statusForView && $("#statusFilter").value === statusForView) $("#statusFilter").value = "";
  if (previousQuickView === "dated" && $("#removalDateFilter")?.value === "has") $("#removalDateFilter").value = "";
  state.page = 1;
  applyFilters();
}

function rowMatchesKpiView(row, kind) {
  switch (kind) {
    case "products": return Boolean(row.product);
    case "out": return row.status === "Out";
    case "negative": return row.status === "Negative";
    case "low": return row.status === "Low";
    case "onHand": return Number(row.onHand) !== 0;
    case "value": return Number(row.value) !== 0;
    case "locations": return Boolean(row.location);
    case "rows": return true;
    case "available": return Number(row.available) !== 0;
    case "reserved": return Number(row.reserved) > 0;
    case "categories": return Boolean(row.category);
    case "uoms": return Boolean(row.uom);
    case "batches": return Boolean(String(row.lot || "").trim());
    case "dated": return Boolean(row.removalDate);
    case "avgUnitValue": return Number(row.value) !== 0 && Math.max(Math.abs(Number(row.onHand) || 0), Math.abs(Number(row.available) || 0)) > 0;
    case "reservedValue": return Number(row.reserved) > 0 && Number(row.value) !== 0;
    default: return true;
  }
}

function renderQuickViewBar() {
  const bar = $("#quickViewBar");
  const label = $("#quickViewLabel");
  $$('[data-kpi-view]').forEach(card => card.classList.toggle("active-kpi", Boolean(state.quickView && card.dataset.kpiView === state.quickView)));
  if (!bar || !label) return;
  if (!state.quickView) {
    bar.hidden = true;
    return;
  }
  const key = KPI_VIEW_LABEL_KEYS[state.quickView] || "quickRows";
  label.textContent = `${t(key)} • ${t("tableInfo", { shown: numberFormatter.format(state.filteredRows.length), total: numberFormatter.format(state.productTotals ? aggregateRowsByProduct(state.rows).length : state.rows.length) })}`;
  bar.hidden = false;
}

function renderKpis() {
  const rows = state.filteredRows;
  const totalOnHand = sum(rows, "onHand");
  const totalAvailable = sum(rows, "available");
  const totalReserved = sum(rows, "reserved");
  const totalValue = sum(rows, "value");
  const outCount = rows.filter(row => row.status === "Out").length;
  const negativeCount = rows.filter(row => row.status === "Negative").length;
  const lowCount = rows.filter(row => row.status === "Low").length;
  const categoriesCount = new Set(rows.map(row => row.category).filter(Boolean)).size;
  const locationsCount = new Set(rows.map(row => row.location).filter(Boolean)).size;
  const uomCount = new Set(rows.map(row => row.uom).filter(Boolean)).size;
  const batchCount = state.productTotals ? rows.reduce((total, row) => total + (Number(row.lotCount) || (row.lot ? 1 : 0)), 0) : new Set(rows.map(row => row.lot).filter(Boolean)).size;
  const datedCount = rows.filter(row => row.removalDate).length;
  const valueBaseQty = rows.reduce((total, row) => total + Math.max(Math.abs(row.onHand), Math.abs(row.available), 0), 0);
  const avgUnitValue = valueBaseQty ? totalValue / valueBaseQty : 0;
  const reservedValue = sum(rows.filter(row => row.reserved > 0), "value");

  setText("#kpiRows", numberFormatter.format(rows.length));
  setText("#kpiRowsSub", t("rowsShown", { shown: numberFormatter.format(rows.length), total: numberFormatter.format(state.rows.length) }));
  setText("#kpiProducts", numberFormatter.format(new Set(rows.map(row => row.product)).size));
  setText("#kpiOnHand", numberFormatter.format(totalOnHand));
  setText("#kpiAvailable", numberFormatter.format(totalAvailable));
  setText("#kpiReserved", numberFormatter.format(totalReserved));
  setText("#kpiValue", currencyFormatter.format(totalValue));
  setText("#kpiOut", numberFormatter.format(outCount));
  setText("#kpiNegative", numberFormatter.format(negativeCount));
  setText("#kpiLow", numberFormatter.format(lowCount));
  setText("#kpiLocations", numberFormatter.format(locationsCount));
  setText("#kpiCategories", numberFormatter.format(categoriesCount));
  setText("#kpiUoms", numberFormatter.format(uomCount));
  setText("#kpiBatches", numberFormatter.format(batchCount));
  setText("#kpiDated", numberFormatter.format(datedCount));
  setText("#kpiAvgUnitValue", currencyFormatter.format(avgUnitValue));
  setText("#kpiReservedValue", currencyFormatter.format(reservedValue));
  updateOptionalKpiCards();
}

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = value;
}
function renderInsights() {
  if (!$("#dataSummary") || !$("#qualityList")) return;
  const rows = state.filteredRows;
  if (!rows.length) {
    $("#dataSummary").textContent = t("noRowsMatch");
    $("#qualityList").innerHTML = "";
    return;
  }
  const topCategory = topEntries(groupSum(rows, "category", "value"), 1)[0];
  const topLocation = topEntries(groupSum(rows, "location", "available"), 1)[0];
  const outCount = rows.filter(row => row.status === "Out").length;
  const reservedValue = sum(rows.filter(row => row.reserved > 0), "value");
  $("#dataSummary").textContent = `Top value category is ${topCategory?.label || "N/A"} with ${currencyFormatter.format(topCategory?.value || 0)}. Highest available quantity is in ${topLocation?.label || "N/A"}. ${numberFormatter.format(outCount)} row(s) are out or unavailable. Reserved / blocked rows represent ${currencyFormatter.format(reservedValue)} in value.`;
  const quality = importSummaryItems().concat(state.qualityIssues);
  if (!state.qualityIssues.length) quality.push("No obvious import-quality issues were detected in the required detail rows.");
  $("#qualityList").innerHTML = quality.map(item => `<li>${escapeHtml(item)}</li>`).join("");
}

function importSummaryItems() {
  const meta = state.importMeta || {};
  const items = [];
  if (meta.sourceFormat) items.push(`Detected format: ${meta.sourceFormat}. Header row: ${meta.headerRow || 1}.`);
  if (meta.companySummary) items.push(`Top grouped summary row: ${meta.companySummary}.`);
  if (meta.skippedSummaryRows) items.push(`Skipped ${numberFormatter.format(meta.skippedSummaryRows)} Odoo summary/group row(s) and imported ${numberFormatter.format(meta.importedRows || state.rows.length)} detail row(s).`);
  return items;
}

function updateCharts() {
  if (!state.rows.length || $("#dashboard").hidden) return;
  applyChartVisibility();
  const chartIds = Array.from(new Set([
    ...Array.from(DEFAULT_CHART_IDS),
    ...Array.from(state.selectedCharts).filter(id => OPTIONAL_CHART_IDS.has(id))
  ]));
  chartIds.forEach(id => {
    const card = document.querySelector(`[data-chart-id="${id}"]`);
    if (!card || card.hidden) return;
    renderChartById(id);
  });
  renderComparisonCharts();
  if (state.expandedChartId && !$("#chartModal")?.hidden) {
    renderChartById(state.expandedChartId, $("#expandedChartCanvas"), true);
  }
}
function chartLimit(canvas, normalLimit, expandedLimit) {
  const rect = canvas?.getBoundingClientRect?.() || { width: 0 };
  if (canvas?.id === "expandedChartCanvas") return expandedLimit;
  if (rect.width < 520) return Math.max(4, normalLimit - 2);
  return normalLimit;
}

function renderChartById(chartId, targetCanvas = null, expanded = false) {
  if (COMPARISON_CHART_IDS.has(chartId)) return renderComparisonChartById(chartId, targetCanvas, expanded);
  const canvas = targetCanvas || $("#" + chartId);
  if (!canvas) return;
  const rows = state.filteredRows;
  const id = chartId;
  const top = (group, normal, large) => topEntries(group, expanded ? large : chartLimit(canvas, normal, large));
  switch (id) {
    case "valueCategoryChart":
      return drawVerticalBarChart(canvas, top(groupSum(rows, "category", "value"), 8, 16), {
        title: t("chartValueByCategory"),
        valueFormatter: formatCompactMoney,
        emptyText: t("emptyValueCategory"),
        onClick: label => setFilter("#categoryFilter", label)
      });
    case "categoryCountChart":
      return drawDoughnutChart(canvas, top(groupSum(rows, "category", "onHand"), 6, 12), {
        title: t("chartQtyByCategory"),
        emptyText: t("emptyQtyCategory"),
        valueSuffix: t("unitSuffix"),
        onClick: label => setFilter("#categoryFilter", label)
      });
    case "locationQtyChart":
      return drawGroupedBarChart(canvas, top(groupDualSum(rows, "location", "onHand", "available"), 7, 16), {
        title: t("chartQtyByLocation"),
        firstLabel: t("existingQty"),
        secondLabel: t("availableQty"),
        emptyText: t("emptyLocations"),
        onClick: label => setFilter("#locationFilter", label)
      });
    case "topProductsChart":
      return drawHorizontalBarChart(canvas, top(groupSum(rows, "product", "value"), 8, 18), {
        title: t("chartTopProducts"),
        valueFormatter: formatCompactMoney,
        emptyText: t("emptyProducts"),
        onClick: label => addSearchTag(label)
      });
    case "stockStatusChart":
      return drawDoughnutChart(canvas, statusBreakdown(rows), {
        title: t("chartStockStatus"),
        emptyText: t("emptyStatus"),
        onClick: label => setFilter("#statusFilter", label)
      });
    case "removalTimelineChart":
      return drawLineChart(canvas, topEntries(removalTimeline(rows), expanded ? 24 : 12), {
        title: t("chartRemovalTimeline"),
        emptyText: t("emptyTimeline")
      });
    case "valueLocationChart":
      return drawVerticalBarChart(canvas, top(groupSum(rows, "location", "value"), 8, 18), {
        title: t("chartValueByLocation"),
        valueFormatter: formatCompactMoney,
        emptyText: t("emptyValueLocation"),
        onClick: label => setFilter("#locationFilter", label)
      });
    case "availableReservedCategoryChart":
      return drawGroupedBarChart(canvas, top(groupDualSum(rows, "category", "available", "reserved"), 8, 16), {
        title: t("chartAvailableReservedByCategory"),
        firstLabel: t("availableQty"),
        secondLabel: t("reservedQty"),
        emptyText: t("emptyAvailableReservedCategory"),
        onClick: label => setFilter("#categoryFilter", label)
      });
    case "skuCategoryChart":
      return drawVerticalBarChart(canvas, top(groupUniqueCount(rows, "category", "product"), 8, 18), {
        title: t("chartProductsByCategory"),
        valueFormatter: value => numberFormatter.format(value) + " " + t("productCount"),
        emptyText: t("emptyProductsCategory"),
        onClick: label => setFilter("#categoryFilter", label)
      });
    case "uomChart":
      return drawDoughnutChart(canvas, top(groupSum(rows, "uom", "onHand"), 6, 12), {
        title: t("chartUomDistribution"),
        emptyText: t("emptyUom"),
        valueSuffix: t("unitSuffix"),
        onClick: label => setFilter("#uomFilter", label)
      });
    case "reservedLocationChart":
      return drawHorizontalBarChart(canvas, top(groupPositiveSum(rows, "location", "reserved"), 8, 18), {
        title: t("chartReservedByLocation"),
        emptyText: t("emptyReservedLocation"),
        onClick: label => setFilter("#locationFilter", label)
      });
    case "lowStockProductsChart":
      return drawHorizontalBarChart(canvas, lowestAvailableProducts(rows, expanded ? 18 : 8), {
        title: t("chartLowStockProducts"),
        emptyText: t("emptyLowStockProducts"),
        valueFormatter: value => numberFormatter.format(value) + t("unitSuffix"),
        onClick: label => addSearchTag(label)
      });
    case "batchCategoryChart":
      return drawVerticalBarChart(canvas, top(groupLotCount(rows, "category"), 8, 18), {
        title: t("chartBatchCountByCategory"),
        valueFormatter: value => numberFormatter.format(value) + " " + t("batchCount"),
        emptyText: t("emptyBatchCategory"),
        onClick: label => setFilter("#categoryFilter", label)
      });
    case "unitValueChart":
      return drawHorizontalBarChart(canvas, topUnitValueProducts(rows, expanded ? 18 : 8), {
        title: t("chartUnitValueProducts"),
        valueFormatter: formatCompactMoney,
        emptyText: t("emptyUnitValueProducts"),
        onClick: label => addSearchTag(label)
      });
  }
}


async function handleComparisonImport(file) {
  if (!file) return;
  if (!state.rows.length) {
    showMessage(t("comparisonNeedsMain"));
    if ($("#compareFileInput")) $("#compareFileInput").value = "";
    return;
  }
  const extension = file.name.split(".").pop().toLowerCase();
  if (extension !== "xlsx") {
    showMessage(t("comparisonXlsxOnly"));
    if ($("#compareFileInput")) $("#compareFileInput").value = "";
    return;
  }
  showMessage(t("comparisonWorking"), "info");
  try {
    const matrix = await readXlsxFile(file);
    const result = matrixToRows(matrix);
    runInventoryComparison(result.rows, file.name);
    const settingsPanel = $("#settingsPanel");
    if (settingsPanel) settingsPanel.hidden = true;
    updateSettingsUi();
    showMessage(t("comparisonSuccess", { count: numberFormatter.format(state.comparison.resultRows.length), file: escapeHtml(file.name) }), "success", 4200);
    $("#comparisonPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    console.error("Comparison import failed", error);
    showMessage(error.message || t("comparisonXlsxOnly"));
  } finally {
    if ($("#compareFileInput")) $("#compareFileInput").value = "";
  }
}

function runInventoryComparison(comparisonRows, fileName) {
  const comparison = compareInventoryRows(state.rows, comparisonRows || []);
  state.comparison = {
    rows: comparisonRows || [],
    resultRows: comparison.rows,
    summary: comparison.summary,
    fileName: fileName || state.comparison.fileName || "comparison.xlsx",
    comparedAt: new Date(),
    activeView: "all"
  };
  renderComparisonPanel();
}

function compareInventoryRows(baseRows, comparisonRows) {
  const baseMap = aggregateForComparison(baseRows);
  const comparisonMap = aggregateForComparison(comparisonRows);
  const keys = Array.from(new Set([...baseMap.keys(), ...comparisonMap.keys()]));
  const rows = keys.map(key => {
    const base = baseMap.get(key) || emptyComparisonAggregate(key);
    const other = comparisonMap.get(key) || emptyComparisonAggregate(key);
    const product = other.product !== "Unspecified" ? other.product : base.product;
    const category = other.category !== "Unspecified" ? other.category : base.category;
    const location = other.location !== "Unspecified" ? other.location : base.location;
    const lot = other.lot || base.lot;
    const uom = other.uom !== "Unspecified" ? other.uom : base.uom;
    const deltaOnHand = other.onHand - base.onHand;
    const deltaAvailable = other.available - base.available;
    const deltaReserved = other.reserved - base.reserved;
    const deltaValue = other.value - base.value;
    const baseUnitValue = unitValueForComparison(base.value, base.onHand, base.available);
    const compareUnitValue = unitValueForComparison(other.value, other.onHand, other.available);
    const deltaUnitValue = compareUnitValue - baseUnitValue;
    const existsInBase = Boolean(base.exists);
    const existsInComparison = Boolean(other.exists);
    const changeType = getComparisonChangeType({ existsInBase, existsInComparison, deltaOnHand, deltaAvailable, deltaReserved, deltaValue });
    return {
      key,
      product,
      category,
      location,
      lot,
      uom,
      baseOnHand: base.onHand,
      compareOnHand: other.onHand,
      deltaOnHand,
      baseAvailable: base.available,
      compareAvailable: other.available,
      deltaAvailable,
      baseReserved: base.reserved,
      compareReserved: other.reserved,
      deltaReserved,
      deltaOnHandPct: percentDelta(deltaOnHand, base.onHand),
      deltaAvailablePct: percentDelta(deltaAvailable, base.available),
      deltaReservedPct: percentDelta(deltaReserved, base.reserved),
      baseValue: base.value,
      compareValue: other.value,
      deltaValue,
      deltaValuePct: percentDelta(deltaValue, base.value),
      baseUnitValue,
      compareUnitValue,
      deltaUnitValue,
      deltaUnitValuePct: percentDelta(deltaUnitValue, baseUnitValue),
      existsInBase,
      existsInComparison,
      changeType,
      sourceRows: base.sourceRows,
      comparisonRows: other.sourceRows
    };
  });
  rows.sort((a, b) => comparisonSortWeight(b) - comparisonSortWeight(a) || a.product.localeCompare(b.product, undefined, { numeric: true, sensitivity: "base" }));
  return { rows, summary: buildComparisonSummary(rows, baseRows, comparisonRows) };
}

function aggregateForComparison(rows) {
  const map = new Map();
  rows.forEach(row => {
    const key = comparisonKey(row);
    if (!map.has(key)) map.set(key, emptyComparisonAggregate(key, row));
    const item = map.get(key);
    item.exists = true;
    item.product = row.product || item.product;
    item.category = row.category || item.category;
    item.location = row.location || item.location;
    item.lot = row.lot || item.lot;
    item.uom = row.uom || item.uom;
    item.onHand += Number(row.onHand) || 0;
    item.available += Number(row.available) || 0;
    item.reserved += Number(row.reserved) || 0;
    item.value += Number(row.value) || 0;
    item.sourceRows += 1;
  });
  return map;
}

function comparisonKey(row) {
  return [row.product, row.location, row.lot, row.uom].map(comparisonKeyPart).join("\u001f");
}

function comparisonKeyPart(value) {
  return cleanText(value || "Unspecified").toLowerCase();
}

function emptyComparisonAggregate(key, row = {}) {
  return {
    key,
    exists: false,
    product: row.product || "Unspecified",
    category: row.category || "Unspecified",
    location: row.location || "Unspecified",
    lot: row.lot || "",
    uom: row.uom || "Unspecified",
    onHand: 0,
    available: 0,
    reserved: 0,
    value: 0,
    sourceRows: 0
  };
}

function unitValueForComparison(value, onHand, available) {
  const quantity = Math.max(Math.abs(Number(onHand) || 0), Math.abs(Number(available) || 0));
  return quantity ? (Number(value) || 0) / quantity : 0;
}

function percentDelta(delta, baseValue) {
  const base = Number(baseValue) || 0;
  const change = Number(delta) || 0;
  if (Math.abs(base) > 0.0001) return (change / Math.abs(base)) * 100;
  if (Math.abs(change) > 0.0001) return change > 0 ? 100 : -100;
  return 0;
}

function getComparisonChangeType(row) {
  if (!row.existsInBase && row.existsInComparison) return "new";
  if (row.existsInBase && !row.existsInComparison) return "removed";
  const changed = [row.deltaOnHand, row.deltaAvailable, row.deltaReserved, row.deltaValue].some(value => Math.abs(value) > 0.0001);
  if (!changed) return "unchanged";
  if (row.deltaOnHand > 0 || (row.deltaOnHand === 0 && row.deltaValue > 0)) return "increased";
  if (row.deltaOnHand < 0 || (row.deltaOnHand === 0 && row.deltaValue < 0)) return "decreased";
  return "changed";
}

function comparisonSortWeight(row) {
  const priority = { new: 8, removed: 7, increased: 6, decreased: 6, changed: 5, unchanged: 1 }[row.changeType] || 1;
  return priority * 1_000_000_000 + Math.abs(row.deltaValue) + Math.abs(row.deltaOnHand) * 10_000 + Math.abs(row.deltaAvailable) * 1_000;
}

function buildComparisonSummary(rows, baseRows, comparisonRows) {
  const changedRows = rows.filter(row => row.changeType !== "unchanged");
  const qtyChangedRows = rows.filter(row => Math.abs(row.deltaOnHand) > 0.0001);
  const availableChangedRows = rows.filter(row => Math.abs(row.deltaAvailable) > 0.0001);
  const reservedChangedRows = rows.filter(row => Math.abs(row.deltaReserved) > 0.0001);
  const valueChangedRows = rows.filter(row => Math.abs(row.deltaValue) > 0.0001);
  const qtyAndValueRows = rows.filter(row => Math.abs(row.deltaOnHand) > 0.0001 && Math.abs(row.deltaValue) > 0.0001);
  const qtyOnlyRows = rows.filter(row => Math.abs(row.deltaOnHand) > 0.0001 && Math.abs(row.deltaValue) <= 0.0001);
  const valueOnlyRows = rows.filter(row => Math.abs(row.deltaValue) > 0.0001 && Math.abs(row.deltaOnHand) <= 0.0001);
  const unitValueChangedRows = rows.filter(row => Math.abs(row.deltaUnitValue) > 0.0001);
  const newRows = rows.filter(row => row.changeType === "new");
  const removedRows = rows.filter(row => row.changeType === "removed");
  const baseOnHand = sum(baseRows, "onHand");
  const compareOnHand = sum(comparisonRows, "onHand");
  const baseAvailable = sum(baseRows, "available");
  const compareAvailable = sum(comparisonRows, "available");
  const baseReserved = sum(baseRows, "reserved");
  const compareReserved = sum(comparisonRows, "reserved");
  const baseValue = sum(baseRows, "value");
  const compareValue = sum(comparisonRows, "value");
  return {
    totalRows: rows.length,
    changedRows: changedRows.length,
    newRows: newRows.length,
    removedRows: removedRows.length,
    increasedRows: rows.filter(row => row.changeType === "increased").length,
    decreasedRows: rows.filter(row => row.changeType === "decreased").length,
    unchangedRows: rows.filter(row => row.changeType === "unchanged").length,
    matchedRows: rows.filter(row => row.existsInBase && row.existsInComparison).length,
    changedQuantityRows: qtyChangedRows.length,
    changedAvailableRows: availableChangedRows.length,
    changedReservedRows: reservedChangedRows.length,
    changedValueRows: valueChangedRows.length,
    qtyOnlyRows: qtyOnlyRows.length,
    valueOnlyRows: valueOnlyRows.length,
    qtyAndValueRows: qtyAndValueRows.length,
    positiveValueRows: rows.filter(row => row.deltaValue > 0.0001).length,
    negativeValueRows: rows.filter(row => row.deltaValue < -0.0001).length,
    positiveQtyRows: rows.filter(row => row.deltaOnHand > 0.0001).length,
    negativeQtyRows: rows.filter(row => row.deltaOnHand < -0.0001).length,
    unitValueChangedRows: unitValueChangedRows.length,
    newQty: newRows.reduce((total, row) => total + Math.abs(Number(row.compareOnHand) || 0), 0),
    removedQty: removedRows.reduce((total, row) => total + Math.abs(Number(row.baseOnHand) || 0), 0),
    newValue: newRows.reduce((total, row) => total + Math.abs(Number(row.compareValue) || 0), 0),
    removedValue: removedRows.reduce((total, row) => total + Math.abs(Number(row.baseValue) || 0), 0),
    baseImportedRows: baseRows.length,
    compareImportedRows: comparisonRows.length,
    affectedProducts: new Set(changedRows.map(row => row.product).filter(Boolean)).size,
    affectedLocations: new Set(changedRows.map(row => row.location).filter(Boolean)).size,
    baseOnHand,
    compareOnHand,
    deltaOnHand: compareOnHand - baseOnHand,
    deltaOnHandPct: percentDelta(compareOnHand - baseOnHand, baseOnHand),
    baseAvailable,
    compareAvailable,
    deltaAvailable: compareAvailable - baseAvailable,
    deltaAvailablePct: percentDelta(compareAvailable - baseAvailable, baseAvailable),
    baseReserved,
    compareReserved,
    deltaReserved: compareReserved - baseReserved,
    deltaReservedPct: percentDelta(compareReserved - baseReserved, baseReserved),
    baseValue,
    compareValue,
    deltaValue: compareValue - baseValue,
    deltaValuePct: percentDelta(compareValue - baseValue, baseValue),
    absoluteQtyMovement: rows.reduce((total, row) => total + Math.abs(Number(row.deltaOnHand) || 0), 0),
    absoluteValueMovement: rows.reduce((total, row) => total + Math.abs(Number(row.deltaValue) || 0), 0)
  };
}

function renderComparisonPanel() {
  const panel = $("#comparisonPanel");
  if (!panel) return;
  const rows = state.comparison.resultRows || [];
  panel.hidden = !rows.length;
  if (!rows.length) {
    if ($("#comparisonSummary")) $("#comparisonSummary").innerHTML = "";
    if ($("#comparisonTable")) $("#comparisonTable").innerHTML = "";
    if ($("#comparisonTableNote")) $("#comparisonTableNote").textContent = "";
    if ($("#comparisonViewBar")) $("#comparisonViewBar").hidden = true;
    applyComparisonChartVisibility();
    return;
  }
  const summary = state.comparison.summary || buildComparisonSummary(rows, state.rows, state.comparison.rows || []);
  const activeView = state.comparison.activeView || "all";
  const filteredRows = filterComparisonRows(rows, activeView);
  const info = $("#comparisonInfo");
  if (info) info.textContent = t("comparisonInfo", { file: state.comparison.fileName || "comparison.xlsx", count: numberFormatter.format(rows.length) });
  renderComparisonSummary(summary);
  renderComparisonViewBar(activeView, filteredRows.length, rows.length);
  renderComparisonTable(filteredRows, rows.length, activeView);
  renderComparisonKpiSelector();
  renderComparisonChartSelector();
  applyComparisonChartVisibility();
  requestAnimationFrame(renderComparisonCharts);
}

function renderComparisonSummary(summary) {
  const container = $("#comparisonSummary");
  if (!container) return;
  const activeView = state.comparison.activeView || "all";
  const visibleCards = COMPARISON_KPI_DEFINITIONS.filter(card => state.visibleComparisonKpis.has(card.id));
  container.innerHTML = visibleCards.map(card => {
    const cls = typeof card.cls === "function" ? card.cls(summary) : card.cls;
    const value = typeof card.value === "function" ? card.value(summary) : "";
    return `
      <article class="comparison-summary-card clickable-comparison-kpi ${escapeHtml(cls)} ${card.view === activeView && (activeView !== "all" || card.primary) ? "active-comparison-kpi" : ""}" role="button" tabindex="0" data-comparison-view="${escapeHtml(card.view)}" title="${escapeHtml(t("comparisonClickHint"))}">
        <span>${escapeHtml(t(card.labelKey))}</span>
        <strong>${escapeHtml(value)}</strong>
        <small>${escapeHtml(comparisonViewLabel(card.view))}</small>
      </article>
    `;
  }).join("");
  if (!visibleCards.length) {
    container.innerHTML = `<p class="comparison-note">${escapeHtml(t("comparisonMetricSelectorHint"))}</p>`;
  }
  bindComparisonKpiCards();
}



function renderComparisonCharts() {
  if (!state.comparison.resultRows.length) return;
  ensureComparisonChartCards();
  applyComparisonChartVisibility();
  state.selectedComparisonCharts.forEach(id => {
    const card = document.querySelector(`[data-chart-id="${id}"]`);
    if (!card || card.hidden) return;
    renderComparisonChartById(id);
  });
}

function renderComparisonChartById(chartId, targetCanvas = null, expanded = false) {
  const canvas = targetCanvas || $("#" + chartId);
  if (!canvas) return;
  const rows = filterComparisonRows(state.comparison.resultRows || [], state.comparison.activeView || "all");
  const top = (data, normal = 8, large = 18) => topEntriesFromList(data, expanded ? large : chartLimit(canvas, normal, large));
  switch (chartId) {
    case "comparisonStatusChart":
      return drawDoughnutChart(canvas, comparisonStatusCounts(rows), {
        title: t("comparisonChartStatus"),
        emptyText: t("comparisonChartNoData"),
        onClick: label => applyComparisonView(label)
      });
    case "comparisonQtyStatusChart":
      return drawVerticalBarChart(canvas, comparisonStatusMetric(rows, "deltaOnHand"), {
        title: t("comparisonChartQtyByStatus"),
        emptyText: t("comparisonChartNoData"),
        valueFormatter: value => numberFormatter.format(value),
        onClick: label => applyComparisonView(label)
      });
    case "comparisonValueStatusChart":
      return drawVerticalBarChart(canvas, comparisonStatusMetric(rows, "deltaValue"), {
        title: t("comparisonChartValueByStatus"),
        emptyText: t("comparisonChartNoData"),
        valueFormatter: formatCompactMoney,
        onClick: label => applyComparisonView(label)
      });
    case "comparisonTopQtyGainsChart":
      return drawHorizontalBarChart(canvas, topComparisonRows(rows, "deltaOnHand", "positive", 10, expanded ? 24 : 10), {
        title: t("comparisonChartTopQtyGains"),
        emptyText: t("comparisonChartNoData"),
        onClick: label => addSearchTag(label)
      });
    case "comparisonTopQtyLossesChart":
      return drawHorizontalBarChart(canvas, topComparisonRows(rows, "deltaOnHand", "negative", 10, expanded ? 24 : 10), {
        title: t("comparisonChartTopQtyLosses"),
        emptyText: t("comparisonChartNoData"),
        onClick: label => addSearchTag(label)
      });
    case "comparisonTopValueGainsChart":
      return drawHorizontalBarChart(canvas, topComparisonRows(rows, "deltaValue", "positive", 10, expanded ? 24 : 10), {
        title: t("comparisonChartTopValueGains"),
        emptyText: t("comparisonChartNoData"),
        valueFormatter: formatCompactMoney,
        onClick: label => addSearchTag(label)
      });
    case "comparisonTopValueLossesChart":
      return drawHorizontalBarChart(canvas, topComparisonRows(rows, "deltaValue", "negative", 10, expanded ? 24 : 10), {
        title: t("comparisonChartTopValueLosses"),
        emptyText: t("comparisonChartNoData"),
        valueFormatter: formatCompactMoney,
        onClick: label => addSearchTag(label)
      });
    case "comparisonQtyCategoryChart":
      return drawGroupedBarChart(canvas, top(comparisonGroupedBaseCompare(rows, "category", "baseOnHand", "compareOnHand"), 8, 16), {
        title: t("comparisonChartQtyByCategory"),
        firstLabel: t("comparisonChartCurrent"),
        secondLabel: t("comparisonChartComparison"),
        emptyText: t("comparisonChartNoData")
      });
    case "comparisonValueCategoryChart":
      return drawGroupedBarChart(canvas, top(comparisonGroupedBaseCompare(rows, "category", "baseValue", "compareValue"), 8, 16), {
        title: t("comparisonChartValueByCategory"),
        firstLabel: t("comparisonChartCurrent"),
        secondLabel: t("comparisonChartComparison"),
        emptyText: t("comparisonChartNoData")
      });
    case "comparisonChangedLocationChart":
      return drawHorizontalBarChart(canvas, top(comparisonGroupChangedCount(rows, "location"), 8, 18), {
        title: t("comparisonChartChangedByLocation"),
        emptyText: t("comparisonChartNoData")
      });
    case "comparisonQtyLocationChart":
      return drawVerticalBarChart(canvas, top(comparisonGroupAbsSum(rows, "location", "deltaOnHand"), 8, 16), {
        title: t("comparisonChartQtyMovementByLocation"),
        emptyText: t("comparisonChartNoData")
      });
    case "comparisonValueLocationChart":
      return drawVerticalBarChart(canvas, top(comparisonGroupAbsSum(rows, "location", "deltaValue"), 8, 16), {
        title: t("comparisonChartValueMovementByLocation"),
        emptyText: t("comparisonChartNoData"),
        valueFormatter: formatCompactMoney
      });
    case "comparisonChangedCategoryLineChart":
      return drawLineChart(canvas, top(comparisonGroupChangedCount(rows, "category"), 12, 28), {
        title: t("comparisonChartChangedByCategoryLine"),
        emptyText: t("comparisonChartNoData")
      });
    case "comparisonQtyCategoryLineChart":
      return drawLineChart(canvas, top(comparisonGroupAbsSum(rows, "category", "deltaOnHand"), 12, 28), {
        title: t("comparisonChartQtyMovementByCategoryLine"),
        emptyText: t("comparisonChartNoData")
      });
    case "comparisonValueCategoryLineChart":
      return drawLineChart(canvas, top(comparisonGroupAbsSum(rows, "category", "deltaValue"), 12, 28), {
        title: t("comparisonChartValueMovementByCategoryLine"),
        emptyText: t("comparisonChartNoData"),
        valueFormatter: formatCompactMoney
      });
  }
}

function topEntriesFromList(data, limit) {
  return data.slice().sort((a, b) => b.value - a.value).slice(0, limit);
}

function comparisonStatusCounts(rows) {
  return ["new", "removed", "increased", "decreased", "changed", "unchanged"]
    .map(type => ({ label: type, value: rows.filter(row => row.changeType === type).length }))
    .filter(item => item.value > 0);
}

function comparisonStatusMetric(rows, metric) {
  return ["new", "removed", "increased", "decreased", "changed", "unchanged"]
    .map(type => ({ label: type, value: rows.filter(row => row.changeType === type).reduce((total, row) => total + Math.abs(Number(row[metric]) || 0), 0) }))
    .filter(item => item.value > 0);
}

function topComparisonRows(rows, metric, direction, normalLimit = 10, limit = 10) {
  const map = new Map();
  rows
    .filter(row => direction === "positive" ? Number(row[metric]) > 0.0001 : Number(row[metric]) < -0.0001)
    .forEach(row => {
      const label = row.product || row.key || "Unspecified";
      map.set(label, (map.get(label) || 0) + Math.abs(Number(row[metric]) || 0));
    });
  return Array.from(map.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit || normalLimit);
}

function comparisonGroupedBaseCompare(rows, groupKey, baseMetric, compareMetric) {
  const map = new Map();
  rows.forEach(row => {
    const label = row[groupKey] || "Unspecified";
    if (!map.has(label)) map.set(label, { label, first: 0, second: 0, value: 0 });
    const item = map.get(label);
    item.first += Math.abs(Number(row[baseMetric]) || 0);
    item.second += Math.abs(Number(row[compareMetric]) || 0);
    item.value = Math.max(item.first, item.second);
  });
  return Array.from(map.values()).filter(item => item.first || item.second).sort((a, b) => b.value - a.value);
}

function comparisonGroupChangedCount(rows, groupKey) {
  const map = new Map();
  rows.filter(row => row.changeType !== "unchanged").forEach(row => {
    const label = row[groupKey] || "Unspecified";
    map.set(label, (map.get(label) || 0) + 1);
  });
  return Array.from(map.entries()).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

function comparisonGroupAbsSum(rows, groupKey, metric) {
  const map = new Map();
  rows.forEach(row => {
    const value = Math.abs(Number(row[metric]) || 0);
    if (!value) return;
    const label = row[groupKey] || "Unspecified";
    map.set(label, (map.get(label) || 0) + value);
  });
  return Array.from(map.entries()).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

function renderComparisonTable(rows, totalRows = rows.length, activeView = "all") {
  const table = $("#comparisonTable");
  const note = $("#comparisonTableNote");
  if (!table) return;
  const limit = 300;
  const visibleRows = rows.slice(0, limit);
  const columns = [
    { key: "product", label: t("colCompareProduct"), kind: "text" },
    { key: "category", label: t("colCompareCategory"), kind: "text" },
    { key: "location", label: t("colCompareLocation"), kind: "text" },
    { key: "lot", label: t("colCompareLot"), kind: "text" },
    { key: "uom", label: t("colCompareUom"), kind: "text" },
    { key: "baseOnHand", label: t("colBaseOnHand"), kind: "number" },
    { key: "compareOnHand", label: t("colCompareOnHand"), kind: "number" },
    { key: "deltaOnHand", label: t("colDeltaOnHand"), kind: "signedNumber" },
    { key: "deltaOnHandPct", label: t("colDeltaQtyPercent"), kind: "signedPercent" },
    { key: "baseAvailable", label: t("colBaseAvailable"), kind: "number" },
    { key: "compareAvailable", label: t("colCompareAvailable"), kind: "number" },
    { key: "deltaAvailable", label: t("colDeltaAvailable"), kind: "signedNumber" },
    { key: "baseReserved", label: t("colBaseReserved"), kind: "number" },
    { key: "compareReserved", label: t("colCompareReserved"), kind: "number" },
    { key: "deltaReserved", label: t("colDeltaReserved"), kind: "signedNumber" },
    { key: "baseValue", label: t("colBaseValue"), kind: "currency" },
    { key: "compareValue", label: t("colCompareValue"), kind: "currency" },
    { key: "deltaValue", label: t("colDeltaValue"), kind: "signedMoney" },
    { key: "deltaValuePct", label: t("colDeltaValuePercent"), kind: "signedPercent" },
    { key: "baseUnitValue", label: t("colBaseUnitValue"), kind: "currency" },
    { key: "compareUnitValue", label: t("colCompareUnitValue"), kind: "currency" },
    { key: "deltaUnitValue", label: t("colDeltaUnitValue"), kind: "signedMoney" },
    { key: "sourceRows", label: t("colCurrentRows"), kind: "number" },
    { key: "comparisonRows", label: t("colComparisonRows"), kind: "number" },
    { key: "changeType", label: t("colCompareStatus"), kind: "comparisonStatus" }
  ];
  const emptyRow = `<tr><td colspan="${columns.length}" class="comparison-empty-row">${escapeHtml(t("comparisonNoRows"))}</td></tr>`;
  table.innerHTML = `
    <thead><tr>${columns.map(column => `<th>${escapeHtml(column.label)}</th>`).join("")}</tr></thead>
    <tbody>${visibleRows.length ? visibleRows.map(row => `<tr>${columns.map(column => `<td>${formatComparisonCell(row, column)}</td>`).join("")}</tr>`).join("") : emptyRow}</tbody>
  `;
  if (note) {
    const notes = [];
    if (activeView !== "all") notes.push(t("comparisonActiveView", { view: comparisonViewLabel(activeView), shown: numberFormatter.format(rows.length), total: numberFormatter.format(totalRows) }));
    if (rows.length > limit) notes.push(t("comparisonTableCapped", { shown: numberFormatter.format(limit), total: numberFormatter.format(rows.length) }));
    note.textContent = notes.join(" • ");
  }
}

function bindComparisonKpiCards() {
  $$("[data-comparison-view]").forEach(card => {
    card.addEventListener("click", () => applyComparisonView(card.dataset.comparisonView));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        applyComparisonView(card.dataset.comparisonView);
      }
    });
  });
}

function applyComparisonView(view) {
  if (!state.comparison.resultRows.length) return;
  state.comparison.activeView = view || "all";
  renderComparisonPanel();
  $("#comparisonTable")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderComparisonViewBar(activeView, shownCount, totalRows) {
  const bar = $("#comparisonViewBar");
  const label = $("#comparisonViewLabel");
  if (!bar || !label) return;
  bar.hidden = activeView === "all";
  label.textContent = t("comparisonActiveView", { view: comparisonViewLabel(activeView), shown: numberFormatter.format(shownCount), total: numberFormatter.format(totalRows) });
}

function filterComparisonRows(rows, view) {
  const activeView = view || "all";
  switch (activeView) {
    case "changed": return rows.filter(row => row.changeType !== "unchanged");
    case "new": return rows.filter(row => row.changeType === "new");
    case "removed": return rows.filter(row => row.changeType === "removed");
    case "increased": return rows.filter(row => row.changeType === "increased");
    case "decreased": return rows.filter(row => row.changeType === "decreased");
    case "unchanged": return rows.filter(row => row.changeType === "unchanged");
    case "matched": return rows.filter(row => row.existsInBase && row.existsInComparison);
    case "qtyChanged": return rows.filter(row => Math.abs(row.deltaOnHand) > 0.0001);
    case "availableChanged": return rows.filter(row => Math.abs(row.deltaAvailable) > 0.0001);
    case "reservedChanged": return rows.filter(row => Math.abs(row.deltaReserved) > 0.0001);
    case "valueChanged": return rows.filter(row => Math.abs(row.deltaValue) > 0.0001);
    case "qtyOnly": return rows.filter(row => Math.abs(row.deltaOnHand) > 0.0001 && Math.abs(row.deltaValue) <= 0.0001);
    case "valueOnly": return rows.filter(row => Math.abs(row.deltaValue) > 0.0001 && Math.abs(row.deltaOnHand) <= 0.0001);
    case "qtyAndValue": return rows.filter(row => Math.abs(row.deltaOnHand) > 0.0001 && Math.abs(row.deltaValue) > 0.0001);
    case "positiveValue": return rows.filter(row => row.deltaValue > 0.0001);
    case "negativeValue": return rows.filter(row => row.deltaValue < -0.0001);
    case "positiveQty": return rows.filter(row => row.deltaOnHand > 0.0001);
    case "negativeQty": return rows.filter(row => row.deltaOnHand < -0.0001);
    case "unitValueChanged": return rows.filter(row => Math.abs(row.deltaUnitValue) > 0.0001);
    case "affectedProducts": {
      const products = new Set(rows.filter(row => row.changeType !== "unchanged").map(row => row.product).filter(Boolean));
      return rows.filter(row => products.has(row.product));
    }
    case "affectedLocations": {
      const locations = new Set(rows.filter(row => row.changeType !== "unchanged").map(row => row.location).filter(Boolean));
      return rows.filter(row => locations.has(row.location));
    }
    case "all":
    default: return rows;
  }
}

function comparisonViewLabel(view) {
  const keys = {
    all: "comparisonViewAll",
    changed: "comparisonViewChanged",
    new: "comparisonViewNew",
    removed: "comparisonViewRemoved",
    increased: "comparisonViewIncreased",
    decreased: "comparisonViewDecreased",
    unchanged: "comparisonViewUnchanged",
    qtyChanged: "comparisonViewQtyChanged",
    availableChanged: "comparisonViewAvailableChanged",
    reservedChanged: "comparisonViewReservedChanged",
    valueChanged: "comparisonViewValueChanged",
    qtyOnly: "comparisonViewQtyOnly",
    valueOnly: "comparisonViewValueOnly",
    qtyAndValue: "comparisonViewQtyAndValue",
    positiveValue: "comparisonViewPositiveValue",
    negativeValue: "comparisonViewNegativeValue",
    matched: "comparisonViewMatched",
    affectedProducts: "comparisonViewAffectedProducts",
    affectedLocations: "comparisonViewAffectedLocations",
    positiveQty: "comparisonViewPositiveQty",
    negativeQty: "comparisonViewNegativeQty",
    unitValueChanged: "comparisonViewUnitValueChanged"
  };
  return t(keys[view] || "comparisonViewAll");
}

function formatComparisonCell(row, column) {
  const value = row[column.key];
  if (column.kind === "number") return escapeHtml(numberFormatter.format(value || 0));
  if (column.kind === "currency") return escapeHtml(currencyFormatter.format(value || 0));
  if (column.kind === "signedNumber") return `<span class="comparison-delta ${deltaClass(value)}">${escapeHtml(formatSignedNumber(value))}</span>`;
  if (column.kind === "signedMoney") return `<span class="comparison-delta ${deltaClass(value)}">${escapeHtml(formatSignedMoney(value))}</span>`;
  if (column.kind === "signedPercent") return `<span class="comparison-delta ${deltaClass(value)}">${escapeHtml(formatSignedPercent(value))}</span>`;
  if (column.kind === "comparisonStatus") return `<span class="comparison-status comparison-${escapeHtml(row.changeType)}">${escapeHtml(comparisonStatusLabel(row.changeType))}</span>`;
  return escapeHtml(value || "");
}

function comparisonStatusLabel(type) {
  const keys = {
    new: "comparisonNew",
    removed: "comparisonRemoved",
    increased: "comparisonIncreased",
    decreased: "comparisonDecreased",
    changed: "comparisonChanged",
    unchanged: "comparisonUnchanged"
  };
  return t(keys[type] || "comparisonChanged");
}

function formatSignedNumber(value) {
  const number = Number(value) || 0;
  const prefix = number > 0 ? "+" : "";
  return prefix + numberFormatter.format(number);
}

function formatSignedMoney(value) {
  const number = Number(value) || 0;
  const prefix = number > 0 ? "+" : "";
  return prefix + currencyFormatter.format(number);
}

function formatSignedPercent(value) {
  const number = Number(value) || 0;
  const prefix = number > 0 ? "+" : "";
  return prefix + numberFormatter.format(number) + "%";
}

function deltaClass(value) {
  const number = Number(value) || 0;
  if (number > 0) return "positive";
  if (number < 0) return "negative";
  return "neutral";
}

function resetComparisonData() {
  state.comparison = { rows: [], resultRows: [], summary: null, fileName: "", comparedAt: null, activeView: "all" };
  applyComparisonChartVisibility();
  renderComparisonPanel();
}

function clearComparisonData() {
  if (!state.comparison.resultRows.length) return;
  if (!confirm(t("comparisonClearConfirm"))) return;
  resetComparisonData();
}

function exportComparison(type) {
  const rows = state.comparison.resultRows || [];
  if (!rows.length) return showMessage(t("comparisonExportEmpty"));
  const exportRows = [
    [t("colCompareProduct"), t("colCompareCategory"), t("colCompareLocation"), t("colCompareLot"), t("colCompareUom"), t("colBaseOnHand"), t("colCompareOnHand"), t("colDeltaOnHand"), t("colDeltaQtyPercent"), t("colBaseAvailable"), t("colCompareAvailable"), t("colDeltaAvailable"), t("colBaseReserved"), t("colCompareReserved"), t("colDeltaReserved"), t("colBaseValue"), t("colCompareValue"), t("colDeltaValue"), t("colDeltaValuePercent"), t("colBaseUnitValue"), t("colCompareUnitValue"), t("colDeltaUnitValue"), t("colCurrentRows"), t("colComparisonRows"), t("colCompareStatus")],
    ...rows.map(row => [row.product, row.category, row.location, row.lot, row.uom, row.baseOnHand, row.compareOnHand, row.deltaOnHand, row.deltaOnHandPct, row.baseAvailable, row.compareAvailable, row.deltaAvailable, row.baseReserved, row.compareReserved, row.deltaReserved, row.baseValue, row.compareValue, row.deltaValue, row.deltaValuePct, row.baseUnitValue, row.compareUnitValue, row.deltaUnitValue, row.sourceRows, row.comparisonRows, comparisonStatusLabel(row.changeType)])
  ];
  if (type === "csv") downloadCsv("inventory_comparison.csv", exportRows);
  else downloadXlsx("inventory_comparison.xlsx", exportRows);
}

function renderTable() {
  const table = $("#inventoryTable");
  const visible = DISPLAY_COLUMNS.filter(column => state.visibleColumns.has(column.key));
  const pages = getPageCount();
  state.page = Math.min(Math.max(1, state.page), pages);
  const start = (state.page - 1) * state.pageSize;
  const pageRows = state.filteredRows.slice(start, start + state.pageSize);
  table.innerHTML = `
    <colgroup>${visible.map(column => `<col data-key="${column.key}" style="width:${columnWidth(column)}px">`).join("")}</colgroup>
    <thead><tr>${visible.map(column => `
      <th class="sortable resizable-column ${column.rtl ? "rtl" : ""}" data-key="${column.key}" style="width:${columnWidth(column)}px">
        <span class="th-content"><span class="th-label">${escapeHtml(columnLabel(column))}</span><span class="sort-indicator">${sortIndicator(column.key)}</span></span>
        <span class="column-resize-handle" data-key="${column.key}" title="${escapeHtml(t("resizeColumnHint"))}" aria-hidden="true"></span>
      </th>`).join("")}</tr></thead>
    <tbody>${pageRows.map(row => `<tr>${visible.map(column => `<td class="${column.rtl ? "rtl" : ""}">${formatCell(row, column)}</td>`).join("")}</tr>`).join("")}</tbody>
  `;
  $$(`#inventoryTable th.sortable`).forEach(th => th.addEventListener("click", event => {
    if (event.target.closest(".column-resize-handle")) return;
    changeSort(th.dataset.key);
  }));
  setupColumnResizing();
  setupLocationButtons();
  $("#tableInfo").textContent = t("tableInfo", { shown: numberFormatter.format(state.filteredRows.length), total: numberFormatter.format(state.productTotals ? aggregateRowsByProduct(state.rows).length : state.rows.length) });
  $("#pageInfo").textContent = t("pageInfo", { page: numberFormatter.format(state.page), pages: numberFormatter.format(pages) });
  $("#prevPageBtn").disabled = state.page <= 1;
  $("#nextPageBtn").disabled = state.page >= pages;
}

function renderSimpleTableFallback() {
  const table = $("#inventoryTable");
  if (!table) return;
  const visible = DISPLAY_COLUMNS.filter(column => state.visibleColumns.has(column.key));
  const pages = getPageCount();
  state.page = Math.min(Math.max(1, state.page), pages);
  const start = (state.page - 1) * state.pageSize;
  const pageRows = state.filteredRows.slice(start, start + state.pageSize);
  table.innerHTML = `
    <thead><tr>${visible.map(column => `<th class="${column.rtl ? "rtl" : ""}">${escapeHtml(columnLabel(column))}</th>`).join("")}</tr></thead>
    <tbody>${pageRows.map(row => `<tr>${visible.map(column => `<td class="${column.rtl ? "rtl" : ""}">${formatCellPlain(row, column)}</td>`).join("")}</tr>`).join("")}</tbody>
  `;
  if ($("#tableInfo")) $("#tableInfo").textContent = t("tableInfo", { shown: numberFormatter.format(state.filteredRows.length), total: numberFormatter.format(state.productTotals ? aggregateRowsByProduct(state.rows).length : state.rows.length) });
  if ($("#pageInfo")) $("#pageInfo").textContent = t("pageInfo", { page: numberFormatter.format(state.page), pages: numberFormatter.format(pages) });
  if ($("#prevPageBtn")) $("#prevPageBtn").disabled = state.page <= 1;
  if ($("#nextPageBtn")) $("#nextPageBtn").disabled = state.page >= pages;
}

function formatCellPlain(row, column) {
  if (column.type === "number") return escapeHtml(numberFormatter.format(row[column.key] || 0));
  if (column.type === "currency") return escapeHtml(currencyFormatter.format(row[column.key] || 0));
  if (column.type === "status") return escapeHtml(statusLabel(row.status));
  return escapeHtml(row[column.key] ?? "");
}

function columnWidth(column) {
  const saved = Number(state.columnWidths?.[column.key]);
  if (Number.isFinite(saved) && saved >= 70) return Math.round(saved);
  return DEFAULT_COLUMN_WIDTHS[column.key] || 140;
}

function setupColumnResizing() {
  $$("#inventoryTable .column-resize-handle").forEach(handle => {
    handle.addEventListener("pointerdown", startColumnResize);
    handle.addEventListener("dblclick", event => {
      event.preventDefault();
      event.stopPropagation();
      delete state.columnWidths[event.currentTarget.dataset.key];
      savePreferences();
      renderTable();
    });
  });
}

function startColumnResize(event) {
  event.preventDefault();
  event.stopPropagation();
  const key = event.currentTarget.dataset.key;
  const header = event.currentTarget.closest("th");
  if (!key || !header) return;
  const startX = event.clientX;
  const startWidth = header.getBoundingClientRect().width;
  document.body.classList.add("resizing-column");

  const move = moveEvent => {
    const delta = isRtl() ? startX - moveEvent.clientX : moveEvent.clientX - startX;
    const width = Math.round(Math.min(760, Math.max(80, startWidth + delta)));
    state.columnWidths[key] = width;
    applyColumnWidth(key, width);
  };

  const stop = () => {
    document.body.classList.remove("resizing-column");
    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerup", stop);
    document.removeEventListener("pointercancel", stop);
    savePreferences();
  };

  document.addEventListener("pointermove", move);
  document.addEventListener("pointerup", stop, { once: true });
  document.addEventListener("pointercancel", stop, { once: true });
}

function applyColumnWidth(key, width) {
  const table = $("#inventoryTable");
  if (!table) return;
  table.querySelectorAll(`[data-key="${key}"]`).forEach(element => {
    if (element.tagName === "COL" || element.tagName === "TH") element.style.width = width + "px";
  });
}

function formatCell(row, column) {
  if (column.key === "location") return formatLocationCell(row);
  if (column.type === "number") return numberFormatter.format(row[column.key] || 0);
  if (column.type === "currency") return currencyFormatter.format(row[column.key] || 0);
  if (column.type === "status") return `<span class="status-pill status-${row.status.toLowerCase()}">${statusLabel(row.status)}</span>`;
  return escapeHtml(row[column.key] ?? "");
}

function formatLocationCell(row) {
  const locationText = escapeHtml(row.location || "");
  const details = getProductLocationDetails(row.product);
  if (details.length <= 1) return locationText;
  const count = details.length;
  const labelKey = count === 1 ? "locationsBadgeOne" : "locationsBadge";
  return `
    <span class="location-cell">
      <span class="location-name" title="${escapeHtml(row.location || "")}">${locationText}</span>
      <button class="location-count-btn" type="button"
        data-product="${escapeHtml(row.product || "")}"
        aria-label="${escapeHtml(t("productLocationsTitle", { product: shortProductLabel(row.product), count: numberFormatter.format(count) }))}">
        ${escapeHtml(t(labelKey, { count: numberFormatter.format(count) }))}
      </button>
    </span>`;
}

function setupLocationButtons() {
  $$(".location-count-btn").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      showLocationPopover(event.currentTarget);
    });
  });
}

function getProductLocationDetails(product) {
  const productKey = String(product || "");
  if (!productKey) return [];
  const map = new Map();
  state.rows.forEach(row => {
    if (row.product !== productKey) return;
    const location = row.location || "Unspecified";
    if (!map.has(location)) {
      map.set(location, { location, onHand: 0, available: 0, reserved: 0, value: 0 });
    }
    const item = map.get(location);
    item.onHand += Number(row.onHand) || 0;
    item.available += Number(row.available) || 0;
    item.reserved += Number(row.reserved) || 0;
    item.value += Number(row.value) || 0;
  });
  return Array.from(map.values()).sort((a, b) => b.onHand - a.onHand || a.location.localeCompare(b.location, undefined, { numeric: true, sensitivity: "base" }));
}

function shortProductLabel(product) {
  const text = String(product || "").trim();
  const match = text.match(/^\s*\[([^\]]+)\]/);
  return match ? match[1] : truncate(text, 34);
}

function ensureLocationPopover() {
  let popover = $("#locationPopover");
  if (!popover) {
    popover = document.createElement("div");
    popover.id = "locationPopover";
    popover.className = "location-popover";
    popover.hidden = true;
    document.body.appendChild(popover);
  }
  return popover;
}

function showLocationPopover(button) {
  activeLocationPopoverButton = button;
  const product = button.dataset.product || "";
  const details = getProductLocationDetails(product);
  const popover = ensureLocationPopover();
  const count = details.length;
  const rowsHtml = details.map(item => `
    <button type="button" class="location-popover-row location-popover-option" data-location="${escapeHtml(item.location)}">
      <span class="location-popover-location" title="${escapeHtml(item.location)}">${escapeHtml(item.location)}</span>
      <span class="location-popover-number">${numberFormatter.format(item.onHand)}</span>
      <span class="location-popover-number available">${numberFormatter.format(item.available)}</span>
    </button>`).join("");

  popover.innerHTML = `
    <div class="location-popover-header">
      <strong>${escapeHtml(t("productLocationsTitle", { product: shortProductLabel(product), count: numberFormatter.format(count) }))}</strong>
      <button type="button" class="location-popover-close" aria-label="Close">×</button>
    </div>
    <div class="location-popover-head">
      <span>${escapeHtml(t("colLocation"))}</span>
      <span>${escapeHtml(t("locationPopupOnHand"))}</span>
      <span>${escapeHtml(t("locationPopupAvailable"))}</span>
    </div>
    <div class="location-popover-list">${rowsHtml}</div>
  `;
  popover.querySelector(".location-popover-close")?.addEventListener("click", event => {
    event.stopPropagation();
    closeLocationPopover();
  });
  popover.querySelectorAll("[data-location]").forEach(rowButton => {
    rowButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      selectLocationFromPopover(event.currentTarget.dataset.location || "");
    });
  });
  popover.hidden = false;
  positionLocationPopover(button, popover);
}

function selectLocationFromPopover(location) {
  const selectedLocation = String(location || "").trim();
  if (!selectedLocation) return;
  const filter = $("#locationFilter");
  if (filter) {
    if (![...filter.options].some(option => option.value === selectedLocation)) {
      const option = document.createElement("option");
      option.value = selectedLocation;
      option.textContent = selectedLocation;
      filter.appendChild(option);
    }
    filter.value = selectedLocation;
  }
  closeLocationPopover();
  state.page = 1;
  applyFilters();
  document.querySelector(".filters-card")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function positionLocationPopover(button, popover) {
  const rect = button.getBoundingClientRect();
  const width = Math.min(430, Math.max(320, Math.floor(window.innerWidth - 24)));
  popover.style.width = width + "px";
  const popoverRect = popover.getBoundingClientRect();
  let left = isRtl() ? rect.right - popoverRect.width : rect.left;
  left = Math.min(window.innerWidth - popoverRect.width - 10, Math.max(10, left));
  let top = rect.bottom + 8;
  if (top + popoverRect.height > window.innerHeight - 10) {
    top = Math.max(10, rect.top - popoverRect.height - 8);
  }
  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
}

function closeLocationPopover() {
  const popover = $("#locationPopover");
  if (popover) popover.hidden = true;
  activeLocationPopoverButton = null;
}

function handleViewportChange(event) {
  positionSettingsPanel();
  const popover = $("#locationPopover");
  if (!popover || popover.hidden || !activeLocationPopoverButton) return;

  // Do not close the locations popup on scroll. Users need to scroll inside
  // the popup list; it should only close from the X button or an outside click.
  if (document.body.contains(activeLocationPopoverButton)) {
    positionLocationPopover(activeLocationPopoverButton, popover);
  }
}

function closeLocationPopoverWhenClickingOutside(event) {
  const popover = $("#locationPopover");
  if (!popover || popover.hidden) return;
  if (event.target.closest("#locationPopover") || event.target.closest(".location-count-btn")) return;
  closeLocationPopover();
}

function changeSort(key) {
  if (state.sortKey === key) state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
  else {
    state.sortKey = key;
    state.sortDirection = "asc";
  }
  sortRows();
  renderTable();
}

function sortRows() {
  const direction = state.sortDirection === "asc" ? 1 : -1;
  const key = state.sortKey;
  state.filteredRows.sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (typeof av === "number" || typeof bv === "number") return ((Number(av) || 0) - (Number(bv) || 0)) * direction;
    return String(av ?? "").localeCompare(String(bv ?? ""), undefined, { numeric: true, sensitivity: "base" }) * direction;
  });
}

function sortIndicator(key) {
  if (state.sortKey !== key) return "";
  return state.sortDirection === "asc" ? "▲" : "▼";
}

function getPageCount() {
  return Math.max(1, Math.ceil(state.filteredRows.length / state.pageSize));
}

function setFilter(selector, value) {
  const element = $(selector);
  element.value = value;
  state.page = 1;
  applyFilters();
}

function columnLabel(column) {
  return t(column.labelKey || column.label || column.key);
}

function statusLabel(status) {
  return {
    Ready: t("statusReady"),
    Low: t("statusLow"),
    Negative: t("statusNegative"),
    Out: t("statusOut"),
    Reserved: t("statusReserved"),
    new: t("comparisonNew"),
    removed: t("comparisonRemoved"),
    increased: t("comparisonIncreased"),
    decreased: t("comparisonDecreased"),
    changed: t("comparisonChanged"),
    unchanged: t("comparisonUnchanged")
  }[status] || status;
}

function aggregateRowsByProduct(rows) {
  const map = new Map();
  rows.forEach(row => {
    const key = row.product || "Unspecified";
    if (!map.has(key)) {
      map.set(key, {
        sourceRow: row.sourceRow,
        product: key,
        categories: new Set(),
        locations: new Set(),
        lots: new Set(),
        uoms: new Set(),
        dates: [],
        onHand: 0,
        available: 0,
        reserved: 0,
        value: 0,
        sourceRows: 0
      });
    }
    const item = map.get(key);
    item.sourceRows += 1;
    if (row.category) item.categories.add(row.category);
    if (row.location) item.locations.add(row.location);
    if (row.lot) item.lots.add(row.lot);
    if (row.uom) item.uoms.add(row.uom);
    if (row.removalDate) item.dates.push(row.removalDate);
    item.onHand += Number(row.onHand) || 0;
    item.available += Number(row.available) || 0;
    item.reserved += Number(row.reserved) || 0;
    item.value += Number(row.value) || 0;
  });

  return Array.from(map.values()).map((item, index) => {
    const sortedDates = item.dates.slice().sort((a, b) => a - b);
    const removalDate = sortedDates[0] || null;
    const valueBaseQty = Math.abs(item.onHand) > 0 ? Math.abs(item.onHand) : Math.abs(item.available);
    const row = {
      sourceRow: item.sourceRow || index + 1,
      product: item.product,
      category: summarizeValues(item.categories),
      location: summarizeValues(item.locations),
      lot: summarizeValues(item.lots),
      lotCount: item.lots.size,
      removalDate,
      removalDateText: summarizeDates(sortedDates),
      onHand: item.onHand,
      available: item.available,
      reserved: item.reserved,
      uom: summarizeValues(item.uoms),
      value: item.value,
      valuePerUnit: valueBaseQty ? item.value / valueBaseQty : 0,
      sourceRows: item.sourceRows,
      status: "Ready",
      searchText: ""
    };
    row.status = getStatus(row);
    row.searchText = buildSearchText(row);
    return row;
  });
}

function summarizeValues(valuesSet) {
  const values = Array.from(valuesSet || []).filter(Boolean).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  if (!values.length) return "";
  const visible = values.slice(0, 3).join(" | ");
  return values.length > 3 ? visible + " +" + (values.length - 3) : visible;
}

function summarizeDates(dates) {
  if (!dates.length) return "";
  const unique = Array.from(new Set(dates.map(formatDateInput))).sort();
  const visible = unique.slice(0, 2).join(" | ");
  return unique.length > 2 ? visible + " +" + (unique.length - 2) : visible;
}

function groupSum(rows, key, valueKey) {
  const map = new Map();
  rows.forEach(row => map.set(row[key], (map.get(row[key]) || 0) + (Number(row[valueKey]) || 0)));
  return map;
}

function groupDualSum(rows, key, firstKey, secondKey) {
  const map = new Map();
  rows.forEach(row => {
    const current = map.get(row[key]) || { label: row[key], first: 0, second: 0 };
    current.first += Number(row[firstKey]) || 0;
    current.second += Number(row[secondKey]) || 0;
    map.set(row[key], current);
  });
  return map;
}

function groupCount(rows, key) {
  const map = new Map();
  rows.forEach(row => map.set(row[key], (map.get(row[key]) || 0) + 1));
  return map;
}

function groupUniqueCount(rows, groupKey, uniqueKey) {
  const map = new Map();
  rows.forEach(row => {
    const group = row[groupKey] || "Unspecified";
    if (!map.has(group)) map.set(group, new Set());
    map.get(group).add(row[uniqueKey] || "Unspecified");
  });
  return new Map(Array.from(map.entries()).map(([label, values]) => [label, values.size]));
}

function groupPositiveSum(rows, key, valueKey) {
  const map = new Map();
  rows.forEach(row => {
    const value = Number(row[valueKey]) || 0;
    if (value > 0) map.set(row[key], (map.get(row[key]) || 0) + value);
  });
  return map;
}

function groupLotCount(rows, key) {
  const map = new Map();
  rows.forEach(row => {
    const lot = String(row.lot || "").trim();
    if (!lot) return;
    if (!map.has(row[key])) map.set(row[key], new Set());
    map.get(row[key]).add(lot);
  });
  return new Map(Array.from(map.entries()).map(([label, lots]) => [label, lots.size]));
}

function lowestAvailableProducts(rows, limit) {
  const map = new Map();
  rows.forEach(row => {
    const current = map.get(row.product) || { label: row.product, value: 0, onHand: 0 };
    current.value += Number(row.available) || 0;
    current.onHand += Number(row.onHand) || 0;
    map.set(row.product, current);
  });
  return Array.from(map.values())
    .filter(item => item.onHand > 0)
    .sort((a, b) => a.value - b.value || a.label.localeCompare(b.label, undefined, { numeric: true, sensitivity: "base" }))
    .slice(0, limit);
}

function topUnitValueProducts(rows, limit) {
  const map = new Map();
  rows.forEach(row => {
    const current = map.get(row.product) || { label: row.product, qty: 0, valueTotal: 0 };
    current.qty += Number(row.onHand) || Number(row.available) || 0;
    current.valueTotal += Number(row.value) || 0;
    map.set(row.product, current);
  });
  return Array.from(map.values())
    .map(item => ({ label: item.label, value: item.qty ? item.valueTotal / item.qty : 0 }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

function topEntries(group, limit) {
  const entries = group instanceof Map
    ? Array.from(group.entries()).map(([label, value]) => typeof value === "object" ? value : { label, value })
    : group;
  return entries.sort((a, b) => ((b.value ?? b.first ?? 0) + (b.second ?? 0)) - ((a.value ?? a.first ?? 0) + (a.second ?? 0))).slice(0, limit);
}

function statusBreakdown(rows) {
  const counts = groupCount(rows, "status");
  return ["Ready", "Low", "Negative", "Reserved", "Out"].map(label => ({ label, value: counts.get(label) || 0, color: statusColors[label] })).filter(item => item.value > 0);
}

function removalTimeline(rows) {
  const map = new Map();
  rows.filter(row => row.removalDate).forEach(row => {
    const key = `${row.removalDate.getFullYear()}-${String(row.removalDate.getMonth() + 1).padStart(2, "0")}`;
    map.set(key, (map.get(key) || 0) + row.available);
  });
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([label, value]) => ({ label, value }));
}

function sum(rows, key) {
  return rows.reduce((total, row) => total + (Number(row[key]) || 0), 0);
}

function uniqueValues(rows, key) {
  return Array.from(new Set(rows.map(row => row[key]).filter(Boolean))).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
}

function prepareCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(320, Math.floor(rect.width));
  const height = Math.max(260, Math.floor(rect.height));
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = chartPanelColor();
  ctx.fillRect(0, 0, width, height);
  ctx.font = "12px Tahoma, Segoe UI, sans-serif";
  ctx.lineWidth = 1;
  canvas._hitboxes = [];
  canvas.onmousemove = event => handleChartMove(event, canvas);
  canvas.onmouseleave = hideTooltip;
  return { ctx, width, height };
}

function themeValue(name, fallback) {
  const bodyValue = getComputedStyle(document.body).getPropertyValue(name).trim();
  if (bodyValue) return bodyValue;
  const rootValue = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return rootValue || fallback;
}

function chartTextColor() {
  return themeValue("--text", "#102033");
}

function chartMutedColor() {
  return themeValue("--muted", "#64748b");
}

function chartLineColor() {
  return themeValue("--line", "#edf2f8");
}

function chartPanelColor() {
  return themeValue("--panel", "#ffffff");
}
function drawTitle(ctx, title, width) {
  ctx.fillStyle = chartTextColor();
  ctx.font = "700 16px Tahoma, Segoe UI, sans-serif";
  ctx.textAlign = isRtl() ? "right" : "left";
  ctx.fillText(title, isRtl() ? width - 16 : 16, 26, width - 32);
  ctx.textAlign = "left";
}

function drawEmpty(ctx, text, width, height) {
  ctx.fillStyle = chartMutedColor();
  ctx.font = "600 14px Tahoma, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(text, width / 2, height / 2);
  ctx.textAlign = "left";
}

function drawVerticalBarChart(canvas, data, options) {
  const { ctx, width, height } = prepareCanvas(canvas);
  drawTitle(ctx, options.title, width);
  if (!data.length) return drawEmpty(ctx, options.emptyText, width, height);
  const formatValue = value => options.valueFormatter ? options.valueFormatter(value) : numberFormatter.format(value);
  const max = Math.max(...data.map(item => item.value), 1);
  const leftSpace = Math.min(106, Math.max(58, String(formatValue(max)).length * 6 + 18));
  const margin = { top: 56, right: 20, bottom: canvas.id === "expandedChartCanvas" ? 86 : 68, left: leftSpace };
  const chartWidth = Math.max(120, width - margin.left - margin.right);
  const chartHeight = Math.max(80, height - margin.top - margin.bottom);
  ctx.strokeStyle = chartLineColor();
  ctx.fillStyle = chartMutedColor();
  ctx.font = "11px Tahoma, Segoe UI, sans-serif";
  ctx.textAlign = "right";
  for (let i = 0; i <= 4; i++) {
    const y = margin.top + chartHeight - chartHeight * i / 4;
    ctx.beginPath();
    ctx.moveTo(margin.left, y);
    ctx.lineTo(margin.left + chartWidth, y);
    ctx.stroke();
    ctx.fillText(formatValue(max * i / 4), margin.left - 8, y + 4);
  }
  const slot = chartWidth / data.length;
  const barWidth = Math.max(14, Math.min(64, slot * 0.58));
  const maxLabels = Math.max(3, Math.floor(chartWidth / 76));
  const labelSkip = Math.max(1, Math.ceil(data.length / maxLabels));
  data.forEach((item, index) => {
    const x = margin.left + index * slot + (slot - barWidth) / 2;
    const barHeight = Math.max(2, chartHeight * item.value / max);
    const y = margin.top + chartHeight - barHeight;
    ctx.fillStyle = palette[index % palette.length];
    roundRect(ctx, x, y, barWidth, barHeight, 7);
    ctx.fill();
    if (index % labelSkip === 0 || index === data.length - 1) {
      ctx.save();
      ctx.translate(x + barWidth / 2, height - 28);
      ctx.rotate(-Math.PI / 7);
      ctx.fillStyle = chartMutedColor();
      ctx.textAlign = "right";
      ctx.font = "11px Tahoma, Segoe UI, sans-serif";
      ctx.fillText(truncate(item.label, canvas.id === "expandedChartCanvas" ? 26 : 16), 0, 0);
      ctx.restore();
    }
    const val = formatValue(item.value);
    canvas._hitboxes.push({ x, y, w: barWidth, h: barHeight, label: item.label, value: item.value, text: item.label + ": " + val, onClick: options.onClick });
  });
  ctx.textAlign = "left";
}

function drawHorizontalBarChart(canvas, data, options) {
  const { ctx, width, height } = prepareCanvas(canvas);
  drawTitle(ctx, options.title, width);
  if (!data.length) return drawEmpty(ctx, options.emptyText, width, height);
  const margin = { top: 52, right: 34, bottom: 24, left: Math.min(220, Math.max(124, width * 0.33)) };
  const chartWidth = Math.max(140, width - margin.left - margin.right);
  const chartHeight = Math.max(80, height - margin.top - margin.bottom);
  const barGap = 8;
  const barHeight = Math.max(10, Math.min(22, (chartHeight - barGap * (data.length - 1)) / data.length));
  const max = Math.max(...data.map(item => item.value), 1);
  const formatValue = value => options.valueFormatter ? options.valueFormatter(value) : numberFormatter.format(value);
  ctx.strokeStyle = chartLineColor();
  ctx.fillStyle = chartMutedColor();
  ctx.font = "12px Tahoma, Segoe UI, sans-serif";
  for (let i = 0; i <= 4; i++) {
    const x = margin.left + chartWidth * i / 4;
    ctx.beginPath();
    ctx.moveTo(x, margin.top - 3);
    ctx.lineTo(x, margin.top + chartHeight + 3);
    ctx.stroke();
  }
  data.forEach((item, index) => {
    const y = margin.top + index * (barHeight + barGap);
    const barWidth = Math.max(2, chartWidth * item.value / max);
    const color = palette[index % palette.length];
    ctx.fillStyle = chartTextColor();
    ctx.textAlign = "right";
    ctx.font = "12px Tahoma, Segoe UI, sans-serif";
    ctx.fillText(truncate(item.label, canvas.id === "expandedChartCanvas" ? 34 : 22), margin.left - 10, y + barHeight * 0.68);
    ctx.textAlign = "left";
    ctx.fillStyle = color;
    roundRect(ctx, margin.left, y, barWidth, barHeight, 7);
    ctx.fill();
    const label = formatValue(item.value);
    ctx.fillStyle = chartTextColor();
    ctx.font = "700 11px Tahoma, Segoe UI, sans-serif";
    const labelWidth = ctx.measureText(label).width;
    if (margin.left + barWidth + labelWidth + 12 < width) {
      ctx.textAlign = "left";
      ctx.fillText(label, margin.left + barWidth + 7, y + barHeight * 0.68);
    } else if (barWidth > labelWidth + 16) {
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.fillText(label, margin.left + barWidth - 7, y + barHeight * 0.68);
    }
    ctx.textAlign = "left";
    ctx.font = "12px Tahoma, Segoe UI, sans-serif";
    canvas._hitboxes.push({ x: margin.left, y, w: chartWidth, h: barHeight, label: item.label, value: item.value, text: item.label + ": " + label, onClick: options.onClick });
  });
}

function drawGroupedBarChart(canvas, data, options) {
  const { ctx, width, height } = prepareCanvas(canvas);
  drawTitle(ctx, options.title, width);
  if (!data.length) return drawEmpty(ctx, options.emptyText, width, height);
  const margin = { top: 70, right: 30, bottom: 24, left: Math.min(210, Math.max(124, width * 0.3)) };
  const chartWidth = Math.max(140, width - margin.left - margin.right);
  const chartHeight = Math.max(90, height - margin.top - margin.bottom);
  const rowGap = 12;
  const barHeight = Math.max(7, Math.min(14, (chartHeight - rowGap * data.length) / (data.length * 2)));
  const max = Math.max(...data.map(item => Math.max(item.first, item.second)), 1);
  drawLegend(ctx, margin.left, 44, [{ label: options.firstLabel, color: palette[0] }, { label: options.secondLabel, color: palette[1] }], chartWidth, { maxItems: 2, rowHeight: 18 });
  ctx.strokeStyle = chartLineColor();
  for (let i = 0; i <= 4; i++) {
    const x = margin.left + chartWidth * i / 4;
    ctx.beginPath();
    ctx.moveTo(x, margin.top - 4);
    ctx.lineTo(x, margin.top + chartHeight + 4);
    ctx.stroke();
  }
  data.forEach((item, index) => {
    const y = margin.top + index * (barHeight * 2 + rowGap);
    ctx.fillStyle = chartTextColor();
    ctx.textAlign = "right";
    ctx.font = "12px Tahoma, Segoe UI, sans-serif";
    ctx.fillText(truncate(item.label, canvas.id === "expandedChartCanvas" ? 32 : 20), margin.left - 10, y + barHeight * 1.3);
    ctx.textAlign = "left";
    const firstWidth = Math.max(2, chartWidth * item.first / max);
    const secondWidth = Math.max(2, chartWidth * item.second / max);
    ctx.fillStyle = palette[0];
    roundRect(ctx, margin.left, y, firstWidth, barHeight, 5);
    ctx.fill();
    ctx.fillStyle = palette[1];
    roundRect(ctx, margin.left, y + barHeight + 3, secondWidth, barHeight, 5);
    ctx.fill();
    canvas._hitboxes.push({ x: margin.left, y, w: chartWidth, h: barHeight * 2 + 3, label: item.label, value: item.first, text: item.label + "<br>" + options.firstLabel + ": " + numberFormatter.format(item.first) + "<br>" + options.secondLabel + ": " + numberFormatter.format(item.second), onClick: options.onClick });
  });
}

function drawDoughnutChart(canvas, data, options) {
  const { ctx, width, height } = prepareCanvas(canvas);
  drawTitle(ctx, options.title, width);
  if (!data.length) return drawEmpty(ctx, options.emptyText, width, height);
  const total = data.reduce((t, item) => t + item.value, 0);
  if (!total) return drawEmpty(ctx, options.emptyText, width, height);
  const expanded = canvas.id === "expandedChartCanvas";
  const useSideLegend = width >= 620;
  const top = 54;
  const bottomReserve = useSideLegend ? 20 : 86;
  const radius = Math.min(width * (useSideLegend ? 0.18 : 0.22), (height - top - bottomReserve) * 0.42, expanded ? 148 : 110);
  const cx = useSideLegend ? Math.max(radius + 32, width * 0.31) : width / 2;
  const cy = useSideLegend ? height * 0.55 : top + radius + 12;
  let angle = -Math.PI / 2;
  data.forEach((item, index) => {
    const slice = total ? item.value / total * Math.PI * 2 : 0;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + slice);
    ctx.closePath();
    ctx.fillStyle = item.color || palette[index % palette.length];
    ctx.fill();
    const pct = total ? Math.round(item.value / total * 100) : 0;
    canvas._hitboxes.push({ cx, cy, radius, start: angle, end: angle + slice, label: item.label, value: item.value, text: statusLabel(item.label) + ": " + numberFormatter.format(item.value) + (options.valueSuffix || "") + " (" + pct + "%)", onClick: options.onClick, arc: true });
    angle += slice;
  });
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.58, 0, Math.PI * 2);
  ctx.fillStyle = chartPanelColor();
  ctx.fill();
  ctx.fillStyle = chartTextColor();
  ctx.font = expanded ? "800 22px Tahoma, Segoe UI, sans-serif" : "800 17px Tahoma, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(numberFormatter.format(total), cx, cy + 6);
  const legendItems = data.map((item, index) => ({
    label: statusLabel(item.label) + ": " + numberFormatter.format(item.value) + (options.valueSuffix || ""),
    color: item.color || palette[index % palette.length]
  }));
  if (useSideLegend) {
    const legendX = cx + radius + 30;
    const legendY = Math.max(58, cy - Math.min(radius, legendItems.length * 9));
    const maxRows = Math.max(3, Math.floor((height - legendY - 14) / 18));
    drawLegend(ctx, legendX, legendY, legendItems, Math.max(140, width - legendX - 16), { maxItems: expanded ? legendItems.length : maxRows, rowHeight: 18 });
  } else {
    drawLegend(ctx, 18, Math.min(height - 74, cy + radius + 24), legendItems, width - 36, { maxItems: expanded ? legendItems.length : 3, rowHeight: 18 });
  }
  ctx.textAlign = "left";
}

function drawLineChart(canvas, data, options) {
  const { ctx, width, height } = prepareCanvas(canvas);
  drawTitle(ctx, options.title, width);
  if (!data.length) return drawEmpty(ctx, options.emptyText, width, height);
  const margin = { top: 54, right: 24, bottom: 52, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const formatValue = value => options.valueFormatter ? options.valueFormatter(value) : numberFormatter.format(value);
  const max = Math.max(...data.map(item => item.value), 1);
  ctx.strokeStyle = chartLineColor();
  ctx.fillStyle = chartMutedColor();
  ctx.font = "11px Tahoma, Segoe UI, sans-serif";
  for (let i = 0; i <= 4; i++) {
    const y = margin.top + chartHeight - chartHeight * i / 4;
    ctx.beginPath();
    ctx.moveTo(margin.left, y);
    ctx.lineTo(margin.left + chartWidth, y);
    ctx.stroke();
    ctx.fillText(formatValue(max * i / 4), 12, y + 4);
  }
  const points = data.map((item, index) => {
    const x = margin.left + (data.length === 1 ? chartWidth / 2 : chartWidth * index / (data.length - 1));
    const y = margin.top + chartHeight - chartHeight * item.value / max;
    return { ...item, x, y };
  });
  ctx.beginPath();
  points.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
  ctx.strokeStyle = palette[0];
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.lineWidth = 1;
  points.forEach((point, index) => {
    ctx.fillStyle = palette[index % palette.length];
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fill();
    canvas._hitboxes.push({ x: point.x - 10, y: point.y - 10, w: 20, h: 20, label: point.label, value: point.value, text: `${point.label}: ${formatValue(point.value)}` });
  });
  ctx.fillStyle = chartMutedColor();
  ctx.textAlign = "center";
  const skip = Math.ceil(data.length / Math.max(3, Math.floor(chartWidth / 72)));
  points.forEach((point, index) => {
    if (index % skip === 0 || index === points.length - 1) ctx.fillText(point.label, point.x, height - 20);
  });
  ctx.textAlign = "left";
}

function drawLegend(ctx, x, y, items, maxWidth = 260, options = {}) {
  const rowHeight = options.rowHeight || 18;
  const maxItems = Math.max(0, Math.min(items.length, options.maxItems ?? items.length));
  const visibleItems = items.slice(0, maxItems);
  ctx.font = "11px Tahoma, Segoe UI, sans-serif";
  ctx.textAlign = "left";
  visibleItems.forEach((item, index) => {
    const offsetY = index * rowHeight;
    ctx.fillStyle = item.color;
    roundRect(ctx, x, y + offsetY - 10, 10, 10, 3);
    ctx.fill();
    ctx.fillStyle = chartTextColor();
    ctx.fillText(truncate(item.label, Math.max(12, Math.floor(maxWidth / 7))), x + 16, y + offsetY);
  });
  if (items.length > maxItems) {
    ctx.fillStyle = chartMutedColor();
    ctx.font = "700 11px Tahoma, Segoe UI, sans-serif";
    ctx.fillText("+" + numberFormatter.format(items.length - maxItems) + " more", x, y + visibleItems.length * rowHeight);
  }
}

function handleChartMove(event, canvas) {
  const box = getHitbox(event, canvas);
  if (!box) return hideTooltip();
  showTooltip(event.clientX, event.clientY, box.text);
  canvas.style.cursor = box.onClick ? "pointer" : "default";
  canvas.onclick = clickEvent => {
    const clicked = getHitbox(clickEvent, canvas);
    if (clicked?.onClick) clicked.onClick(clicked.label);
  };
}

function getHitbox(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return (canvas._hitboxes || []).find(box => {
    if (box.arc) {
      const dx = x - box.cx;
      const dy = y - box.cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      let angle = Math.atan2(dy, dx);
      if (angle < box.start) angle += Math.PI * 2;
      return distance <= box.radius && distance >= box.radius * 0.58 && angle >= box.start && angle <= box.end;
    }
    return x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h;
  });
}

function showTooltip(x, y, html) {
  const tooltip = $("#tooltip");
  tooltip.innerHTML = html;
  tooltip.hidden = false;
  tooltip.style.left = `${Math.min(window.innerWidth - 280, x + 14)}px`;
  tooltip.style.top = `${Math.max(10, y + 14)}px`;
}

function hideTooltip() {
  const tooltip = $("#tooltip");
  tooltip.hidden = true;
  $$('canvas').forEach(canvas => canvas.style.cursor = "default");
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function exportFiltered(type) {
  if (!state.filteredRows.length) return showMessage(t("exportNoRows"));
  const rows = [REQUIRED_COLUMNS, ...state.filteredRows.map(row => [row.product, row.category, row.location, row.lot, row.removalDateText, row.onHand, row.available, row.uom, row.value])];
  if (type === "csv") downloadCsv("filtered_inventory.csv", rows);
  else downloadXlsx("filtered_inventory.xlsx", rows);
}

function downloadCsv(filename, rows) {
  const csv = "\ufeff" + rows.map(row => row.map(csvCell).join(",")).join("\r\n");
  downloadBlob(filename, new Blob([csv], { type: "text/csv;charset=utf-8" }));
}

function downloadXlsx(filename, rows) {
  const bytes = createXlsxFile("Inventory", rows);
  downloadBlob(filename, new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1200);
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function createXlsxFile(sheetName, rows) {
  const entries = {
    "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`,
    "_rels/.rels": `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`,
    "xl/workbook.xml": `<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${xmlEscape(sheetName)}" sheetId="1" r:id="rId1"/></sheets></workbook>`,
    "xl/_rels/workbook.xml.rels": `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    "xl/styles.xml": `<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts><fills count="1"><fill><patternFill patternType="none"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs></styleSheet>`,
    "xl/worksheets/sheet1.xml": createWorksheetXml(rows),
    "docProps/core.xml": `<?xml version="1.0" encoding="UTF-8"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Inventory import format</dc:title><dc:creator>Inventory Manager</dc:creator><cp:lastModifiedBy>Inventory Manager</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:modified></cp:coreProperties>`,
    "docProps/app.xml": `<?xml version="1.0" encoding="UTF-8"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Inventory Manager</Application></Properties>`
  };
  return zipStore(entries);
}

function createWorksheetXml(rows) {
  const sheetData = rows.map((row, rIndex) => {
    const cells = row.map((value, cIndex) => {
      const ref = `${columnName(cIndex + 1)}${rIndex + 1}`;
      if (typeof value === "number" && Number.isFinite(value)) return `<c r="${ref}"><v>${value}</v></c>`;
      return `<c r="${ref}" t="inlineStr"><is><t>${xmlEscape(value ?? "")}</t></is></c>`;
    }).join("");
    return `<row r="${rIndex + 1}">${cells}</row>`;
  }).join("");
  const dimension = `A1:${columnName(Math.max(...rows.map(row => row.length), 1))}${rows.length}`;
  return `<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="${dimension}"/><sheetViews><sheetView workbookViewId="0" rightToLeft="1"/></sheetViews><sheetData>${sheetData}</sheetData></worksheet>`;
}

function zipStore(entries) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  Object.entries(entries).forEach(([path, content]) => {
    const name = encoder.encode(path);
    const data = typeof content === "string" ? encoder.encode(content) : content;
    const crc = crc32(data);
    const local = new Uint8Array(30 + name.length + data.length);
    const view = new DataView(local.buffer);
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 0x0800, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, 0, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, data.length, true);
    view.setUint32(22, data.length, true);
    view.setUint16(26, name.length, true);
    view.setUint16(28, 0, true);
    local.set(name, 30);
    local.set(data, 30 + name.length);
    localParts.push(local);
    const central = new Uint8Array(46 + name.length);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0x0800, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, 0, true);
    cv.setUint16(14, 0, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, data.length, true);
    cv.setUint32(24, data.length, true);
    cv.setUint16(28, name.length, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint32(38, 0, true);
    cv.setUint32(42, offset, true);
    central.set(name, 46);
    centralParts.push(central);
    offset += local.length;
  });
  const centralSize = centralParts.reduce((total, part) => total + part.length, 0);
  const end = new Uint8Array(22);
  const ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, centralParts.length, true);
  ev.setUint16(10, centralParts.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);
  return concatUint8([...localParts, ...centralParts, end]);
}

function makeCrcTable() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c >>> 0;
  }
  return table;
}

const crcTable = makeCrcTable();

function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = crcTable[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

async function unzip(arrayBuffer) {
  const data = new Uint8Array(arrayBuffer);
  const view = new DataView(arrayBuffer);
  let eocd = -1;
  for (let i = data.length - 22; i >= Math.max(0, data.length - 66000); i--) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("Invalid XLSX file: ZIP directory was not found.");
  const entriesCount = view.getUint16(eocd + 10, true);
  const centralOffset = view.getUint32(eocd + 16, true);
  const files = {};
  let ptr = centralOffset;
  const decoder = new TextDecoder("utf-8");
  for (let i = 0; i < entriesCount; i++) {
    if (view.getUint32(ptr, true) !== 0x02014b50) throw new Error("Invalid XLSX file: central directory is corrupt.");
    const method = view.getUint16(ptr + 10, true);
    const compressedSize = view.getUint32(ptr + 20, true);
    const fileNameLength = view.getUint16(ptr + 28, true);
    const extraLength = view.getUint16(ptr + 30, true);
    const commentLength = view.getUint16(ptr + 32, true);
    const localOffset = view.getUint32(ptr + 42, true);
    const fileName = decoder.decode(data.slice(ptr + 46, ptr + 46 + fileNameLength));
    const localNameLength = view.getUint16(localOffset + 26, true);
    const localExtraLength = view.getUint16(localOffset + 28, true);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = data.slice(dataStart, dataStart + compressedSize);
    if (method === 0) files[fileName] = compressed;
    else if (method === 8) files[fileName] = new Uint8Array(await inflateRaw(compressed));
    else throw new Error(`Unsupported XLSX compression method: ${method}.`);
    ptr += 46 + fileNameLength + extraLength + commentLength;
  }
  return files;
}

async function inflateRaw(bytes) {
  if (!("DecompressionStream" in window)) throw new Error("This browser cannot open compressed XLSX files. Use CSV, or open the page in a current Chrome, Edge, or Firefox browser.");
  try {
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    return await new Response(stream).arrayBuffer();
  } catch (error) {
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate"));
    return await new Response(stream).arrayBuffer();
  }
}

function parseWorksheet(xmlText, sharedStrings) {
  const doc = parseXml(xmlText);
  const rows = [];
  Array.from(doc.getElementsByTagName("row")).forEach(rowNode => {
    const row = [];
    Array.from(rowNode.getElementsByTagName("c")).forEach(cell => {
      const ref = cell.getAttribute("r") || "A1";
      const col = columnIndex(ref.replace(/[0-9]/g, "")) - 1;
      row[col] = parseCell(cell, sharedStrings);
    });
    rows.push(row.map(value => value ?? ""));
  });
  return rows;
}

function parseCell(cell, sharedStrings) {
  const type = cell.getAttribute("t");
  const valueNode = cell.getElementsByTagName("v")[0];
  if (type === "s") return sharedStrings[Number(valueNode?.textContent || 0)] || "";
  if (type === "inlineStr") return Array.from(cell.getElementsByTagName("t")).map(node => node.textContent || "").join("");
  if (type === "b") return valueNode?.textContent === "1" ? "TRUE" : "FALSE";
  if (type === "str") return valueNode?.textContent || "";
  const text = valueNode?.textContent ?? "";
  if (text === "") return "";
  const number = Number(text);
  return Number.isFinite(number) ? number : text;
}

function parseSharedStrings(xmlText) {
  const doc = parseXml(xmlText);
  return Array.from(doc.getElementsByTagName("si")).map(item => Array.from(item.getElementsByTagName("t")).map(t => t.textContent || "").join(""));
}

function parseXml(xml) {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.getElementsByTagName("parsererror").length) throw new Error("Invalid XML inside the XLSX file.");
  return doc;
}

function resolveWorkbookTarget(target) {
  if (!target) return "";
  if (target.startsWith("/")) return normalizeZipPath(target);
  return normalizeZipPath(`xl/${target}`);
}

function textFromFile(files, path) {
  const normalized = normalizeZipPath(path);
  if (!files[normalized]) throw new Error(`XLSX file is missing ${normalized}.`);
  return new TextDecoder("utf-8").decode(files[normalized]);
}

function normalizeZipPath(path) {
  const parts = [];
  path.replace(/^\//, "").split("/").forEach(part => {
    if (!part || part === ".") return;
    if (part === "..") parts.pop();
    else parts.push(part);
  });
  return parts.join("/");
}

function parseCsv(text) {
  text = text.replace(/^\ufeff/, "");
  const delimiter = detectDelimiter(text);
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i++;
      } else inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += char;
  }
  row.push(cell);
  rows.push(row);
  return rows.filter(r => r.some(c => String(c).trim() !== ""));
}

function detectDelimiter(text) {
  const firstLine = text.split(/\r?\n/).find(line => line.trim()) || "";
  const options = [",", ";", "\t"];
  return options.map(delimiter => ({ delimiter, count: firstLine.split(delimiter).length })).sort((a, b) => b.count - a.count)[0].delimiter;
}

function parseNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  let text = normalizeDigits(String(value ?? "").trim());
  if (!text) return 0;
  let negative = false;
  if (/^\(.*\)$/.test(text)) {
    negative = true;
    text = text.slice(1, -1);
  }
  text = text.replace(/[,،\s]/g, "").replace(/[^0-9.\-]/g, "");
  const number = Number(text);
  if (!Number.isFinite(number)) return 0;
  return negative ? -number : number;
}

function parseDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return stripTime(value);
  if (typeof value === "number" && value > 25000 && value < 90000) return excelSerialToDate(value);
  const text = normalizeDigits(String(value ?? "").trim());
  if (!text) return null;
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(text)) return stripTime(new Date(`${text}T00:00:00`));
  const match = text.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if (match) {
    const day = Number(match[1]);
    const month = Number(match[2]) - 1;
    const year = Number(match[3].length === 2 ? `20${match[3]}` : match[3]);
    const date = new Date(year, month, day);
    return Number.isNaN(date.getTime()) ? null : stripTime(date);
  }
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? null : stripTime(parsed);
}

function excelSerialToDate(serial) {
  const utc = Math.round((serial - 25569) * 86400 * 1000);
  return stripTime(new Date(utc));
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDateInput(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function normalizeHeader(value) {
  return cleanText(value).replace(/^\ufeff/, "").replace(/[\u200e\u200f]/g, "");
}


function normalizeHeaderKey(value) {
  return normalizeHeader(value).toLowerCase().replace(/\s*\/\s*/g, "/").replace(/\s+/g, " ").trim();
}

function canonicalHeader(value) {
  const key = normalizeHeaderKey(value);
  if (!key) return "";
  const aliasMap = getHeaderAliasMap();
  return aliasMap.get(key) || normalizeHeader(value);
}

function getHeaderAliasMap() {
  if (getHeaderAliasMap.cache) return getHeaderAliasMap.cache;
  const map = new Map();
  Object.entries(HEADER_ALIASES).forEach(([canonical, aliases]) => {
    [canonical, ...aliases].forEach(alias => map.set(normalizeHeaderKey(alias), canonical));
  });
  IGNORED_IMPORT_COLUMNS.forEach(alias => map.set(normalizeHeaderKey(alias), "__ignored_company__"));
  getHeaderAliasMap.cache = map;
  return map;
}

function normalizeDigits(text) {
  const arabic = "٠١٢٣٤٥٦٧٨٩";
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  return text.replace(/[٠-٩]/g, d => arabic.indexOf(d)).replace(/[۰-۹]/g, d => persian.indexOf(d));
}

function columnName(index) {
  let name = "";
  while (index > 0) {
    const mod = (index - 1) % 26;
    name = String.fromCharCode(65 + mod) + name;
    index = Math.floor((index - mod) / 26);
  }
  return name;
}

function columnIndex(name) {
  return name.split("").reduce((total, char) => total * 26 + char.charCodeAt(0) - 64, 0);
}

function concatUint8(parts) {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  parts.forEach(part => {
    result.set(part, offset);
    offset += part.length;
  });
  return result;
}

function showMessage(message, type = "error", autoHideMs = 0) {
  const box = $("#messageBox");
  clearTimeout(messageTimeoutId);
  box.innerHTML = message;
  box.className = `message-box ${type}`;
  box.hidden = false;
  if (autoHideMs > 0) {
    messageTimeoutId = setTimeout(clearMessage, autoHideMs);
  }
}

function clearMessage() {
  clearTimeout(messageTimeoutId);
  messageTimeoutId = null;
  $("#messageBox").hidden = true;
  $("#messageBox").textContent = "";
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

function xmlEscape(value) {
  return String(value ?? "").replace(/[&<>"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

function truncate(text, max) {
  text = String(text ?? "");
  return text.length > max ? `${text.slice(0, Math.max(0, max - 1))}…` : text;
}

function debounce(fn, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}
