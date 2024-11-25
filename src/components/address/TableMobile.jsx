// REACT
import { useState } from "react";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// RESPONSIVE
import { useMediaQuery } from "react-responsive";

export default function TableMobile({ address }) {
    const { canExecute } = useLoginStore();

    return (
        <div className="list-mobile-container">
            <div className="list-mobile-header">
                <h2 className="list-mobile-subtitle">Direcciones</h2>
            </div>
            <div className="list-mobile">
                {address.length > 0 ? (
                    address.map((address, index) => (
                        <AddressCard
                            key={index}
                            address={address}
                            canExecute={canExecute}
                        />
                    ))
                ) : (
                    <div className="list-no-data">
                        No hay ningún address disponible
                    </div>
                )}
            </div>
        </div>
    );
}

function AddressCard({ address, canExecute }) {
    // STATES
    const [isExpanded, setIsExpanded] = useState(false);

    // RESPONSIVE
    const isTablet = useMediaQuery({
        query: "(min-width: 468px)",
    });

    return (
        <div className="list-mobile-fields">
            <div className="list-mobile-field">
                <span className="list-mobile-label">Direccion:</span>
                <span className="list-mobile-value">{address.address}</span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Ciudad:</span>
                <span className="list-mobile-value">{address.city}</span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Pais:</span>
                <span className="list-mobile-value">{address.country}</span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Acciones:</span>
                <div className="list-mobile-buttons"></div>
            </div>
        </div>
    );
}
