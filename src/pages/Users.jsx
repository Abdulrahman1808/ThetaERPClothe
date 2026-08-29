import React from "react";
import { Shield, KeyRound, UserPlus, Check, Minus } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, statusTone, Callout,
} from "../components/ui.jsx";
import { roleMatrix, users } from "../data/mock.js";

const perms = ["وحة التحكم", "الموديلات والعينات", "التسويق والمتجر", "المشتريات والقماش", "الإنتاج والقص", "الجودة", "المخزون والمبيعات", "الحسابات", "الموارد البشرية", "التقارير"];

export default function Users() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="الصلاحيات وإدارة المستخدمين"
        subtitle="كل دور يرى فقط ما يخصه — الإدارة ترى كل شيء، والإنتاج يرى التخطيط، والحسابات ترى الماليات"
        actions={<button className="btn btn-primary"><UserPlus size={15} /> مستخدم جديد</button>}
      />

      <div className="grid cols-2">
        <StatCard tone="brand" icon={<Shield />} label="الأدوار" value={roleMatrix.length} sub="صلاحيات قابلة للضبط" />
        <StatCard tone="info" icon={<KeyRound />} label="مستخدمون نشطون" value="5" sub="آخر 4 في غضون 24 ساعة" />
      </div>

      <Card title="مصفوفة الصلاحيات" subtitle="8 أدوار × 10 وحدات">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>الدور</th>
                {perms.map((p) => <th key={p} style={{ textAlign: "center" }}>{p}</th>)}
              </tr>
            </thead>
            <tbody>
              {roleMatrix.map((r, i) => (
                <tr key={r.role}>
                  <td>
                    <div className="semibold">{r.role}</div>
                    <div className="muted small">{r.desc}</div>
                  </td>
                  {perms.map((p) => {
                    const has = r.all || (r.pages && r.pages.some((x) => p.includes(x) || x.includes(p)));
                    return (
                      <td key={p} style={{ textAlign: "center" }}>
                        {has ? (
                          <span className="flex" style={{ justifyContent: "center" }}><Check size={15} color="var(--ok)" /></span>
                        ) : (
                          <span className="flex" style={{ justifyContent: "center" }}><Minus size={14} color="#cbd5e1" /></span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid cols-2" style={{ alignItems: "start" }}>
        <Card title="المستخدمون">
          <DataTable
            keyField="id"
            rows={users}
            columns={[
              { key: "id", label: "كود", render: (r) => <span className="mono">{r.id}</span> },
              { key: "name", label: "الاسم", render: (r) => <span className="semibold">{r.name}</span> },
              { key: "role", label: "الدور", render: (r) => <Badge tone="brand">{r.role}</Badge> },
              { key: "email", label: "البريد"} ,
              { key: "lastLogin", label: "آخر دخول", render: (r) => <span className="small mono">{r.lastLogin}</span> },
              { key: "status", label: "الحالة", render: (r) => <Badge tone={r.status === "نشط" ? "ok" : "gray"}>{r.status}</Badge> },
            ]}
          />
        </Card>
        <Callout type="ok" title="لماذا الصلاحيات؟">
          موظف الكول سنتر لن يرى التكاليف أو الموردين، ومفتش الجودة لن يفتح الحسابات — تقليل الخطأ وضبط البيانات
          الحساسة مع سجل تدقيق لكل عملية.
        </Callout>
      </div>
    </div>
  );
}