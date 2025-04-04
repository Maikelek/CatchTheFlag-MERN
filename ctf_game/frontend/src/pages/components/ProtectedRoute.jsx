import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useUser();

    if (loading) return <p>Loading...</p>;

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (adminOnly && user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
