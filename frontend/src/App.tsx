import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Chat from "./pages/Chat/Chat";
import CodeGenerator from "./pages/CodeGenerator/CodeGenerator";
import CodeReviewer from "./pages/CodeReviewer/CodeReviewer";
import BugFixer from "./pages/BugFixer/BugFixer";
import Documentation from "./pages/Documentation/Documentation";
import TestCaseGenerator from "./pages/TestCaseGenerator/TestCaseGenerator";
import SQLGenerator from "./pages/SQLGenerator/SQLGenerator";
import APIGenerator from "./pages/APIGenerator/APIGenerator";
import DiagramGenerator from "./pages/DiagramGenerator/DiagramGenerator";
import ReadmeGenerator from "./pages/ReadmeGenerator/ReadmeGenerator";
import ProjectAnalyzer from "./pages/ProjectAnalyzer/ProjectAnalyzer";
import ResumeGenerator from "./pages/ResumeGenerator/ResumeGenerator";
import InterviewAssistant from "./pages/InterviewAssistant/InterviewAssistant";
import CodeExplainer from "./pages/CodeExplainer/CodeExplainer";
import ComplexityAnalyzer from "./pages/ComplexityAnalyzer/ComplexityAnalyzer";
import GitAssistant from "./pages/GitAssistant/GitAssistant";
import Settings from "./pages/Settings/Settings";
export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
  path="/test-cases"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <TestCaseGenerator />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

      <Route
  path="/code-generator"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <CodeGenerator />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/code-reviewer"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <CodeReviewer />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/documentation"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <Documentation />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/sql-generator"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <SQLGenerator />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/readme-generator"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <ReadmeGenerator />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/bug-fixer"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <BugFixer />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/api-generator"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <APIGenerator />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/diagram-generator"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <DiagramGenerator />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

      <Route
  path="/chat"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <Chat />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/project-analyzer"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <ProjectAnalyzer />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/resume"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <ResumeGenerator />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/interview"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <InterviewAssistant />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/code-explainer"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <CodeExplainer />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/complexity"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <ComplexityAnalyzer />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/git-assistant"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <GitAssistant />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <Settings />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
      {/* Default Route */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}