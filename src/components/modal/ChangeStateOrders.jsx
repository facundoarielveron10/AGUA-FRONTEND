// REACT
import { useState } from "react";

// MODAL
import Modal from "react-responsive-modal";

// UTILS
import { errorResponse } from "src/utils/error";
import { formatStatus, formatStatusColor } from "src/utils/utils";

// ZUSTAND
import { useDeliveryStore } from "src/zustand/deliveryStore";

// AXIOS
import clientAxios from "src/config/ClientAxios";

// ALERTS
import { toast } from "react-toastify";

// COMPONENTS
import Spinner from "../Spinner";

export default function ChangeStateOrders({
    openChangeStates,
    onCloseChangeStates,
    ordersDelivery,
    statuses,
}) {
    // STATES
    const [loading, setLoading] = useState(false);
    const [selectedStatuses, setSelectedStatuses] = useState({});

    // FUNCTIONS
    const changeState = async () => {
        // Validación: Comprobamos que para cada orden se haya seleccionado un nuevo estado
        const allSelected = ordersDelivery.every(
            (order) =>
                selectedStatuses[order.id] && selectedStatuses[order.id] !== ""
        );
        if (!allSelected) {
            toast.error(
                "Debe seleccionar un nuevo estado para todas las órdenes."
            );
            return;
        }

        try {
            setLoading(true);
            // Aquí podrías iterar sobre selectedStatuses y hacer la llamada a la API
            console.log("Cambiar estados:", selectedStatuses);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Modal
                open={openChangeStates}
                onClose={onCloseChangeStates}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <div>
                    <h2 className="modal-title">Cambiar de estado</h2>
                    {loading ? (
                        <div className="spinner">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            {ordersDelivery.map((order) => (
                                <div key={order.id} className="order-item">
                                    <p className="order-address">
                                        {order.Address.address}
                                    </p>
                                    <p
                                        className={`order-status ${formatStatusColor(
                                            order.status
                                        )}`}
                                    >
                                        {formatStatus(order.status)}
                                    </p>
                                    <select
                                        className="list-select"
                                        id={`status-${order.id}`}
                                        value={selectedStatuses[order.id] || ""}
                                        onChange={(e) =>
                                            setSelectedStatuses({
                                                ...selectedStatuses,
                                                [order.id]: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">
                                            Selecciona un estado
                                        </option>
                                        {statuses
                                            .filter(
                                                (s) => s.name !== order.status
                                            )
                                            .map((item) => (
                                                <option
                                                    key={item.name}
                                                    value={item.name}
                                                >
                                                    {item.value}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            ))}
                            <button
                                onClick={changeState}
                                className="button modal-button"
                            >
                                Confirmar cambios
                            </button>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
}
