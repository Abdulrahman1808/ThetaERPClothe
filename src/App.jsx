import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Models from "./pages/Models.jsx";
import Samples from "./pages/Samples.jsx";
import Marketing from "./pages/Marketing.jsx";
import Store from "./pages/Store.jsx";
import Bom from "./pages/Bom.jsx";
import Purchasing from "./pages/Purchasing.jsx";
import Fabric from "./pages/Fabric.jsx";
import Production from "./pages/Production.jsx";
import Cutting from "./pages/Cutting.jsx";
import Lines from "./pages/Lines.jsx";
import Qc from "./pages/Qc.jsx";
import Inventory from "./pages/Inventory.jsx";
import CallCenter from "./pages/CallCenter.jsx";
import Returns from "./pages/Returns.jsx";
import Sales from "./pages/Sales.jsx";
import Accounting from "./pages/Accounting.jsx";
import Hr from "./pages/Hr.jsx";
import Costing from "./pages/Costing.jsx";
import Maintenance from "./pages/Maintenance.jsx";
import Reports from "./pages/Reports.jsx";
import Model360 from "./pages/Model360.jsx";
import Ai from "./pages/Ai.jsx";
import Users from "./pages/Users.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/models" element={<Models />} />
        <Route path="/samples" element={<Samples />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/store" element={<Store />} />
        <Route path="/bom" element={<Bom />} />
        <Route path="/purchasing" element={<Purchasing />} />
        <Route path="/fabric" element={<Fabric />} />
        <Route path="/production" element={<Production />} />
        <Route path="/cutting" element={<Cutting />} />
        <Route path="/lines" element={<Lines />} />
        <Route path="/qc" element={<Qc />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/callcenter" element={<CallCenter />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/accounting" element={<Accounting />} />
        <Route path="/hr" element={<Hr />} />
        <Route path="/costing" element={<Costing />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/model360" element={<Model360 />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}