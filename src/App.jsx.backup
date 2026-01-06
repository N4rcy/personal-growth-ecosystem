import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/ui/AppLayout";
import Home from "./pages/Home";
import CourtDashboard from "./pages/CourtDashboard";
import NewCase from "./pages/NewCase";
import Case from "./pages/Case";
import Cases from "./pages/Cases";
import Verdict from "./pages/Verdict";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import EnglishLab from "./pages/EnglishLab";
import StudyTools from "./pages/StudyTools";

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/court" element={<CourtDashboard />} />
          <Route path="/case/new" element={<NewCase />} />
          <Route path="/case/:id" element={<Case />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/verdict/:id" element={<Verdict />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/english-lab" element={<EnglishLab />} />
          <Route path="/study-tools" element={<StudyTools />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
