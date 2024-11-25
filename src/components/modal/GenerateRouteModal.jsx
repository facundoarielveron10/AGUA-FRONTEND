// REACT
import { useEffect, useState } from "react";

// MODAL
import Modal from "react-responsive-modal";

// UTILS
import { errorResponse } from "src/utils/error";

// ZUSTAND
import { useDeliveryStore } from "src/zustand/deliveryStore";

// AXIOS
import clientAxios from "src/config/ClientAxios";

// ALERTS
import { toast } from "react-toastify";

// COMPONENTS
import Spinner from "../Spinner";

export default function GenerateRouteModal({
    openGenerateRoute,
    onCloseGenerateRoute,
    ordersGenerateRoute,
}) {
    // STATES
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState([]);
    const [addressStart, setAddressStart] = useState("");

    // ZUSTAND
    const { generateRoute } = useDeliveryStore();

    // FUNCTIONS
    const generateRouteData = async () => {
        try {
            setLoading(true);
            const data = await generateRoute(ordersGenerateRoute, addressStart);

            if (data) {
                toast.error(data);
                return;
            }
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    const getAddress = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.get(
                "/directions/address-delivery"
            );

            setAddress(data);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    // EFFECTS
    useEffect(() => {
        if (openGenerateRoute) {
            getAddress();
        }
    }, [openGenerateRoute]);

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
                            <select
                                className="modal-select"
                                value={addressStart}
                                onChange={(e) =>
                                    setAddressStart(e.target.value)
                                }
                            >
                                <option
                                    disabled
                                    className="modal-option"
                                    value=""
                                >
                                    Seleccionar Direccion
                                </option>
                                {address.length > 0
                                    ? address.map((address, index) => (
                                          <option
                                              key={index}
                                              className="modal-option"
                                              value={address?.id}
                                          >
                                              {address?.address},{" "}
                                              {address?.city},{" "}
                                              {address?.country}
                                          </option>
                                      ))
                                    : null}
                            </select>
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
