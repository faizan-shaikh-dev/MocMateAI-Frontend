import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, requireProfileComplete = true }) => {
    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-950 text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500">

                </div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (requireProfileComplete && !user.profileCompleted) {
        return <Navigate to="/profile-setup" replace />
    }

    if (!requireProfileComplete && user.profileCompleted) {
        return <Navigate to="/dashboard" replace />
    }

    return children;
};

export default ProtectedRoute