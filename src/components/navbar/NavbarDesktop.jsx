// ICONS
import { IoLogOutOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// COMPONENTS
import Logo from "../Logo";
import DarkMode from "../DarkMode";

export default function Navbar() {
    // ZUSTAND
    const { logout, canExecute } = useLoginStore();

    return (
        <nav className={`navbar`}>
            <div className="navbar-container">
                {/* LOGO */}
                <a href="/">
                    <Logo animation={false} width={150} height={37.5} />
                </a>

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
                        {canExecute("GET_PROFILE") && (
                            <a className="navbar-link" href="/profile">
                                <FaUser className="navbar-profile" />
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
