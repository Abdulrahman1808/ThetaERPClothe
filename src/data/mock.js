// ============================================================
//  Theta ERP — بيانات تجريبية (Demo Data) لمصانع الملابس
//  كل الأرقام والأسماء تجريبية لغرض العرض على العميل
// ============================================================

export const fmtMoney = (n) => `${n.toLocaleString("en-US")} ج.م`;
export const fmtNum = (n) => n.toLocaleString("en-US");

// ---------------- الموديلات والتصميم ----------------
export const MODEL_STATUS = {
  "فكرة": "gray",
  "تصميم": "info",
  "عينة": "purple",
  "تعديل": "warn",
  "معتمد": "brand",
  "تسويق": "info",
  "إنتاج": "brand",
  "بيع": "ok",
};

export const models = [
  { id: 1, code: "M-2026-001", name: "فستان سهرة بحمالات", collection: "الإيفينق", season: "صيفي", colors: ["أسود", "موف"], sizes: ["S", "M", "L", "XL"], price: 1650, targetCost: 690, designer: "نور الهدى عبد العزيز", status: "بيع", hue: "#1e293b" },
  { id: 2, code: "M-2026-002", name: "بلوزة صيفية بياقة V", collection: "الكاجوال", season: "صيفي", colors: ["أبيض", "سماوي", "بيج"], sizes: ["S", "M", "L"], price: 420, targetCost: 175, designer: "سارة محمود", status: "إنتاج", hue: "#0ea5e9" },
  { id: 3, code: "M-2026-003", name: "جاكيت رجالي بسحاب", collection: "الرسمي الشتوي", season: "شتوي", colors: ["كحلي", "أسود"], sizes: ["M", "L", "XL", "XXL"], price: 980, targetCost: 455, designer: "محمود فؤاد", status: "تسويق", hue: "#1e3a8a" },
  { id: 4, code: "M-2026-004", name: "فستان ميدي مربعات", collection: "الكاجوال", season: "صيفي", colors: ["روز", "بيج"], sizes: ["XS", "S", "M", "L"], price: 690, targetCost: 305, designer: "ندى إبراهيم", status: "إنتاج", hue: "#ec4899" },
  { id: 5, code: "M-2026-005", name: "بنطلون كارجو واسع", collection: "الكاجوال", season: "شتوي", colors: ["زيتي", "رمادي"], sizes: ["S", "M", "L", "XL", "XXL"], price: 520, targetCost: 240, designer: "محمود فؤاد", status: "معتمد", hue: "#65a30d" },
  { id: 6, code: "M-2026-006", name: "جيليه مخمل برسوم", collection: "الإيفينق", season: "شتوي", colors: ["كحلي", "أسود"], sizes: ["XS", "S", "M"], price: 780, targetCost: 360, designer: "نور الهدى عبد العزيز", status: "عينة", hue: "#6d28d9" },
  { id: 7, code: "M-2026-007", name: "تيشيرت أوفرسايز", collection: "الكاجوال", season: "صيفي", colors: ["أبيض", "أسود"], sizes: ["M", "L", "XL", "XXL"], price: 260, targetCost: 105, designer: "أحمد حسن", status: "بيع", hue: "#94a3b8" },
  { id: 8, code: "M-2026-008", name: "فستان خطوبة دانتيل", collection: "الإيفينق", season: "شتوي", colors: ["أسود", "شامبين"], sizes: ["S", "M", "L"], price: 2400, targetCost: 1080, designer: "نور الهدى عبد العزيز", status: "تعديل", hue: "#b45309" },
  { id: 9, code: "M-2026-009", name: "قميص شيك بشق مطرز", collection: "الكاجوال", season: "شتوي", colors: ["موف", "تركواز"], sizes: ["XS", "S", "M", "L"], price: 560, targetCost: 265, designer: "ندى إبراهيم", status: "تصميم", hue: "#0d9488" },
  { id: 10, code: "M-2026-010", name: "سكارف شتوي مفرز", collection: "الإكسسوارات", season: "شتوي", colors: ["بني", "بيج"], sizes: ["مقاس موحد"], price: 180, targetCost: 90, designer: "سارة محمود", status: "فكرة", hue: "#92400e" },
];

export const modelBestsellers = [...models].sort((a, b) => b.price - a.price);

// ---------------- العينات ----------------
export const samples = [
  { id: "SP-1", modelCode: "M-2026-001", version: "V1", date: "2026-04-12", cost: 610, status: "تم التعديل", notes: "تعديل ارتفاع الحمالات وتوسيع فتحة الصدر", fabric: "شيفون + دنتيل", leadTime: 6 },
  { id: "SP-2", modelCode: "M-2026-001", version: "V2", date: "2026-04-28", cost: 655, status: "تم التعديل", notes: "تغيير نوع البطانة وضبط فتحة الظهر", fabric: "شيفون + دنتيل + بطانة", leadTime: 5 },
  { id: "SP-3", modelCode: "M-2026-001", version: "V3", date: "2026-05-10", cost: 690, status: "معتمدة", notes: "اعتمدت العينة النهائية ودخلت غرفة القص", fabric: "شيفون + دنتيل + بطانة", leadTime: 4 },
  { id: "SP-4", modelCode: "M-2026-006", version: "V1", date: "2026-06-02", cost: 330, status: "تم التعديل", notes: "تعديل عرض الكتف وتغيير نوع القماش لمخمل أنعم", fabric: "مخمل", leadTime: 7 },
  { id: "SP-5", modelCode: "M-2026-006", version: "V2", date: "2026-06-18", cost: 360, status: "قيد الاعتماد", notes: "بانتظار اعتماد الإدارة, الرسوم متناسقة", fabric: "مخمل", leadTime: 5 },
  { id: "SP-6", modelCode: "M-2026-008", version: "V1", date: "2026-05-20", cost: 1000, status: "تم التعديل", notes: "الدانتيل المستورد انخفضت جودته — تم تغيير المورد", fabric: "دانتيل استرتش", leadTime: 12 },
  { id: "SP-7", modelCode: "M-2026-008", version: "V2", date: "2026-06-08", cost: 1050, status: "تم التعديل", notes: "تعديل طول الذيل وعدد طبقات التنورة", fabric: "دانتيل استرتش", leadTime: 10 },
  { id: "SP-8", modelCode: "M-2026-008", version: "V3", date: "2026-06-22", cost: 1080, status: "قيد التعديل", notes: "ملاحظة أخيرة على إغلاق السحاب الخلفي", fabric: "دانتيل استرتش", leadTime: 8 },
];

