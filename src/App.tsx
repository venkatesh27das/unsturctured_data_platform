import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import Assistant from "./pages/Assistant";
import Governance from "./pages/Governance";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/governance" element={<Governance />} />
        <Route path="/ingestion" element={<Navigate to="/catalog" replace />} />
        <Route path="/documents" element={<Navigate to="/catalog" replace />} />
        <Route path="/knowledge" element={<Navigate to="/catalog" replace />} />
        <Route path="/enterprise-search" element={<Navigate to="/assistant" replace />} />
      </Routes>
    </Layout>
  );
}
