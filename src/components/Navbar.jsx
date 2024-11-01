// REACT
import { useState } from "react";

// ICONS
import { IoLogOutOutline } from "react-icons/io5";

// ZUSTAND
import { useLoginStore } from "../zustand/loginStore";

// COMPONENTS
import Logo from "./Logo";
import DarkMode from "./DarkMode";

export default function Navbar() {
    // ZUSTAND
    const { logout, canExecute } = useLoginStore();

    return (
        <nav className={`navbar`}>
            <div className="navbar-container">
                {/* LOGO */}
                <Logo animation={false} width={150} height={37.5} />

                <div className="navbar-actions">
                    {/* LINKS */}
                    <div className="navbar-links">
                        {canExecute("GET_ROLES") && (
                            <a className="navbar-link" href="/roles">
                                Roles
                            </a>
                        )}
                        {canExecute("GET_USERS") && (
                            <a className="navbar-link" href="/users">
                                Usuarios
                            </a>
                        )}
                        <button
                            className="navbar-logout"
                            onClick={logout}
                            title="Cerrar sesión"
                        >
                            <IoLogOutOutline />
                        </button>
                    </div>

                    <DarkMode navbar={true} />
                </div>
            </div>
        </nav>
    );
}