// ---------------- التسويق ----------------
export const campaigns = [
  { id: "C-1001", name: "حملة إطلاق الصيف 2026", model: "M-2026-002", platform: "إنستجرام", budget: 60000, spend: 48500, views: 1850000, engagement: 143000, inquiries: 2860, orders: 940, preOrders: 380, status: "نشطة", hue: "#e1306c" },
  { id: "C-1002", name: "فستان السهرة الأسود", model: "M-2026-001", platform: "تيك توك", budget: 75000, spend: 72000, views: 4200000, engagement: 312000, inquiries: 5240, orders: 1780, preOrders: 620, status: "نشطة", hue: "#0f172a" },
  { id: "C-1003", name: "ويب سيل — الأفراح", model: "M-2026-008", platform: "فيسبوك", budget: 90000, spend: 66000, views: 2100000, engagement: 98000, inquiries: 1610, orders: 230, preOrders: 410, status: "مجدولة", hue: "#1877f2" },
  { id: "C-1004", name: "عودة الشتاء — الجاكيت", model: "M-2026-003", platform: "إنستجرام", budget: 55000, spend: 12000, views: 640000, engagement: 41000, inquiries: 720, orders: 90, preOrders: 150, status: "مجدولة", hue: "#e1306c" },
];

// ---------------- المتجر الإلكتروني ----------------
export const storeProducts = [
  { sku: "TG-001-BLK-M", model: "فستان سهرة بحمالات", name: "فستان سهرة بحمالات — أسود — M", color: "أسود", size: "M", storeStock: 14, systemStock: 14, price: 1650, synced: "متزامن" },
  { sku: "TG-001-MOV-L", model: "فستان سهرة بحمالات", name: "فستان سهرة بحمالات — موف — L", color: "موف", size: "L", storeStock: 6, systemStock: 6, price: 1650, synced: "متزامن" },
  { sku: "TG-002-WHT-M", model: "بلوزة صيفية بياقة V", name: "بلوزة صيفية — أبيض — M", color: "أبيض", size: "M", storeStock: 42, systemStock: 42, price: 420, synced: "متزامن" },
  { sku: "TG-002-SKY-S", model: "بلوزة صيفية بياقة V", name: "بلوزة صيفية — سماوي — S", color: "سماوي", size: "S", storeStock: 8, systemStock: 9, price: 420, synced: "خلل متزامن" },
  { sku: "TG-003-NVY-L", model: "جاكيت رجالي بسحاب", name: "جاكيت رجالي — كحلي — L", color: "كحلي", size: "L", storeStock: 0, systemStock: 4, price: 980, synced: "غير متزامن" },
  { sku: "TG-007-WHT-XL", model: "تيشيرت أوفرسايز", name: "تيشيرت أوفرسايز — أبيض — XL", color: "أبيض", size: "XL", storeStock: 120, systemStock: 120, price: 260, synced: "متزامن" },
];

export const storeOrders = [
  { ordNo: "ST-10921", date: "2026-08-30 11:40", customer: "منى السيد", items: 2, total: 2070, status: "مكتمل", payment: "كارت أونلاين" },
  { ordNo: "ST-10922", date: "2026-08-30 10:12", customer: "حسام الدين عبد الله", items: 1, total: 980, status: "محجوز", payment: "تحويل بنكي" },
  { ordNo: "ST-10923", date: "2026-08-30 09:03", customer: "شيماء عادل", items: 3, total: 1260, status: "جديد", payment: "C.O.D" },
  { ordNo: "ST-10924", date: "2026-08-29 22:45", customer: "كريم مصطفى", items: 1, total: 260, status: "مكتمل", payment: "كارت أونلاين" },
  { ordNo: "ST-10925", date: "2026-08-29 20:17", customer: "دينا فتحي", items: 4, total: 2420, status: "قيد التجهيز", payment: "C.O.D" },
];

export const syncLog = [
  { time: "2026-08-30 11:45", action: "منتج جديد تم نشره", detail: "بلوزة صيفية — بيج — L", status: "نجاح" },
  { time: "2026-08-30 11:30", action: "تحديث مخزون", detail: "14 SKU بين النظام والمتجر", status: "نجاح" },
  { time: "2026-08-30 11:15", action: "استيراد طلب ST-10921", detail: "خصم مخزون وتكوين طلب شحن", status: "نجاح" },
  { time: "2026-08-30 11:00", action: "إعادة محاولة SKU TG-002-SKY-S", detail: "تعارض في كمية المتجر المتاحة", status: "خطأ" },
  { time: "2026-08-30 10:45", action: "تحديث أسعار", detail: "3 منتجات مطابقة للأسعار الحالية", status: "نجاح" },
];

