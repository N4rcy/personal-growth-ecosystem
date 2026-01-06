import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/ui/AppLayout";
import Home from "@/pages/Home";
import SimpleAdvice from "@/pages/SimpleAdvice";
import EnglishLab from "@/pages/EnglishLab";
import Settings from "@/pages/Settings";
import CourtDashboard from "@/pages/CourtDashboard";
import NewCase from "@/pages/NewCase";
import Case from "@/pages/Case";
import Cases from "@/pages/Cases";
import Verdict from "@/pages/Verdict";
import Insights from "@/pages/Insights";
import StudyTools from "@/pages/StudyTools";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Landing Page (no sidebar) */}
        <Route path="/" element={<Home />} />
        
        {/* App Routes (with sidebar) */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/advice" replace />} />
          <Route path="advice" element={<SimpleAdvice />} />
          <Route path="english-lab" element={<EnglishLab />} />
          <Route path="settings" element={<Settings />} />
          <Route path="court" element={<CourtDashboard />} />
          <Route path="case/new" element={<NewCase />} />
          <Route path="case/:id" element={<Case />} />
          <Route path="cases" element={<Cases />} />
          <Route path="verdict/:id" element={<Verdict />} />
          <Route path="insights" element={<Insights />} />
          <Route path="study-tools" element={<StudyTools />} />
        </Route>
        
        {/* Redirect old routes for backward compatibility */}
        <Route path="/advice" element={<Navigate to="/app/advice" replace />} />
        <Route path="/english-lab" element={<Navigate to="/app/english-lab" replace />} />
        <Route path="/settings" element={<Navigate to="/app/settings" replace />} />
        <Route path="/court" element={<Navigate to="/app/court" replace />} />
        <Route path="/study-tools" element={<Navigate to="/app/study-tools" replace />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
