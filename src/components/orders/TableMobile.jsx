// UTILS
import {
    formatDate,
    formatPrice,
    formatStatus,
    formatStatusColor,
} from "../../utils/utils";

// ICONS
import { MdCancel } from "react-icons/md";
import { FaEye, FaCheckCircle, FaExchangeAlt } from "react-icons/fa";
import { TbMapShare, TbTruckDelivery } from "react-icons/tb";
import { BsCalendar2Date, BsFillCalendar2DateFill } from "react-icons/bs";

// COMPONENTS
import DatePicker from "react-datepicker";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";
import { useDeliveryStore } from "src/zustand/deliveryStore";

export default function TableMobile({
    orders,
    statuses,
    selectedStatus,
    handleStatusChange,
    advancedDates,
    handleAdvancedDates,
    date,
    setDate,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleFilterDate,
    onOpenCancelOrderModal,
    onOpenConfirmOrderModal,
    onOpenShowOrderModal,
    onOpenAssingDeliveryModal,
    handleGenerateRoute,
    isChecked,
    onOpenGenerateRoute,
    ordersDelivery,
    ordersDeliveryAddress,
    onOpenChangeStates,
}) {
    // ZUSTAND
    const { canExecute } = useLoginStore();
    const { route, orders: ordersMap } = useDeliveryStore();

    // FUNCTIONS
    const isMapInclude = (orderId) => {
        return ordersMap.some((orderMap) => orderMap?.id === orderId);
    };

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
                    {!advancedDates ? (
                        <div className="list-mobile-filter-date">
                            {/* FECHA */}
                            <div className="list-date-picker list-mobile-date-picker">
                                <label>Fecha</label>
                                <DatePicker
                                    selected={date}
                                    onChange={(date) => setDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    isClearable
                                    placeholderText="Selecciona una fecha"
                                    className="list-date list-mobile-date"
                                />
                            </div>
                            <p
                                className="list-date-advanced"
                                onClick={() => handleAdvancedDates(true)}
                            >
                                <BsCalendar2Date className="list-date-advanced-icon" />
                                <BsFillCalendar2DateFill className="list-date-advanced-icon" />
                            </p>
                            <div className="list-date-button">
                                <button
                                    type="button"
                                    className="button"
                                    onClick={handleFilterDate}
                                >
                                    Filtrar
                                </button>
                            </div>
                        </div>
                    ) : null}
                    {advancedDates ? (
                        <div className="list-mobile-filter-dates">
                            {/* FECHA DESDE */}
                            <div className="list-date-picker list-mobile-date-picker">
                                <label>Fecha Desde:</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    isClearable
                                    placeholderText="Selecciona una fecha"
                                    className="list-date list-mobile-date"
                                    maxDate={endDate}
                                />
                            </div>
                            {/* FECHA HASTA */}
                            <div className="list-date-picker list-mobile-date-picker">
                                <label>Fecha Hasta:</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    isClearable
                                    placeholderText="Selecciona una fecha"
                                    className="list-date list-mobile-date"
                                    minDate={startDate}
                                />
                            </div>
                            <p
                                className="list-date-advanced"
                                onClick={() => handleAdvancedDates(false)}
                            >
                                <BsCalendar2Date className="list-date-advanced-icon" />
                            </p>
                            <div className="list-mobile-date-button">
                                <button
                                    type="button"
                                    className="button"
                                    onClick={handleFilterDate}
                                >
                                    Filtrar
                                </button>
                            </div>
                        </div>
                    ) : null}
                    {route?.length > 0 && canExecute("GET_ORDER_MAP") ? (
                        <div className="list-mobile-maps">
                            <a
                                href="/order-map"
                                className="button list-button-table list-button-icon"
                            >
                                <TbMapShare className="list-button-table-icon-big" />{" "}
                                Ver mapa
                            </a>
                        </div>
                    ) : null}
                    {ordersDeliveryAddress?.length > 0 ? (
                        <div className="list-mobile-maps">
                            <button
                                onClick={() => onOpenGenerateRoute()}
                                className="button list-button-table list-button-icon"
                            >
                                <TbTruckDelivery className="list-button-table-icon-big" />{" "}
                                Generar Mapa
                            </button>
                        </div>
                    ) : null}
                    {ordersDelivery?.length > 0 ? (
                        <div className="list-mobile-maps">
                            <button
                                onClick={() => onOpenChangeStates()}
                                className="button list-button-table list-button-icon"
                            >
                                <FaExchangeAlt className="list-button-table-icon-big" />{" "}
                                Cambiar estado
                            </button>
                        </div>
                    ) : null}
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
                            handleGenerateRoute={handleGenerateRoute}
                            isChecked={isChecked}
                            isMapInclude={isMapInclude}
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
    handleGenerateRoute,
    isChecked,
    isMapInclude,
}) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div
            className={`${
                isMapInclude(order?.Address?.id) ? "list-mobile-active" : ""
            } list-mobile-fields`}
        >
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
                                onClick={() => onOpenAssingDeliveryModal(order)}
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
                    {canExecute("GENERATE_ROUTE") ? (
                        <input
                            className="list-checkbox"
                            type="checkbox"
                            id={order?.id}
                            checked={isChecked(order)}
                            onChange={(e) =>
                                handleGenerateRoute(e.target.checked, order)
                            }
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
}
