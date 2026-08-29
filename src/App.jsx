import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import EksisEmployees from "./pages/EksisEmployees";
import TerminateEmployees from "./pages/TerminateEmployees";
import CulledEmployees from "./pages/CulledEmployees";
import AngkatanData from "./pages/AngkatanData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="eksis" element={<EksisEmployees />} />
          <Route path="terminate" element={<TerminateEmployees />} />
          <Route path="culled" element={<CulledEmployees />} />
          <Route path="angkatan" element={<AngkatanData />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
