import React, { useState } from "react";
import { RotateCcw, Shirt, FlaskConical, Megaphone, ClipboardList, Layers, Factory, ShieldCheck, Warehouse, Store, Headset, ShoppingBag, Undo2, Calculator, TrendingUp } from "lucide-react";
import {
  PageHeader, Card, Badge, ClothSwatch, ColorChips, statusTone, Callout,
} from "../components/ui.jsx";
import { models, samples, campaigns, productionOrders, bomPerModel, finishedStock, fmtMoney } from "../data/mock.js";

const stages = [
  { key: "design", label: "التصميم", icon: <Shirt size={15} /> },
  { key: "sample", label: "العينة", icon: <FlaskConical size={15} /> },
  { key: "marketing", label: "التسويق", icon: <Megaphone size={15} /> },
  { key: "orders", label: "الطلبات", icon: <ClipboardList size={15} /> },
  { key: "materials", label: "الخامات", icon: <Layers size={15} /> },
  { key: "production", label: "الإنتاج", icon: <Factory size={15} /> },
  { key: "qc", label: "الجودة", icon: <ShieldCheck size={15} /> },
  { key: "inventory", label: "المخزون", icon: <Warehouse size={15} /> },
  { key: "store", label: "المتجر", icon: <Store size={15} /> },
  { key: "call", label: "الكول سنتر", icon: <Headset size={15} /> },
  { key: "sales", label: "المبيعات", icon: <ShoppingBag size={15} /> },
  { key: "returns", label: "المرتجعات", icon: <Undo2 size={15} /> },
  { key: "cost", label: "التكلفة", icon: <Calculator size={15} /> },
  { key: "profit", label: "الربحية", icon: <TrendingUp size={15} /> },
];

