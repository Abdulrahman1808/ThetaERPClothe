import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard, Shirt, FlaskConical, Megaphone, Store, ListChecks,
  Truck, Layers, CalendarRange, Scissors, Boxes, ShieldCheck, Warehouse,
  Headset, Undo2, ShoppingBag, Wallet, Users2, Calculator, Wrench,
  BarChart3, RotateCcw, Sparkles, Shield, Search, Bell, ChevronDown,
  RefreshCw, Workflow,
} from "lucide-react";

const nav = [
  {
    group: "الرئيسية",
    items: [
      { to: "/", label: "لوحة التحكم", icon: <LayoutDashboard /> },
    ],
  },
  {
    group: "التصميم والتجارة",
    items: [
      { to: "/models", label: "الموديلات والتصميم", icon: <Shirt /> },
      { to: "/samples", label: "العينات", icon: <FlaskConical /> },
      { to: "/marketing", label: "التسويق", icon: <Megaphone /> },
      { to: "/store", label: "المتجر الإلكتروني", icon: <Store /> },
      { to: "/bom", label: "مكونات المنتج BOM", icon: <ListChecks /> },
      { to: "/purchasing", label: "المشتريات والموردون", icon: <Truck /> },
    ],
  },
  {
    group: "الإنتاج",
    items: [
      { to: "/fabric", label: "القماش والرولات", icon: <Layers /> },
      { to: "/production", label: "تخطيط الإنتاج", icon: <CalendarRange /> },
      { to: "/cutting", label: "القص", icon: <Scissors /> },
      { to: "/lines", label: "خطوط الإنتاج", icon: <Boxes /> },
      { to: "/qc", label: "الجودة QC", icon: <ShieldCheck /> },
    ],
  },
  {
    group: "المخزون والمبيعات",
    items: [
      { to: "/inventory", label: "المخزون النهائي", icon: <Warehouse /> },
      { to: "/callcenter", label: "الكول سنتر", icon: <Headset /> },
      { to: "/returns", label: "المرتجعات", icon: <Undo2 /> },
      { to: "/sales", label: "المبيعات والشحن", icon: <ShoppingBag /> },
    ],
  },
  {
    group: "المالية والموارد",
    items: [
      { to: "/accounting", label: "الحسابات والخزينة", icon: <Wallet /> },
      { to: "/hr", label: "الموارد البشرية والمرتبات", icon: <Users2 /> },
      { to: "/costing", label: "تكلفة المنتج", icon: <Calculator /> },
      { to: "/maintenance", label: "الصيانة والتشغيل", icon: <Wrench /> },
    ],
  },
  {
    group: "التحليلات والنظام",
    items: [
      { to: "/reports", label: "التقارير والتحليلات", icon: <BarChart3 /> },
      { to: "/model360", label: "الموديل 360°", icon: <RotateCcw /> },
      { to: "/ai", label: "المساعد الذكي", icon: <Sparkles /> },
      { to: "/users", label: "الصلاحيات والمستخدمون", icon: <Shield /> },
    ],
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">Θ</div>
        <div>
          <div className="t1">ثيتا إيرب</div>
          <div className="t2">مصانع الملابس المتكاملة</div>
        </div>
      </div>

      {nav.map((g, i) => (
        <div className="nav-group" key={i}>
          <div className="g-title">{g.group}</div>
          {g.items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.to === "/"}
              className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
            >
              {it.icon}
              <span>{it.label}</span>
            </NavLink>
          ))}
        </div>
      ))}

      <div className="side-foot">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Workflow size={14} color="#12b886" />
          <div>
            <div className="semibold" style={{ color: "#fff", fontSize: 12 }}>دورة المنتج كاملة</div>
            <div className="version">من الفكرة حتى العميل والمرتجع</div>
          </div>
        </div>
        <div className="version" style={{ marginTop: 10 }}>
          مراجعة تجريبية v1.0 — 2026
        </div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="topbar">
      <div className="search">
        <Search />
        <input placeholder="ابحث عن موديل، أمر إنتاج، عميل، رول قماش..." />
      </div>
      <div className="actions">
        <span className="demo-chip">
          <RefreshCw size={12} /> بيانات تجريبية حية
        </span>
        <button className="icon-btn" title="الإشعارات">
          <Bell />
          <span className="dot" />
        </button>
        <div className="user">
          <div className="avatar">مش</div>
          <div className="who">
            <div className="name">محمد الشريف</div>
            <div className="role">مدير عام — الإدارة</div>
          </div>
          <ChevronDown size={14} className="muted" />
        </div>
      </div>
    </header>
  );
}

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main">
        <Topbar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}