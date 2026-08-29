import React from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  Factory, Package, ShoppingBag, Headset, Banknote, Wallet,
  AlertTriangle, PackageX, Undo2, ArrowUpLeft, ArrowDownLeft,
} from "lucide-react";
import {
  PageHeader, StatCard, Card, StatusBadge, Badge, Progress, Callout,
} from "../components/ui.jsx";
import {
  cashflow, expenseCategories, productionOrders, models, finishedStock, returns,
} from "../data/mock.js";

const deliveryTrend = [
  { day: "01", مبيعات: 182000, إنتاج: 1410 },
  { day: "04", مبيعات: 214000, إنتاج: 1520 },
  { day: "07", مبيعات: 237000, إنتاج: 1680 },
  { day: "10", مبيعات: 205000, إنتاج: 1600 },
  { day: "13", مبيعات: 289000, إنتاج: 1790 },
  { day: "16", مبيعات: 312000, إنتاج: 1810 },
  { day: "19", مبيعات: 276000, إنتاج: 1740 },
  { day: "22", مبيعات: 334000, إنتاج: 1820 },
  { day: "25", مبيعات: 356000, إنتاج: 1870 },
  { day: "28", مبيعات: 328000, إنتاج: 1820 },
  { day: "30", مبيعات: 391000, إنتاج: 1890 },
];

const modelSales = [
  { name: "تيشيرت أوفرسايز", value: 1280, hue: "#0e7a62" },
  { name: "بلوزة صيفية", value: 915, hue: "#2563eb" },
  { name: "فستان سهرة", value: 634, hue: "#7c3aed" },
  { name: "جاكيت رجالي", value: 210, hue: "#d97706" },
  { name: "أخرى", value: 132, hue: "#94a3b8" },
];

const targetVsActual = [
  { name: "خط 1", target: 420, actual: 390 },
  { name: "خط 2", target: 500, actual: 560 },
  { name: "خط 3", target: 420, actual: 340 },
  { name: "خط 4", target: 220, actual: 120 },
];

const staggeredOrders = [
  { name: "جديد", value: 6, hue: "#94a3b8" },
  { name: "حجز", value: 4, hue: "#d97706" },
  { name: "تجهيز", value: 3, hue: "#2563eb" },
  { name: "تعبئة", value: 2, hue: "#7c3aed" },
  { name: "شحن", value: 6, hue: "#0e7a62" },
  { name: "تسليم", value: 41, hue: "#16a34a" },
];

const PIETOOLTIP = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const p = payload[0];
    return (
      <div className="card tight" style={{ padding: "8px 12px", fontSize: 12 }}>
        <strong>{p.name}</strong>
        <div className="muted">{p.value.toLocaleString("en-US")}</div>
      </div>
    );
  }
  return null;
};

