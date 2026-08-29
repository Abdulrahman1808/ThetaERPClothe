import React from "react";
import { Scissors, QrCode, Trash2, Layers2 } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Callout, FlowSteps, statusTone,
} from "../components/ui.jsx";
import { cuttingOrders, bundles, fmtNum } from "../data/mock.js";

export default function Cutting() {
  const totalPieces = cuttingOrders.reduce((a, c) => a + c.pieces, 0);
  const totalWaste = cuttingOrders.filter((c) => c.status !== "مخطط").reduce((a, c) => a + Math.round(c.wastePct * 10) / 10, 0);
  const avgWaste = totalWaste / cuttingOrders.filter((c) => c.status !== "مخطط").length;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="القص Cutting"
        subtitle="إدارة مرحلة القص بالكامل — الرولات المستخدمة، الطبقات، الهالك، والقطع الناتجة"
        actions={
          <>
            <button className="btn btn-ghost">تفكيك ماركر</button>
            <button className="btn btn-primary"><Scissors size={15} /> أمر قص جديد</button>
          </>
        }
      />

      <div className="grid cols-3">
        <StatCard tone="brand" icon={<Layers2 />} label="أوامر قص هذا الشهر" value={cuttingOrders.length} sub="مكتمل وقيد التنفيذ" />
        <StatCard tone="info" icon={<Scissors />} label="قطع ناتجة" value={fmtNum(totalPieces)} sub="عبر أوامر القص" />
        <StatCard tone="warn" icon={<Trash2 />} label="متوسط الهالك" value={`${avgWaste.toFixed(1)}%`} sub="المستهدف أقل من 5%" />
      </div>

      <Card title="أوامر القص" subtitle="كمية القماش المستخدمة فعلًيًا ونسبة الهالك في كل عملية">
        <DataTable
          keyField="coNo"
          rows={cuttingOrders}
          columns={[
            { key: "coNo", label: "أمر القص", render: (r) => <span className="mono">{r.coNo}</span> },
            { key: "poNo", label: "أمر الإنتاج", render: (r) => <span className="mono">{r.poNo}</span> },
            { key: "model", label: "الموديل", render: (r) => (
              <div>
                <div className="semibold">{r.model}</div>
                <div className="muted small">{r.color} · مقاسات {r.sizes}</div>
              </div>
            ) },
            { key: "rolls", label: "الروالات", render: (r) => r.rolls.map((x) => <span key={x} className="mono small" style={{ marginInlineEnd: 4 }}>{x}</span>) },
            { key: "plies", label: "الطبقات" },
            { key: "used", label: "قماش مستخدم", render: (r) => `${fmtNum(r.fabricUsed)} م` },
            { key: "waste", label: "هالك", render: (r) => (
              <div>
                <strong style={{ color: r.wastePct > 5 ? "var(--danger)" : "var(--ok)" }}>{r.waste} م</strong>
                <span className="muted small"> ({r.wastePct}%)</span>
              </div>
            ) },
            { key: "pieces", label: "القطع الناتجة", render: (r) => <strong>{fmtNum(r.pieces)}</strong> },
            { key: "status", label: "الحالة", render: (r) => <StatusBadge s={r.status} /> },
          ]}
        />
      </Card>

      <div className="grid cols-2">
        <Card
          title="الـ Bundles بعد القص"
          subtitle="كل Bundle يملك QR Code لتتبعه خلال كل مراحل الإنتاج"
          actions={<Badge tone="brand"><QrCode size={12} /> QR توليد تلقائي</Badge>}
        >
          <DataTable
            keyField="bundleNo"
            rows={bundles}
            columns={[
              { key: "bundleNo", label: "الـ Bundle", render: (r) => <span className="mono">{r.bundleNo}</span> },
              { key: "model", label: "الموديل", render: (r) => (
                <div>
                  <div className="semibold">{r.model}</div>
                  <div className="muted small">{r.color} · مقاس {r.size} · {r.qty} قطع</div>
                </div>
              ) },
              { key: "poNo", label: "أمر الإنتاج", render: (r) => <span className="mono small">{r.poNo}</span> },
              { key: "cutDate", label: "تاريخ القص" },
              { key: "stage", label: "المرحلة الحالية", render: (r) => <Badge tone="info">{r.stage}</Badge> },
            ]}
          />
        </Card>

        <div style={{ display: "grid", gap: 14 }}>
          <Card title="مسار الـ Bundle داخل الإنتاج">
            <FlowSteps steps={[
              { step: "القص", state: "done" },
              { step: "الأوفر", state: "on" },
              { step: "الخياطة", state: "on" },
              { step: "التشطيب", state: "" },
              { step: "الجودة", state: "" },
              { step: "المخزون", state: "" },
            ]} />
          </Card>
          <Card title="قراءة QR — فحص Bundle (مثال)">
            <Callout type="info" title="BN-7002 — Blouse بيضاء مقاس S">
              الموديل M-2026-002 · مقاس S · 25 قطعة · أمر الإنتاج MO-1102 · قُصت في 18 أغسطس · المرحلة الحالية: تركيب.
              <div className="small muted" style={{ marginTop: 6 }}>
                يُحدَّث هذا السجل تلقائيًا في كل محطة — العامل، الماكينة، الأوقات.
              </div>
            </Callout>
          </Card>
        </div>
      </div>
    </div>
  );
}