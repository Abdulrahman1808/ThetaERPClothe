import React from "react";
import { Wrench, CalendarClock, AlertOctagon, Cog, Car } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Callout, statusTone, StatusBadge,
} from "../components/ui.jsx";
import { maintenance, machines, fmtMoney } from "../data/mock.js";

export default function Maintenance() {
  const upcoming = maintenance.filter((m) => m.status === "قريبة" || m.status === "عاجلة").length;
  const totalCost = maintenance.reduce((a, m) => a + m.cost, 0);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="الصيانة والتشغيل"
        subtitle="ماكينات الإنتاج · السيارات · الأجهزة — صيانة وقائية وأعطال وقطع غيار وتكاليف"
        actions={<button className="btn btn-primary"><Wrench size={15} /> جدول صيانة</button>}
      />

      <div className="grid cols-4">
        <StatCard tone="brand" icon={<Cog />} label="أصول تشغيلية" value="11" sub="ماكينات + سيارات + أجهزة" />
        <StatCard tone="warn" icon={<CalendarClock />} label="صيانة قادمة" value={upcoming} sub="خلال 7 أيام" />
        <StatCard tone="danger" icon={<AlertOctagon />} label="أعطال مفتوحة" value="1" sub="عطل ماكينة MC-03" />
        <StatCard tone="info" icon={<Car />} label="تكاليف الصيانة (شهر)" value={fmtMoney(totalCost)} sub="قطع غيار + عمل" />
      </div>

      <Card title="جدول الصيانة القادمة">
        <DataTable
          keyField="id"
          rows={maintenance}
          columns={[
            { key: "id", label: "رقم", render: (r) => <span className="mono">{r.id}</span> },
            { key: "asset", label: "الأصل", render: (r) => <span className="semibold">{r.asset}</span> },
            { key: "type", label: "النوع", render: (r) => <Badge tone={r.type === "عطل" ? "danger" : "info"}>{r.type === "عطل" ? "إصلاح عطل" : "وقائية"}</Badge> },
            { key: "last", label: "آخر صيانة" },
            { key: "next", label: "القادمة", render: (r) => <span className="small">{r.next}</span> },
            { key: "cost", label: "التكلفة", render: (r) => fmtMoney(r.cost) },
            { key: "status", label: "الحالة", render: (r) => <StatusBadge s={r.status} /> },
          ]}
        />
      </Card>

      <div className="grid cols-2">
        <Card title="حالة الماكينات">
          <DataTable
            keyField="id"
            rows={machines}
            columns={[
              { key: "id", label: "الماكينة", render: (r) => <span className="mono">{r.id}</span> },
              { key: "type", label: "النوع", render: (r) => <span className="semibold">{r.type}</span> },
              { key: "line", label: "الخط" },
              { key: "status", label: "الحالة", render: (r) => <StatusBadge s={r.status} /> },
              { key: "hours", label: "ساعات التشغيل" },
              { key: "bd", label: "أعطال", render: (r) => <Badge tone={r.breakdowns > 3 ? "danger" : "info"}>{r.breakdowns}</Badge> },
              { key: "next", label: "الصيانة القادمة" },
            ]}
          />
        </Card>

        <div style={{ display: "grid", gap: 14 }}>
          <Card title="قطع الغيار المخزنة">
            <div className="stack">
              <div className="flex-between"><span>ماكينة أوفر — إبر + منقلة</span><Badge tone="ok">8 قطع</Badge></div>
              <div className="flex-between"><span>سير ماكينة مسطحة</span><Badge tone="ok">3 قطع</Badge></div>
              <div className="flex-between"><span>حساس معدني (كمبريسور)</span><Badge tone="info">1 قطعة</Badge></div>
              <div className="flex-between"><span>موتور تكييس</span><Badge tone="danger">نفد — يُطلب</Badge></div>
            </div>
          </Card>
          <Callout type="info" title="هدف الصيانة الوقائية">
            تقليل توقف خطوط الإنتاج — التوقف الحالي (خط 4) يكلف المصنع 180 قطعة في اليوم؛ النظام يذكّر بالمواعيد
            قبل 7 أيام لتجنّبها.
          </Callout>
        </div>
      </div>
    </div>
  );
}