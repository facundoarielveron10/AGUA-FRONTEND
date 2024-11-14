// REACT
import { useEffect, useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// UTILS
import { errorResponse } from "../../utils/error";
import { getStatuses } from "src/utils/getData";

// COMPONENTS
import Spinner from "../Spinner";
import Pagination from "../Pagination";
import Table from "./Table";
import TableMobile from "./TableMobile";
import CancelOrderModal from "../modal/CancelOrderModal";
import ConfirmOrderModal from "../modal/ConfirmOrderModal";
import ShowOrderModal from "../modal/ShowOrderModal";
import AssingDeliveryModal from "../modal/AssingDeliveryModal";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// RESPONSIVE
import { useMediaQuery } from "react-responsive";

export default function OrdersAdmin() {
    // STATES
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [advancedDates, setAdvancedDates] = useState(false);
    const [date, setDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [limit] = useState(10);
    const [cancelOrderModal, setCancelOrderModal] = useState(false);
    const [confirmOrderModal, setConfirmOrderModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [assingDeliveryModal, setAssingDeliveryModal] = useState(false);
    const [order, setOrder] = useState();
    const [delivery, setDelivery] = useState("");

    // EFFECTS
    useEffect(() => {
        getOrders();
    }, [currentPage, selectedStatus]);

    // FUNCTIONS
    const getOrders = async () => {
        try {
            setLoading(true);
            const { data } = await clientAxios.get(
                `/order/orders?page=${currentPage}&limit=${limit}&status=${selectedStatus}`
            );
            setOrders(data.orders);
            setTotalPages(data.totalPages);
        } catch (error) {
            errorResponse(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async (e) => {
        e.preventDefault();
        try {
            const { data } = await clientAxios.post("/order/cancel-order", {
                orderId: order?.id,
            });

            toast.success(data);
            getOrders();
            onCloseCancelOrderModal();
        } catch (error) {
            errorResponse(error);
        }
    };

    const handleConfirmOrder = async (e) => {
        e.preventDefault();

        try {
            const { data } = await clientAxios.post("/order/confirm-order", {
                orderId: order?.id,
            });

            toast.success(data);
            getOrders();
            onCloseConfirmOrderModal();
        } catch (error) {
            errorResponse(error);
        }
    };

    const handleAssingDelivery = async (e) => {
        e.preventDefault();

        if (!delivery) {
            toast.error("Debes seleccionar un repartidor");
            return;
        }

        try {
            const { data } = await clientAxios.post("/order/assing-delivery", {
                orderId: order?.id,
                deliveryId: delivery,
            });

            toast.success(data);
            getOrders();
            onCloseAssingDeliveryModal();
        } catch (error) {
            errorResponse(error);
        }
    };

    const handleFilterDate = () => {
        getOrders();
    };

    const handleAdvancedDates = (value) => {
        setDate(null);
        setStartDate(null);
        setEndDate(null);
        setAdvancedDates(value);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const onOpenCancelOrderModal = (order) => {
        setOrder(order);
        setCancelOrderModal(true);
    };

    const onCloseCancelOrderModal = () => {
        setOrder({});
        setCancelOrderModal(false);
    };

    const onOpenConfirmOrderModal = (order) => {
        setOrder(order);
        setConfirmOrderModal(true);
    };

    const onCloseConfirmOrderModal = () => {
        setOrder({});
        setConfirmOrderModal(false);
    };

    const onOpenShowOrderModal = (order) => {
        setOrder(order);
        setShowOrderModal(true);
    };

    const onCloseShowOrderModal = () => {
        setOrder({});
        setShowOrderModal(false);
    };

    const onOpenAssingDeliveryModal = (order) => {
        setOrder(order);
        setAssingDeliveryModal(true);
    };

    const onCloseAssingDeliveryModal = () => {
        setOrder({});
        setAssingDeliveryModal(false);
    };

    // RESPONSIVE
    const isDesktop = useMediaQuery({ query: "(min-width: 1080px)" });

    return (
        <>
            <Alert />
            <div className="orders">
                <h1 className="title">Administracion de Pedidos</h1>
                <p className="paragraph">
                    En este listado se pueden ver todos los pedidos realizados
                    por los usuarios
                </p>

                {loading ? (
                    <div className="orders-spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div className="orders-list">
                        {isDesktop ? (
                            <Table
                                orders={orders}
                                statuses={getStatuses()}
                                selectedStatus={selectedStatus}
                                handleStatusChange={handleStatusChange}
                                advancedDates={advancedDates}
                                handleAdvancedDates={handleAdvancedDates}
                                date={date}
                                setDate={setDate}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                handleFilterDate={handleFilterDate}
                                onOpenCancelOrderModal={onOpenCancelOrderModal}
                                onOpenConfirmOrderModal={
                                    onOpenConfirmOrderModal
                                }
                                onOpenShowOrderModal={onOpenShowOrderModal}
                                onOpenAssingDeliveryModal={
                                    onOpenAssingDeliveryModal
                                }
                            />
                        ) : (
                            <TableMobile
                                orders={orders}
                                statuses={getStatuses()}
                                selectedStatus={selectedStatus}
                                handleStatusChange={handleStatusChange}
                                onOpenCancelOrderModal={onOpenCancelOrderModal}
                                onOpenConfirmOrderModal={
                                    onOpenConfirmOrderModal
                                }
                                onOpenShowOrderModal={onOpenShowOrderModal}
                                onOpenAssingDeliveryModal={
                                    onOpenAssingDeliveryModal
                                }
                            />
                        )}

                        {orders.length > 0 ? (
                            <Pagination
                                handleNextPage={handleNextPage}
                                handlePreviousPage={handlePreviousPage}
                                currentPage={currentPage}
                                totalPages={totalPages}
                            />
                        ) : null}
                    </div>
                )}
            </div>
            <CancelOrderModal
                cancelOrderModal={cancelOrderModal}
                onCloseCancelOrderModal={onCloseCancelOrderModal}
                handleCancelOrder={handleCancelOrder}
                orderCancel={order}
            />
            <ConfirmOrderModal
                confirmOrderModal={confirmOrderModal}
                onCloseConfirmOrderModal={onCloseConfirmOrderModal}
                handleConfirmOrder={handleConfirmOrder}
                orderConfirm={order}
            />
            <ShowOrderModal
                showOrderModal={showOrderModal}
                onCloseShowOrderModal={onCloseShowOrderModal}
                orderShow={order}
            />
            <AssingDeliveryModal
                assingDeliveryModal={assingDeliveryModal}
                onCloseAssingDeliveryModal={onCloseAssingDeliveryModal}
                handleAssingDelivery={handleAssingDelivery}
                delivery={delivery}
                setDelivery={setDelivery}
            />
        </>
    );
}