// ---------------- مكونات المنتج BOM ----------------
export const bomPerModel = [
  { modelCode: "M-2026-001", items: [
    { material: "شيفون إيطالي", type: "قماش", consumption: 2.4, unit: "متر", wastePct: 6, unitCost: 145 },
    { material: "دنتيل أزرار", type: "قماش", consumption: 1.1, unit: "متر", wastePct: 4, unitCost: 90 },
    { material: "سحاب 60 سم مخفي", type: "إكسسوار", consumption: 1, unit: "قطعة", wastePct: 2, unitCost: 28 },
    { material: "ليبل مفبرك ناعم", type: "إكسسوار", consumption: 1, unit: "قطعة", wastePct: 0, unitCost: 6 },
    { material: "تيكت حراري", type: "تعبئة", consumption: 1, unit: "قطعة", wastePct: 0, unitCost: 4 },
    { material: "بولي باج", type: "تعبئة", consumption: 1, unit: "قطعة", wastePct: 0, unitCost: 3.5 },
    { material: "كرتونة مقاس 50", type: "تعبئة", consumption: 0.05, unit: "قطعة", wastePct: 0, unitCost: 45 },
  ]},
  { modelCode: "M-2026-002", items: [
    { material: "قطن مصري 100%", type: "قماش", consumption: 1.2, unit: "متر", wastePct: 5, unitCost: 62 },
    { material: "خيط ماكينة", type: "إكسسوار", consumption: 220, unit: "متر", wastePct: 8, unitCost: 0.012 },
    { material: "أزرار دائرية", type: "إكسسوار", consumption: 3, unit: "قطعة", wastePct: 2, unitCost: 2.5 },
    { material: "ليبل رقبة", type: "إكسسوار", consumption: 1, unit: "قطعة", wastePct: 0, unitCost: 2 },
    { material: "تيكت", type: "تعبئة", consumption: 1, unit: "قطعة", wastePct: 0, unitCost: 1.5 },
  ]},
  { modelCode: "M-2026-003", items: [
    { material: "قماش معطف كحلي", type: "قماش", consumption: 2.1, unit: "متر", wastePct: 7, unitCost: 110 },
    { material: "بطانة ساتان", type: "قماش", consumption: 1.8, unit: "متر", wastePct: 5, unitCost: 38 },
    { material: "سحاب معدني طويل", type: "إكسسوار", consumption: 1, unit: "قطعة", wastePct: 2, unitCost: 35 },
    { material: "أزرار معدنية", type: "إكسسوار", consumption: 6, unit: "قطعة", wastePct: 3, unitCost: 4 },
    { material: "شنطة بلاستيك", type: "تعبئة", consumption: 1, unit: "قطعة", wastePct: 0, unitCost: 6 },
  ]},
  { modelCode: "M-2026-005", items: [
    { material: "قماش كارجو زيتي", type: "قماش", consumption: 1.6, unit: "متر", wastePct: 8, unitCost: 78 },
    { material: "خيط معزز", type: "إكسسوار", consumption: 160, unit: "متر", wastePct: 6, unitCost: 0.018 },
    { material: "زر سوستة", type: "إكسسوار", consumption: 1, unit: "قطعة", wastePct: 1, unitCost: 9 },
    { material: "جيب سري", type: "إكسسوار", consumption: 1, unit: "قطعة", wastePct: 3, unitCost: 12 },
  ]},
];

// ---------------- المشتريات والموردون ----------------
export const suppliers = [
  { id: "S-01", name: "مصنع النسيج الحديث", items: "قطن، فيسكوز", paymentTerms: "آجل 45 يوم", debt: 184500, invoices: 12, since: "2023-02", rating: 4.6, phone: "0100-123-4510" },
  { id: "S-02", name: "شركة الحرير للإنتاج", items: "شيفون، ساتان", paymentTerms: "30% مقدماً", debt: 92000, invoices: 8, since: "2024-08", rating: 4.2, phone: "0100-555-7788" },
  { id: "S-03", name: "مؤسسة الدانتيل المصرية", items: "دانتيل مخرم", paymentTerms: "نقداً", debt: 0, invoices: 5, since: "2025-01", rating: 4.8, phone: "0112-000-3344" },
  { id: "S-04", name: "توكيل الإكسسوارات", items: "سوست، أزرار", paymentTerms: "آجل 30 يوم", debt: 44300, invoices: 22, since: "2022-11", rating: 4.4, phone: "0100-987-1234" },
  { id: "S-05", name: "مطابع التغليف", items: "كراتين، تيكت", paymentTerms: "نصف النقد", debt: 12800, invoices: 16, since: "2023-06", rating: 4.0, phone: "0122-333-5566" },
];

export const purchaseOrders = [
  { poNo: "PO-2451", supplier: "مصنع النسيج الحديث", items: "قطن مصري — أبيض", value: 372000, status: "سداد", eta: "مستلم" },
  { poNo: "PO-2452", supplier: "شركة الحرير للإنتاج", items: "شيفون أسود", value: 290000, status: "فاتورة", eta: "2026-09-02" },
  { poNo: "PO-2453", supplier: "مؤسسة الدانتيل المصرية", items: "دانتيل استرتش", value: 154000, status: "فحص", eta: "2026-09-01" },
  { poNo: "PO-2454", supplier: "توكيل الإكسسوارات", items: "سوست مخفية 60سم", value: 62000, status: "أمر شراء", eta: "2026-09-05" },
  { poNo: "PO-2455", supplier: "مطابع التغليف", items: "كراتين 50×40×30", value: 18500, status: "اعتماد", eta: "2026-09-07" },
  { poNo: "PO-2456", supplier: "مصنع النسيج الحديث", items: "قطن — زيتي", value: 96000, status: "طلب شراء", eta: "بانتظار الاعتماد" },
];

// ---------------- القماش والرولات ----------------
export const fabricTypes = ["قطن مصري", "شيفون", "ساتان", "دانتيل", "مخمل", "كارجو"];
export const rolls = [
  { rollNo: "RL-8821", fabric: "قطن مصري", color: "أبيض", batch: "B-1022", length: 120, width: 1.5, weight: 24, supplier: "مصنع النسيج الحديث", location: "رف A-1", used: 72, remaining: 48, status: "متاح" },
  { rollNo: "RL-8822", fabric: "قطن مصري", color: "أبيض", batch: "B-1022", length: 120, width: 1.5, weight: 24, supplier: "مصنع النسيج الحديث", location: "رف A-1", used: 118, remaining: 2, status: "منخفض" },
  { rollNo: "RL-8830", fabric: "شيفون", color: "أسود", batch: "B-1035", length: 95, width: 1.4, weight: 12, supplier: "شركة الحرير للإنتاج", location: "رف B-2", used: 34, remaining: 61, status: "متاح" },
  { rollNo: "RL-8844", fabric: "دانتيل", color: "استرتش", batch: "B-1041", length: 60, width: 1.3, weight: 11, supplier: "مؤسسة الدانتيل المصرية", location: "رف C-1", used: 55, remaining: 5, status: "منخفض" },
  { rollNo: "RL-8850", fabric: "كارجو", color: "زيتي", batch: "B-1050", length: 150, width: 1.5, weight: 33, supplier: "مصنع النسيج الحديث", location: "رف D-3", used: 0, remaining: 150, status: "متاح" },
  { rollNo: "RL-8861", fabric: "مخمل", color: "كحلي", batch: "B-1060", length: 80, width: 1.4, weight: 18, supplier: "شركة الحرير للإنتاج", location: "رف B-3", used: 20, remaining: 60, status: "محجوز" },
];

