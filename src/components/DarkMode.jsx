// ZUSTAND
import { useLoginStore } from "../zustand/loginStore";

// DARK MODE
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function DarkMode({ navbar = false }) {
    // ZUSTAND
    const { toggleDarkMode, darkMode } = useLoginStore();

    return (
        <div className={`${!navbar ? "darkMode" : ""}`}>
            <DarkModeSwitch
                checked={darkMode}
                onChange={toggleDarkMode}
                size={40}
                sunColor="#F5D033"
            />
        </div>
    );
}
