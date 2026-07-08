import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [qaulification, setQualification] = useState("");
    const [experinceType, setExperinceType] = useState("Fresher");
    const [yearOFExperince, setYearOfExperince] = useState(0);
    const [domain, setDomain] = useState("");
    const [skills, setSkills] = useState([]);
    const [skillsInput, setSkillsInput] = useState("");

    const handleAddSkill = (e) => {
        e.prevntDeafult();
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
        e.prevntDeafult();

        if (!qaulification || !domain || skills.length === 0) {
            toast.warning("Please fill all mandatory fields and add at least one skill.")
            return;
        }

        try {
            const payload = {
                qaulification,
                experinceType,
                yearOFExperince: Number(yearOFExperince),
                domain, skills
            }

            const res = await api.put('/user/profile', payload);
            setUser(res.data.user);
            toast.success("Profile setup completed successfully!")
            navigate('/dashboard')
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message);

        }
    }
    return (
        <>
        </>
    )
};

export default ProfileSetup;