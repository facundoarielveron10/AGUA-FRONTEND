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
import { useLoginStore } from "../../zustand/loginStore";

export default function TableMobile({
    orders,
    statuses,
    selectedStatus,
    handleStatusChange,
    onOpenCancelOrderModal,
    onOpenConfirmOrderModal,
    onOpenShowOrderModal,
    onOpenAssingDeliveryModal,
}) {
    return (
        <div className="list-mobile-container">
            <div className="list-mobile-header">
                <h2 className="list-mobile-subtitle">Pedidos</h2>
                <div className="list-mobile-filter">
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
            <div className="list-mobile">
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <OrderCard
                            key={index}
                            order={order}
                            onOpenCancelOrderModal={onOpenCancelOrderModal}
                            onOpenConfirmOrderModal={onOpenConfirmOrderModal}
                            onOpenShowOrderModal={onOpenShowOrderModal}
                            onOpenAssingDeliveryModal={
                                onOpenAssingDeliveryModal
                            }
                        />
                    ))
                ) : (
                    <div className="list-no-data">
                        No hay ningún usuario disponible
                    </div>
                )}
            </div>
        </div>
    );
}

function OrderCard({
    order,
    onOpenCancelOrderModal,
    onOpenAssingDeliveryModal,
    onOpenConfirmOrderModal,
    onOpenShowOrderModal,
}) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="list-mobile-fields">
            <div className="list-mobile-field">
                <span className="list-mobile-label">Numero:</span>
                <span className="list-mobile-value">{order?.id}</span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Fecha:</span>
                <span className="list-mobile-value">
                    {formatDate(order?.createdAt)}
                </span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Cantidad:</span>
                <span className="list-mobile-value">{order?.amount}</span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Precio Total:</span>
                <span className="list-mobile-value">
                    {formatPrice(order?.totalPrice)}
                </span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Direccion:</span>
                <span className="list-mobile-value">
                    {order?.Address?.address}, {order?.Address?.city}
                </span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Estado:</span>
                <span
                    className={`list-mobile-value order-status ${formatStatusColor(
                        order?.status
                    )}`}
                >
                    {formatStatus(order?.status)}
                </span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Acciones:</span>
                <div className="list-mobile-buttons">
                    {canExecute("ASSING_DELIVERY") ? (
                        order?.status === "CONFIRMED" ? (
                            <button
                                className="button list-button-table list-button-icon"
                                type="button"
                                onClick={() => onOpenAssingDeliveryModal()}
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
                                onClick={() => onOpenConfirmOrderModal(order)}
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
                                onClick={() => onOpenCancelOrderModal(order)}
                            >
                                <MdCancel className="list-button-table-icon-big" />
                            </button>
                        ) : null
                    ) : null}
                    {canExecute("SHOW_ORDER") ? (
                        <button
                            className="button list-button-table list-button-icon"
                            type="button"
                            onClick={() => onOpenShowOrderModal(order)}
                        >
                            <FaEye className="list-button-table-icon-big" />
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}