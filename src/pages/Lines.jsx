import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Boxes, Users2, Cpu, Timer, TrendingUp } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Progress, StatusBadge, Legend,
} from "../components/ui.jsx";
import { lines, workers, machines, wipByStage, productionStages } from "../data/mock.js";

const TOOLTIP = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div className="card tight" style={{ padding: "8px 12px", fontSize: 12 }}>
      <strong>{label}</strong>
      {payload.map((p, i) => (
        <div key={i} className="muted">{p.name}: {p.value.toLocaleString("en-US")}{p.unit == null ? " قطعة" : ""}</div>
      ))}
    </div>
  ) : null;

export default function Lines() {
  const totalWip = wipByStage.reduce((a, w) => a + w.pieces, 0);
  const machineStatus = { تعمل: machines.filter((m) => m.status === "تعمل").length, عطل: machines.filter((m) => m.status === "عطل").length };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="خطوط الإنتاج"
        subtitle="متابعة مراحل تصنيع المنتج: القص ← الأوفر ← الخياطة ← التركيب ← التشطيب ← الكي ← الجودة"
        actions={<button className="btn btn-primary">خط إنتاج جديد</button>}
      />

      <div className="grid cols-4">
        <StatCard tone="brand" icon={<Boxes />} label="خطوط الإنتاج" value={lines.length} sub="4 خطوط نشطة" />
        <StatCard tone="info" icon={<Timer />} label="تحت التشغيل WIP" value={`${totalWip.toLocaleString("en-US")} قطعة`} sub="في 75 Bundle" />
        <StatCard tone="ok" icon={<Users2 />} label="عمال الإنتاج" value="132" sub="حضور اليوم 96.2%" />
        <StatCard tone="purple" icon={<Cpu />} label="ماكينات" value={`${machines.length} ماكينة`} sub={machineStatus.عطل ? `${machineStatus.عطل} في عطل` : "كلها تعمل"} />
      </div>

      <div className="grid cols-2">
        <Card title="مراحل التصنيع — القطع تحت التشغيل">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={wipByStage} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="stage" width={90} tick={{ fontSize: 12, fill: "#475569" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TOOLTIP />} />
              <Bar dataKey="pieces" name="قطع" radius={[0, 6, 6, 0]} fill="#0e7a62" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ marginTop: 10 }}>
            <Legend items={productionStages.map((s) => ({ label: `${s.stage}`, color: s.color }))} />
          </div>
        </Card>

        <Card title="أداء الخطوط — المستهدف مقابل الفعلي">
          <div className="stack">
            {lines.map((l) => (
              <div key={l.id} style={{ borderBottom: "1px solid #eef2f7", paddingBottom: 10 }}>
                <div className="flex-between">
                  <div>
                    <span className="semibold">{l.id}</span>
                    <span className="muted small"> — {l.focus}</span>
                  </div>
                  <div className="flex" style={{ gap: 8 }}>
                    <Badge tone={l.efficiency >= 100 ? "ok" : l.efficiency >= 80 ? "info" : "warn"}>{l.efficiency}% كفاءة</Badge>
                    <StatusBadge s={l.status} />
                  </div>
                </div>
                <div className="flex-between small muted" style={{ margin: "6px 0 4px" }}>
                  <span>الفعلي {l.outputToday} / المستهدف {l.target}</span>
                  <span>{Math.round((l.outputToday / l.target) * 100)}%</span>
                </div>
                <Progress value={(l.outputToday / l.target) * 100} label="" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid cols-2">
        <Card title="العمالة" subtitle="البيانات، الأقسام، الإنتاجية، والحوافز">
          <DataTable
            keyField="id"
            rows={workers}
            columns={[
              { key: "id", label: "كود", render: (r) => <span className="mono">{r.id}</span> },
              { key: "name", label: "الاسم", render: (r) => <span className="semibold">{r.name}</span> },
              { key: "job", label: "الوظيفة", render: (r) => <span>{r.job} · {r.dept}</span> },
              { key: "base", label: "الراتب", render: (r) => `${r.base.toLocaleString("en-US")} ج.م` },
              { key: "prod", label: "الإنتاجية", render: (r) => <Progress value={r.productivity} label={`${r.productivity}%`} /> },
              { key: "attend", label: "الحضور", render: (r) => <Badge tone={r.attendance >= 95 ? "ok" : "warn"}>{r.attendance}%</Badge> },
              { key: "incentive", label: "حوافز", render: (r) => `${r.incentives.toLocaleString("en-US")} ج.م` },
            ]}
          />
        </Card>

        <Card title="الماكينات" subtitle="الحالة، ساعات التشغيل، الأعطال، والصيانة">
          <DataTable
            keyField="id"
            rows={machines}
            columns={[
              { key: "id", label: "الماكينة", render: (r) => <span className="mono">{r.id}</span> },
              { key: "type", label: "النوع", render: (r) => <span className="semibold">{r.type}</span> },
              { key: "line", label: "الخط", render: (r) => <Badge tone="gray">{r.line}</Badge> },
              { key: "status", label: "الحالة", render: (r) => <StatusBadge s={r.status} /> },
              { key: "hours", label: "ساعات التشغيل" },
              { key: "breakdowns", label: "الأعطال", render: (r) => <Badge tone={r.breakdowns > 3 ? "danger" : "info"}>{r.breakdowns}</Badge> },
              { key: "next", label: "الصيانة القادمة", render: (r) => <span className="small">{r.next}</span> },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}