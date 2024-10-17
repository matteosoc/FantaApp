import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminDashboard from "../components/AdminDashboard";
import TeamOwnerDashboard from "../components/TeamOwnerDashboard";
import { Navigate } from "react-router-dom";
import SpinnerComponent from '../components/spinner/Spinner'


export default function DashboardRouter() {
    const { userInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);  // Stato per il caricamento

    useEffect(() => {
        if (userInfo) {
            setLoading(false);  // Disabilita il caricamento quando userInfo è disponibile
        }
    }, [userInfo]);

    if (loading) {
        return <SpinnerComponent />;
    }

    if (!userInfo) {
        return <Navigate to="/login" />;
    }

    // Controllo del ruolo
    if (userInfo.roles.includes("admin")) {
        return <AdminDashboard />;
    } else if (userInfo.roles.includes("teamOwner")) {
        return <TeamOwnerDashboard />;
    } else {
        return <div>Ruolo non autorizzato</div>;
    }
};