export const fabricInspections = [
  { id: "QI-551", rollNo: "RL-8850", date: "2026-08-28", checkedLength: 150, checkedWidth: 1.5, weight: 33, defects: 2, grade: "درجة أولى", accepted: 148, rejected: 2, status: "مقبول" },
  { id: "QI-552", rollNo: "RL-8844", date: "2026-08-27", checkedLength: 60, checkedWidth: 1.3, weight: 11, defects: 9, grade: "درجة ثانية", accepted: 54, rejected: 6, status: "مقبول بخصم" },
  { id: "QI-553", rollNo: "RL-8861", date: "2026-08-26", checkedLength: 80, checkedWidth: 1.4, weight: 18, defects: 3, grade: "درجة أولى", accepted: 79, rejected: 1, status: "مقبول" },
];

// ---------------- تخطيط الإنتاج ----------------
export const productionOrders = [
  { poNo: "MO-1101", modelCode: "M-2026-001", model: "فستان سهرة بحمالات", color: "أسود", sizes: { S: 200, M: 320, L: 220, XL: 60 }, total: 800, line: "خط 1", priority: "عالية", start: "2026-08-20", due: "2026-09-10", owner: "محمد عبد العزيز", status: "قيد التنفيذ", progress: 68 },
  { poNo: "MO-1102", modelCode: "M-2026-002", model: "بلوزة صيفية بياقة V", color: "أبيض", sizes: { S: 300, M: 500, L: 200 }, total: 1000, line: "خط 2", priority: "متوسطة", start: "2026-08-18", due: "2026-09-05", owner: "أحمد سامي", status: "مكتمل", progress: 100 },
  { poNo: "MO-1103", modelCode: "M-2026-007", model: "تيشيرت أوفرسايز", color: "أسود", sizes: { M: 400, L: 400, XL: 200, XXL: 100 }, total: 1100, line: "خط 3", priority: "متوسطة", start: "2026-08-22", due: "2026-09-08", owner: "خالد محمود", status: "قيد التنفيذ", progress: 41 },
  { poNo: "MO-1104", modelCode: "M-2026-004", model: "فستان ميدي مربعات", color: "روز", sizes: { XS: 100, S: 150, M: 150, L: 100 }, total: 500, line: "خط 2", priority: "منخفضة", start: "2026-08-25", due: "2026-09-12", owner: "أحمد سامي", status: "مخطط", progress: 0 },
  { poNo: "MO-1105", modelCode: "M-2026-001", model: "فستان سهرة بحمالات", color: "موف", sizes: { S: 150, M: 200, L: 100 }, total: 450, line: "خط 1", priority: "عالية", start: "2026-09-01", due: "2026-09-20", owner: "محمد عبد العزيز", status: "جديد", progress: 0 },
  { poNo: "MO-1106", modelCode: "M-2026-003", model: "جاكيت رجالي بسحاب", color: "كحلي", sizes: { M: 200, L: 300, XL: 100 }, total: 600, line: "خط 4", priority: "عالية", start: "2026-09-03", due: "2026-09-25", owner: "طارق إبراهيم", status: "قيد التنفيذ", progress: 22 },
];

export const planningSources = [
  { source: "طلبات المتجر الإلكتروني", value: 2430, color: "#0e7a62" },
  { source: "طلبات الكول سنتر", value: 1130, color: "#2563eb" },
  { source: "الطلبات المسبقة Pre-orders", value: 1560, color: "#7c3aed" },
  { source: "توقع الذكاء الاصطناعي", value: 1840, color: "#d97706" },
];

export const suggestedProduction = [
  { modelCode: "M-2026-001", model: "فستان سهرة بحمالات", color: "أسود", size: "M", sellable: 320, suggested: 360, reason: "زيادة طلب + حملة تيك توك" },
  { modelCode: "M-2026-001", model: "فستان سهرة بحمالات", color: "موف", size: "L", sellable: 180, suggested: 220, reason: "عجز متوقع في 3 أسابيع" },
  { modelCode: "M-2026-002", model: "بلوزة صيفية بياقة V", color: "أبيض", size: "M", sellable: 500, suggested: 520, reason: "أعلى نسبة دوران" },
  { modelCode: "M-2026-007", model: "تيشيرت أوفرسايز", color: "أسود", size: "XL", sellable: 210, suggested: 280, reason: "موسم مدارس + توقعات AI" },
  { modelCode: "M-2026-003", model: "جاكيت رجالي بسحاب", color: "كحلي", size: "L", sellable: 95, suggested: 300, reason: "استباق موسم الشتاء" },
];

