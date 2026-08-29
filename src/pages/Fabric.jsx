import React from "react";
import { Layers, Ruler, MapPin, AlertTriangle, ShieldCheck } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Callout, Progress, statusTone, StatusBadge,
} from "../components/ui.jsx";
import { rolls, fabricInspections, fabricTypes, fmtNum } from "../data/mock.js";

export default function Fabric() {
  const totalMeters = rolls.reduce((a, r) => a + r.remaining, 0);
  const lowRolls = rolls.filter((r) => r.status === "منخفض");
  const byType = fabricTypes.map((f) => ({
    name: f,
    meters: rolls.filter((r) => r.fabric === f).reduce((a, r) => a + r.remaining, 0),
  }));

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="القماش والرولات"
        subtitle="إدارة القماش على مستوى الرول — اعرف مكان كل رول وكم المتبقي وأين استُخدم"
        actions={
          <>
            <button className="btn btn-ghost">مسح رول</button>
            <button className="btn btn-primary">استلام رول جديد</button>
          </>
        }
      />

      <div className="grid cols-4">
        <StatCard tone="brand" icon={<Layers />} label="رولات في المخازن" value={rolls.length} sub="عبر 3 مخازن رئيسية" />
        <StatCard tone="info" icon={<Ruler />} label="إجمالي الطول المتبقي" value={`${fmtNum(Math.round(totalMeters))} م`} sub="قابل للاستخدام" />
        <StatCard tone="warn" icon={<MapPin />} label="رولات منخفضة" value={lowRolls.length} sub="ضمن حد النفاد" />
        <StatCard tone="ok" icon={<ShieldCheck />} label="فحوصات القماش (شهر)" value="18" sub="2 مرفوضة جزئيًا" />
      </div>

      <div className="grid cols-1">
        <Card title="سجل الرولات" subtitle="الرول · الدفعة · المورد · مكان التخزين · المستخدم والمتبقي">
          <DataTable
            keyField="rollNo"
            rows={rolls}
            columns={[
              { key: "rollNo", label: "رقم الرول", render: (r) => <span className="mono">{r.rollNo}</span> },
              { key: "fabric", label: "نوع القماش", render: (r) => (
                <div>
                  <div className="semibold">{r.fabric}</div>
                  <div className="muted small">اللون: {r.color}</div>
                </div>
              ) },
              { key: "batch", label: "رقم الدفعة", render: (r) => <span className="mono">{r.batch}</span> },
              { key: "len", label: "الطول", render: (r) => `${r.length} م` },
              { key: "width", label: "العرض", render: (r) => `${r.width} م` },
              { key: "supplier", label: "المورد" },
              { key: "location", label: "مكان التخزين", render: (r) => <span className="chip"><MapPin size={12} /> {r.location}</span> },
              { key: "used", label: "المستخدم", render: (r) => `${r.used} م` },
              { key: "remain", label: "المتبقي", render: (r) => (
                <div style={{ minWidth: 120 }}>
                  <div className="flex-between small" style={{ marginBottom: 4 }}>
                    <strong>{r.remaining} م</strong>
                    <span className="muted">{Math.round((r.remaining / r.length) * 100)}%</span>
                  </div>
                  <Progress value={(r.remaining / r.length) * 100} label="" />
                </div>
              ) },
              { key: "status", label: "الحالة", render: (r) => <Badge tone={statusTone[r.status]}>{r.status}</Badge> },
            ]}
          />
        </Card>
      </div>

      <div className="grid cols-2">
        <Card title="المتبقي حسب نوع القماش (متر)">
          <div className="stack">
            {byType.map((t) => (
              <div key={t.name}>
                <div className="flex-between small">
                  <span className="semibold">{t.name}</span>
                  <strong>{fmtNum(t.meters)} م</strong>
                </div>
                <Progress value={Math.min((t.meters / 300) * 100, 100)} label="" />
              </div>
            ))}
          </div>
          <div className="divider" />
          <Callout type="warn" title="إنذار منخفض">
            رول RL-8822 (قطن أبيض) متبقٍّ 2 م فقط، و RL-8844 (دانتيل) متبقٍّ 5 م — النظام أدرج احتياج الشراء تلقائيًا في أوامر المشتريات.
          </Callout>
        </Card>

        <Card title="فحص القماش والجودة" subtitle="قبل دخول القماش إلى الإنتاج">
          <DataTable
            keyField="id"
            rows={fabricInspections}
            columns={[
              { key: "id", label: "فحص", render: (r) => <span className="mono">{r.id}</span> },
              { key: "rollNo", label: "الرول", render: (r) => <span className="mono small">{r.rollNo}</span> },
              { key: "len", label: "الطول", render: (r) => `${r.checkedLength} م` },
              { key: "defects", label: "عيوب", render: (r) => <Badge tone={r.defects > 5 ? "warn" : "info"}>{r.defects}</Badge> },
              { key: "grade", label: "الدرجة", render: (r) => <span className="semibold">{r.grade}</span> },
              { key: "acc", label: "مقبول", render: (r) => <strong className="ok" style={{ color: "var(--ok)" }}>{r.accepted} م</strong> },
              { key: "rej", label: "مرفوض", render: (r) => <strong style={{ color: r.rejected ? "var(--danger)" : "var(--ok)" }}>{r.rejected} م</strong> },
              { key: "status", label: "الحالة", render: (r) => <StatusBadge s={r.status} /> },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}