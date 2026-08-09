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

      {/* Default Route */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}