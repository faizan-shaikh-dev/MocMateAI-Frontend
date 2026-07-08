import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setIsLoading(true);
        try {
            const res = await api.post("/auth/register", { name, email, password });
            
            toast.success(res.data.message || "Registration Successful!");
            
            // Auto login after signup
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                setUser(res.data.user);
            }
            
            navigate("/profile-setup");
        } catch (err) {
            console.error("Registration error:", err);
            toast.error(err.response?.data?.message || "Registration Failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 font-sans text-white px-4 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Register Card */}
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10">
                <div className="flex flex-col items-center mb-8">
                    <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-3">
                        <UserPlus className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-200 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Create Account
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                        Start your smart interview prep today
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                            Full Name
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                <User className="h-5 w-5" />
                            </span>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder-slate-500 text-slate-100 transition-all duration-200"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                <Mail className="h-5 w-5" />
                            </span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder-slate-500 text-slate-100 transition-all duration-200"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                <Lock className="h-5 w-5" />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-11 py-3 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder-slate-500 text-slate-100 transition-all duration-200"
                                placeholder="•••••••• (Min 6 characters)"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {isLoading ? (
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <span>Create Account</span>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-slate-950 px-3 text-slate-400">Or sign up with</span>
                    </div>
                </div>

                {/* Google Sign-in */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24">
                        <path
                            fill="#EA4335"
                            d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.18 2.69 1.14 6.645l4.126 3.12z"
                        />
                        <path
                            fill="#4285F4"
                            d="M23.64 12.273c0-.818-.073-1.609-.209-2.373H12v4.5h6.532a5.58 5.58 0 0 1-2.423 3.659l3.782 2.932c2.21-2.036 3.75-5.036 3.75-8.718z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.266 14.235L1.14 17.355C3.18 21.31 7.27 24 12 24c3.155 0 5.8-.973 7.745-2.673l-3.782-2.932A7.12 7.12 0 0 1 12 19.09c-3.832 0-7.077-2.6-8.245-6.195z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 4.909c1.9 0 3.59.65 4.93 1.91l3.682-3.682C18.4 1.25 15.425 0 12 0c-4.14 0-7.79 2.37-9.61 5.86l4.12 3.19C7.68 5.76 10.45 4.91 12 4.909z"
                            transform="matrix(1 0 0 -1 0 24)"
                        />
                    </svg>
                    <span>Google</span>
                </button>

                {/* Footer Link */}
                <p className="mt-8 text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;