import React, { useState } from "react";
import { Headset, Search, CheckCircle2, Factory, Undo2, CalendarClock, PhoneCall } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Callout, statusTone, StatusBadge,
} from "../components/ui.jsx";
import { callRequests, atpExample, finishedStock, fmtNum } from "../data/mock.js";

export default function CallCenter() {
  const [q, setQ] = useState("");
  const results = finishedStock.filter(
    (s) => !q || (s.model.includes(q) || s.color.includes(q) || s.size === q)
  );

  const atp = (row) => row.availableNow + row.fromReturns + row.fromProduction - row.reserved;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="الكول سنتر"
        subtitle="شاشة مخصصة للموظف: الموديل + اللون + المقاس + الكمية → متاح الآن + متوقع الإنتاج + تاريخ التوفر"
        actions={<button className="btn btn-primary"><Headset size={15} /> شاشة النداء</button>}
      />

      <div className="grid cols-3">
        <StatCard tone="info" icon={<PhoneCall />} label="مكالمات اليوم" value="87" sub="معدل الرد 12 ثانية" />
        <StatCard tone="brand" icon={<CheckCircle2 />} label="حجوزات نجحت" value="31" sub="67% من النداءات" />
        <StatCard tone="warn" icon={<CalendarClock />} label="طلبات مؤجلة للتوفر" value="9" sub="بناءً على تاريخ الإنتاج" />
      </div>

      <Card title="بحث التوفر الفوري (ATP)" subtitle="المتاح الآن + المتوقع من الإنتاج + المرتجعات المقبولة − المحجوز">
        <div className="filter-bar" style={{ marginBottom: 14 }}>
          <div className="flex" style={{ flex: 1 }}>
            <Search size={16} className="muted" />
            <input
              placeholder="اكتب اسم الموديل أو اللون أو المقاس (مثال: فستان سهرة أو أسود أو M)..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
          <span className="muted small">{results.length} نتيجة</span>
        </div>

        <DataTable
          keyField="uid"
          rows={results.map((r, i) => ({ ...r, uid: `${r.model}-${r.color}-${r.size}-${i}` }))}
          columns={[
            { key: "model", label: "الموديل", render: (r) => (
              <div>
                <div className="semibold">{r.model}</div>
                <div className="muted small">{r.color} · مقاس {r.size}</div>
              </div>
            ) },
            { key: "a", label: "متاح الآن", render: (r) => <strong style={{ color: "var(--brand)" }}>{r.available}</strong> },
            { key: "ret", label: "من المرتجعات", render: (r) => <Badge tone="purple">{r.returnable}</Badge> },
            { key: "prod", label: "متوقع من الإنتاج", render: (r) => <Badge tone="info">{r.inProduction}</Badge> },
            { key: "atp", label: "ATP الإجمالي", render: (r) => <strong>{fmtNum(r.available + r.returnable + r.inProduction - r.reserved)}</strong> },
            { key: "eta", label: "تاريخ التوفر", render: (r) => (
              r.inProduction ? <span className="small">خلال {r.size === "M" ? "3" : "5"} أيام</span> : <Badge tone="ok">متاح الآن</Badge>
            ) },
          ]}
        />
      </Card>

      <div className="grid cols-2">
        <Card title="مثال حي — حساب التوفر المتوقع">
          <Callout type="ok" title="طلب: 10 قطع — فستان سهرة أسود مقاس M">
            <div className="stack" style={{ marginTop: 8 }}>
              <div className="flex-between small"><span>المتاح الآن</span><strong>{atpExample.availableNow} قطع</strong></div>
              <div className="flex-between small"><span>من المرتجعات الصالحة</span><strong>{atpExample.fromReturns} قطعة</strong></div>
              <div className="flex-between small"><span>من الإنتاج (قريب)</span><strong>{atpExample.fromProduction} قطع</strong></div>
              <div className="flex-between small"><span>خُصمت الحجوزات القائمة</span><strong>{atpExample.reserved} قطع</strong></div>
              <div className="divider" style={{ margin: "6px 0" }} />
              <div className="flex-between">
                <span className="semibold">ATP الإجمالي</span>
                <strong style={{ color: "var(--ok)", fontSize: 16 }}>
                  {atpExample.availableNow + atpExample.fromReturns + atpExample.fromProduction - atpExample.reserved} قطع
                </strong>
              </div>
              <div className="muted small">النتيجة: الطلب متاح بالكامل — تاريخ التوفر المتوقع: الأحد 1 سبتمبر.</div>
            </div>
          </Callout>
        </Card>

        <Card title="نداءات الكول سنتر اليوم">
          <DataTable
            keyField="reqNo"
            rows={callRequests}
            columns={[
              { key: "reqNo", label: "النداء", render: (r) => <span className="mono">{r.reqNo}</span> },
              { key: "customer", label: "العميل" },
              { key: "need", label: "الطلب", render: (r) => (
                <div>
                  <div className="semibold small">{r.model}</div>
                  <div className="muted small">{r.color} · مقاس {r.size} · {r.qty} قطعة</div>
                </div>
              ) },
              { key: "avail", label: "النتيجة", render: (r) => <span className="small">{r.eta}</span> },
              { key: "status", label: "الحالة", render: (r) => <StatusBadge s={r.status} /> },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}