import React from "react";

// ---------- لبطاقة عنوان الصفحة ----------
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-head">
      <div>
        <div className="p-title">{title}</div>
        {subtitle && <div className="p-sub">{subtitle}</div>}
      </div>
      {actions && <div className="actions">{actions}</div>}
    </div>
  );
}

// ---------- كارت عام ----------
export function Card({ title, subtitle, actions, children, className = "", style, tight }) {
  return (
    <div className={`card${tight ? " tight" : ""} ${className}`} style={style}>
      {(title || actions) && (
        <div className="card-head">
          <div>
            {title && <div className="card-title">{title}</div>}
            {subtitle && <div className="card-sub">{subtitle}</div>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}

// ---------- بطاقة إحصائية ----------
export function StatCard({ icon, label, value, sub, tone = "brand", trend }) {
  return (
    <div className={`stat-card tone-${tone}`}>
      <div className="s-top">
        <div>
          <div className="s-label">{label}</div>
          <div className="s-value">{value}</div>
        </div>
        <div className="s-ico">{icon}</div>
      </div>
      {sub && (
        <div className="s-sub">
          {trend === "up" && <span className="trend-up">▲</span>}
          {trend === "down" && <span className="trend-down">▼</span>}
          <span>{sub}</span>
        </div>
      )}
    </div>
  );
}

// ---------- شارة حالة ----------
export function Badge({ tone = "gray", children }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export const statusTone = {
  "مكتمل": "ok",
  "نشط": "ok",
  "معتمدة": "ok",
  "تعمل": "ok",
  "قيد التنفيذ": "info",
  "قيد التجهيز": "info",
  "نشطة": "info",
  "محجوز": "info",
  "متزامن": "ok",
  "قيد المعالجة": "info",
  "جارٍ المعالجة": "info",
  "قيد الاعتماد": "info",
  "مخطط": "info",
  "جديد": "gray",
  "مجدولة": "info",
  "قيد التشغيل": "info",
  "منخفض": "warn",
  "متاح": "ok",
  "في التشطيب": "warn",
  "تحت الفحص": "warn",
  "قريبة": "warn",
  "عاجلة": "danger",
  "عطل": "danger",
  "غير متزامن": "danger",
  "خلل متزامن": "warn",
  "تعديل": "warn",
  "تالف": "danger",
  "مرفوض": "danger",
  "بالعطل": "danger",
  "متوقف مؤقتاً للصيانة": "warn",
  "انتظار": "warn",
  "خسارة Scrap": "danger",
  "عاد للمخزون": "ok",
  "شحن": "brand",
  "تسليم": "ok",
  "تجهيز": "info",
  "حجز": "warn",
  "استلام": "info",
  "سداد": "ok",
  "فاتورة": "brand",
  "فحص": "info",
  "أمر شراء": "info",
  "اعتماد": "warn",
  "طلب شراء": "gray",
  "سحب": "warn",
  "بيع": "ok",
  "إنتاج": "brand",
};

export function StatusBadge({ s }) {
  const tone = statusTone[s] || "gray";
  return <Badge tone={tone}>{s}</Badge>;
}

// ---------- جدول بيانات عام ----------
export function DataTable({ columns, rows, keyField = "id", empty = "لا توجد بيانات" }) {
  if (!rows || rows.length === 0) {
    return <div className="muted small" style={{ padding: "16px", textAlign: "center" }}>{empty}</div>;
  }
  return (
    <div className="table-wrap">
      <table className="data">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r[keyField] ?? i}>
              {columns.map((c) => (
                <td key={c.key}>{c.render ? c.render(r) : r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------- شريط تقدم ----------
export function Progress({ value, tone, label }) {
  const t = value >= 100 ? "ok" : tone || (value >= 70 ? "ok" : value >= 40 ? "warn" : "danger");
  return (
    <div className="flex" style={{ gap: 8 }}>
      <div className={`progress ${t}`} style={{ flex: 1 }}>
        <div style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
      {label != null && <span className="small semibold muted">{label}</span>}
    </div>
  );
}

// ---------- Callout ----------
export function Callout({ type = "info", icon, title, children }) {
  const ic = icon || (type === "warn" ? "!" : "ℹ");
  return (
    <div className={`callout ${type}`}>
      <span style={{ fontWeight: 900 }}>{ic}</span>
      <div>
        {title && <div className="semibold" style={{ marginBottom: 4 }}>{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}

// ---------- عناصر إحصائية صغيرة ----------
export function StatStrip({ items }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(130px, 1fr))` }}>
      {items.map((it, i) => (
        <div key={i} className="card tight" style={{ textAlign: "center" }}>
          <div className="s-label" style={{ marginTop: 4 }}>{it.label}</div>
          <div className="s-value" style={{ fontSize: 18, marginTop: 4 }}>{it.value}</div>
          {it.sub && <div className="s-sub" style={{ marginTop: 2 }}>{it.sub}</div>}
        </div>
      ))}
    </div>
  );
}

// ---------- مرحلة Flow ----------
export function FlowSteps({ steps }) {
  return (
    <div className="flow">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep">←</span>}
          <span className={`step ${s.state || ""}`}>{s.step}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

// ---------- مفتاح ألوان ----------
export function Legend({ items }) {
  return (
    <div className="mini-legend">
      {items.map((it, i) => (
        <span key={i}>
          <i style={{ background: it.color || it }} />
          {it.label != null ? it.label : it}
        </span>
      ))}
    </div>
  );
}

// ---------- رقم صغير ----------
export function KpiBanner({ items }) {
  return (
    <div className="kpi-banner">
      {items.map((k, i) => (
        <div className="k" key={i}>
          <div className="v">{k.value}</div>
          <div className="l">{k.label}</div>
        </div>
      ))}
    </div>
  );
}

// ---------- صورة موديل (بلوك لون) ----------
export function ClothSwatch({ hue, size = 42, radius = 10 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: `linear-gradient(135deg, ${hue}, ${hue}cc)`,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25), 0 3px 8px rgba(15,23,42,0.15)",
        flexShrink: 0,
      }}
    />
  );
}

// ---------- كروم لون متعدد ----------
export function ColorChips({ colors }) {
  return (
    <div className="flex" style={{ gap: 4, flexWrap: "wrap" }}>
      {colors.map((c) => (
        <span
          key={c}
          style={{
            padding: "2px 9px",
            borderRadius: 999,
            background: "#eef2f7",
            fontSize: 11,
            fontWeight: 700,
            color: "var(--text-2)",
          }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}