// ---------------- القص ----------------
export const cuttingOrders = [
  { coNo: "CT-301", poNo: "MO-1102", model: "بلوزة صيفية بياقة V", color: "أبيض", rolls: ["RL-8821", "RL-8822"], plies: 60, fabricUsed: 1180, waste: 58, wastePct: 4.7, pieces: 1000, sizes: "S/M/L", date: "2026-08-18", status: "مكتمل" },
  { coNo: "CT-302", poNo: "MO-1103", model: "تيشيرت أوفرسايز", color: "أسود", rolls: ["RL-8830"], plies: 45, fabricUsed: 960, waste: 41, wastePct: 4.1, pieces: 1100, sizes: "M/L/XL/XXL", date: "2026-08-22", status: "قيد التنفيذ" },
  { coNo: "CT-303", poNo: "MO-1101", model: "فستان سهرة بحمالات", color: "أسود", rolls: ["RL-8830", "RL-8831"], plies: 25, fabricUsed: 610, waste: 49, wastePct: 7.4, pieces: 800, sizes: "S/M/L/XL", date: "2026-08-20", status: "مكتمل" },
  { coNo: "CT-304", poNo: "MO-1106", model: "جاكيت رجالي بسحاب", color: "كحلي", rolls: ["RL-8861"], plies: 20, fabricUsed: 420, waste: 35, wastePct: 7.7, pieces: 600, sizes: "M/L/XL", date: "2026-09-01", status: "مخطط" },
];

export const bundles = [
  { bundleNo: "BN-7001", model: "بلوزة صيفية بياقة V", color: "أبيض", size: "M", qty: 25, poNo: "MO-1102", cutDate: "2026-08-18", stage: "خياطة" },
  { bundleNo: "BN-7002", model: "بلوزة صيفية بياقة V", color: "أبيض", size: "S", qty: 25, poNo: "MO-1102", cutDate: "2026-08-18", stage: "تركيب" },
  { bundleNo: "BN-7003", model: "بلوزة صيفية بياقة V", color: "أبيض", size: "M", qty: 25, poNo: "MO-1102", cutDate: "2026-08-19", stage: "تشطيب" },
  { bundleNo: "BN-7101", model: "تيشيرت أوفرسايز", color: "أسود", size: "L", qty: 30, poNo: "MO-1103", cutDate: "2026-08-22", stage: "أوفر" },
  { bundleNo: "BN-7102", model: "تيشيرت أوفرسايز", color: "أسود", size: "M", qty: 30, poNo: "MO-1103", cutDate: "2026-08-23", stage: "خياطة" },
  { bundleNo: "BN-7201", model: "فستان سهرة بحمالات", color: "أسود", size: "L", qty: 20, poNo: "MO-1101", cutDate: "2026-08-20", stage: "تكييف" },
];

// ---------------- خطوط الإنتاج ----------------
export const productionStages = [
  { stage: "القص", color: "#0e7a62" },
  { stage: "الأوفر", color: "#2563eb" },
  { stage: "الخياطة", color: "#7c3aed" },
  { stage: "التركيب", color: "#d97706" },
  { stage: "التشطيب", color: "#dc2626" },
  { stage: "الكي", color: "#0d9488" },
  { stage: "الجودة", color: "#94a3b8" },
];

export const lines = [
  { id: "خط 1", focus: "إيفينق وسهرة", workers: 38, outputToday: 390, target: 420, efficiency: 93, status: "نشط", wip: 1240 },
  { id: "خط 2", focus: "كاجوال", workers: 42, outputToday: 560, target: 500, efficiency: 112, status: "نشط", wip: 980 },
  { id: "خط 3", focus: "تيشيرتات", workers: 28, outputToday: 340, target: 420, efficiency: 81, status: "نشط", wip: 760 },
  { id: "خط 4", focus: "رسمي شتوي", workers: 24, outputToday: 120, target: 220, efficiency: 55, status: "متوقف مؤقتاً للصيانة", wip: 610 },
];

export const workers = [
  { id: "W-221", name: "محمد عبد العزيز", job: "مشرف خط", dept: "الإنتاج", base: 9200, productivity: 95, incentives: 1800, attendance: 97, overtime: 12 },
  { id: "W-342", name: "أحمد سامي", job: "خياط — أوفر", dept: "الخياطة", base: 6100, productivity: 108, incentives: 900, attendance: 99, overtime: 8 },
  { id: "W-371", name: "سارة محمود", job: "تركيبة", dept: "التركيب", base: 7800, productivity: 101, incentives: 1200, attendance: 96, overtime: 6 },
  { id: "W-410", name: "منى خالد", job: "تشطيب", dept: "التشطيب", base: 5600, productivity: 88, incentives: 600, attendance: 93, overtime: 4 },
  { id: "W-455", name: "خالد محمود", job: "مشغل ماكينة كي", dept: "الكي", base: 6400, productivity: 92, incentives: 750, attendance: 95, overtime: 9 },
  { id: "W-502", name: "طارق إبراهيم", job: "مفتش جودة", dept: "الجودة", base: 8200, productivity: 97, incentives: 1000, attendance: 98, overtime: 3 },
];

export const machines = [
  { id: "MC-01", type: "ماكينة أوفر 5 خيوط", line: "خط 1", status: "تعمل", hours: 1280, breakdowns: 2, lastMaintenance: "2026-08-05", next: "2026-09-05" },
  { id: "MC-02", type: "ماكينة مسطحة صناعي", line: "خط 2", status: "تعمل", hours: 2100, breakdowns: 5, lastMaintenance: "2026-08-12", next: "2026-08-31" },
  { id: "MC-03", type: "ماكينة أزرار تصنيف", line: "خط 4", status: "عطل", hours: 940, breakdowns: 3, lastMaintenance: "2026-08-20", next: "—" },
  { id: "MC-04", type: "ماكينة تكييس", line: "خط 3", status: "تعمل", hours: 1500, breakdowns: 1, lastMaintenance: "2026-08-25", next: "2026-09-25" },
];

export const wipByStage = [
  { stage: "القص", bundles: 8, pieces: 610 },
  { stage: "الأوفر", bundles: 14, pieces: 1180 },
  { stage: "الخياطة", bundles: 26, pieces: 2140 },
  { stage: "التركيب", bundles: 12, pieces: 860 },
  { stage: "التشطيب", bundles: 7, pieces: 430 },
  { stage: "الكي", bundles: 5, pieces: 290 },
  { stage: "الجودة", bundles: 3, pieces: 190 },
];

