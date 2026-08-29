import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area,
} from "recharts";
import { FileBarChart2, Factory, Warehouse, ShoppingBag, Wallet, Download, Printer } from "lucide-react";
import {
  PageHeader, Card, Badge, DataTable, Callout,
} from "../components/ui.jsx";
import { lines, cashflow, fmtMoney, models, fmtNum, finishedStock } from "../data/mock.js";

const TOOLTIP = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div className="card tight" style={{ padding: "8px 12px", fontSize: 12 }}>
      <strong>{label}</strong>
      {payload.map((p, i) => <div key={i} className="muted">{p.name}: {p.value.toLocaleString("en-US")}</div>)}
    </div>
  ) : null;

const colorSales = [
  { name: "أسود", value: 6900, hue: "#0f172a" },
  { name: "أبيض", value: 5100, hue: "#64748b" },
  { name: "كحلي", value: 2400, hue: "#1e3a8a" },
  { name: "موف", value: 1900, hue: "#7c3aed" },
  { name: "زيتي", value: 1300, hue: "#65a30d" },
];

const sizeSales = [
  { name: "XS", value: 900, hue: "#94a3b8" },
  { name: "S", value: 3400, hue: "#2563eb" },
  { name: "M", value: 5600, hue: "#0e7a62" },
  { name: "L", value: 4200, hue: "#d97706" },
  { name: "XL", value: 2900, hue: "#7c3aed" },
  { name: "XXL", value: 630, hue: "#dc2626" },
];

const reportDefs = [
  { icon: <Factory size={17} />, name: "تقارير الإنتاج", items: ["إنتاج اليوم / الخط / العامل", "مستهدف مقابل فعلي", "الأوامر المتأخرة"] },
  { icon: <Warehouse size={17} />, name: "تقارير المخزون", items: ["الخامات والأقمشة", "تحت التشغيل", "المنتجات النهائية والراكد"] },
  { icon: <ShoppingBag size={17} />, name: "تقارير المبيعات", items: ["المبيعات على مستوى الموديل", "حسب اللون والمقاس", "تصنيف العملاء"] },
  { icon: <Wallet size={17} />, name: "التقارير المالية", items: ["الإيرادات والمصروفات", "الأرباح والتدفقات", "الرواتب"] },
];

export default function Reports() {
  const lineData = lines.map((l) => ({ name: l.id, المستهدف: l.target, الفعلي: l.outputToday }));
  const modelsRevenue = models.slice(0, 6).map((m) => ({ name: m.name.slice(0, 12), إيراد: Math.round(m.price * 700) }));

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="التقارير والتحليلات"
        subtitle="جميع تقارير المصنع في مكان واحد — مع تصدير تلقائي PDF / Excel"
        actions={
          <>
            <button className="btn btn-ghost"><Printer size={15} /> طباعة</button>
            <button className="btn btn-primary"><Download size={15} /> تصدير Excel</button>
          </>
        }
      />

      <div className="grid cols-4">
        {reportDefs.map((r) => (
          <Card key={r.name} className="tight" style={{ cursor: "pointer" }}>
            <div className="flex" style={{ marginBottom: 10 }}>
              <span className="stat-card tone-brand" style={{ width: 40, height: 40, borderRadius: 11, display: "grid", placeItems: "center", boxShadow: "none" }}>
                {r.icon}
              </span>
              <span className="semibold">{r.name}</span>
            </div>
            {r.items.map((it) => <div key={it} className="small muted" style={{ padding: "3px 0" }}>• {it}</div>)}
          </Card>
        ))}
      </div>

      <div className="grid cols-2">
        <Card title="إنتاج الخطوط — يوم 30 أغسطس" subtitle="تقارير الإنتاج">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={lineData} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#475569" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TOOLTIP />} />
              <Bar dataKey="المستهدف" fill="#cbd5e1" radius={[5, 5, 0, 0]} />
              <Bar dataKey="الفعلي" fill="#0e7a62" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="المبيعات حسب الموديل — الشهر الحالي" subtitle="تقارير المبيعات">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={modelsRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#475569" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}ك`} />
              <Tooltip content={<TOOLTIP />} />
              <Bar dataKey="إيراد" fill="#2563eb" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid cols-3">
        <Card title="المبيعات حسب اللون">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={colorSales} dataKey="value" innerRadius={55} outerRadius={85}>
                {colorSales.map((e) => <Cell key={e.name} fill={e.hue} />)}
              </Pie>
              <Tooltip content={<TOOLTIP />} />
              <Legend iconType="circle" formatter={(v) => <span style={{ fontSize: 11, fontWeight: 700, color: "#475569" }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="المبيعات حسب المقاس">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={sizeSales} dataKey="value" outerRadius={85}>
                {sizeSales.map((e) => <Cell key={e.name} fill={e.hue} />)}
              </Pie>
              <Tooltip content={<TOOLTIP />} />
              <Legend iconType="circle" formatter={(v) => <span style={{ fontSize: 11, fontWeight: 700, color: "#475569" }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="التدفق النقدي الشهري">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={cashflow}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TOOLTIP />} />
              <Area type="monotone" dataKey="profit" name="صافي الربح" stroke="#0e7a62" strokeWidth={2} fill="#e6f4f0" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid cols-2">
        <Card title="مخزون متاح ومرتجع — نقاط الضعف">
          <DataTable
            keyField="model+color"
            rows={finishedStock.slice(0, 5)}
            columns={[
              { key: "model", label: "الموديل", render: (r) => <span className="semibold">{r.model}</span> },
              { key: "c", label: "اللون / المقاس", render: (r) => `${r.color} · ${r.size}` },
              { key: "a", label: "متاح", render: (r) => fmtNum(r.available) },
              { key: "r", label: "مرتجع", render: (r) => r.returnable },
            ]}
          />
        </Card>
        <Callout type="info" title="جدولة تقارير تلقائية">
          يُرسل للنظام تقرير الإنتاج اليومي الساعة 9 مساءً، وتقرير المبيعات صباح كل يوم للجهات المعنية، والملخص
          المالي كل نهاية أسبوع.
        </Callout>
      </div>
    </div>
  );
}