import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { ShoppingBag, PackageCheck, Truck, Banknote, Undo2, ClipboardList } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Callout, statusTone, StatusBadge,
} from "../components/ui.jsx";
import { salesOrders, orderStats, fmtMoney } from "../data/mock.js";

const orderPie = [
  { name: "جديد", value: orderStats.new, hue: "#94a3b8" },
  { name: "حجز", value: orderStats.reserved, hue: "#d97706" },
  { name: "تجهيز", value: orderStats.preparing, hue: "#2563eb" },
  { name: "تعبئة", value: orderStats.packed, hue: "#7c3aed" },
  { name: "شحن", value: orderStats.shipped, hue: "#0e7a62" },
  { name: "تسليم", value: orderStats.delivered, hue: "#16a34a" },
];

const TOOLTIP = ({ active, payload }) =>
  active && payload?.length ? (
    <div className="card tight" style={{ padding: "8px 12px", fontSize: 12 }}>
      <strong>{payload[0].name}</strong>
      <div className="muted">{payload[0].value} طلب</div>
    </div>
  ) : null;

export default function Sales() {
  const shippedTotal = salesOrders.reduce((a, o) => a + o.total, 0);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="المبيعات والشحن"
        subtitle="دورة الطلب: الطلب ← الحجز ← التجهيز ← التعبئة ← الشحن ← التسليم — مع التحصيل والمرتجع"
        actions={
          <>
            <button className="btn btn-ghost">دفتر الشحن</button>
            <button className="btn btn-primary"><ClipboardList size={15} /> طلب مبيعات</button>
          </>
        }
      />

      <div className="grid cols-4">
        <StatCard tone="info" icon={<ShoppingBag />} label="طلبات اليوم" value="14" sub="إجمالي 44,900 ج.م" />
        <StatCard tone="brand" icon={<PackageCheck />} label="بحاجة للتجهيز" value={orderStats.preparing + orderStats.reserved + orderStats.new} sub="بانتظار المخزون" />
        <StatCard tone="ok" icon={<Truck />} label="في الشحن" value={orderStats.shipped} sub="شركتا شحن" />
        <StatCard tone="warn" icon={<Banknote />} label="تحصيل مستحق" value="18,400 ج.م" sub="بينها C.O.D" />
      </div>

      <div className="grid cols-2">
        <Card title="حالة الطلبات الحالية">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={orderPie} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={2}>
                {orderPie.map((e) => <Cell key={e.name} fill={e.hue} />)}
              </Pie>
              <Tooltip content={<TOOLTIP />} />
              <Legend iconType="circle" formatter={(v) => <span style={{ fontSize: 12, fontWeight: 700, color: "#475569" }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="دورة الطلب الكاملة">
          <div className="flow">
            {["الطلب", "الحجز", "التجهيز", "التعبئة", "الشحن", "التسليم"].map((s, i) => (
              <React.Fragment key={s}>
                {i > 0 && <span className="sep">←</span>}
                <span className="step done">{s}</span>
              </React.Fragment>
            ))}
          </div>
          <div className="divider" />
          <div className="stack">
            <div className="flex-between">
              <span className="flex"><Undo2 size={14} color="var(--warn)" /> مرتجع من الشحن</span>
              <Badge tone="warn">3 طلبات في التفتيش</Badge>
            </div>
            <div className="flex-between">
              <span>قيمة طلبات اليوم</span>
              <strong>{fmtMoney(44900)}</strong>
            </div>
            <div className="flex-between">
              <span>متوسط زمن التحضير</span>
              <strong>4 ساعات</strong>
            </div>
            <Callout type="info" title="تكامل مباشر">
              عند التسليم الناجح يُدخل المبلغ تلقائيًا في الحسابات (تحصيل C.O.D) ويُغلق المرتجع إن لم يُستلم.
            </Callout>
          </div>
        </Card>
      </div>

      <Card title="أوامر المبيعات" subtitle="العميل · المنتجات · الكميات · شركة الشحن · رقم الشحنة · التحصيل · المرتجع">
        <DataTable
          keyField="ordNo"
          rows={salesOrders}
          columns={[
            { key: "ordNo", label: "الأمر", render: (r) => <span className="mono">{r.ordNo}</span> },
            { key: "customer", label: "العميل", render: (r) => <span className="semibold">{r.customer}</span> },
            { key: "products", label: "المنتجات", render: (r) => (
              <div>
                <div className="small">{r.products}</div>
                <div className="muted small">{r.qty} قطعة</div>
              </div>
            ) },
            { key: "total", label: "القيمة", render: (r) => <strong>{fmtMoney(r.total)}</strong> },
            { key: "payment", label: "الدفع", render: (r) => <span className="small">{r.payment}</span> },
            { key: "shipping", label: "الشحن", render: (r) => (
              <span className="small">{r.shipping}{r.tracking !== "—" ? ` · ${r.tracking}` : ""}</span>
            ) },
            { key: "status", label: "الحالة", render: (r) => <StatusBadge s={r.status} /> },
          ]}
        />
      </Card>
    </div>
  );
}