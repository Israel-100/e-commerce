import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ADMIN_EMAIL } from "../config/admin";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  // not logged in → send to home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // not admin → block access
  if (user.email !== ADMIN_EMAIL) {
    alert("Access denied. Admins only!");
    return <Navigate to="/" replace />;
  }

  // ✅ authorized → allow
  return children;
};

export default AdminRoute;
