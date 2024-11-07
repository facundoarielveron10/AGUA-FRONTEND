// UTILS
import {
    formatDate,
    formatPrice,
    formatStatus,
    formatStatusColor,
} from "../../utils/utils";

// ICONS
import { MdCancel } from "react-icons/md";
import { FaEye, FaCheckCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

// ZUSTAND
import { useLoginStore } from "src/zustand/loginStore";

export default function Table({
    orders,
    statuses,
    selectedStatus,
    handleStatusChange,
    onOpenCancelOrderModal,
    onOpenConfirmOrderModal,
    onOpenShowOrderModal,
    onOpenAssingDeliveryModal,
}) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="list-container">
            <div className="list">
                <div className="list-header">
                    <h2 className="list-subtitle">Pedidos</h2>
                    <div className="list-filter">
                        <select
                            className="list-select"
                            id="statusFilter"
                            value={selectedStatus}
                            onChange={handleStatusChange}
                        >
                            <option value="">Todos los estados</option>
                            {statuses.map((status, index) => (
                                <option key={index} value={status.name}>
                                    {status.value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <p className="list-no-data">
                        No hay ningun pedido disponible
                    </p>
                ) : (
                    <table className="list-table">
                        <thead>
                            <tr>
                                <th>Numero</th>
                                <th>Fecha</th>
                                <th>Cantidad</th>
                                <th>Precio Total</th>
                                <th>Direccion de Entrega</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order?.id}</td>
                                    <td>{formatDate(order?.createdAt)}</td>
                                    <td>{order?.amount}</td>
                                    <td>{formatPrice(order?.totalPrice)}</td>
                                    <td>
                                        {order?.Address?.address},{" "}
                                        {order?.Address?.city}
                                    </td>
                                    <td>
                                        <span
                                            className={`order-status ${formatStatusColor(
                                                order?.status
                                            )}`}
                                        >
                                            {formatStatus(order?.status)}
                                        </span>
                                    </td>
                                    <td className="list-buttons">
                                        {canExecute("ASSING_DELIVERY") ? (
                                            order?.status === "CONFIRMED" ? (
                                                <button
                                                    className="button list-button-table list-button-icon"
                                                    type="button"
                                                    onClick={() =>
                                                        onOpenAssingDeliveryModal()
                                                    }
                                                >
                                                    <TbTruckDelivery className="list-button-table-icon-big" />
                                                </button>
                                            ) : null
                                        ) : null}
                                        {canExecute("CONFIRM_ORDER") ? (
                                            order?.status === "PENDING" ? (
                                                <button
                                                    className="button list-button-table list-button-icon list-confirm"
                                                    type="button"
                                                    onClick={() =>
                                                        onOpenConfirmOrderModal(
                                                            order
                                                        )
                                                    }
                                                >
                                                    <FaCheckCircle className="list-button-table-icon-big" />
                                                </button>
                                            ) : null
                                        ) : null}
                                        {canExecute("CANCEL_ORDER") ? (
                                            order?.status === "PENDING" ? (
                                                <button
                                                    className="button list-button-table list-delete list-button-icon"
                                                    type="button"
                                                    onClick={() =>
                                                        onOpenCancelOrderModal(
                                                            order
                                                        )
                                                    }
                                                >
                                                    <MdCancel className="list-button-table-icon-big" />
                                                </button>
                                            ) : null
                                        ) : null}
                                        {canExecute("SHOW_ORDER") ? (
                                            <button
                                                className="button list-button-table list-button-icon"
                                                type="button"
                                                onClick={() =>
                                                    onOpenShowOrderModal(order)
                                                }
                                            >
                                                <FaEye className="list-button-table-icon-big" />
                                            </button>
                                        ) : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
