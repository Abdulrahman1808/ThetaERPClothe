import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, RotateCcw, Shirt } from "lucide-react";
import {
  PageHeader, Badge, Card, ClothSwatch, ColorChips, DataTable, statusTone,
} from "../components/ui.jsx";
import { models, fmtMoney } from "../data/mock.js";

const STATUSES = ["الكل", ...Object.keys(statusTone).slice(0, 0)];

export default function Models() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("الكل");

  const list = models.filter((m) => {
    const okStatus = status === "الكل" || m.status === status;
    const okQ = !q || m.name.includes(q) || m.code.includes(q) || m.designer.includes(q);
    return okStatus && okQ;
  });

  const allStatuses = ["الكل", ...new Set(models.map((m) => m.status))];

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="الموديلات والتصميم"
        subtitle="ملف إلكتروني متكامل لكل موديل منذ الفكرة حتى البيع"
        actions={
          <>
            <button className="btn btn-ghost">استيراد من Excel</button>
            <button className="btn btn-primary"><Plus size={15} /> موديل جديد</button>
          </>
        }
      />

      <Card tight style={{ padding: "14px 18px" }}>
        <div className="filter-bar">
          <div className="flex" style={{ flex: 1, minWidth: 220 }}>
            <Search size={16} className="muted" />
            <input
              placeholder="بحث بالاسم أو الكود أو المصمم..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
          {allStatuses.map((s) => (
            <button
              key={s}
              className={`btn ${status === s ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "6px 14px" }}
              onClick={() => setStatus(s)}
            >
              {s}
            </button>
          ))}
          <span className="muted small" style={{ marginInlineStart: "auto" }}>
            {list.length} موديل
          </span>
        </div>
      </Card>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {list.map((m) => (
          <Card key={m.id} className="tight" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="flex" style={{ alignItems: "flex-start" }}>
              <ClothSwatch hue={m.hue} size={56} />
              <div style={{ flex: 1 }}>
                <div className="semibold" style={{ fontSize: 14.5 }}>{m.name}</div>
                <div className="muted small">{m.code} · مجموعه {m.collection} · {m.season}</div>
              </div>
              <Badge tone={statusTone[m.status] || "gray"}>{m.status}</Badge>
            </div>
            <div>
              <div className="card-sub" style={{ marginBottom: 6 }}>الألوان</div>
              <ColorChips colors={m.colors} />
            </div>
            <div className="flex" style={{ flexWrap: "wrap", gap: 6 }}>
              <button className="chip">{m.sizes.join(" / ")}</button>
            </div>
            <div className="flex-between">
              <div>
                <div className="s-label" style={{ fontSize: 11 }}>سعر البيع</div>
                <div className="semibold" style={{ fontSize: 16 }}>{fmtMoney(m.price)}</div>
              </div>
              <div>
                <div className="s-label" style={{ fontSize: 11 }}>التكلفة المستهدفة</div>
                <div className="muted semibold" style={{ fontSize: 13 }}>{fmtMoney(m.targetCost)}</div>
              </div>
              <div>
                <div className="s-label" style={{ fontSize: 11 }}>هامش الربح</div>
                <strong style={{ color: "var(--ok)", fontSize: 14 }}>
                  {Math.round(((m.price - m.targetCost) / m.price) * 100)}%
                </strong>
              </div>
            </div>
            <div className="divider" style={{ margin: 0 }} />
            <div className="flex-between">
              <span className="small muted">المصمم: {m.designer}</span>
              <Link to="/model360" className="btn btn-soft-brand" style={{ padding: "6px 12px" }}>
                <RotateCcw size={13} /> عرض 360°
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <Card
        title="جدول الموديلات"
        subtitle="كل الموديلات مع دورة حالتها"
        actions={<Badge tone="brand"><Shirt size={12} /> {models.length} موديل</Badge>}
      >
        <DataTable
          keyField="code"
          rows={models}
          columns={[
            { key: "code", label: "الكود", render: (r) => <span className="mono">{r.code}</span> },
            { key: "name", label: "اسم الموديل", render: (r) => <span className="semibold">{r.name}</span> },
            { key: "collection", label: "المجموعة / الموسم", render: (r) => <span>{r.collection} · {r.season}</span> },
            { key: "colors", label: "الألوان", render: (r) => <ColorChips colors={r.colors.slice(0, 2)} /> },
            { key: "sizes", label: "المقاسات", render: (r) => r.sizes.join("، ") },
            { key: "price", label: "سعر البيع", render: (r) => fmtMoney(r.price) },
            { key: "target", label: "التكلفة", render: (r) => fmtMoney(r.targetCost) },
            { key: "margin", label: "الهامش", render: (r) => (
              <Badge tone={Math.round(((r.price - r.targetCost) / r.price) * 100) > 45 ? "ok" : "warn"}>
                {Math.round(((r.price - r.targetCost) / r.price) * 100)}%
              </Badge>
            ) },
            { key: "designer", label: "المصمم" },
            { key: "status", label: "الحالة", render: (r) => <Badge tone={statusTone[r.status]}>{r.status}</Badge> },
          ]}
        />
      </Card>
    </div>
  );
}