import React from "react";
import { Users2, CalendarDays, Fingerprint, Wallet, Receipt } from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Callout, Progress,
} from "../components/ui.jsx";
import { employees, attendanceSummary, fmtMoney } from "../data/mock.js";

export default function Hr() {
  const totalPayroll = employees.reduce((a, e) => a + e.net, 0);
  const totalBase = employees.reduce((a, e) => a + e.base, 0);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="الموارد البشرية والمرتبات"
        subtitle="ملف الموظف الكامل — الراتب، البدلات، الحوافز، الإضافي، السلف — مع حساب صافي الراتب"
        actions={
          <>
            <button className="btn btn-ghost">مصروفات الموظفين</button>
            <button className="btn btn-primary">تصفية المرتبات</button>
          </>
        }
      />

      <div className="grid cols-4">
        <StatCard tone="info" icon={<Users2 />} label="الموظفون" value={`${employees.length}`} sub="يعملون بالمصنع" />
        <StatCard tone="ok" icon={<Wallet />} label="صافي المرتبات (شهر)" value={fmtMoney(totalPayroll)} sub={`أساسي ${fmtMoney(totalBase)}`} />
        <StatCard tone="brand" icon={<CalendarDays />} label="الحضور" value={`${attendanceSummary.present} / ${attendanceSummary.present + attendanceSummary.absent}`} sub="نسبة 96.2%" />
        <StatCard tone="purple" icon={<Fingerprint />} label="أجهزة البصمة" value="متصلة" sub="4 أجهزة · آخر مزامنة الآن" />
      </div>

      <Card title="معادلة حساب الراتب">
        <div className="callout info" style={{ justifyContent: "center" }}>
          <span style={{ fontWeight: 800 }}>
            الأساسي + الحوافز + الإضافي − الغياب − الخصومات − السلف = صافي الراتب
          </span>
        </div>
      </Card>

      <div className="grid cols-2">
        <Card title="جدول الموظفين والمرتبات">
          <DataTable
            keyField="id"
            rows={employees}
            columns={[
              { key: "id", label: "كود", render: (r) => <span className="mono">{r.id}</span> },
              { key: "name", label: "الاسم", render: (r) => <span className="semibold">{r.name}</span> },
              { key: "job", label: "الوظيفة", render: (r) => <span>{r.job} · {r.dept}</span> },
              { key: "base", label: "الأساسي", render: (r) => fmtMoney(r.base) },
              { key: "allow", label: "بدلات", render: (r) => fmtMoney(r.allowances) },
              { key: "inc", label: "حوافز", render: (r) => <span className="flex" style={{ color: "var(--ok)" }}>{r.incentives.toLocaleString("en-US")} ج.م</span> },
              { key: "ot", label: "إضافي", render: (r) => `${r.overtime} ساعة` },
              { key: "ded", label: "خصومات", render: (r) => <span style={{ color: "var(--danger)" }}>{r.deductions ? `-${r.deductions}` : "—"}</span> },
              { key: "loan", label: "سلف", render: (r) => <span style={{ color: "var(--warn)" }}>{r.loans ? `-${fmtMoney(r.loans)}` : "—"}</span> },
              { key: "absent", label: "غياب", render: (r) => <Badge tone={r.absenceDays ? "warn" : "ok"}>{r.absenceDays} يوم</Badge> },
              { key: "net", label: "صافي الراتب", render: (r) => <strong style={{ color: "var(--brand)" }}>{fmtMoney(r.net)}</strong> },
            ]}
          />
        </Card>

        <div style={{ display: "grid", gap: 14 }}>
          <Card title="ملخص الحضور — اليوم">
            <div className="stack">
              <div className="flex-between">
                <span>الحاضرون</span>
                <strong>{attendanceSummary.present}</strong>
              </div>
              <div className="flex-between">
                <span>الغياب</span>
                <strong style={{ color: "var(--danger)" }}>{attendanceSummary.absent}</strong>
              </div>
              <div className="flex-between">
                <span>ساعات إضافية</span>
                <strong>{attendanceSummary.overtimeHours} ساعة</strong>
              </div>
              <div>
                <div className="flex-between small" style={{ marginBottom: 4 }}>
                  <span>نسبة الحضور</span>
                  <strong>{attendanceSummary.avgAttendance}%</strong>
                </div>
                <Progress value={attendanceSummary.avgAttendance} label="" />
              </div>
            </div>
          </Card>
          <Card title="ربط أجهزة البصمة">
            <Callout type="ok" title="المزامنة تعمل تلقائيًا">
              تسحبات الحضور تُحدَّث فور تسجيل البصمة وتُحسب في المرتب الشهري — الغياب المتكرر يُخصم تلقائيًا حسب
              سياسة المصنع.
            </Callout>
          </Card>
          <Card title="المرتبات الشهرية" subtitle="تم إصدار مسودة شهر سبتمبر">
            <div className="flex-between">
              <span className="flex"><Receipt size={15} className="muted" /> مسودة المرتبات – 148 موظف</span>
              <Badge tone="info">جارٍ المراجعة</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}