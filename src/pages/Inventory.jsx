import React from "react";
import { Warehouse, CheckCircle2, Lock, ArrowRightLeft, Factory, Undo2, AlertTriangle } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Callout, statusTone,
} from "../components/ui.jsx";
import { finishedStock, fmtNum, fmtMoney } from "../data/mock.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const TOOLTIP = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div className="card tight" style={{ padding: "8px 12px", fontSize: 12 }}>
      <strong>{label}</strong>
      {payload.map((p, i) => (
        <div key={i} className="muted">{p.name}: {p.value.toLocaleString("en-US")} قطعة</div>
      ))}
    </div>
  ) : null;

export default function Inventory() {
  const totalStock = finishedStock.reduce((a, s) => a + s.available, 0);
  const reserved = finishedStock.reduce((a, s) => a + s.reserved, 0);
  const inProd = finishedStock.reduce((a, s) => a + s.inProduction, 0);
  const returnable = finishedStock.reduce((a, s) => a + s.returnable, 0);
  const lowStock = finishedStock.filter((s) => s.available <= 12);

  const stockByModel = finishedStock.reduce((acc, s) => {
    const key = `${s.model} — ${s.color}`;
    acc[key] = (acc[key] || 0) + s.available;
    return acc;
  }, {});
  const stockChart = Object.entries(stockByModel).map(([name, value]) => ({ name, value })).slice(0, 6);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="المنتج النهائي والمخزون"
        subtitle="المخزون مسجل حسب: الموديل + اللون + المقاس + الكمية — مع المتاح والمحجوز والمباع وتحت الإنتاج"
        actions={
          <>
            <button className="btn btn-ghost">جرد سريع</button>
            <button className="btn btn-primary">جرد جديد</button>
          </>
        }
      />

      <div className="grid cols-4">
        <StatCard tone="ok" icon={<CheckCircle2 />} label="المتاح للبيع الآن" value={fmtNum(totalStock)} sub="في المخازن" />
        <StatCard tone="info" icon={<Lock />} label="محجوز للطلبات" value={fmtNum(reserved)} sub="طلبات مؤكدة" />
        <StatCard tone="brand" icon={<Factory />} label="تحت الإنتاج" value={fmtNum(inProd)} sub="سيصل خلال أيام" />
        <StatCard tone="purple" icon={<Undo2 />} label="مرتجعات صالحة للبيع" value={fmtNum(returnable)} sub="عادت للمخزون" />
      </div>

      <Card title="توزيع المخزون المتاح حسب الموديل">
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={stockChart}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#475569" }} interval={0} angle={-12} height={50} tickFormatter={(v) => v.slice(0, 14)} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip content={<TOOLTIP />} />
            <Bar dataKey="value" name="متاح" radius={[6, 6, 0, 0]} fill="#0e7a62" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card
        title="رصيد المنتجات"
        subtitle="متاح / محجوز / مباع / تحت الإنتاج / مرتجع صالح للبيع"
        actions={<Badge tone="info"><ArrowRightLeft size={12} /> 8 SKU معروضة</Badge>}
      >
        <DataTable
          keyField="uid"
          rows={finishedStock.map((r, i) => ({ ...r, uid: i }))}
          columns={[
            { key: "model", label: "الموديل", render: (r) => (
              <div>
                <div className="semibold">{r.model}</div>
                <div className="muted small">{r.color} · مقاس {r.size}</div>
              </div>
            ) },
            { key: "avail", label: "متاح", render: (r) => <strong style={{ color: "var(--brand)" }}>{fmtNum(r.available)}</strong> },
            { key: "res", label: "محجوز", render: (r) => <span>{fmtNum(r.reserved)}</span> },
            { key: "sold", label: "مباع", render: (r) => <span className="muted">{fmtNum(r.sold)}</span> },
            { key: "inp", label: "تحت الإنتاج", render: (r) => <Badge tone={r.inProduction ? "info" : "gray"}>{fmtNum(r.inProduction)}</Badge> },
            { key: "ret", label: "مرتجع صالح", render: (r) => <Badge tone={r.returnable ? "purple" : "gray"}>{fmtNum(r.returnable)}</Badge> },
            { key: "total", label: "إجمالي متاح للمبيعات", render: (r) => <strong>{fmtNum(r.available + r.returnable)}</strong> },
            { key: "warn", label: "حالة", render: (r) => (r.available <= 12 ? <Badge tone="danger">منخفض</Badge> : <Badge tone="ok">جيد</Badge>) },
          ]}
        />
      </Card>

      <div className="grid cols-3">
        <Card title="قيمة المخزون">
          <div className="stack">
            <div className="flex-between">
              <span>القيمة الحالية للمخزون المتاح</span>
              <strong>{fmtMoney(4200000)}</strong>
            </div>
            <div className="flex-between">
              <span>قيمة تحت الإنتاج</span>
              <strong>{fmtMoney(960000)}</strong>
            </div>
            <div className="flex-between">
              <span>قيمة المرتجعات الصالحة</span>
              <strong>{fmtMoney(48000)}</strong>
            </div>
            <div className="divider" />
            <div className="flex-between">
              <span className="semibold">الإجمالي</span>
              <strong style={{ color: "var(--brand)" }}>{fmtMoney(5208000)}</strong>
            </div>
          </div>
        </Card>

        <Card title={`SKU منخفضة المخزون (${lowStock.length})`} subtitle="تحت حد الأمان ويلزم إعادة تشغيل">
          <div className="stack">
            {lowStock.map((s) => (
              <div key={s.model + s.color + s.size} className="flex-between">
                <span className="small">{s.model} — {s.color} — {s.size}</span>
                <Badge tone="danger">{s.available} متاح</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card title="مزامنة مع المتجر">
          <Callout type="ok" title="14 SKU متزامنة">
            مخزون المتجر مطابق لمخزون النظام حاليًا — عملية البيع تخصم من مصدر واحد.
          </Callout>
          <div className="stack" style={{ marginTop: 12 }}>
            <div className="flex-between small">
              <span>آخر مزامنة ناجحة</span>
              <strong>11:45 صباحًا</strong>
            </div>
            <div className="flex-between small">
              <span>اختلافات معلقة</span>
              <Badge tone="danger">1 SKU</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}