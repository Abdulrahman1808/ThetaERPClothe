import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { ShieldCheck, AlertTriangle, RotateCcw, Trash2, SearchCheck } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Callout, FlowSteps, statusTone,
} from "../components/ui.jsx";
import { qcRecords, defectByColumn, fmtNum } from "../data/mock.js";

const TOOLTIP = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div className="card tight" style={{ padding: "8px 12px", fontSize: 12 }}>
      <strong>{label}</strong>
      {payload.map((p, i) => (
        <div key={i} className="muted">{p.name}: {p.value.toLocaleString("en-US")} قطعة</div>
      ))}
    </div>
  ) : null;

export default function Qc() {
  const totalDefects = qcRecords.reduce((a, r) => a + r.qty, 0);
  const rework = qcRecords.reduce((a, r) => a + r.rework, 0);
  const scrap = qcRecords.reduce((a, r) => a + r.scrap, 0);
  const defectRate = (totalDefects / 4200) * 100;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="نظام الجودة QC"
        subtitle="فحص القماش ← فحص القص ← فحص الإنتاج ← الفحص النهائي — لاكتشاف أسباب العيوب وتقليل الهالك"
        actions={
          <>
            <button className="btn btn-ghost"><SearchCheck size={15} /> دليل الجودة</button>
            <button className="btn btn-primary">تسجيل عيب</button>
          </>
        }
      />

      <div className="grid cols-4">
        <StatCard tone="info" icon={<AlertTriangle />} label="عيوب هذا الشهر" value={fmtNum(totalDefects)} sub={`نسبة العيوب ${defectRate.toFixed(2)}%`} />
        <StatCard tone="warn" icon={<RotateCcw />} label="إصلاح Rework" value={fmtNum(rework)} sub="قابل للإصلاح" />
        <StatCard tone="danger" icon={<Trash2 />} label="هالك Scrap" value={fmtNum(scrap)} sub="يعالج كخسارة كمية" />
        <StatCard tone="ok" icon={<ShieldCheck />} label="مطابق للجودة" value="98.1%" sub="الفحص النهائي" />
      </div>

      <Card title="مراحل الجودة">
        <FlowSteps steps={[
          { step: "فحص القماش", state: "done" },
          { step: "فحص القص", state: "done" },
          { step: "فحص الإنتاج", state: "on" },
          { step: "الفحص النهائي", state: "on" },
          { step: "المنتج النهائي", state: "" },
        ]} />
      </Card>

      <div className="grid cols-2">
        <Card title="العيوب حسب المرحلة">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={defectByColumn}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="stage" tick={{ fontSize: 12, fill: "#475569" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TOOLTIP />} />
              <Bar dataKey="value" name="قطع" radius={[6, 6, 0, 0]} fill="#d97706" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="كسر العيوب إصلاح مقابل هالك">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={[{ name: "قابل للرتق", value: rework, hue: "#2563eb" }, { name: "هالك", value: scrap, hue: "#dc2626" }]} dataKey="value" outerRadius={85}>
                <Cell fill="#2563eb" />
                <Cell fill="#dc2626" />
              </Pie>
              <Tooltip content={<TOOLTIP />} />
              <Legend formatter={(v) => <span style={{ fontSize: 12, fontWeight: 700, color: "#475569" }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="سجل العيوب" subtitle="نوع العيب · الكمية · السبب · المرحلة · العامل أو الماكينة المسؤولة">
        <DataTable
          keyField="id"
          rows={qcRecords}
          columns={[
            { key: "id", label: "رقم", render: (r) => <span className="mono">{r.id}</span> },
            { key: "stage", label: "المرحلة", render: (r) => <Badge tone="gray">{r.stage}</Badge> },
            { key: "model", label: "الموديل", render: (r) => <span className="semibold">{r.model}</span> },
            { key: "defect", label: "الوصف", render: (r) => <span className="small">{r.defect}</span> },
            { key: "qty", label: "الكمية", render: (r) => <strong>{r.qty}</strong> },
            { key: "cause", label: "السبب", render: (r) => <span className="muted small">{r.cause}</span> },
            { key: "owner", label: "العامل / الماكينة", render: (r) => <span className="mono small">{r.owner}</span> },
            { key: "rework", label: "Rework", render: (r) => <Badge tone="info">{r.rework}</Badge> },
            { key: "scrap", label: "Scrap", render: (r) => <Badge tone={r.scrap ? "danger" : "ok"}>{r.scrap}</Badge> },
            { key: "date", label: "التاريخ", render: (r) => <span className="small">{r.date}</span> },
          ]}
        />
      </Card>

      <Callout type="info" title="هدف النظام">
        كل عيب يُربط بسبب ذي بيانات — لو اكتُشفت بقع متكررة من رول معين مثل RL-8822، يمنع النظام دخول باقي الرول
        للإنتاج ويحوّل المورد للتقييم في المشتريات.
      </Callout>
    </div>
  );
}