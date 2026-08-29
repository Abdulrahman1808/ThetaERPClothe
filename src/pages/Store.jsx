import React from "react";
import {
  Store as StoreIcon, RefreshCw, ShieldCheck, AlertTriangle, PackageCheck, Timer,
} from "lucide-react";
import {
  PageHeader, Card, StatCard, Badge, DataTable, Callout, statusTone,
} from "../components/ui.jsx";
import { storeProducts, storeOrders, syncLog, fmtMoney } from "../data/mock.js";

export default function Store() {
  const synced = storeProducts.filter((p) => p.synced === "متزامن").length;
  const issues = storeProducts.filter((p) => p.synced !== "متزامن");

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="المتجر الإلكتروني — WooCommerce / WordPress"
        subtitle="إدارة المنتجات من داخل النظام وإرسالها للمتجر مع مزامنة لحظية"
        actions={
          <>
            <button className="btn btn-ghost"><Timer size={15} /> آخر مزامنة: 11:45</button>
            <button className="btn btn-primary"><RefreshCw size={15} /> مزامنة الآن</button>
          </>
        }
      />

      <div className="grid cols-4">
        <StatCard tone="brand" icon={<StoreIcon />} label="منتجات المتجر" value={`${storeProducts.length}`} sub="متزامنة مع النظام" />
        <StatCard tone="ok" icon={<PackageCheck />} label="منتج متزامن" value={`${synced} / ${storeProducts.length}`} sub="الأسعار والمخزون والكميات" />
        <StatCard tone="info" icon={<RefreshCw />} label="مزامنة تلقائية" value="كل 5 دقائق" sub="طلبات + مخزون + أسعار" />
        <StatCard tone={issues.length ? "danger" : "ok"} icon={<AlertTriangle />} label="خلل بالمتزامن" value={`${issues.length} منتج`} sub="يحتاج مراجعة" />
      </div>

      <Card title="مصدر واحد للحقيقة — Single Source of Truth">
        <div className="grid cols-2">
          <Callout type="ok" title="عند خروج 111 قطعة من الإنتاج">
            الإنتاج ← المنتج النهائي ← المخزون ← المتجر — لا إدخال يدوي، الكمية تنعكس في المتجر تلقائيًا.
          </Callout>
          <Callout type="ok" title="وعند بيع 5 قطع من المتجر">
            المتجر ← الطلب ← النظام ← تحديث المخزون — الـ SKU المنصرف يُحجز ويُخصم من مكان واحد.
          </Callout>
        </div>
      </Card>

      <div className="grid cols-2">
        <Card title="منتجات المتجر المتزامنة">
          <DataTable
            keyField="sku"
            rows={storeProducts}
            columns={[
              { key: "sku", label: "SKU", render: (r) => <span className="mono">{r.sku}</span> },
              { key: "name", label: "المنتج", render: (r) => (
                <div>
                  <div className="semibold">{r.model}</div>
                  <div className="muted small">{r.color} · مقاس {r.size}</div>
                </div>
              ) },
              { key: "p", label: "السعر", render: (r) => fmtMoney(r.price) },
              { key: "ss", label: "مخزون المتجر", render: (r) => <strong>{r.storeStock}</strong> },
              { key: "sys", label: "مخزون النظام", render: (r) => <strong>{r.systemStock}</strong> },
              { key: "sync", label: "الحالة", render: (r) => <Badge tone={statusTone[r.synced]}>{r.synced}</Badge> },
            ]}
          />
        </Card>

        <Card title="أحدث طلبات المتجر" subtitle="تُستورد تلقائيًا وتتحول لأوامر شحن">
          <DataTable
            keyField="ordNo"
            rows={storeOrders}
            columns={[
              { key: "ordNo", label: "الطلب", render: (r) => <span className="mono">{r.ordNo}</span> },
              { key: "customer", label: "العميل" },
              { key: "items", label: "المنتجات", render: (r) => `${r.items} قطع` },
              { key: "total", label: "القيمة", render: (r) => fmtMoney(r.total) },
              { key: "payment", label: "الدفع", render: (r) => <span className="small">{r.payment}</span> },
              { key: "status", label: "الحالة", render: (r) => <Badge tone={statusTone[r.status]}>{r.status}</Badge> },
            ]}
          />
        </Card>
      </div>

      <div className="grid cols-2">
        <Card title="أنواع التزامن" subtitle="منتجات ← أسعار ← مقاسات ← مخزون ← طلبات">
          <div className="stack">
            <div className="flex-between">
              <span className="flex"><ShieldCheck size={15} color="var(--ok)" /> إنشاء / تحديث المنتجات</span>
              <Badge tone="ok">أوتوماتيكي</Badge>
            </div>
            <div className="flex-between">
              <span className="flex"><ShieldCheck size={15} color="var(--ok)" /> الألوان والمقاسات و Variations</span>
              <Badge tone="ok">أوتوماتيكي</Badge>
            </div>
            <div className="flex-between">
              <span className="flex"><ShieldCheck size={15} color="var(--ok)" /> المخزون والكميات</span>
              <Badge tone="ok">كل 5 دقائق</Badge>
            </div>
            <div className="flex-between">
              <span className="flex"><ShieldCheck size={15} color="var(--ok)" /> استيراد الطلبات</span>
              <Badge tone="ok">فوري</Badge>
            </div>
            <div className="flex-between">
              <span className="flex"><ShieldCheck size={15} color="var(--ok)" /> تحديث الأسعار</span>
              <Badge tone="ok">عند التغيير</Badge>
            </div>
          </div>
        </Card>

        <Card title="سجل المزامنة الأخير">
          <DataTable
            keyField="time"
            rows={syncLog}
            columns={[
              { key: "time", label: "الوقت", render: (r) => <span className="mono small">{r.time}</span> },
              { key: "action", label: "العملية", render: (r) => <span className="semibold">{r.action}</span> },
              { key: "detail", label: "التفاصيل", render: (r) => <span className="small">{r.detail}</span> },
              { key: "status", label: "النتيجة", render: (r) => <Badge tone={r.status === "نجاح" ? "ok" : "danger"}>{r.status}</Badge> },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}