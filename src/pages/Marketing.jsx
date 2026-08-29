import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, RadialBarChart, RadialBar,
} from "recharts";
import { Megaphone, Eye, Heart, MessageCircle, ShoppingCart, Clock4, Lightbulb } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Callout, Progress,
} from "../components/ui.jsx";
import { campaigns, fmtMoney, fmtNum } from "../data/mock.js";

const budgetData = campaigns.map((c) => ({
  name: c.name.slice(0, 18),
  budget: c.budget / 1000,
  spend: c.spend / 1000,
}));

const funnel = [
  { name: "مشاهدات", value: 8790000, hue: "#0e7a62" },
  { name: "تفاعل", value: 594000, hue: "#2563eb" },
  { name: "استفسارات", value: 10430, hue: "#7c3aed" },
  { name: "طلبات", value: 3040, hue: "#d97706" },
  { name: "طلبات مسبقة", value: 1560, hue: "#dc2626" },
];

const TOOLTIP = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div className="card tight" style={{ padding: "8px 12px", fontSize: 12 }}>
      <strong>{label}</strong>
      {payload.map((p, i) => (
        <div key={i} className="muted">{p.name}: {p.value.toLocaleString("en-US")}{p.unit}</div>
      ))}
    </div>
  ) : null;

export default function Marketing() {
  const totalViews = campaigns.reduce((a, c) => a + c.views, 0);
  const totalOrders = campaigns.reduce((a, c) => a + c.orders, 0);
  const totalPre = campaigns.reduce((a, c) => a + c.preOrders, 0);
  const totalBudget = campaigns.reduce((a, c) => a + c.budget, 0);
  const totalSpend = campaigns.reduce((a, c) => a + c.spend, 0);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="التسويق وربطه بالإنتاج"
        subtitle="نتائج الحملات تُستخدم لتحديد ما يجب إنتاجه والكمية المناسبة"
        actions={
          <>
            <button className="btn btn-ghost">تصدير النتائج</button>
            <button className="btn btn-primary"><Megaphone size={15} /> حملة جديدة</button>
          </>
        }
      />

      <div className="grid cols-4">
        <StatCard tone="brand" icon={<Eye />} label="إجمالي المشاهدات" value={fmtNum(totalViews)} sub="3 حملات نشطة" trend="up" />
        <StatCard tone="info" icon={<Heart />} label="نسبة التفاعل" value="6.7%" sub="متوسط Engagement Rate" />
        <StatCard tone="purple" icon={<ShoppingCart />} label="طلبات من الحملات" value={fmtNum(totalOrders)} sub="تحول استفسار → طلب 29%" trend="up" />
        <StatCard tone="warn" icon={<Clock4 />} label="طلبات مسبقة Pre-order" value={fmtNum(totalPre)} sub="ترجمة مباشرة لأوامر الإنتاج" />
      </div>

      <Callout type="info" title="التسويق يصنع قرار الإنتاج" icon={<Lightbulb size={16} />}>
        حملة «فستان السهرة الأسود» وحدها حققت 1,780 طلب + 620 طلب مسبق. النظام يقترح رفع أمر الإنتاج
        MO-1105 بمقاسات M و L لتفادي العجز المتوقع خلال 3 أسابيع.
      </Callout>

      <div className="grid cols-2">
        <Card title="ميزانية الحملات مقابل الإنفاق (بالألف جنيه)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={budgetData} barGap={5}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#475569", textAnchor: "end" }} height={50} axisLine={false} tickLine={false} interval={0} angle={-12} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TOOLTIP />} />
              <Bar dataKey="budget" name="الميزانية" fill="#cbd5e1" radius={[5, 5, 0, 0]} />
              <Bar dataKey="spend" name="الإنفاق" fill="#0e7a62" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="قمع التحويل — من المشاهدة إلى الطلب">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={funnel} dataKey="value" innerRadius={55} outerRadius={95} paddingAngle={2}>
                {funnel.map((e) => <Cell key={e.name} fill={e.hue} />)}
              </Pie>
              <Tooltip content={<TOOLTIP />} />
              <Legend iconType="circle" formatter={(v) => <span style={{ fontSize: 12, fontWeight: 700, color: "#475569" }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="الحملات الإعلانية">
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          {campaigns.map((c) => (
            <div key={c.id} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
              <div className="flex-between">
                <div className="flex">
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: c.hue }} />
                  <span className="semibold">{c.name}</span>
                </div>
                <Badge tone={c.status === "نشطة" ? "ok" : "info"}>{c.status}</Badge>
              </div>
              <div className="muted small" style={{ margin: "8px 0" }}>
                {c.model} · {c.platform}
              </div>
              <div className="stack" style={{ gap: 6, marginTop: 6 }}>
                <div className="flex-between small">
                  <span className="flex"><MessageCircle size={13} className="muted" /> استفسارات</span>
                  <strong>{fmtNum(c.inquiries)}</strong>
                </div>
                <div className="flex-between small">
                  <span className="flex"><ShoppingCart size={13} className="muted" /> طلبات</span>
                  <strong>{fmtNum(c.orders)}</strong>
                </div>
                <div className="flex-between small">
                  <span className="flex"><Clock4 size={13} className="muted" /> Pre-orders</span>
                  <strong>{fmtNum(c.preOrders)}</strong>
                </div>
                <div style={{ marginTop: 6 }}>
                  <div className="small muted" style={{ marginBottom: 4 }}>
                    صرف الميزانية: {fmtMoney(c.spend)} من {fmtMoney(c.budget)}
                  </div>
                  <Progress value={Math.round((c.spend / c.budget) * 100)} label={`${Math.round((c.spend / c.budget) * 100)}%`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="جدول الحملات" subtitle="كل الحملات مع مؤشرات الأداء">
        <DataTable
          keyField="id"
          rows={campaigns}
          columns={[
            { key: "id", label: "رقم", render: (r) => <span className="mono">{r.id}</span> },
            { key: "name", label: "الحملة", render: (r) => (
              <div>
                <div className="semibold">{r.name}</div>
                <div className="muted small">{r.model} · {r.platform}</div>
              </div>
            ) },
            { key: "views", label: "المشاهدات", render: (r) => fmtNum(r.views) },
            { key: "eng", label: "التفاعل", render: (r) => fmtNum(r.engagement) },
            { key: "inq", label: "الاستفسارات", render: (r) => fmtNum(r.inquiries) },
            { key: "orders", label: "الطلبات", render: (r) => <strong>{fmtNum(r.orders)}</strong> },
            { key: "pre", label: "Pre-orders", render: (r) => <Badge tone="warn">{fmtNum(r.preOrders)}</Badge> },
            { key: "status", label: "الحالة", render: (r) => <Badge tone={r.status === "نشطة" ? "ok" : "info"}>{r.status}</Badge> },
          ]}
        />
      </Card>
    </div>
  );
}