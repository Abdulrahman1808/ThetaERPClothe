import React from "react";
import { Truck, Star, FileText, Wallet, TrendingUp } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Callout, FlowSteps, StatusBadge,
} from "../components/ui.jsx";
import { suppliers, purchaseOrders, fmtMoney } from "../data/mock.js";

const cycle = [
  { step: "طلب شراء", state: "done" },
  { step: "اعتماد", state: "done" },
  { step: "أمر شراء", state: "done" },
  { step: "استلام", state: "done" },
  { step: "فحص", state: "on" },
  { step: "فاتورة", state: "on" },
  { step: "سداد", state: "done" },
];

export default function Purchasing() {
  const totalDebt = suppliers.reduce((a, s) => a + s.debt, 0);
  const inFlow = purchaseOrders.filter((p) => p.status !== "سداد").length;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="المشتريات والموردون"
        subtitle="دورة الشراء كاملة من طلب الشراء حتى السداد مع إدارة الموردين ومديونياتهم"
        actions={
          <>
            <button className="btn btn-ghost">تقييم الموردين</button>
            <button className="btn btn-primary">طلب شراء جديد</button>
          </>
        }
      />

      <div className="grid cols-4">
        <StatCard tone="info" icon={<Truck />} label="أوامر شراء في الدورة" value={fmtMoney(inFlow)} sub="6 أوامر جارية" />
        <StatCard tone="warn" icon={<Wallet />} label="مديونية للموردين" value={fmtMoney(totalDebt)} sub="عبر 5 موردين" />
        <StatCard tone="brand" icon={<FileText />} label="فواتير شراء (الشهر)" value="41" sub="قيمة 1.9 مليون ج.م" />
        <StatCard tone="ok" icon={<TrendingUp />} label="متوسط تقييم الموردين" value="4.4 / 5" sub="لآخر 3 أشهر" />
      </div>

      <Card title="دورة الشراء" subtitle="مسار أي طلب من الاحتياج حتى السداد">
        <FlowSteps steps={cycle} />
      </Card>

      <div className="grid cols-1">
        <Card title="أوامر الشراء" subtitle="الحالة الحالية لكل أمر">
          <DataTable
            keyField="poNo"
            rows={purchaseOrders}
            columns={[
              { key: "poNo", label: "رقم الأمر", render: (r) => <span className="mono">{r.poNo}</span> },
              { key: "supplier", label: "المورد", render: (r) => <span className="semibold">{r.supplier}</span> },
              { key: "items", label: "الأصناف" },
              { key: "value", label: "القيمة", render: (r) => <strong>{fmtMoney(r.value)}</strong> },
              { key: "eta", label: "التسليم المتوقع", render: (r) => <span className="small">{r.eta}</span> },
              { key: "status", label: "المرحلة", render: (r) => <StatusBadge s={r.status} /> },
            ]}
          />
        </Card>
      </div>

      <div className="grid cols-2">
        <Card title="الموردون" subtitle="بيانات المورد، شروط السداد، والمديونية">
          <DataTable
            keyField="id"
            rows={suppliers}
            columns={[
              { key: "id", label: "كود", render: (r) => <span className="mono">{r.id}</span> },
              { key: "name", label: "المورد", render: (r) => <span className="semibold">{r.name}</span> },
              { key: "items", label: "الأصناف" },
              { key: "terms", label: "شروط السداد" },
              { key: "debt", label: "المديونية", render: (r) => <strong style={{ color: r.debt ? "var(--warn)" : "var(--ok)" }}>{fmtMoney(r.debt)}</strong> },
              { key: "since", label: "تعامل منذ" },
            ]}
          />
        </Card>

        <Card title="تقييم الموردين" subtitle="اعتماد على جدية التسليم وجودة الخامات">
          <div className="stack">
            {suppliers.map((s) => (
              <div key={s.id} className="flex-between">
                <div>
                  <div className="semibold">{s.name}</div>
                  <div className="muted small">{s.invoices} فاتورة · {fmtMoney(s.debt)} مديونية</div>
                </div>
                <div className="flex" style={{ gap: 6 }}>
                  <span className="flex semibold" style={{ color: "var(--warn)" }}>
                    <Star size={14} fill="currentColor" /> {s.rating}
                  </span>
                  <Badge tone={s.rating >= 4.5 ? "ok" : s.rating >= 4 ? "info" : "warn"}>
                    {s.rating >= 4.5 ? "ممتاز" : s.rating >= 4 ? "جيد" : "مقبول"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="divider" />
          <Callout type="info" title="مرتبط بمخزون الأقمشة">
            عند استقبال أمر شراء قماش يُنشأ أمر فحص تلقائيًا في وحدة «القماش والرولات» قبل دخول الرولات للمخازن.
          </Callout>
        </Card>
      </div>
    </div>
  );
}