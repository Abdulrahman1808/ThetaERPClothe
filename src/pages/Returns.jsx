import React from "react";
import { Undo2, CheckCircle2, RefreshCw, Trash2, BadgeCheck } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Callout, FlowSteps, statusTone,
} from "../components/ui.jsx";
import { returns, fmtMoney } from "../data/mock.js";

export default function Returns() {
  const sellable = returns.filter((r) => r.classification === "صالح للبيع").length;
  const rework = returns.filter((r) => r.classification === "إعادة تشطيب").length;
  const scrap = returns.filter((r) => r.classification === "تالف").length;
  const refundTotal = returns.reduce((a, r) => a + r.refund, 0);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="إدارة المرتجعات"
        subtitle="كل مرتجع يمر أولًا على الفحص ثم يُصنَّف: صالح للبيع ← المخزون · إعادة تشطيب ← Rework · تالف ← Scrap"
        actions={<button className="btn btn-primary">استلام مرتجع</button>}
      />

      <div className="grid cols-4">
        <StatCard tone="ok" icon={<CheckCircle2 />} label="صالح للبيع" value={sellable} sub="عاد للمخزون فورًا" />
        <StatCard tone="warn" icon={<RefreshCw />} label="إعادة تشطيب" value={rework} sub="المخزون ← Rework ← QC" />
        <StatCard tone="danger" icon={<Trash2 />} label="تالف Scrap" value={scrap} sub="يُعالج كخسارة كمية" />
        <StatCard tone="brand" icon={<BadgeCheck />} label="قيمة الاسترداد" value={fmtMoney(refundTotal)} sub="لاسترداد للعملاء" />
      </div>

      <Card title="مسار المرتجع">
        <FlowSteps steps={[
          { step: "استلام المرتجع", state: "done" },
          { step: "الفحص والتصنيف", state: "on" },
          { step: "صالح للبيع ← المخزون", state: "on" },
          { step: "إعادة تشطيب ← Rework ← QC", state: "on" },
          { step: "تالف ← Scrap", state: "on" },
        ]} />
      </Card>

      <Card title="سجل المرتجعات">
        <DataTable
          keyField="rNo"
          rows={returns}
          columns={[
            { key: "rNo", label: "رقم", render: (r) => <span className="mono">{r.rNo}</span> },
            { key: "ordNo", label: "الطلب الأصلي", render: (r) => <span className="mono small">{r.ordNo}</span> },
            { key: "customer", label: "العميل" },
            { key: "model", label: "المنتج", render: (r) => <span className="semibold">{r.model}</span> },
            { key: "reason", label: "سبب الإرجاع", render: (r) => <span className="small muted">{r.reason}</span> },
            { key: "qty", label: "الكمية" },
            { key: "classification", label: "التصنيف", render: (r) => (
              <Badge tone={r.classification === "صالح للبيع" ? "ok" : r.classification === "إعادة تشطيب" ? "warn" : "danger"}>
                {r.classification}
              </Badge>
            ) },
            { key: "refund", label: "قيمة الاسترداد", render: (r) => <span className="small">{r.refund ? fmtMoney(r.refund) : "—"}</span> },
            { key: "status", label: "الحالة", render: (r) => <Badge tone={statusTone[r.status]}>{r.status}</Badge> },
            { key: "date", label: "التاريخ", render: (r) => <span className="small">{r.date}</span> },
          ]}
        />
      </Card>

      <Callout type="ok" title="تحويل المرتجعات الصالحة إلى مخزون قابل للبيع">
        بدلًا من اعتبار المرتجع خسارة، يعود للمخزون ويُستخدم في توفير طلبات العملاء الفورية — مثلًا المرتجعات أضافت
        42 قطعة في الشهر الحالي لمبيعات الكول سنتر.
      </Callout>
    </div>
  );
}