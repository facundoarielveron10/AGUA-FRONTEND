// MODAL
import Modal from "react-responsive-modal";

export default function DeleteRoleModal({
    deleteRoleModal,
    onCloseDeleteRoleModal,
    handleDeleteRole,
    roleDelete,
}) {
    return (
        <div>
            <Modal
                open={deleteRoleModal}
                onClose={onCloseDeleteRoleModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <form onSubmit={handleDeleteRole}>
                    <h2 className="roles-modal-title">
                        ¿Estas seguro de eliminar el rol?
                    </h2>
                    <div className="roles-modal-rol">
                        <p>
                            Nombre: <span>{roleDelete?.name}</span>
                        </p>
                        <p>
                            Nombre descriptivo:{" "}
                            <span>{roleDelete?.nameDescriptive}</span>
                        </p>
                        <p>
                            Descripcion: <span>{roleDelete?.description}</span>
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="button roles-delete roles-modal-button"
                    >
                        Eliminar Rol
                    </button>
                </form>
            </Modal>
        </div>
    );
}
