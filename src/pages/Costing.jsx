import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Calculator, TrendingUp, PackageX, Tag, Trophy } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Callout, statusTone,
} from "../components/ui.jsx";
import { costing, models, fmtMoney } from "../data/mock.js";

const TOOLTIP = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div className="card tight" style={{ padding: "8px 12px", fontSize: 12 }}>
      <strong>{label}</strong>
      {payload.map((p, i) => (
        <div key={i} className="muted">{p.name}: {fmtMoney(p.value)}</div>
      ))}
    </div>
  ) : null;

const costParts = ["fabric", "accessories", "labor", "cutting", "ironing", "packing", "waste", "overhead"];
const partLabel = { fabric: "القماش", accessories: "الإكسسوارات", labor: "العمالة", cutting: "القص", ironing: "الكي", packing: "التعبئة", waste: "الهالك", overhead: "مصروفات غير مباشرة" };

export default function Costing() {
  const [code, setCode] = useState(costing[0].modelCode);
  const c = costing.find((x) => x.modelCode === code);
  const model = models.find((m) => m.code === code);

  const estTotal = Object.values(c.est).reduce((a, v) => a + v, 0);
  const actTotal = Object.values(c.act).reduce((a, v) => a + v, 0);
  const diff = actTotal - estTotal;
  const margin = c.price - actTotal;
  const marginPct = Math.round((margin / c.price) * 100);

  const breakdown = costParts.map((p) => ({ name: partLabel[p], تقديرية: c.est[p], فعلية: c.act[p] }));

  const perf = [
    { label: "أفضل الموديلات مبيعًا", tone: "ok", items: "تيشيرت أوفرسايز · بلوزة صيفية · فستان سهرة" },
    { label: "الأعلى ربحية", tone: "ok", items: "فستان سهرة (هامش 42%) · جاكيت رجالي" },
    { label: "موديلات راكدة", tone: "warn", items: "سكارف شتوي — لم يُطلب في 3 أشهر" },
    { label: "تحتاج إعادة تسعير", tone: "danger", items: "بيج — بلوزة الصيف (هامش 9% فقط)" },
  ];

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="تكلفة المنتج Costing"
        subtitle="حساب التكلفة الفعلية ✓ مقارنة مع التقديرية ✓ ومعرفة ربحية كل موديل"
        actions={<button className="btn btn-primary"><Calculator size={15} /> إدخال تكلفة فعلية</button>}
      />

      <div className="grid cols-4">
        <StatCard tone="info" icon={<TrendingUp />} label="متوسط التكلفة الفعلية" value={fmtMoney(actTotal)} sub={`الموديل المحدد: ${model.name}`} />
        <StatCard tone="warn" icon={<Tag />} label="الفرق عن التقديرية" value={`${diff > 0 ? "+" : ""}${fmtMoney(diff)}`} sub={diff > 0 ? "زيادة تستلزم تحليل" : "أقل من التقدير"} />
        <StatCard tone="ok" icon={<Trophy />} label="هامش القطعة" value={`${marginPct}%`} sub={`${fmtMoney(margin)} لكل قطعة`} />
        <StatCard tone="danger" icon={<PackageX />} label="أداء" value="3 نماذج تستدعي نظر" sub="راكدة أو تحتاج تسعير" />
      </div>

      <div className="grid cols-3">
        <div className="card" style={{ gridColumn: "span 2" }}>
          <div className="card-head">
            <div>
              <div className="card-title">مقارنة التكلفة التقديرية ↔ الفعلية</div>
              <div className="card-sub">للموديل: {model.name} ({code})</div>
            </div>
            <div>
              <select value={code} onChange={(e) => setCode(e.target.value)}>
                {costing.map((x) => (
                  <option key={x.modelCode} value={x.modelCode}>{x.modelCode} — {x.model}</option>
                ))}
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={breakdown} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#475569" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TOOLTIP />} />
              <Legend formatter={(v) => <span style={{ fontSize: 12, fontWeight: 700, color: "#475569" }}>{v}</span>} />
              <Bar dataKey="تقديرية" fill="#cbd5e1" radius={[5, 5, 0, 0]} />
              <Bar dataKey="فعلية" fill="#0e7a62" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="stack">
          <Card title="نظرة سريعة">
            <div className="stack">
              <div className="flex-between"><span>سعر البيع</span><strong>{fmtMoney(c.price)}</strong></div>
              <div className="flex-between"><span>التكلفة الفعلية للقطعة</span><strong>{fmtMoney(actTotal)}</strong></div>
              <div className="flex-between"><span>الفارق عن التقدير</span><strong style={{ color: diff > 0 ? "var(--danger)" : "var(--ok)" }}>{diff > 0 ? "+" : ""}{fmtMoney(diff)}</strong></div>
              <div className="divider" style={{ margin: "4px 0" }} />
              <div className="flex-between"><span className="semibold">صافي هامش القطعة</span><strong style={{ color: "var(--brand)" }}>{fmtMoney(margin)} ({marginPct}%)</strong></div>
            </div>
          </Card>
          <Card title="أداء الموديلات">
            <div className="stack">
              {perf.map((p) => (
                <div key={p.label}>
                  <Badge tone={p.tone}>{p.label}</Badge>
                  <div className="small muted" style={{ marginTop: 4 }}>{p.items}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card title="جدول ربحية الموديلات" subtitle="سعر البيع · تكلفة الإنتاج · المصروفات · هامش الربح · الأداء">
        <DataTable
          keyField="modelCode"
          rows={costing}
          columns={[
            { key: "modelCode", label: "الموديل", render: (r) => (
              <div>
                <div className="semibold">{r.model}</div>
                <div className="muted small">{r.modelCode}</div>
              </div>
            ) },
            { key: "price", label: "سعر البيع", render: (r) => fmtMoney(r.price) },
            { key: "actual", label: "تكلفة الإنتاج", render: (r) => fmtMoney(Object.values(r.act).reduce((a, v) => a + v, 0)) },
            { key: "margin", label: "هامش القطعة", render: (r) => {
              const m = r.price - Object.values(r.act).reduce((a, v) => a + v, 0);
              const p = Math.round((m / r.price) * 100);
              return <Badge tone={p >= 40 ? "ok" : p >= 20 ? "info" : "danger"}>{p}%</Badge>;
            } },
            { key: "ad", label: "التباين تقديري/فعلي", render: (r) => {
              const e = Object.values(r.est).reduce((a, v) => a + v, 0);
              const a = Object.values(r.act).reduce((a, v) => a + v, 0);
              const d = a - e;
              return <span style={{ color: d > 0 ? "var(--danger)" : "var(--ok)", fontWeight: 700 }}>{d > 0 ? `+${fmtMoney(d)}` : fmtMoney(d)}</span>;
            } },
            { key: "status", label: "الأداء", render: (r) => <Badge tone="info">{r.modelCode.startsWith("M-2026-007") ? "أفضل مبيعًا" : r.modelCode.startsWith("M-2026-003") ? "ربحية عالية" : "مستقر"}</Badge> },
          ]}
        />
      </Card>

      <Callout type="warn" title="تحليل سبب ارتفاع تكلفة فستان السهرة">
        الهالك الفعلي 34 ج.م مقابل 20 تقديريًا (+70%) بسبب بقع من رول RL-8822 — النظام ينصح بمراجعة الدفعات
        قبل القص وزيادة كفاءة البرمجة في المرقعة.
      </Callout>
    </div>
  );
}