const TOOLTIP = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="card tight" style={{ padding: "8px 12px", fontSize: 12 }}>
        <strong>{label}</strong>
        {payload.map((p, i) => (
          <div key={i} className="muted">
            {p.name}: {p.value.toLocaleString("en-US")}
            {p.name === "مبيعات" ? " ج.م" : " قطعة"}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const lowStock = finishedStock.filter((f) => f.available <= 10);
  const delayedOrders = [];
  const pendingReturns = returns.filter((r) => r.status === "تحت الفحص" || r.status === "في التشطيب");

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="لوحة الإدارة الرئيسية"
        subtitle="رؤية لحظية لحالة المصنع اليوم — جمعة 30 أغسطس 2026"
        actions={
          <>
            <button className="btn btn-ghost">تقرير اليوم PDF</button>
            <button className="btn btn-primary">طلب إنتاج جديد</button>
          </>
        }
      />

      <div className="grid cols-4">
        <StatCard
          tone="brand"
          icon={<Factory />}
          label="الإنتاج اليومي"
          value="1,890"
          sub="مستهدف 1,560 — تجاوز بنسبة 21%"
          trend="up"
        />
        <StatCard
          tone="ok"
          icon={<ShoppingBag />}
          label="مبيعات اليوم"
          value="391,000 ج.م"
          sub="أعلى يوم في آخر 30 يوم"
          trend="up"
        />
        <StatCard
          tone="info"
          icon={<Package />}
          label="طلبات المتجر"
          value="56"
          sub="6 جديد اليوم"
          trend="up"
        />
        <StatCard
          tone="purple"
          icon={<Headset />}
          label="طلبات الكول سنتر"
          value="31"
          sub="5 قيد المعالجة"
        />
        <StatCard
          tone="warn"
          icon={<Banknote />}
          label="إيرادات الشهر"
          value="1.91 مليون ج.م"
          sub="استهدف 1.7 مليون"
          trend="up"
        />
        <StatCard
          tone="brand"
          icon={<Wallet />}
          label="الخزينة والبنوك"
          value="2.63 مليون ج.م"
          sub="صافي متاح"
        />
        <StatCard
          tone="danger"
          icon={<AlertTriangle />}
          label="أوامر متأخرة"
          value="2"
          sub="تتطلب تدخل الإدارة"
        />
        <StatCard
          tone="warn"
          icon={<PackageX />}
          label="مخزون منخفض"
          value="3 SKU"
          sub="أقل من حد الأمان"
        />
      </div>

      <div className="grid cols-2">
        <Card
          title="مبيعات وإنتاج (آخر 30 يوم)"
          subtitle="قيمة المبيعات مقابل الإنتاج اليومي"
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={deliveryTrend}>
              <defs>
                <linearGradient id="gSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0e7a62" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#0e7a62" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => (v >= 1000 ? `${v / 1000}ك` : v)} />
              <Tooltip content={<TOOLTIP />} />
              <Area type="monotone" dataKey="مبيعات" stroke="#0e7a62" fill="url(#gSales)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="إنتاج" stroke="#2563eb" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="حالة الطلبات الحالية">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={staggeredOrders}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
              >
                {staggeredOrders.map((e) => (
                  <Cell key={e.name} fill={e.hue} />
                ))}
              </Pie>
              <Tooltip content={<PIETOOLTIP />} />
              <Legend
                layout="vertical"
                align="left"
                verticalAlign="middle"
                iconType="circle"
                formatter={(v) => <span style={{ fontSize: 12, fontWeight: 700, color: "#475569" }}>{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid cols-2">
        <Card title="المستهدف مقابل الفعلي — حسب خط الإنتاج">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={targetVsActual} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#475569" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TOOLTIP />} />
              <Bar dataKey="target" fill="#e2e8f0" radius={[5, 5, 0, 0]} name="المستهدف" />
              <Bar dataKey="actual" fill="#0e7a62" radius={[5, 5, 0, 0]} name="الفعلي" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="أكثر الموديلات مبيعًا (الكمية)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={modelSales} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 12, fill: "#475569" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TOOLTIP />} />
              <Bar dataKey="value" name="الكمية" radius={[0, 6, 6, 0]}>
                {modelSales.map((e) => (
                  <Cell key={e.name} fill={e.hue} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid cols-3">
        <Card
          title="تنبيهات الإدارة"
          subtitle="تحتاج إلى إجراء اليوم"
          actions={<Badge tone="danger">4</Badge>}
        >
          <div className="stack">
            <Callout type="danger" title="أمر إنتاج متأخر MO-1106">
              خط 4 متوقف جزئيًا بسبب عطل ماكينة MC-03 — تأخير متوقع.
            </Callout>
            <Callout type="warn" title="مخزون قماش منخفض">
              2 رولات شيفون أسود قاربت على الانتهاء — أمر الشراء PO-2452 قيد الفحص.
            </Callout>
            <Callout type="warn" title={`مرتجعات تحت الفحص (${pendingReturns.length})`}>
              منتجات في انتظار التصنيف لتعود إلى المخزون القابل للبيع.
            </Callout>
            <Callout type="info" title="حملة فستان السهرة تجاوزت 4.2 مليون مشاهدة">
              1,780 طلبًا و 620 طلبًا مسبقًا — يُقترح رفع أمر إنتاج MO-1105.
            </Callout>
          </div>
        </Card>

        <Card title="أوامر الإنتاج الجارية">
          <div className="stack">
            {productionOrders
              .filter((o) => o.status === "قيد التنفيذ")
              .slice(0, 4)
              .map((o) => (
                <div key={o.poNo} style={{ borderBottom: "1px solid #eef2f7", paddingBottom: 10 }}>
                  <div className="flex-between">
                    <div>
                      <div className="semibold">{o.model}</div>
                      <div className="muted small">
                        {o.color} · {o.total.toLocaleString("en-US")} قطعة · خط {o.line}
                      </div>
                    </div>
                    <StatusBadge s={o.status} />
                  </div>
                  <Progress value={o.progress} label={`${o.progress}%`} />
                  <div className="muted small" style={{ marginTop: 4 }}>
                    تسليم: {o.due}
                  </div>
                </div>
              ))}
          </div>
        </Card>

        <Card title="ملخص المخزون">
          <div className="stack">
            <div className="flex-between">
              <span>المنتجات النهائية المتاحة</span>
              <strong>{finishedStock.reduce((a, b) => a + b.available, 0).toLocaleString("en-US")} قطعة</strong>
            </div>
            <div className="flex-between">
              <span>تحت التشغيل (WIP)</span>
              <strong>5,210 قطعة</strong>
            </div>
            <div className="flex-between">
              <span>محجوزة للطلبات</span>
              <strong>{finishedStock.reduce((a, b) => a + b.reserved, 0).toLocaleString("en-US")} قطعة</strong>
            </div>
            <div className="flex-between">
              <span>مرتجعات صالحة للبيع</span>
              <strong>{finishedStock.reduce((a, b) => a + b.returnable, 0).toLocaleString("en-US")} قطعة</strong>
            </div>
            <div className="flex-between">
              <span>القيمة التقديرية للمخزون</span>
              <strong className="brand" style={{ color: "var(--brand)" }}>4.2 مليون ج.م</strong>
            </div>
            <div className="divider" />
            <div className="small semibold muted">SKU تحت حد الأمان</div>
            {lowStock.slice(0, 3).map((f) => (
              <div key={f.model + f.color + f.size} className="flex-between small">
                <span>{f.model} — {f.color} — {f.size}</span>
                <strong style={{ color: "var(--danger)" }}>{f.available} متاح</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid cols-3">
        <Card title="مصروفات الشهر">
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie data={expenseCategories} dataKey="value" outerRadius={80}>
                {expenseCategories.map((e, i) => (
                  <Cell key={i} fill={["#0e7a62", "#2563eb", "#d97706", "#7c3aed", "#dc2626", "#0d9488", "#94a3b8", "#f59e0b"][i]} />
                ))}
              </Pie>
              <Tooltip content={<PIETOOLTIP />} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="التدفق النقدي — آخر 6 شهور">
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={cashflow}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis hide tickFormatter={(v) => `${Math.round(v / 1000)}ك`} />
              <Tooltip content={<TOOLTIP />} />
              <Area type="monotone" dataKey="revenue" name="إيرادات" stroke="#16a34a" strokeWidth={2} fill="#dcfce7" />
              <Area type="monotone" dataKey="expense" name="مصروفات" stroke="#dc2626" strokeWidth={1.5} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="مؤشرات سريعة" subtitle="مستردة من كل الأنظمة">
          <div className="stack">
            <div className="flex-between">
              <span className="flex"><ArrowUpLeft size={15} color="var(--ok)" /> تحصيلات اليوم</span>
              <strong>196,000 ج.م</strong>
            </div>
            <div className="flex-between">
              <span className="flex"><ArrowDownLeft size={15} color="var(--danger)" /> مدفوعات اليوم</span>
              <strong>172,000 ج.م</strong>
            </div>
            <div className="flex-between">
              <span>نسبة الهالك في القص (الشهر)</span>
              <strong className="muted">4.9%</strong>
            </div>
            <div className="flex-between">
              <span>نسبة الحضور اليوم</span>
              <strong className="muted">96.2%</strong>
            </div>
            <div className="flex-between">
              <span>الطلبات الجاهزة للتسليم</span>
              <Badge tone="ok">12 طلب</Badge>
            </div>
            <div className="flex-between">
              <span>طلبات تنتظر الإنتاج</span>
              <Badge tone="warn">8 طلبات</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}