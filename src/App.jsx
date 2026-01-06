import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/ui/AppLayout";
import Home from "@/pages/Home";
import CourtDashboard from "@/pages/CourtDashboard";
import NewCase from "@/pages/NewCase";
import Case from "@/pages/Case";
import Cases from "@/pages/Cases";
import Verdict from "@/pages/Verdict";
import Insights from "@/pages/Insights";
import SimpleAdvice from "@/pages/SimpleAdvice";
import EnglishLab from "@/pages/EnglishLab";

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all main app routes inside AppLayout */}
        <Route path="/" element={<AppLayout />}>
          {/* Redirect root to court dashboard */}
          <Route index element={<Navigate to="/court" replace />} />
          <Route path="court" element={<CourtDashboard />} />
          <Route path="case/new" element={<NewCase />} />
          <Route path="case/:id" element={<Case />} />
          <Route path="cases" element={<Cases />} />
          <Route path="verdict/:id" element={<Verdict />} />
          <Route path="insights" element={<Insights />} />
          <Route path="advice" element={<SimpleAdvice />} />
          <Route path="english-lab" element={<EnglishLab />} />
        </Route>
        
        {/* Keep Home as a separate route without AppLayout if needed */}
        <Route path="/home" element={<Home />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/court" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
