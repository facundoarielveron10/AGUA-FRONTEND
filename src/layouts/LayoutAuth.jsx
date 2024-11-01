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
import "@styles/list.css";
import "@styles/modal.css";
import "@styles/darkmode.css";
import "@styles/home/home.css";
import "@styles/profile/profile.css";
import "@styles/profile/address.css";

// CSS (External)
import "react-toastify/dist/ReactToastify.css";

// REACT
import { useEffect } from "react";

// COMPONENTS
import Navbar from "src/components/navbar/Navbar.jsx";
import DarkMode from "src/components/DarkMode.jsx";

// ZUSTAND
import { useLoginStore } from "../zustand/loginStore";

// RESPONSIVE
import { useMediaQuery } from "react-responsive";

export default function LayoutAuth({ children, action }) {
    // ZUSTAND
    const { canExecute, initializeTheme } = useLoginStore();

    // RESPONSIVE
    const isDesktop = useMediaQuery({ query: "(min-width: 968px)" });

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
            {!isDesktop && <DarkMode />}
            {children}
        </>
    );
}
