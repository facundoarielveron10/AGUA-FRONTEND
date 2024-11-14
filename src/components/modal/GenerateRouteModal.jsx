// REACT
import { useState } from "react";

// MODAL
import Modal from "react-responsive-modal";

// UTILS
import { errorResponse } from "src/utils/error";

// ZUSTAND
import { useDeliveryStore } from "src/zustand/deliveryStore";

// COMPONENTS
import Spinner from "../Spinner";

export default function GenerateRouteModal({
    openGenerateRoute,
    onCloseGenerateRoute,
    ordersGenerateRoute,
}) {
    // STATES
    const [loading, setLoading] = useState(false);

    // ZUSTAND
    const { generateRoute } = useDeliveryStore();

    // FUNCTIONS
    const generateRouteData = async () => {
        try {
            setLoading(true);
            await generateRoute(ordersGenerateRoute);
        } catch (error) {
            errorResponse(error);
        }
    };

    return (
        <div>
            <Modal
                open={openGenerateRoute}
                onClose={onCloseGenerateRoute}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <div>
                    <h2 className="modal-title">Generar Ruta más Óptima</h2>
                    {loading ? (
                        <div className="modal-spinner">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            <h3 className="modal-title">Pedidos</h3>
                            <div className="modal-orders">
                                {ordersGenerateRoute.map((order, index) => (
                                    <div className="modal-order" key={index}>
                                        <p>
                                            <span>Direccion:</span>{" "}
                                            {order?.address}
                                        </p>
                                        <p>
                                            <span>Ciudad:</span> {order?.city}
                                        </p>
                                        <p>
                                            <span>Pais:</span> {order?.country}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="button modal-button"
                                onClick={() => generateRouteData()}
                            >
                                Generar Ruta
                            </button>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
}