export default function Model360() {
  const [code, setCode] = useState(models[0].code);
  const model = models.find((m) => m.code === code);

  const mSamples = samples.filter((s) => s.modelCode === code);
  const mCampaigns = campaigns.filter((c) => c.model === code);
  const mOrders = productionOrders.filter((o) => o.modelCode === code);
  const mBom = bomPerModel.find((b) => b.modelCode === code);
  const mStock = finishedStock.filter((s) => s.model === model.name);
  const totalSold = mStock.reduce((a, s) => a + s.sold, 0);
  const margin = model.price - model.targetCost;
  const marginPct = Math.round((margin / model.price) * 100);
  const orderedTotal = mOrders.reduce((a, o) => a + o.total, 0);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="الموديل 360°"
        subtitle="نظرة شاملة على دورة حياة الموديل في مكان واحد — من الفكرة حتى الربحية والمرتجع"
        actions={
          <div>
            <div className="card-sub" style={{ marginBottom: 4 }}>اختر موديل</div>
            <select value={code} onChange={(e) => setCode(e.target.value)}>
              {models.map((m) => <option key={m.code} value={m.code}>{m.code} — {m.name}</option>)}
            </select>
          </div>
        }
      />

      <Card>
        <div className="flex-between">
          <div className="flex" style={{ gap: 14 }}>
            <ClothSwatch hue={model.hue} size={64} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 900 }}>{model.name}</div>
              <div className="muted small">{model.code} · مجموعه {model.collection} · موسم {model.season}</div>
              <div className="flex" style={{ marginTop: 6 }}>
                <ColorChips colors={model.colors} />
              </div>
            </div>
          </div>
          <div style={{ textAlign: "left", display: "grid", gap: 4 }}>
            <Badge tone={statusTone[model.status]}>{model.status}</Badge>
            <span className="small muted">سعر {fmtMoney(model.price)}</span>
            <span className="small muted">تكلفة {fmtMoney(model.targetCost)}</span>
          </div>
        </div>
      </Card>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {stages.map((s, i) => (
          <div key={s.key} className="flex">
            <Badge tone="info">{s.icon}<span style={{ marginInlineStart: 4 }}>{s.label}</span></Badge>
            {i < stages.length - 1 && <span className="sep">←</span>}
          </div>
        ))}
      </div>

      <div className="grid cols-3">
        <Card title="العينات">
          {mSamples.length ? (
            <div className="stack">
              {mSamples.map((s) => (
                <div key={s.id} className="flex-between">
                  <span className="mono">{s.version}</span>
                  <span className="small muted">{s.notes.slice(0, 34)}…</span>
                  <Badge tone={s.status === "معتمدة" ? "ok" : "warn"}>{s.status}</Badge>
                </div>
              ))}
            </div>
          ) : <div className="muted small">لا عينات مسجلة</div>}
        </Card>

        <Card title="الحملات التسويقية">
          {mCampaigns.length ? (
            <div className="stack">
              {mCampaigns.map((c) => (
                <div key={c.id}>
                  <div className="semibold small">{c.name}</div>
                  <div className="muted small">
                    {c.views.toLocaleString("en-US")} مشاهدة · {c.orders.toLocaleString("en-US")} طلب · {c.preOrders.toLocaleString("en-US")} Pre-order
                  </div>
                </div>
              ))}
            </div>
          ) : <div className="muted small">لا حملات مرتبطة</div>}
        </Card>

        <Card title="أوامر الإنتاج">
          {mOrders.length ? (
            <div className="stack">
              {mOrders.map((o) => (
                <div key={o.poNo} className="flex-between">
                  <span className="mono">{o.poNo}</span>
                  <span>{o.total.toLocaleString("en-US")} قطعة</span>
                  <Badge tone={statusTone[o.status]}>{o.status}</Badge>
                </div>
              ))}
            </div>
          ) : <div className="muted small">لا أوامر إنتاج</div>}
        </Card>

        <Card title="الخامات BOM">
          {mBom ? (
            <div className="stack">
              {mBom.items.slice(0, 6).map((b) => (
                <div key={b.material} className="flex-between small">
                  <span>{b.material}</span>
                  <span className="muted">{b.consumption} {b.unit} · {b.unitCost} ج</span>
                </div>
              ))}
            </div>
          ) : <div className="muted small">لا بيانات BOM</div>}
        </Card>

        <Card title="المخزون والمبيعات">
          <div className="stack">
            <div className="flex-between"><span>قطع مباعة (M-2026)</span><strong>{totalSold.toLocaleString("en-US")}</strong></div>
            <div className="flex-between"><span>محجوز حاليًا</span><strong>{mStock.reduce((a, s) => a + s.reserved, 0).toLocaleString("en-US")}</strong></div>
            <div className="flex-between"><span>متاح الآن</span><strong>{mStock.reduce((a, s) => a + s.available, 0).toLocaleString("en-US")}</strong></div>
            <div className="flex-between"><span>مرتجعات صالحة</span><strong>{mStock.reduce((a, s) => a + s.returnable, 0).toLocaleString("en-US")}</strong></div>
            <div className="flex-between"><span>تحت الإنتاج</span><strong>{mStock.reduce((a, s) => a + s.inProduction, 0).toLocaleString("en-US")}</strong></div>
          </div>
        </Card>

        <Card title="التكلفة والربحية">
          <div className="stack">
            <div className="flex-between"><span>سعر البيع</span><strong>{fmtMoney(model.price)}</strong></div>
            <div className="flex-between"><span>التكلفة المستهدفة</span><strong>{fmtMoney(model.targetCost)}</strong></div>
            <div className="flex-between"><span>هامش القطعة</span><strong>{fmtMoney(margin)}</strong></div>
            <div className="flex-between"><span>نسبة الهامش</span><strong style={{ color: "var(--ok)" }}>{marginPct}%</strong></div>
            <div className="divider" style={{ margin: "4px 0" }} />
            <div className="flex-between"><span className="semibold">إجمالي الأوامر</span><strong>{orderedTotal.toLocaleString("en-US")} قطعة</strong></div>
          </div>
        </Card>
      </div>

      <Callout type="info" title="قوة الرؤية 360°">
        هذه الشاشة تجمع بيانات 14 وحدة لا تظهر سويًا إلا هنا — يمكن للمدير فتح أي موديل واتخاذ قرار (زيادة إنتاج،
        تغيير تسعير، إيقاف إنتاج) من معلومات محدثة لحظيًا.
      </Callout>
    </div>
  );
}