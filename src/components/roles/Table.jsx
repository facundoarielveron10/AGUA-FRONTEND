// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({ roles, onOpenDeleteRoleModal, handleActive }) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="list-container">
            <div className="list">
                <h2 className="list-subtitle">Roles</h2>
                <table className="list-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th className="list-head-actions">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((rol) => (
                            <tr key={rol.id}>
                                <td data-label="Nombre">{rol.name}</td>
                                <td data-label="Descripción">
                                    {rol.description}
                                </td>
                                <td data-label="Acciones">
                                    {rol.active ? (
                                        <div className="list-buttons">
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
                                                    onClick={() =>
                                                        onOpenDeleteRoleModal(
                                                            rol
                                                        )
                                                    }
                                                    className="list-button-table list-delete button"
                                                >
                                                    Eliminar
                                                </button>
                                            ) : null}
                                        </div>
                                    ) : (
                                        <div className="list-buttons">
                                            {canExecute("ACTIVATE_ROLE") ? (
                                                <button
                                                    onClick={() =>
                                                        handleActive(rol.id)
                                                    }
                                                    className="list-button-table button"
                                                >
                                                    Activar
                                                </button>
                                            ) : null}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
