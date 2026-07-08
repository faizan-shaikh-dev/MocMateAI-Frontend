import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Briefcase, GraduationCap, Plus, X, ChevronRight, Sparkles, Code2 } from "lucide-react";

const ProfileSetup = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [qualification, setQualification] = useState("");
    const [experienceType, setExperienceType] = useState("Fresher");
    const [yearsOfExperience, setYearsOfExperience] = useState(0);
    const [domain, setDomain] = useState("");
    const [customDomain, setCustomDomain] = useState("");
    const [skills, setSkills] = useState([]);
    const [skillsInput, setSkillsInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAddSkill = (e) => {
        if (e) e.preventDefault();
        const cleanSkill = skillsInput.trim();
        if (cleanSkill && !skills.includes(cleanSkill)) {
            setSkills([...skills, cleanSkill]);
            setSkillsInput('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedDomain = domain === "Other" ? customDomain.trim() : domain;

        if (!qualification || !selectedDomain || skills.length === 0) {
            toast.warning("Please fill all mandatory fields and add at least one skill.");
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                qualification,
                experienceType,
                yearsOfExperience: Number(yearsOfExperience),
                domain: selectedDomain,
                skills
            };

            const res = await api.put('/user/profile', payload);
            setUser(res.data.user);
            toast.success("Profile setup completed successfully!");
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 font-sans text-white px-4 py-12 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Profile Card */}
            <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10">
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4">
                        <Sparkles className="h-7 w-7 text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-200 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Setup Your Profile
                    </h2>
                    <p className="text-slate-400 text-sm mt-2 max-w-md">
                        Help us customize your mock interviews by providing your professional background and core skillset.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Domain Select Box */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                            Domain / Specialization
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                <Briefcase className="h-5 w-5" />
                            </span>
                            <select
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                className="w-full pl-11 pr-10 py-3 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-100 transition-all duration-200 appearance-none cursor-pointer"
                                required
                            >
                                <option value="" disabled className="bg-slate-950 text-slate-500">Select Domain</option>
                                <option value="Frontend Development" className="bg-slate-950 text-slate-100">Frontend Development</option>
                                <option value="Backend Development" className="bg-slate-950 text-slate-100">Backend Development</option>
                                <option value="Fullstack Development" className="bg-slate-950 text-slate-100">Fullstack Development</option>
                                <option value="Mobile App Development" className="bg-slate-950 text-slate-100">Mobile App Development</option>
                                <option value="Data Science" className="bg-slate-950 text-slate-100">Data Science</option>
                                <option value="AI / Machine Learning" className="bg-slate-950 text-slate-100">AI / Machine Learning</option>
                                <option value="Product Management" className="bg-slate-950 text-slate-100">Product Management</option>
                                <option value="QA / Software Testing" className="bg-slate-950 text-slate-100">QA / Software Testing</option>
                                <option value="DevOps / Cloud Engineering" className="bg-slate-950 text-slate-100">DevOps / Cloud Engineering</option>
                                <option value="Other" className="bg-slate-950 text-slate-100">Other / Custom</option>
                            </select>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    {/* Custom Domain Input (conditionally visible) */}
                    {domain === "Other" && (
                        <div className="space-y-1.5 animate-fadeIn">
                            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                                Custom Domain Name
                            </label>
                            <input
                                type="text"
                                value={customDomain}
                                onChange={(e) => setCustomDomain(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder-slate-500 text-slate-100 transition-all duration-200"
                                placeholder="e.g. Embedded Systems Developer"
                                required
                            />
                        </div>
                    )}

                    {/* Qualification Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                            Highest Qualification
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                <GraduationCap className="h-5 w-5" />
                            </span>
                            <select
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                                className="w-full pl-11 pr-10 py-3 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-100 transition-all duration-200 appearance-none cursor-pointer"
                                required
                            >
                                <option value="" disabled className="bg-slate-950 text-slate-500">Select Qualification</option>
                                <option value="Bachelor's Degree" className="bg-slate-950 text-slate-100">Bachelor's Degree</option>
                                <option value="Master's Degree" className="bg-slate-950 text-slate-100">Master's Degree</option>
                                <option value="Doctorate (PhD)" className="bg-slate-950 text-slate-100">Doctorate (PhD)</option>
                                <option value="Diploma / Associate Degree" className="bg-slate-950 text-slate-100">Diploma / Associate Degree</option>
                                <option value="High School" className="bg-slate-950 text-slate-100">High School</option>
                                <option value="Self-Taught / Bootcamp" className="bg-slate-950 text-slate-100">Self-Taught / Bootcamp</option>
                                <option value="Other" className="bg-slate-950 text-slate-100">Other</option>
                            </select>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    {/* Experience Level */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                            Experience Level
                        </label>
                        <div className="grid grid-cols-2 gap-2 bg-slate-900/60 p-1 rounded-xl border border-white/10">
                            <button
                                type="button"
                                onClick={() => {
                                    setExperienceType("Fresher");
                                    setYearsOfExperience(0);
                                }}
                                className={`py-2.5 text-sm font-semibold rounded-lg transition-all duration-250 cursor-pointer ${
                                    experienceType === "Fresher"
                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20"
                                        : "text-slate-400 hover:text-slate-200"
                                }`}
                            >
                                Fresher
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setExperienceType("Experienced");
                                    if (yearsOfExperience === 0) setYearsOfExperience(1);
                                }}
                                className={`py-2.5 text-sm font-semibold rounded-lg transition-all duration-250 cursor-pointer ${
                                    experienceType === "Experienced"
                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20"
                                        : "text-slate-400 hover:text-slate-200"
                                }`}
                            >
                                Experienced
                            </button>
                        </div>
                    </div>

                    {/* Years of Experience Slider & Input */}
                    {experienceType === "Experienced" && (
                        <div className="space-y-2.5 p-4 bg-slate-900/40 border border-white/5 rounded-xl animate-fadeIn">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Years of Experience
                                </label>
                                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                                    {yearsOfExperience} {yearsOfExperience === 1 ? "Year" : "Years"}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="1"
                                    max="15"
                                    value={yearsOfExperience || 1}
                                    onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                                    className="flex-1 accent-indigo-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer appearance-none border border-white/5"
                                />
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={yearsOfExperience || ""}
                                    onChange={(e) => {
                                        const val = Number(e.target.value);
                                        setYearsOfExperience(val >= 0 ? val : 0);
                                    }}
                                    className="w-16 px-2 py-1.5 bg-slate-950 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-100 text-center text-sm transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Skills Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                            Skills & Technologies
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                                    <Code2 className="h-5 w-5" />
                                </span>
                                <input
                                    type="text"
                                    value={skillsInput}
                                    onChange={(e) => setSkillsInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddSkill(e);
                                        }
                                    }}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder-slate-500 text-slate-100 transition-all duration-200"
                                    placeholder="Type a skill and press Enter (e.g., React)"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleAddSkill}
                                className="px-4 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white rounded-xl active:scale-[0.98] transition-all duration-200 flex items-center justify-center cursor-pointer"
                            >
                                <Plus className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Skills Chips Container */}
                        {skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2 pt-2.5 max-h-40 overflow-y-auto pr-1">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 hover:border-indigo-500/40 rounded-full text-xs font-semibold text-indigo-300 transition-all duration-200"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSkill(skill)}
                                            className="text-indigo-400 hover:text-indigo-200 transition-colors cursor-pointer"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-slate-500 italic mt-1.5">
                                Add at least one skill to proceed (e.g. JavaScript, Python, Excel, etc.)
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 px-4 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 active:scale-[0.98] transition-all duration-250 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isLoading ? (
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>Complete Profile Setup</span>
                                <ChevronRight className="h-4.5 w-4.5" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileSetup;