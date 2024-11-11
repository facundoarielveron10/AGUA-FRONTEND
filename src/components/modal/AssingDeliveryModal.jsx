// REACT
import { useState, useEffect } from "react";

// MODAL
import Modal from "react-responsive-modal";

// AXIOS
import clientAxios from "src/config/ClientAxios";

// UTILS
import { errorResponse } from "src/utils/error";

export default function AssingDeliveryModal({
    assingDeliveryModal,
    onCloseAssingDeliveryModal,
    handleAssingDelivery,
    delivery,
    setDelivery,
}) {
    // STATES
    const [deliveries, setDeliveries] = useState([]);

    // FUNCTIONS
    const getDeliveries = async () => {
        try {
            const { data } = await clientAxios.get("/order/deliveries");
            setDeliveries(data);
        } catch (error) {
            errorResponse(error);
        }
    };

    // EFFECTS
    useEffect(() => {
        if (assingDeliveryModal) {
            getDeliveries();
        } else {
            setDelivery("");
        }
    }, [assingDeliveryModal]);

    return (
        <div>
            <Modal
                open={assingDeliveryModal}
                onClose={onCloseAssingDeliveryModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <form onSubmit={handleAssingDelivery}>
                    <h2 className="modal-title">Asignar Repartidor</h2>
                    <div className="form-group">
                        <label htmlFor="delivery" className="form-label">
                            Repartidor
                        </label>
                        <select
                            className="modal-select"
                            value={delivery}
                            onChange={(e) => setDelivery(e.target.value)}
                        >
                            <option disabled className="modal-option" value="">
                                Seleccionar Repartidor
                            </option>
                            {deliveries.map((deliveryData) => (
                                <option
                                    className="modal-option"
                                    value={deliveryData.id}
                                    key={deliveryData.id}
                                >
                                    {deliveryData.name} {deliveryData.lastname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="button modal-button">
                        Asignar Repartidor
                    </button>
                </form>
            </Modal>
        </div>
    );
}
