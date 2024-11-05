// MODAL
import Modal from "react-responsive-modal";

export default function DeleteAddressModal({
    deleteAddressModal,
    onCloseDeleteAddressModal,
    handleDeleteAddress,
    addressDelete,
}) {
    return (
        <div>
            <Modal
                open={deleteAddressModal}
                onClose={onCloseDeleteAddressModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <form onSubmit={handleDeleteAddress}>
                    <h2 className="modal-title">
                        ¿Estas seguro de eliminar la dirección?
                    </h2>
                    <p className="modal-paragraph">
                        Dirección: <span>{addressDelete?.address}</span>
                    </p>
                    <p className="modal-paragraph">
                        Ciudad: <span>{addressDelete?.city}</span>
                    </p>
                    <p className="modal-paragraph">
                        Pais: <span>{addressDelete?.country}</span>
                    </p>

                    <button
                        type="submit"
                        className="button modal-delete modal-button"
                    >
                        Eliminar Dirección
                    </button>
                </form>
            </Modal>
        </div>
    );
}
