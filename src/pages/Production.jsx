import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { CalendarRange, Database, Sparkles, ClipboardList, AlertTriangle } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Callout, Progress, StatusBadge, Legend,
} from "../components/ui.jsx";
import { productionOrders, planningSources, suggestedProduction, fmtNum } from "../data/mock.js";

const TOOLTIP = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div className="card tight" style={{ padding: "8px 12px", fontSize: 12 }}>
      <strong>{label}</strong>
      <div className="muted">{payload[0].value.toLocaleString("en-US")} قطعة</div>
    </div>
  ) : null;

export default function Production() {
  const late = productionOrders.filter((o) => o.status === "قيد التنفيذ");

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="تخطيط الإنتاج"
        subtitle="النظام يجمع الطلبات + المخزون + المتجر + الكول سنتر + Pre-orders + توقع الطلب ليقترح: ماذا ننتج؟ كم؟ متى؟ وأي خط؟"
        actions={<button className="btn btn-primary"><ClipboardList size={15} /> أمر إنتاج جديد</button>}
      />

      <div className="grid cols-4">
        <StatCard tone="brand" icon={<Database />} label="أوامر إنتاج نشطة" value={productionOrders.length} sub="بقيمة 5.6 مليون ج.م" />
        <StatCard tone="info" icon={<CalendarRange />} label="أوامر مخطط لها" value={2} sub="تبدأ خلال أيام" />
        <StatCard tone="danger" icon={<AlertTriangle />} label="أوامر متأخرة" value={late.length} sub="تحتاج تدخل" />
        <StatCard tone="warn" icon={<Sparkles />} label="اقتراحات AI للإنتاج" value={5} sub="موديلات للمقاييس المطلوبة" />
      </div>

      <Card title="مصادر بيانات التخطيط" subtitle="كل هذه المصادر تُجمَّع لحظيًا لتحديد حجم الإنتاج">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={planningSources}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
            <XAxis dataKey="source" tick={{ fontSize: 11, fill: "#475569" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip content={<TOOLTIP />} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {planningSources.map((e) => <Cell key={e.source} fill={e.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card
        title="الكميات المقترحة للإنتاج"
        subtitle="بناءً على المبيعات + المخزون المتبقي + توقع الطلب — بألوان ومقاسات محددة"
        actions={<Badge tone="brand"><Sparkles size={12} /> اقتراح AI</Badge>}
      >
        <DataTable
          keyField="modelCode"
          rows={suggestedProduction}
          columns={[
            { key: "modelCode", label: "الموديل", render: (r) => <span className="mono">{r.modelCode}</span> },
            { key: "model", label: "الاسم", render: (r) => <span className="semibold">{r.model}</span> },
            { key: "color", label: "اللون" },
            { key: "size", label: "المقاس" },
            { key: "sellable", label: "متوقع البيع", render: (r) => fmtNum(r.sellable) },
            { key: "suggested", label: "المقترح", render: (r) => <strong style={{ color: "var(--brand)" }}>{fmtNum(r.suggested)}</strong> },
            { key: "reason", label: "السبب", render: (r) => <span className="small muted">{r.reason}</span> },
          ]}
        />
      </Card>

      <Card title="أوامر الإنتاج" subtitle="رقم الأمر · الموديل · اللون · المقاسات · الخط · الأولوية · المواعيد · المسؤول">
        <DataTable
          keyField="poNo"
          rows={productionOrders}
          columns={[
            { key: "poNo", label: "الأمر", render: (r) => <span className="mono">{r.poNo}</span> },
            { key: "modelCode", label: "الموديل", render: (r) => (
              <div>
                <div className="semibold">{r.model}</div>
                <div className="muted small">{r.modelCode} · {r.color} · خط {r.line}</div>
              </div>
            ) },
            { key: "sizes", label: "المقاسات", render: (r) => (
              <div className="small">
                {Object.entries(r.sizes).map(([s, q]) => (
                  <span key={s} style={{ display: "inline-block", marginInlineEnd: 6 }}>{s}: <strong>{fmtNum(q)}</strong></span>
                ))}
              </div>
            ) },
            { key: "total", label: "الكمية", render: (r) => <strong>{fmtNum(r.total)}</strong> },
            { key: "priority", label: "الأولوية", render: (r) => (
              <Badge tone={r.priority === "عالية" ? "danger" : r.priority === "متوسطة" ? "warn" : "info"}>{r.priority}</Badge>
            ) },
            { key: "start", label: "البداية", render: (r) => <span className="small">{r.start}</span> },
            { key: "due", label: "التسليم", render: (r) => <span className="small">{r.due}</span> },
            { key: "owner", label: "المسؤول" },
            { key: "progress", label: "التقدم", render: (r) => (
              <div style={{ minWidth: 110 }}>
                <Progress value={r.progress} label={`${r.progress}%`} />
              </div>
            ) },
            { key: "status", label: "الحالة", render: (r) => <StatusBadge s={r.status} /> },
          ]}
        />
      </Card>

      <Card title="مسار حالة الأمر" subtitle="جديد ← مخطط ← قيد التنفيذ ← جودة ← مكتمل">
        <div className="flex" style={{ flexWrap: "wrap", gap: 8 }}>
          {["جديد", "مخطط", "قيد التنفيذ", "جودة", "مكتمل"].map((s, i) => (
            <div key={s} className="flex">
              <Badge tone={["gray", "info", "info", "purple", "ok"][i]}>{s}</Badge>
              <span className="muted small">({productionOrders.filter((o) => o.status === s).length})</span>
              {i < 4 && <span className="sep">←</span>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}