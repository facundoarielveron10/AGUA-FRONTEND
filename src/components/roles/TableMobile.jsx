// REACT
import { useState } from "react";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// RESPONSIVE
import { useMediaQuery } from "react-responsive";

export default function TableMobile({
    roles,
    onOpenDeleteRoleModal,
    handleActive,
}) {
    const { canExecute } = useLoginStore();

    return (
        <div className="roles-mobile-container">
            {roles.map((rol) => (
                <RoleCard
                    key={rol.id}
                    rol={rol}
                    onOpenDeleteRoleModal={onOpenDeleteRoleModal}
                    handleActive={handleActive}
                    canExecute={canExecute}
                />
            ))}
        </div>
    );
}

function RoleCard({ rol, onOpenDeleteRoleModal, handleActive, canExecute }) {
    // STATES
    const [isExpanded, setIsExpanded] = useState(false);

    // RESPONSIVE
    const isTablet = useMediaQuery({
        query: "(min-width: 468px)",
    });

    return (
        <div className="roles-mobile-role">
            <div className="roles-mobile-field">
                <span className="roles-mobile-label">Nombre:</span>
                <span className="roles-mobile-value">{rol.name}</span>
            </div>
            {isTablet ? (
                <div className="roles-mobile-field">
                    <span className="roles-mobile-label">Descripción:</span>
                    <div className="roles-mobile-description">
                        <span className="roles-mobile-value">
                            {isExpanded
                                ? rol.description
                                : `${rol.description.slice(0, 50)}...`}
                        </span>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="roles-button-expand"
                        >
                            {isExpanded ? "Ver menos" : "Ver más"}
                        </button>
                    </div>
                </div>
            ) : null}

            <div className="roles-mobile-field">
                <span className="roles-mobile-label">Acciones:</span>
                <div className="roles-mobile-buttons">
                    {rol.active ? (
                        <>
                            {canExecute("EDIT_ROLE") ? (
                                <a
                                    href={`edit-role/${rol.id}`}
                                    className="roles-button-table roles-edit button"
                                >
                                    Editar
                                </a>
                            ) : null}
                            {canExecute("DELETE_ROLE") &&
                            rol.name !== "ROLE_ADMIN" &&
                            rol.name !== "ROLE_USER" ? (
                                <button
                                    onClick={() => onOpenDeleteRoleModal(rol)}
                                    className="roles-button-table roles-delete button"
                                >
                                    Eliminar
                                </button>
                            ) : null}
                        </>
                    ) : (
                        <>
                            {canExecute("ACTIVE_ROLE") ? (
                                <button
                                    onClick={() => handleActive(rol.id)}
                                    className="roles-button-table button"
                                >
                                    Activar
                                </button>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
