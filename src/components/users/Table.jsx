// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({
    users,
    onOpenChangeRoleModal,
    onOpenDeleteUserModal,
    handleRoleChange,
    handleActive,
    selectedRole,
    roles,
}) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="listUser-list">
            <div className="listUser-header">
                <h2 className="listUser-subtitle">Usuarios</h2>
                <div className="listUser-filter">
                    <select
                        id="roleFilter"
                        value={selectedRole}
                        onChange={handleRoleChange}
                    >
                        <option value="">Todos los roles</option>
                        {roles.map((role, index) => (
                            <option key={index} value={role?.name}>
                                {role?.nameDescriptive}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {users.length === 0 ? (
                <p className="listUser-no-users">
                    No hay ningún usuario disponible con este rol
                </p>
            ) : (
                <table className="listUser-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th className="listUser-head-actions">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user?.name}</td>
                                <td>{user?.lastname}</td>
                                <td>{user?.email}</td>
                                <td>{user?.Role?.nameDescriptive}</td>
                                <td>
                                    {user?.active ? (
                                        <div>
                                            <div className="listUser-actions">
                                                {canExecute("CHANGE_ROLE") ? (
                                                    <button
                                                        className="button"
                                                        onClick={() =>
                                                            onOpenChangeRoleModal(
                                                                user
                                                            )
                                                        }
                                                    >
                                                        Cambiar Rol
                                                    </button>
                                                ) : null}
                                                {canExecute("EDIT_USER") ? (
                                                    <a
                                                        href={`edit-user/${user?.id}`}
                                                        className="listUser-button-table button"
                                                    >
                                                        Editar
                                                    </a>
                                                ) : null}
                                                {canExecute("DELETE_USER") ? (
                                                    <button
                                                        onClick={() =>
                                                            onOpenDeleteUserModal(
                                                                user
                                                            )
                                                        }
                                                        className="listUser-button-table listUser-delete button"
                                                    >
                                                        Eliminar
                                                    </button>
                                                ) : null}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="listUser-actions">
                                            {canExecute("ACTIVATE_USER") ? (
                                                <button
                                                    className="listUser-button-table button"
                                                    onClick={() =>
                                                        handleActive(user?.id)
                                                    }
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
            )}
        </div>
    );
}
