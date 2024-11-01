// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function TableMobile({
    users,
    onOpenChangeRoleModal,
    onOpenDeleteUserModal,
    handleRoleChange,
    handleActive,
    selectedRole,
    roles,
}) {
    const { canExecute } = useLoginStore();

    return (
        <div className="list-mobile-container">
            <div className="list-mobile-header">
                <h2 className="list-mobile-subtitle">Usuarios</h2>
                <div className="list-mobile-filter">
                    <select
                        className="list-select"
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
            <div className="list-mobile">
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <UserCard
                            key={index}
                            user={user}
                            onOpenChangeRoleModal={onOpenChangeRoleModal}
                            onOpenDeleteUserModal={onOpenDeleteUserModal}
                            handleActive={handleActive}
                            canExecute={canExecute}
                        />
                    ))
                ) : (
                    <div className="list-no-data">
                        No hay ningún usuario disponible
                    </div>
                )}
            </div>
        </div>
    );
}

function UserCard({
    user,
    onOpenChangeRoleModal,
    onOpenDeleteUserModal,
    handleActive,
    canExecute,
}) {
    return (
        <div className="list-mobile-fields">
            <div className="list-mobile-field">
                <span className="list-mobile-label">Nombre:</span>
                <span className="list-mobile-value">{user?.name}</span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Apellido:</span>
                <span className="list-mobile-value">{user?.lastname}</span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Email:</span>
                <span className="list-mobile-value">{user?.email}</span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Rol:</span>
                <span className="list-mobile-value">
                    {user?.Role?.nameDescriptive}
                </span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Acciones:</span>
                <div className="list-mobile-buttons">
                    {user?.active ? (
                        <>
                            {canExecute("CHANGE_ROLE") ? (
                                <button
                                    className="list-button-table button"
                                    onClick={() => onOpenChangeRoleModal(user)}
                                >
                                    Cambiar Rol
                                </button>
                            ) : null}
                            {canExecute("EDIT_USER") ? (
                                <a
                                    href={`edit-user/${user?.id}`}
                                    className="list-button-table list-edit button"
                                >
                                    Editar
                                </a>
                            ) : null}
                            {canExecute("DELETE_USER") ? (
                                <button
                                    onClick={() => onOpenDeleteUserModal(user)}
                                    className="list-button-table list-delete button"
                                >
                                    Eliminar
                                </button>
                            ) : null}
                        </>
                    ) : (
                        <>
                            {canExecute("ACTIVATE_USER") ? (
                                <button
                                    className="list-button-table button"
                                    onClick={() => handleActive(user?.id)}
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
