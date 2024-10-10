import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminDashboard from "../components/AdminDashboard";
import TeamOwnerDashboard from "../components/TeamOwnerDashboard";
import { Navigate } from "react-router-dom";

export default function DashboardRouter() {
    const { userInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);  // Stato per il caricamento

    useEffect(() => {
        if (userInfo) {
            setLoading(false);  // Disabilita il caricamento quando userInfo è disponibile
        }
    }, [userInfo]);

    if (loading) {
        return <div>Caricamento...</div>;  // Mostra un caricamento finché userInfo non è pronto
    }

    if (!userInfo) {
        return <Navigate to="/login" />;
    }

    // Controllo del ruolo
    if (userInfo.roles.includes("admin")) {
        return <div><p>Admin</p><AdminDashboard /></div>;
    } else if (userInfo.roles.includes("teamOwner")) {
        return <div><p>Team</p><TeamOwnerDashboard /></div>;
    } else {
        return <div>Ruolo non autorizzato</div>;
    }
};