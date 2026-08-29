import React from "react";
import { FlaskConical, CheckCheck, MessageSquareWarning, Layers } from "lucide-react";
import {
  PageHeader, Card, Badge, DataTable, Callout, ClothSwatch,
} from "../components/ui.jsx";
import { models, samples, fmtMoney } from "../data/mock.js";

const versionTone = (s) =>
  s.status === "معتمدة" ? "ok" : s.status === "تم التعديل" ? "info" : s.status === "قيد الاعتماد" ? "brand" : "warn";

export default function Samples() {
  const withSamples = models.filter((m) => samples.some((s) => s.modelCode === m.code));

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="إدارة العينات"
        subtitle="تسجيل جميع مراحل تطوير العينة V1 → V2 → V3 حتى الاعتماد للإنتاج"
        actions={
          <>
            <button className="btn btn-ghost">سجل تغييرات الموديل</button>
            <button className="btn btn-primary">عينة جديدة</button>
          </>
        }
      />

      <Callout type="info" title="لماذا نحتفظ بسجل العينات؟">
        يحتفظ النظام بتاريخ كامل لتطور الموديل منذ الفكرة وحتى الاعتماد — كل نسخة بتكلفة وملاحظات وصور،
        ما يساعد على فحص تكلفة التطوير قبل دخول الإنتاج.
      </Callout>

      {withSamples.map((m) => {
        const list = samples.filter((s) => s.modelCode === m.code);
        return (
          <Card key={m.code} title={`الموديل: ${m.name}`} subtitle={`${m.code} — ${list.length} نسخ`}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
              {list.map((s) => (
                <div key={s.id} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 14, background: "#fff" }}>
                  <div className="flex-between">
                    <span className="chip" style={{ borderColor: "var(--brand)" }}>
                      <FlaskConical size={13} color="var(--brand)" /> {s.version}
                    </span>
                    <Badge tone={versionTone(s)}>{s.status}</Badge>
                  </div>
                  <div className="muted small" style={{ marginTop: 8 }}>أصدرت بتاريخ {s.date} · مدة التنفيذ {s.leadTime} يوم</div>
                  <div className="small" style={{ marginTop: 8, lineHeight: 1.6 }}>{s.notes}</div>
                  <div className="flex-between" style={{ marginTop: 10 }}>
                    <span className="small muted">خامات: {s.fabric}</span>
                    <strong>{fmtMoney(s.cost)}</strong>
                  </div>
                </div>
              ))}
              <div
                style={{
                  border: "1px dashed var(--border)",
                  borderRadius: 12,
                  padding: 14,
                  display: "grid",
                  placeItems: "center",
                  color: "var(--text-3)",
                  fontSize: 13,
                }}
              >
                <div style={{ textAlign: "center", display: "grid", gap: 6, justifyItems: "center" }}>
                  <ClothSwatch hue={m.hue} size={48} />
                  صور إصدار العينات
                  <button className="btn btn-ghost" style={{ padding: "6px 12px" }}>رفع صور</button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}

      <Card title="جدول كل العينات">
        <DataTable
          keyField="id"
          rows={samples}
          columns={[
            { key: "id", label: "رقم", render: (r) => <span className="mono">{r.id}</span> },
            { key: "version", label: "النسخة", render: (r) => <Badge tone="brand">{r.version}</Badge> },
            { key: "modelCode", label: "الموديل", render: (r) => (
              <div>
                <div className="semibold">{models.find((m) => m.code === r.modelCode)?.name}</div>
                <div className="muted small">{r.modelCode}</div>
              </div>
            ) },
            { key: "fabric", label: "الخامات" },
            { key: "cost", label: "التكلفة", render: (r) => fmtMoney(r.cost) },
            { key: "leadTime", label: "المدة (أيام)" },
            { key: "notes", label: "ملاحظات التعديل", render: (r) => r.notes },
            { key: "status", label: "الحالة", render: (r) => <Badge tone={versionTone(r)}>{r.status}</Badge> },
          ]}
        />
      </Card>
    </div>
  );
}