// ---------------- نظام الجودة QC ----------------
export const qcRecords = [
  { id: "QC-771", stage: "فحص الصبغة", model: "فستان سهرة بحمالات", defect: "اختلاف درجة اللون", qty: 12, cause: "دفعة قماش — تباين بسيط", owner: "خط 1", rework: 0, scrap: 12, date: "2026-08-29" },
  { id: "QC-772", stage: "فحص الخياطة", model: "تيشيرت أوفرسايز", defect: "غرزة خراب بعد الأوفر", qty: 18, cause: "شد القماش أثناء التشغيل", owner: "ماكينة MC-02", rework: 16, scrap: 2, date: "2026-08-29" },
  { id: "QC-773", stage: "الفحص النهائي", model: "بلوزة صيفية بياقة V", defect: "بقع على القماش", qty: 30, cause: "قرب رول RL-8822 من نهايته", owner: "خط 2", rework: 24, scrap: 6, date: "2026-08-28" },
  { id: "QC-774", stage: "فحص التركيب", model: "فستان سهرة بحمالات", defect: "ميول السحاب الخلفي", qty: 8, cause: "خطأ في تركيب السوستة", owner: "و. 342", rework: 8, scrap: 0, date: "2026-08-28" },
  { id: "QC-775", stage: "فحص القص", model: "جاكيت رجالي بسحاب", defect: "قص غير مطابق للماركر", qty: 5, cause: "انزلاق طبقات", owner: "CT-304", rework: 0, scrap: 5, date: "2026-08-27" },
];

export const defectByColumn = [
  { stage: "القص", value: 14 },
  { stage: "الخياطة", value: 26 },
  { stage: "التشطيب", value: 19 },
  { stage: "الكي", value: 9 },
  { stage: "الفحص النهائي", value: 21 },
];

// ---------------- المنتج النهائي والمخزون ----------------
export const finishedStock = [
  { model: "فستان سهرة بحمالات", color: "أسود", size: "M", available: 14, reserved: 6, sold: 214, inProduction: 320, returnable: 2 },
  { model: "فستان سهرة بحمالات", color: "أسود", size: "L", available: 6, reserved: 4, sold: 142, inProduction: 220, returnable: 0 },
  { model: "فستان سهرة بحمالات", color: "موف", size: "L", available: 9, reserved: 2, sold: 78, inProduction: 100, returnable: 1 },
  { model: "بلوزة صيفية بياقة V", color: "أبيض", size: "M", available: 42, reserved: 8, sold: 512, inProduction: 500, returnable: 6 },
  { model: "بلوزة صيفية بياقة V", color: "سماوي", size: "S", available: 9, reserved: 1, sold: 198, inProduction: 0, returnable: 3 },
  { model: "جاكيت رجالي بسحاب", color: "كحلي", size: "L", available: 4, reserved: 6, sold: 41, inProduction: 300, returnable: 0 },
  { model: "تيشيرت أوفرسايز", color: "أبيض", size: "XL", available: 120, reserved: 30, sold: 860, inProduction: 0, returnable: 22 },
  { model: "تيشيرت أوفرسايز", color: "أسود", size: "XL", available: 45, reserved: 18, sold: 340, inProduction: 200, returnable: 8 },
];

// ---------------- الكول سنتر ----------------
export const callRequests = [
  { reqNo: "CC-9001", customer: "أميرة محمد", model: "فستان سهرة بحمالات", color: "أسود", size: "M", qty: 1, availableNow: 14, fromReturns: 2, fromProduction: 320, eta: "متاح الآن", status: "محجوز" },
  { reqNo: "CC-9002", customer: "هالة عبد الرحمن", model: "فستان سهرة بحمالات", color: "موف", size: "L", qty: 2, availableNow: 9, fromReturns: 1, fromProduction: 100, eta: "جارٍ التحقق من ATP", status: "قيد المعالجة" },
  { reqNo: "CC-9003", customer: "يوسف سالم", model: "جاكيت رجالي بسحاب", color: "كحلي", size: "L", qty: 1, availableNow: 4, fromReturns: 0, fromProduction: 300, eta: "متاح الآن", status: "قيد المعالجة" },
  { reqNo: "CC-9004", customer: "رنا الشافعي", model: "تيشيرت أوفرسايز", color: "أبيض", size: "XL", qty: 3, availableNow: 120, fromReturns: 22, fromProduction: 0, eta: "متاح الآن", status: "محجوز" },
  { reqNo: "CC-9005", customer: "مصطفى كامل", model: "بلوزة صيفية بياقة V", color: "أبيض", size: "M", qty: 10, availableNow: 42, fromReturns: 6, fromProduction: 500, eta: "متاح خلال 3 أيام", status: "جارٍ المعالجة" },
];

export const atpExample = { qty: 10, availableNow: 4, fromReturns: 2, fromProduction: 4, reserved: 0 };

// ---------------- المرتجعات ----------------
export const returns = [
  { rNo: "RT-3301", ordNo: "ST-10910", customer: "منى السيد", model: "فستان سهرة بحمالات", reason: "تغيّر المقاس", qty: 1, classification: "صالح للبيع", refund: 1650, status: "عاد للمخزون", date: "2026-08-29" },
  { rNo: "RT-3302", ordNo: "CC-8803", customer: "سلمى حسن", model: "تيشيرت أوفرسايز", reason: "عيب بسيط بالخياطة", qty: 2, classification: "إعادة تشطيب", refund: 520, status: "في التشطيب", date: "2026-08-29" },
  { rNo: "RT-3303", ordNo: "ST-10902", customer: "كريم مصطفى", model: "بلوزة صيفية بياقة V", reason: "احتكاك وتساقط أزرار", qty: 1, classification: "تالف", refund: 0, status: "خسارة Scrap", date: "2026-08-28" },
  { rNo: "RT-3304", ordNo: "CC-8801", customer: "وفاء أحمد", model: "بلوزة صيفية بياقة V", reason: "مقاس غير مناسب", qty: 3, classification: "صالح للبيع", refund: 1260, status: "عاد للمخزون", date: "2026-08-27" },
  { rNo: "RT-3305", ordNo: "ST-10895", customer: "حسام الدين عبد الله", model: "جاكيت رجالي بسحاب", reason: "لون مختلف عن الصورة", qty: 1, classification: "إعادة تشطيب", refund: 980, status: "تحت الفحص", date: "2026-08-27" },
];

