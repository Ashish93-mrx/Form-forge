import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import FormResponses from "../pages/FormResponses";
import PublicForm from "../pages/PublicForm";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import FormBuilder from "../components/forms/FormBuilder/FormBuilder";
import CreateFormPage from "../pages/forms/CreateFormPage";
import EditForm from "../pages/EditForm";



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form/create"
        element={
          <ProtectedRoute>
            <CreateFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form/:formId/edit"
        element={
          <ProtectedRoute>
            <EditForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form/:formId"
        element={
            <PublicForm />
        }
        />
      <Route
        path="/responses/:formId"
        element={
            <ProtectedRoute>
            <FormResponses />
            </ProtectedRoute>
        }
        />
    </Routes>
  );
}
