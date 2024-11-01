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
                    <h2 className="modal-title">
                        ¿Estas seguro de eliminar el rol?
                    </h2>
                    <p className="modal-paragraph">
                        Nombre: <span>{roleDelete?.name}</span>
                    </p>
                    <p className="modal-paragraph">
                        Nombre descriptivo:{" "}
                        <span>{roleDelete?.nameDescriptive}</span>
                    </p>
                    <p className="modal-paragraph">
                        Descripcion: <span>{roleDelete?.description}</span>
                    </p>

                    <button
                        type="submit"
                        className="button modal-delete modal-button"
                    >
                        Eliminar Rol
                    </button>
                </form>
            </Modal>
        </div>
    );
}