export const returnsFlow = [
  { step: "استلام المرتجع", state: "done" },
  { step: "الفحص والتصنيف", state: "on" },
  { step: "صالح للبيع → المخزون", state: "done" },
  { step: "إعادة تشطيب → Rework", state: "on" },
  { step: "تالف → Scrap / Loss", state: "on" },
];

// ---------------- المبيعات والشحن ----------------
export const salesOrders = [
  { ordNo: "SO-2201", customer: "أميرة محمد", products: "فستان سهرة — أسود — M", qty: 1, total: 1650, payment: "كاش عند الاستلام", status: "شحن", shipping: "سريعة", tracking: "TRK-88412", date: "2026-08-30" },
  { ordNo: "SO-2202", customer: "إيمان جمعة", products: "فستان سهرة — موف — L", qty: 2, total: 3300, payment: "محفظة إلكترونية", status: "تعبئة", shipping: "سريعة", tracking: "—", date: "2026-08-30" },
  { ordNo: "SO-2203", customer: "يوسف سالم", products: "جاكيت رجالي — كحلي — L", qty: 1, total: 980, payment: "تحويل", status: "تسليم", shipping: "عادية", tracking: "TRK-88391", date: "2026-08-29" },
  { ordNo: "SO-2204", customer: "رنا الشافعي", products: "تيشيرت أوفرسايز — أبيض — XL", qty: 3, total: 780, payment: "كاش عند الاستلام", status: "تجهيز", shipping: "سريعة", tracking: "—", date: "2026-08-30" },
  { ordNo: "SO-2205", customer: "مصطفى كامل", products: "بلوزة صيفية — أبيض — M", qty: 10, total: 4200, payment: "تحويل — دفعة مقدمة 50%", status: "حجز", shipping: "قطاعي", tracking: "—", date: "2026-08-30" },
];

export const orderStats = {
  new: 6, reserved: 4, preparing: 3, packed: 2, shipped: 6, delivered: 41,
};

// ---------------- الحسابات والخزينة ----------------
export const cashflow = [
  { month: "مارس", revenue: 1240000, expense: 780000 },
  { month: "أبريل", revenue: 980000, expense: 710000 },
  { month: "مايو", revenue: 1320000, expense: 690000 },
  { month: "يونيو", revenue: 1180000, expense: 760000 },
  { month: "يوليو", revenue: 1640000, expense: 820000 },
  { month: "أغسطس", revenue: 1910000, expense: 840000 },
];

export const expenseCategories = [
  { name: "أجور", value: 310000 },
  { name: "قماش وخامات", value: 284000 },
  { name: "إيجار", value: 65000 },
  { name: "تسويق", value: 72000 },
  { name: "كهرباء ومياه", value: 48000 },
  { name: "صيانة", value: 19500 },
  { name: "نقل وشحن", value: 27000 },
  { name: "أخرى", value: 12500 },
];

export const accounts = [
  { name: "خزينة المصنع", type: "نقدي", balance: 124000, flows: { in: 214000, out: 90200 } },
  { name: "بنك — كاش", type: "بنكي", balance: 1860000, flows: { in: 1450000, out: 400000 } },
  { name: "بنك — بزنس", type: "بنكي", balance: 640000, flows: { in: 620000, out: 118000 } },
  { name: "محفظة إلكترونية", type: "محفظة", balance: 18500, flows: { in: 92000, out: 73500 } },
];

export const treasuryMoves = [
  { id: "MV-501", date: "2026-08-30", type: "تحصيل", desc: "تحصيل متجر — ST-10921", amount: 2070, account: "محفظة إلكترونية" },
  { id: "MV-502", date: "2026-08-30", type: "مدفوعات", desc: "سداد مورد — الدانتيل", amount: -154000, account: "بنك — كاش" },
  { id: "MV-503", date: "2026-08-29", type: "تحويل", desc: "نقل من الخزينة للبنك", amount: -50000, account: "خزينة المصنع" },
  { id: "MV-504", date: "2026-08-29", type: "إيداع", desc: "محصل مبيعات اليوم", amount: 54000, account: "خزينة المصنع" },
  { id: "MV-505", date: "2026-08-29", type: "سحوبات", desc: "مصروفات تشغيلية", amount: -18000, account: "بنك — كاش" },
];

// ---------------- الموارد البشرية والمرتبات ----------------
export const employees = [
  { id: "EMP-01", name: "محمد عبد العزيز", job: "مشرف خط إنتاج", dept: "الإنتاج", base: 9200, allowances: 800, incentives: 1800, overtime: 450, deductions: 0, loans: 1000, absenceDays: 0, net: 11250 },
  { id: "EMP-02", name: "أحمد سامي", job: "خياط — أوفر", dept: "الخياطة", base: 6100, allowances: 200, incentives: 900, overtime: 300, deductions: 150, loans: 0, absenceDays: 0, net: 7350 },
  { id: "EMP-03", name: "سارة محمود", job: "تركيبة", dept: "التركيب", base: 7800, allowances: 300, incentives: 1200, overtime: 220, deductions: 0, loans: 500, absenceDays: 1, net: 9020 },
  { id: "EMP-04", name: "منى خالد", job: "تشطيب", dept: "التشطيب", base: 5600, allowances: 150, incentives: 600, overtime: 150, deductions: 80, loans: 0, absenceDays: 2, net: 6220 },
  { id: "EMP-05", name: "خالد محمود", job: "تشغيل ماكينة كي", dept: "الكي", base: 6400, allowances: 200, incentives: 750, overtime: 350, deductions: 0, loans: 0, absenceDays: 0, net: 7700 },
  { id: "EMP-06", name: "طارق إبراهيم", job: "مفتش جودة", dept: "الجودة", base: 8200, allowances: 400, incentives: 1000, overtime: 120, deductions: 100, loans: 0, absenceDays: 0, net: 9620 },
];

