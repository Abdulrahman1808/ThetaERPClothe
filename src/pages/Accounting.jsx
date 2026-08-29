import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area,
} from "recharts";
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowUpLeft, ArrowDownLeft } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, statusTone,
} from "../components/ui.jsx";
import { cashflow, expenseCategories, accounts, treasuryMoves, fmtMoney } from "../data/mock.js";

const TOOLTIP = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div className="card tight" style={{ padding: "8px 12px", fontSize: 12 }}>
      <strong>{label}</strong>
      {payload.map((p, i) => (
        <div key={i} className="muted">{p.name}: {fm(p.value)}</div>
      ))}
    </div>
  ) : null;

const fm = (v) => v.toLocaleString("en-US") + " ج.م";

export default function Accounting() {
  const totalRevenue = cashflow.reduce((a, m) => a + m.revenue, 0);
  const totalExpense = cashflow.reduce((a, m) => a + m.expense, 0);
  const profit = totalRevenue - totalExpense;
  const treasury = accounts.reduce((a, c) => a + c.balance, 0);

  const monthlyProfit = cashflow.map((m) => ({ ...m, profit: m.revenue - m.expense }));

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="الحسابات والخزينة"
        subtitle="نظام حسابات مبسط ومتكامل مع عمليات المصنع — إيرادات · مصروفات · خزينة وبنوك · تدفقات نقدية"
        actions={
          <>
            <button className="btn btn-ghost">موازنة شهرية</button>
            <button className="btn btn-primary">قيد جديد</button>
          </>
        }
      />

      <div className="grid cols-4">
        <StatCard tone="ok" icon={<TrendingUp />} label="الإيرادات (6 شهور)" value={fmtMoney(totalRevenue)} sub="أغسطس الأعلى" trend="up" />
        <StatCard tone="danger" icon={<TrendingDown />} label="المصروفات (6 شهور)" value={fmtMoney(totalExpense)} sub="زيادة 2.4% عن يوليو" />
        <StatCard tone="brand" icon={<PiggyBank />} label="صافي الربح" value={fmtMoney(profit)} sub={`هامش ${Math.round((profit / totalRevenue) * 100)}%`} trend="up" />
        <StatCard tone="purple" icon={<Wallet />} label="الخزينة والبنوك" value={fmtMoney(treasury)} sub="في 4 حسابات" />
      </div>

      <div className="grid cols-2">
        <Card title="التدفق النقدي — إيرادات مقابل مصروفات">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={cashflow}>
              <defs>
                <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#475569" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v / 100000)}لا`} />
              <Tooltip content={<TOOLTIP />} />
              <Area type="monotone" dataKey="revenue" name="الإيرادات" stroke="#16a34a" strokeWidth={2.5} fill="url(#gRev)" />
              <Area type="monotone" dataKey="expense" name="المصروفات" stroke="#dc2626" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="مصروفات الشهر حسب البند">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={expenseCategories} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {expenseCategories.map((e, i) => (
                  <Cell key={i} fill={["#0e7a62", "#2563eb", "#d97706", "#7c3aed", "#dc2626", "#0d9488", "#94a3b8", "#f59e0b"][i]} />
                ))}
              </Pie>
              <Tooltip content={<TOOLTIP />} />
              <Legend iconType="circle" formatter={(v) => <span style={{ fontSize: 11, fontWeight: 700, color: "#475569" }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid cols-2">
        <Card title="الحسابات — الخزينة والبنوك">
          <DataTable
            keyField="name"
            rows={accounts}
            columns={[
              { key: "name", label: "الحساب", render: (r) => <span className="semibold">{r.name}</span> },
              { key: "type", label: "النوع", render: (r) => <Badge tone="info">{r.type}</Badge> },
              { key: "in", label: "وارد", render: (r) => <span className="flex" style={{ color: "var(--ok)" }}><ArrowDownLeft size={14} /> {fmtMoney(r.flows.in)}</span> },
              { key: "out", label: "صادر", render: (r) => <span className="flex" style={{ color: "var(--danger)" }}><ArrowUpLeft size={14} /> {fmtMoney(r.flows.out)}</span> },
              { key: "balance", label: "الرصيد", render: (r) => <strong>{fmtMoney(r.balance)}</strong> },
            ]}
          />
        </Card>

        <Card title="أحدث حركات اليوم">
          <DataTable
            keyField="id"
            rows={treasuryMoves}
            columns={[
              { key: "time", label: "الحركة", render: (r) => (
                <div>
                  <div className="semibold">{r.desc}</div>
                  <div className="muted small">{r.account} · {r.date}</div>
                </div>
              ) },
              { key: "type", label: "النوع", render: (r) => <Badge tone={r.type === "مدفوعات" || r.type === "سحوبات" ? "danger" : "ok"}>{r.type}</Badge> },
              { key: "amount", label: "المبلغ", render: (r) => (
                <strong style={{ color: r.amount < 0 ? "var(--danger)" : "var(--ok)" }}>
                  {r.amount < 0 ? `(${fmtMoney(Math.abs(r.amount))})` : fmtMoney(r.amount)}
                </strong>
              ) },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}