import React, { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const AuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuth = async () => {
            const token = searchParams.get("token");
            if (token) {
                localStorage.setItem("token", token);
                try {
                    // Fetch updated profile
                    const res = await api.get("/user/profile");
                    setUser(res.data);

                    toast.success("Logged in successfully with Google!");

                    if (res.data.profileCompleted) {
                        navigate("/dashboard");
                    } else {
                        navigate("/profile-setup");
                    }
                } catch (error) {
                    console.error("Google login callback error:", error);
                    localStorage.removeItem("token");
                    toast.error("Failed to load user profile. Please try again.");
                    navigate("/login");
                }
            } else {
                toast.error("Google authentication failed. Token not found.");
                navigate("/login");
            }
        };
        handleAuth();
    }, [searchParams, navigate, setUser]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 font-sans text-white px-4 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none delay-75"></div>

            {/* Glowing Glass Container */}
            <div className="flex flex-col items-center p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative z-10 max-w-sm w-full text-center">
                <div className="relative flex items-center justify-center mb-6">
                    {/* Pulsing Backglow */}
                    <div className="absolute h-16 w-16 rounded-full bg-indigo-500/30 blur-md animate-pulse"></div>
                    {/* Animated Spinner Icon */}
                    <Loader2 className="h-12 w-12 text-indigo-400 animate-spin relative z-10" />
                </div>
                
                <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-200 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    Securing session...
                </h2>
                <p className="text-slate-400 text-sm">
                    Completing authentication. Please hold on a moment as we redirect you.
                </p>
            </div>
        </div>
    );
};

export default AuthSuccess;