export const attendanceSummary = {
  present: 142, absent: 6, overtimeHours: 124, avgAttendance: 96.2,
};

// ---------------- تكلفة المنتج ----------------
export const costing = [
  { modelCode: "M-2026-001", model: "فستان سهرة بحمالات", est: { fabric: 415, accessories: 92, labor: 130, cutting: 24, ironing: 12, packing: 17, waste: 20, overhead: 96 }, act: { fabric: 438, accessories: 101, labor: 128, cutting: 22, ironing: 11, packing: 17, waste: 34, overhead: 104 }, price: 1650 },
  { modelCode: "M-2026-002", model: "بلوزة صيفية بياقة V", est: { fabric: 108, accessories: 16, labor: 38, cutting: 7, ironing: 4, packing: 6, waste: 6, overhead: 24 }, act: { fabric: 111, accessories: 16, labor: 37, cutting: 6, ironing: 4, packing: 6, waste: 10, overhead: 25 }, price: 420 },
  { modelCode: "M-2026-003", model: "جاكيت رجالي بسحاب", est: { fabric: 265, accessories: 45, labor: 78, cutting: 18, ironing: 9, packing: 11, waste: 16, overhead: 52 }, act: { fabric: 270, accessories: 47, labor: 74, cutting: 17, ironing: 8, packing: 11, waste: 24, overhead: 55 }, price: 980 },
  { modelCode: "M-2026-007", model: "تيشيرت أوفرسايز", est: { fabric: 63, accessories: 9, labor: 22, cutting: 4, ironing: 2, packing: 4, waste: 4, overhead: 14 }, act: { fabric: 64, accessories: 9, labor: 21, cutting: 4, ironing: 2, packing: 4, waste: 7, overhead: 14 }, price: 260 },
];

// ---------------- الصيانة ----------------
export const maintenance = [
  { id: "MT-1001", asset: "ماكينة MC-02 — مسطحة", type: "وقائية", last: "2026-08-12", next: "2026-08-31", cost: 2400, status: "قريبة" },
  { id: "MT-1002", asset: "ماكينة MC-01 — أوفر", type: "وقائية", last: "2026-08-05", next: "2026-09-05", cost: 1800, status: "مجدولة" },
  { id: "MT-1003", asset: "سيارة التوزيع 2", type: "وقائية", last: "2026-08-01", next: "2026-09-01", cost: 3500, status: "مجدولة" },
  { id: "MT-1004", asset: "ماكينة MC-03 — أزرار", type: "عطل", last: "2026-08-20", next: "عاجلة", cost: 4200, status: "عاجلة" },
  { id: "MT-1005", asset: "كمبريسور الهواء", type: "وقائية", last: "2026-07-20", next: "2026-09-15", cost: 2800, status: "مجدولة" },
];

// ---------------- التقارير / الذكاء الاصطناعي ----------------
export const aiAssistant = {
  greeting: "أهلاً بك، أنا المساعد الذكي لنظام ثيتا. يمكنني الإجابة عن أي سؤال حول الإنتاج والمخزون والمبيعات والتكلفة.",
  questions: [
    "ما أكثر 10 موديلات مبيعًا هذا الشهر؟",
    "كم قيمة المخزون الحالي؟",
    "ما كمية القماش الأسود المتوفرة؟",
    "ما أكثر خط إنتاج إنتاجية؟",
    "ما نسبة الهالك هذا الشهر؟",
    "ما الموديلات التي يجب زيادة إنتاجها؟",
  ],
};

export const forecast = [
  { month: "سبتمبر", orders: 980, forecast: 1250 },
  { month: "أكتوبر", orders: 1240, forecast: 1480 },
  { month: "نوفمبر", orders: 1310, forecast: 1720 },
  { month: "ديسمبر", orders: 1900, forecast: 2240 },
];

// ---------------- المستخدمون والصلاحيات ----------------
export const roleMatrix = [
  { role: "الإدارة", all: true, data: "كل البيانات والتقارير" },
  { role: "الإنتاج", desc: "التخطيط وأوامر الإنتاج", pages: ["تخطيط الإنتاج", "أوامر الإنتاج", "الخطوط", "القص"] },
  { role: "المخازن", desc: "الاستلام والصرف والمخزون", pages: ["القماش", "الرولات", "المخزون النهائي"] },
  { role: "الكول سنتر", desc: "العملاء والطلبات والحجوزات", pages: ["العملاء", "الحجوزات", "ATP"] },
  { role: "الجودة", desc: "عمليات الجودة QC", pages: ["فحص الخامات", "فحص الإنتاج", "الفحص النهائي"] },
  { role: "الموارد البشرية", desc: "الموظفون والحضور والمرتبات", pages: ["الموظفون", "الحضور", "المرتبات"] },
  { role: "الحسابات", desc: "المصروفات والتحصيلات", pages: ["الإيرادات", "المصروفات", "الخزينة"] },
  { role: "المبيعات والتسويق", desc: "المبيعات والمنتجات والحملات", pages: ["المبيعات", "الحملات", "المنتجات"] },
];

export const users = [
  { id: "U-01", name: "أ. محمد الشريف", role: "الإدارة", email: "md@theta-tex.com", lastLogin: "2026-08-30 11:20", status: "نشط" },
  { id: "U-02", name: "أ. حسام الدين", role: "الإنتاج", email: "hos@theta-tex.com", lastLogin: "2026-08-30 09:40", status: "نشط" },
  { id: "U-03", name: "أ. رانيا فؤاد", role: "الكول سنتر", email: "ran@theta-tex.com", lastLogin: "2026-08-30 11:45", status: "نشط" },
  { id: "U-04", name: "أ. عمرو حسين", role: "الحسابات", email: "amr@theta-tex.com", lastLogin: "2026-08-29 16:10", status: "نشط" },
  { id: "U-05", name: "أ. مي صلاح", role: "الموارد البشرية", email: "mai@theta-tex.com", lastLogin: "2026-08-28 13:00", status: "غير نشط" },
];