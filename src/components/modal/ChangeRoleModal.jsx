// MODAL
import Modal from "react-responsive-modal";

export default function ChangeRoleModal({
    openChangeModal,
    onCloseChangeRoleModal,
    handleChangeRole,
    role,
    roles,
    newRole,
    setNewRole,
}) {
    return (
        <div>
            <Modal
                open={openChangeModal}
                onClose={onCloseChangeRoleModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <form onSubmit={handleChangeRole}>
                    <h2 className="modal-title">Cambiar el rol del usuario</h2>
                    <p className="modal-paragraph">
                        Usuario:{" "}
                        <span>
                            {role?.name} {role?.lastname}
                        </span>
                    </p>
                    <p className="modal-paragraph">
                        Selecciona el rol para el usuario
                    </p>
                    <select
                        className="modal-select"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                    >
                        <option disabled className="modal-option" value="">
                            Seleccionar Rol
                        </option>
                        {roles.length > 0
                            ? roles.map((rol, index) => (
                                  <option
                                      key={index}
                                      className="modal-option"
                                      value={rol?.name}
                                  >
                                      {rol?.nameDescriptive}
                                  </option>
                              ))
                            : null}
                    </select>
                    <button type="submit" className="modal-button button">
                        Cambiar
                    </button>
                </form>
            </Modal>
        </div>
    );
}
