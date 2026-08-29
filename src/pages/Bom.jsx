import React, { useState } from "react";
import { ListChecks, Layers, Package, Calculator } from "lucide-react";
import {
  PageHeader, Card, Badge, DataTable, Callout, StatCard,
} from "../components/ui.jsx";
import { bomPerModel, models, fmtMoney, fmtNum } from "../data/mock.js";

export default function Bom() {
  const [modelCode, setModelCode] = useState(bomPerModel[0].modelCode);
  const [qty, setQty] = useState(1000);
  const model = models.find((m) => m.code === modelCode);
  const bom = bomPerModel.find((b) => b.modelCode === modelCode);

  const rows = bom.items.map((it) => {
    const gross = it.consumption * qty;
    const need = Math.ceil(gross * (1 + it.wastePct / 100));
    return { ...it, gross, need, total: Math.ceil(need * it.unitCost) };
  });

  const totalCost = rows.reduce((a, r) => a + r.total, 0);
  const fabricItems = rows.filter((r) => r.type === "قماش");
  const accItems = rows.filter((r) => r.type === "إكسسوار");

  const typeTone = (t) => (t === "قماش" ? "brand" : t === "إكسسوار" ? "purple" : "info");

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="مكونات المنتج BOM"
        subtitle="قائمة كاملة بمكونات كل موديل — يُحسب منها الاحتياج تلقائيًا لأي كمية إنتاج"
        actions={<button className="btn btn-primary"><ListChecks size={15} /> إضافة مكون</button>}
      />

      <div className="grid cols-3">
        <StatCard tone="brand" icon={<Layers />} label="أقمشة لكل موديل" value={fabricItems.length} sub="بمعدلات استهلاك وهالك%" />
        <StatCard tone="purple" icon={<Package />} label="إكسسوارات وتغليف" value={accItems.length} sub="أزرار · سوست · ليبل · تيكت · كراتين" />
        <StatCard tone="warn" icon={<Calculator />} label="التكلفة المتغيرة للكمية" value={fmtMoney(totalCost)} sub={`لكمية ${fmtNum(qty)} قطعة`} />
      </div>

      <Card title="حاسبة الاحتياجات الإنتاجية">
        <div className="filter-bar" style={{ marginBottom: 14 }}>
          <div>
            <div className="card-sub" style={{ marginBottom: 4 }}>اختر الموديل</div>
            <select value={modelCode} onChange={(e) => setModelCode(e.target.value)}>
              {bomPerModel.map((b) => (
                <option key={b.modelCode} value={b.modelCode}>
                  {b.modelCode} — {models.find((m) => m.code === b.modelCode)?.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="card-sub" style={{ marginBottom: 4 }}>الكمية المخطط إنتاجها</div>
            <input type="number" value={qty} min={1} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} style={{ width: 160 }} />
          </div>
          <div style={{ marginInlineStart: "auto" }}>
            <div className="card-sub" style={{ marginBottom: 4 }}>التكلفة المتغيرة للقطعة</div>
            <strong style={{ fontSize: 18, color: "var(--brand)" }}>{fmtMoney(totalCost / qty)}</strong>
          </div>
        </div>

        <div className="grid cols-2" style={{ marginBottom: 14 }}>
          <Callout type="info" title="طريقة الحساب">
            الاحتياج = الاستهلاك × الكمية + (نسبة الهالك × الاستهلاك × الكمية) — ثم يتم تحويل الأقمشة لمتطلبات رولات في نظام المشتريات.
          </Callout>
          <div className="card tight">
            <div className="flex-between small">
              <span>محتاج قماش (متر)</span>
              <strong>{fmtNum(fabricItems.reduce((a, r) => a + (r.unit === "متر" ? r.need : 0), 0))} م</strong>
            </div>
            <div className="flex-between small" style={{ marginTop: 8 }}>
              <span>الدفعة المقترحة للشراء (رول 120 م)</span>
              <strong>{Math.ceil(fabricItems.reduce((a, r) => a + (r.unit === "متر" ? r.need : 0), 0) / 120)} رول</strong>
            </div>
          </div>
        </div>

        <DataTable
          keyField="material"
          rows={rows}
          columns={[
            { key: "material", label: "المادة", render: (r) => (
              <div>
                <div className="semibold">{r.material}</div>
                <div className="muted small">{r.unit === "متر" ? "قماش" : "قطعة"}</div>
              </div>
            ) },
            { key: "type", label: "التصنيف", render: (r) => <Badge tone={typeTone(r.type)}>{r.type}</Badge> },
            { key: "u", label: "الاستهلاك للقطعة", render: (r) => `${r.consumption} ${r.unit}` },
            { key: "waste", label: "نسبة الهالك", render: (r) => <Badge tone={r.wastePct > 5 ? "warn" : "ok"}>{r.wastePct}%</Badge> },
            { key: "gross", label: "الاحتياج الصافي", render: (r) => `${fmtNum(Math.ceil(r.gross))} ${r.unit}` },
            { key: "need", label: "الاحتياج مع الهالك", render: (r) => <strong>{fmtNum(r.need)} {r.unit}</strong> },
            { key: "total", label: "التكلفة للكمية", render: (r) => fmtMoney(r.total) },
            { key: "unitCost", label: "سعر الوحدة", render: (r) => fmtMoney(r.unitCost) },
          ]}
        />
      </Card>
    </div>
  );
}