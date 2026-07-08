import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { 
    LogOut, 
    Upload, 
    Play, 
    Sparkles, 
    History, 
    User, 
    GraduationCap, 
    Briefcase, 
    Code2, 
    ArrowRight, 
    Clock, 
    Star, 
    FileText, 
    CheckCircle, 
    X,
    Calendar,
    MessageSquare
} from "lucide-react";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [interviews, setInterviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchHistory = async () => {
        try {
            setIsLoading(true);
            const res = await api.get('/ai/interviews');
            setInterviews(res.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load interview history");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleResumeUpload = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        if (selectedFile.type !== 'application/pdf') {
            toast.error("Only PDF format is supported");
            return;
        }

        const formData = new FormData();
        formData.append('resume', selectedFile);

        try {
            setUploading(true);
            toast.info("Uploading and parsing resume...");
            await api.post('/resume/upload', formData, {
                headers: { "Content-Type": 'multipart/form-data' }
            });
            toast.success("Resume uploaded and parsed successfully!");
            // Refresh user profile details
            const profileRes = await api.get("/user/profile");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to upload resume");
        } finally {
            setUploading(false);
        }
    };

    const handleLogout = () => {
        logout();
        toast.info("Logged out successfully");
        navigate("/login");
    };

    const setNewInterview = () => {
        navigate('/chat');
    };

    const resumeInterview = (interviewId) => {
        navigate('/chat', { state: { interviewId } });
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-white relative overflow-x-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header/Navbar */}
            <header className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/35">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                            MockMate<span className="text-indigo-400 font-extrabold">.ai</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                            <div className="h-6.5 w-6.5 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold uppercase text-indigo-100">
                                {user?.name?.charAt(0) || "U"}
                            </div>
                            <span className="text-sm font-medium text-slate-200 pr-1">{user?.name}</span>
                        </div>
                        
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 hover:text-rose-200 text-sm font-semibold rounded-xl cursor-pointer active:scale-95 transition-all duration-200"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
                {/* Hero / Welcome Panel */}
                <div className="mb-10 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/40 border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                                Welcome Back, {user?.name || "Candidate"}!
                            </h1>
                            <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
                                Boost your interview readiness with our AI-powered Technical and HR simulator. Practice realistic interview loops tailored directly to your profile.
                            </p>
                        </div>
                        <button
                            onClick={setNewInterview}
                            className="inline-flex items-center gap-2.5 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/45 cursor-pointer active:scale-[0.98] transition-all duration-200 group self-start md:self-auto"
                        >
                            <span>Start Mock Interview</span>
                            <Play className="h-5 w-5 fill-current text-white group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left Column: User Profile & Resume Management */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Profile Summary Card */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                                <User className="h-5 w-5 text-indigo-400" />
                                <h2 className="text-lg font-bold">Profile Details</h2>
                            </div>

                            <div className="space-y-4 text-sm">
                                <div>
                                    <span className="text-xs text-slate-400 block mb-1">Domain / Specialization</span>
                                    <div className="flex items-center gap-2 text-slate-200">
                                        <Briefcase className="h-4 w-4 text-indigo-400 shrink-0" />
                                        <span className="font-semibold">{user?.domain || "Not specified"}</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs text-slate-400 block mb-1">Highest Qualification</span>
                                    <div className="flex items-center gap-2 text-slate-200">
                                        <GraduationCap className="h-4 w-4 text-indigo-400 shrink-0" />
                                        <span className="font-semibold">{user?.qualification || "Not specified"}</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs text-slate-400 block mb-1">Experience Level</span>
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-xs font-bold text-indigo-300">
                                        {user?.experienceType || "Fresher"} 
                                        {user?.yearsOfExperience > 0 && ` (${user.yearsOfExperience} YRS)`}
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs text-slate-400 block mb-1.5">Skills & Technologies</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {user?.skills && user.skills.length > 0 ? (
                                            user.skills.map((skill, index) => (
                                                <span 
                                                    key={index}
                                                    className="px-2.5 py-1 bg-slate-900 border border-white/10 rounded-md text-xs font-medium text-slate-300"
                                                >
                                                    {skill}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-slate-500 italic text-xs">No skills listed</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Resume Parsing Upload Card */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                                <FileText className="h-5 w-5 text-purple-400" />
                                <h2 className="text-lg font-bold">Resume Parsing</h2>
                            </div>
                            
                            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                                Upload your PDF resume. Our AI parser will extract your experience details to curate highly targeted technical questions.
                            </p>

                            <div className="relative border border-dashed border-white/20 hover:border-indigo-500/50 rounded-xl p-6 text-center cursor-pointer transition-all duration-200 bg-slate-950/40 group">
                                <input
                                    type="file"
                                    id="resume-upload"
                                    accept="application/pdf"
                                    onChange={handleResumeUpload}
                                    disabled={uploading}
                                    className="absolute inset-0 opacity-0 cursor-pointer disabled:pointer-events-none"
                                />
                                
                                {uploading ? (
                                    <div className="flex flex-col items-center justify-center py-2">
                                        <div className="h-8 w-8 border-3 border-indigo-500/20 border-t-indigo-400 rounded-full animate-spin mb-3"></div>
                                        <span className="text-xs font-semibold text-indigo-300">Parsing PDF data...</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-2">
                                        <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <Upload className="h-5 w-5" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-200 block mb-1">Click to Upload PDF</span>
                                        <span className="text-[10px] text-slate-500">Max size: 5MB</span>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Interview Sessions History */}
                    <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl min-h-[500px] flex flex-col">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <History className="h-5 w-5 text-indigo-400" />
                                <h2 className="text-lg font-bold">Interview History</h2>
                            </div>
                            <span className="text-xs font-semibold text-slate-400 bg-slate-900 border border-white/10 px-2.5 py-1 rounded-full">
                                {interviews.length} Total
                            </span>
                        </div>

                        {isLoading ? (
                            <div className="flex-1 flex flex-col items-center justify-center py-20">
                                <div className="h-9 w-9 border-3 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-3"></div>
                                <p className="text-sm text-slate-400">Loading interview records...</p>
                            </div>
                        ) : interviews.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center py-20 px-4">
                                <div className="h-14 w-14 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-400/60 mb-4">
                                    <MessageSquare className="h-7 w-7" />
                                </div>
                                <h3 className="text-base font-bold text-slate-200">No Interview Sessions Yet</h3>
                                <p className="text-xs text-slate-500 max-w-sm mt-1 mb-6">
                                    You haven't completed any mock interviews. Start your first session to receive comprehensive AI feedback and scores.
                                </p>
                                <button
                                    onClick={setNewInterview}
                                    className="px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl cursor-pointer active:scale-95 transition-all duration-200"
                                >
                                    Start Interview
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4 overflow-y-auto max-h-[550px] pr-1">
                                {interviews.map((session) => {
                                    const isCompleted = session.status === "completed";
                                    const rating = session.feedback?.rating;
                                    const dateStr = new Date(session.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    });

                                    return (
                                        <div 
                                            key={session._id}
                                            className="p-4 bg-slate-900/65 hover:bg-slate-900/90 border border-white/5 hover:border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-slate-100">
                                                        {user?.domain || "Software Developer"} Mock Loop
                                                    </span>
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                        isCompleted 
                                                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
                                                    }`}>
                                                        {isCompleted ? "Completed" : "In Progress"}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-400">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {dateStr}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MessageSquare className="h-3 w-3" />
                                                        {session.message?.length || 0} messages
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                                                {isCompleted ? (
                                                    <div className="flex items-center gap-1.5 bg-indigo-500/5 border border-indigo-500/15 px-3 py-1.5 rounded-lg">
                                                        <Star className="h-4.5 w-4.5 text-amber-400 fill-amber-400" />
                                                        <span className="text-sm font-bold text-slate-200">{rating}/10</span>
                                                    </div>
                                                ) : null}

                                                {isCompleted ? (
                                                    <button
                                                        onClick={() => setSelectedInterview(session)}
                                                        className="px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/30 hover:border-indigo-500 text-indigo-300 hover:text-white text-xs font-bold rounded-xl cursor-pointer active:scale-95 transition-all duration-200"
                                                    >
                                                        Review Feedback
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => resumeInterview(session._id)}
                                                        className="px-4 py-2 bg-amber-600 hover:bg-amber-500 border border-amber-500 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer active:scale-95 transition-all duration-200"
                                                    >
                                                        <span>Resume</span>
                                                        <ArrowRight className="h-3.5 w-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>
            </main>

            {/* Feedback Modal */}
            {selectedInterview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
                        onClick={() => setSelectedInterview(null)}
                    ></div>
                    
                    {/* Modal Content */}
                    <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative z-10 animate-fadeIn">
                        
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                                    <Star className="h-5 w-5 fill-indigo-400/20" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-100">AI Evaluation Feedback</h3>
                                    <p className="text-[10px] text-slate-400">Completed on {new Date(selectedInterview.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedInterview(null)}
                                className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="p-6 overflow-y-auto space-y-6 text-sm leading-relaxed">
                            
                            {/* Score banner */}
                            <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-950/50 to-purple-950/30 p-4 border border-indigo-500/20 rounded-xl">
                                <div className="h-16 w-16 rounded-full bg-indigo-600/20 border-2 border-indigo-500 flex items-center justify-center shrink-0">
                                    <span className="text-2xl font-extrabold text-indigo-300">{selectedInterview.feedback?.rating}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-100">Overall Rating Score</h4>
                                    <p className="text-xs text-slate-400 mt-0.5">Evaluated out of 10 base score points on technical and soft skill metrics.</p>
                                </div>
                            </div>

                            {/* Summary */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Executive Summary</h4>
                                <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-slate-300 text-xs sm:text-sm">
                                    {selectedInterview.feedback?.summary || "No summary provided."}
                                </div>
                            </div>

                            {/* Two-column layout for Weaknesses and Suggestions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Weaknesses */}
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Areas for Improvement</h4>
                                    <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-4 min-h-[140px] text-xs">
                                        {selectedInterview.feedback?.weeknesses ? (
                                            Array.isArray(selectedInterview.feedback.weeknesses) ? (
                                                <ul className="list-disc pl-4 space-y-1.5 text-rose-200">
                                                    {selectedInterview.feedback.weeknesses.map((item, idx) => <li key={idx}>{item}</li>)}
                                                </ul>
                                            ) : (
                                                <p className="text-rose-200 whitespace-pre-line">{selectedInterview.feedback.weeknesses}</p>
                                            )
                                        ) : (
                                            <p className="text-slate-500 italic">None noted.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Suggestions */}
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Actionable Suggestions</h4>
                                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 min-h-[140px] text-xs">
                                        {selectedInterview.feedback?.suggetions ? (
                                            Array.isArray(selectedInterview.feedback.suggetions) ? (
                                                <ul className="list-disc pl-4 space-y-1.5 text-emerald-200">
                                                    {selectedInterview.feedback.suggetions.map((item, idx) => <li key={idx}>{item}</li>)}
                                                </ul>
                                            ) : (
                                                <p className="text-emerald-200 whitespace-pre-line">{selectedInterview.feedback.suggetions}</p>
                                            )
                                        ) : (
                                            <p className="text-slate-500 italic">None noted.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-white/5 bg-slate-950/40 flex justify-end">
                            <button
                                onClick={() => setSelectedInterview(null)}
                                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold rounded-xl cursor-pointer"
                            >
                                Close Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;