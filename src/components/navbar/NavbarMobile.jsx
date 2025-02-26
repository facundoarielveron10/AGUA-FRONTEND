// REACT
import { useState } from "react";

// COMPONENTS
import { Sling as Hamburger } from "hamburger-react";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// ICON
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";

export default function NavbarMobile({ url }) {
    // STATE
    const [isOpen, setOpen] = useState(false);

    // ZUSTAND
    const { darkMode, canExecute, logout } = useLoginStore();

    // FUNCTIONS
    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <div className="navbarMobile">
                <Hamburger
                    toggled={isOpen}
                    toggle={setOpen}
                    color={`${
                        darkMode ? "#e9e9e9" : isOpen ? "#e9e9e9" : "#0f1214"
                    }`}
                />
            </div>
            <div
                className={`navbarMobile-overlay ${isOpen ? "open" : ""}`}
                id="navbarMobile-overlay"
            >
                <nav className="navbarMobile-overlay-menu">
                    <ul>
                        <li>
                            <a
                                className={`${
                                    url === "/" ? "navbar-link-active" : ""
                                }`}
                                href="/"
                            >
                                Inicio
                            </a>
                        </li>
                        {canExecute("GET_ORDERS_USER") ? (
                            <li>
                                <a
                                    className={`${
                                        url === "/orders-user"
                                            ? "navbar-link-active"
                                            : ""
                                    }`}
                                    href="/orders-user"
                                >
                                    Mis Pedidos
                                </a>
                            </li>
                        ) : null}
                        {canExecute("GET_ROLES") ? (
                            <li>
                                <a
                                    className={`${
                                        url === "/roles"
                                            ? "navbar-link-active"
                                            : ""
                                    }`}
                                    href="/roles"
                                >
                                    Roles
                                </a>
                            </li>
                        ) : null}
                        {canExecute("GET_USERS") ? (
                            <li>
                                <a
                                    className={`${
                                        url === "/users"
                                            ? "navbar-link-active"
                                            : ""
                                    }`}
                                    href="/users"
                                >
                                    Usuarios
                                </a>
                            </li>
                        ) : null}
                        {canExecute("GET_ADDRESS_DELIVERY") && (
                            <li>
                                <a
                                    className={`${
                                        url === "/address"
                                            ? "navbar-link-active"
                                            : ""
                                    }`}
                                    href="/address"
                                >
                                    Direcciones
                                </a>
                            </li>
                        )}
                        {canExecute("GET_PROFILE") && (
                            <li>
                                <a
                                    className={`${
                                        url === "/profile"
                                            ? "navbar-link-active"
                                            : ""
                                    }`}
                                    href="/profile"
                                >
                                    <FaUser className="navbar-profile" />
                                </a>
                            </li>
                        )}
                        <li>
                            <button
                                className="navbarMobile-logout"
                                onClick={handleLogout}
                            >
                                <CiLogout />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
