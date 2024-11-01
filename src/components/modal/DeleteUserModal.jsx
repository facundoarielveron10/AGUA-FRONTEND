// MODAL
import Modal from "react-responsive-modal";

export default function DeleteUserModal({
    openDeleteModal,
    onCloseDeleteUserModal,
    handleDeleteUser,
    user,
}) {
    return (
        <div>
            <Modal
                open={openDeleteModal}
                onClose={onCloseDeleteUserModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <form onSubmit={handleDeleteUser}>
                    <h2 className="modal-title">
                        ¿Estás seguro de eliminar el Usuario?
                    </h2>
                    <p className="modal-paragraph">
                        Nombre: <span>{user.name}</span>
                    </p>
                    <p className="modal-paragraph">
                        Apellido: <span>{user.lastname}</span>
                    </p>
                    <p className="modal-paragraph">
                        Email: <span>{user.email}</span>
                    </p>

                    <button
                        type="submit"
                        className="button modal-delete modal-button"
                    >
                        Eliminar Usuario
                    </button>
                </form>
            </Modal>
        </div>
    );
}
