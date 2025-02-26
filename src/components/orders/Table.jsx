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
import { FiMapPin } from "react-icons/fi";
import { BsCalendar2Date, BsFillCalendar2DateFill } from "react-icons/bs";
import { TbTruckDelivery, TbMapShare } from "react-icons/tb";

// COMPONENTS
import DatePicker from "react-datepicker";

// ZUSTAND
import { useLoginStore } from "src/zustand/loginStore";
import { useDeliveryStore } from "src/zustand/deliveryStore";

export default function Table({
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
    isChecked,
    onOpenCancelOrderModal,
    onOpenConfirmOrderModal,
    onOpenShowOrderModal,
    onOpenAssingDeliveryModal,
    onOpenGenerateRoute,
    ordersDeliveryAddress,
    ordersDelivery,
    handleGenerateRoute,
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
        <div className="list-container">
            <div className="list">
                <div className="list-header">
                    <h2 className="list-subtitle">Pedidos</h2>
                    <div className="list-filter">
                        {route?.length > 0 && canExecute("GET_ORDER_MAP") ? (
                            <a
                                href="/order-map"
                                className="button list-button-table list-button-icon"
                            >
                                <TbMapShare className="list-button-table-icon-big" />{" "}
                                Ver Mapa
                            </a>
                        ) : null}
                        {ordersDeliveryAddress?.length > 0 ? (
                            <button
                                onClick={() => onOpenGenerateRoute()}
                                className="button list-button-table list-button-icon"
                            >
                                <TbTruckDelivery className="list-button-table-icon-big" />{" "}
                                Generar Mapa
                            </button>
                        ) : null}
                        {ordersDelivery?.length > 0 ? (
                            <button
                                onClick={() => onOpenChangeStates()}
                                className="button list-button-table list-button-icon"
                            >
                                <FaExchangeAlt className="list-button-table-icon-big" />{" "}
                                Cambiar estado
                            </button>
                        ) : null}
                        {!advancedDates ? (
                            <div className="list-filter-date">
                                {/* FECHA */}
                                <div className="list-date-picker">
                                    <label>Fecha</label>
                                    <DatePicker
                                        selected={date}
                                        onChange={(date) => setDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        isClearable
                                        placeholderText="Selecciona una fecha"
                                        className="list-date"
                                    />
                                </div>
                                <p
                                    className="list-date-advanced"
                                    onClick={() => handleAdvancedDates(true)}
                                >
                                    <BsCalendar2Date className="list-date-advanced-icon" />
                                    <BsFillCalendar2DateFill className="list-date-advanced-icon" />
                                </p>
                                <button
                                    type="button"
                                    className="button"
                                    onClick={handleFilterDate}
                                >
                                    Filtrar
                                </button>
                            </div>
                        ) : null}
                        {advancedDates ? (
                            <div className="list-filter-dates">
                                {/* FECHA DESDE */}
                                <div className="list-date-picker">
                                    <label>Fecha Desde:</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        isClearable
                                        placeholderText="Selecciona una fecha"
                                        className="list-date"
                                        maxDate={endDate}
                                    />
                                </div>
                                {/* FECHA HASTA */}
                                <div className="list-date-picker">
                                    <label>Fecha Hasta:</label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        isClearable
                                        placeholderText="Selecciona una fecha"
                                        className="list-date"
                                        minDate={startDate}
                                    />
                                </div>
                                <p
                                    className="list-date-advanced"
                                    onClick={() => handleAdvancedDates(false)}
                                >
                                    <BsCalendar2Date className="list-date-advanced-icon" />
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
                                    <td>
                                        <div className="list-table-pines">
                                            {isMapInclude(
                                                order?.Address?.id
                                            ) ? (
                                                <FiMapPin
                                                    className="list-table-pin"
                                                    fontSize={20}
                                                />
                                            ) : null}

                                            {order?.id}
                                        </div>
                                    </td>
                                    <td>{formatDate(order?.createdAt)}</td>
                                    <td>{order?.amount}</td>
                                    <td>{formatPrice(order?.totalPrice)}</td>
                                    <td>
                                        {order?.Address?.address},{" "}
                                        {order?.Address?.city}
                                    </td>
                                    <td>
                                        <span
                                            className={`order-status order-status-table ${formatStatusColor(
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
                                                        onOpenAssingDeliveryModal(
                                                            order
                                                        )
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
                                        {canExecute("GENERATE_ROUTE") ? (
                                            <input
                                                className="list-checkbox"
                                                type="checkbox"
                                                id={order?.id}
                                                checked={isChecked(order)}
                                                onChange={(e) =>
                                                    handleGenerateRoute(
                                                        e.target.checked,
                                                        order
                                                    )
                                                }
                                            />
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
