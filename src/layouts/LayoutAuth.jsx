// CSS (Internals)
import "@styles/navbar.css";
import "@styles/auth/form.css";
import "@styles/spinner.css";
import "@styles/logo.css";
import "@styles/alert.css";
import "@styles/roles/roles.css";
import "@styles/roles/create-edit.css";
import "@styles/users/users.css";
import "@styles/users/create-edit.css";
import "@styles/pagination.css";
import "@styles/search.css";

// CSS (External)
import "react-toastify/dist/ReactToastify.css";

// REACT
import { act, useEffect } from "react";

// COMPONENTS
import Navbar from "../components/Navbar.jsx";

// ZUSTAND
import { useLoginStore } from "../zustand/loginStore";

export default function LayoutAuth({ children, action }) {
    // ZUSTAND
    const { canExecute, initializeTheme } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        if (action) {
            if (!canExecute(action)) {
                window.location.assign("/");
            }
        }
    }, [action]);

    useEffect(() => {
        initializeTheme();
    }, [initializeTheme]);

    useEffect(() => {
        const reloadStyles = () => {
            const links = document.querySelectorAll("style[type='text/css']");
            links.forEach((link) => {
                const href = link.href;
                link.href = "";
                link.href = href;
            });
        };

        reloadStyles();
    }, []);

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
