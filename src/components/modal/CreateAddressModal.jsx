// MODAL
import Modal from "react-responsive-modal";

export default function CreateAddressModal({
    openCreateAddressModal,
    onCloseCreateAddressModal,
    handleCreateAddress,
    address,
    setAddress,
    city,
    setCity,
    country,
    setCountry,
}) {
    return (
        <div>
            <Modal
                open={openCreateAddressModal}
                onClose={onCloseCreateAddressModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <form onSubmit={handleCreateAddress}>
                    <h2 className="modal-title">Crear una dirección</h2>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Dirección"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Ciudad"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="País"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <button type="submit" className="modal-button button">
                        Añadir Dirección
                    </button>
                </form>
            </Modal>
        </div>
    );
}
