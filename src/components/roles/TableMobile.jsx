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
        <div className="list-mobile-container">
            <div className="list-mobile-header">
                <h2 className="list-mobile-subtitle">Roles</h2>
            </div>
            <div className="list-mobile">
                {roles.length > 0 ? (
                    roles.map((rol, index) => (
                        <RoleCard
                            key={index}
                            rol={rol}
                            onOpenDeleteRoleModal={onOpenDeleteRoleModal}
                            handleActive={handleActive}
                            canExecute={canExecute}
                        />
                    ))
                ) : (
                    <div className="list-no-data">
                        No hay ningún rol disponible
                    </div>
                )}
            </div>
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
        <div className="list-mobile-fields">
            <div className="list-mobile-field">
                <span className="list-mobile-label">Nombre:</span>
                <span className="list-mobile-value">{rol.name}</span>
            </div>
            {isTablet ? (
                <div className="list-mobile-field">
                    <span className="list-mobile-label">Descripción:</span>
                    <div className="list-mobile-description">
                        <span className="list-mobile-value">
                            {isExpanded
                                ? rol.description
                                : `${rol.description.slice(0, 50)}...`}
                        </span>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="list-button-expand"
                        >
                            {isExpanded ? "Ver menos" : "Ver más"}
                        </button>
                    </div>
                </div>
            ) : null}

            <div className="list-mobile-field">
                <span className="list-mobile-label">Acciones:</span>
                <div className="list-mobile-buttons">
                    {rol.active ? (
                        <>
                            {canExecute("EDIT_ROLE") ? (
                                <a
                                    href={`edit-role/${rol.id}`}
                                    className="list-button-table list-edit button"
                                >
                                    Editar
                                </a>
                            ) : null}
                            {canExecute("DELETE_ROLE") &&
                            rol.name !== "ROLE_ADMIN" &&
                            rol.name !== "ROLE_USER" ? (
                                <button
                                    onClick={() => onOpenDeleteRoleModal(rol)}
                                    className="list-button-table list-delete button"
                                >
                                    Eliminar
                                </button>
                            ) : null}
                        </>
                    ) : (
                        <>
                            {canExecute("ACTIVATE_ROLE") ? (
                                <button
                                    onClick={() => handleActive(rol.id)}
                                    className="list-button-table button"
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
