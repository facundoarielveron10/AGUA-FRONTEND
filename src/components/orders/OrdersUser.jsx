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

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// RESPONSIVE
import { useMediaQuery } from "react-responsive";

export default function OrdersUser() {
    // STATES
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);
    const [cancelOrderModal, setCancelOrderModal] = useState(false);
    const [orderCancel, setOrderCancel] = useState({});

    // ZUSTAND
    const { user } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        getOrders();
    }, [currentPage, selectedStatus]);

    // FUNCTIONS
    const getOrders = async () => {
        try {
            setLoading(true);
            const { data } = await clientAxios.get(
                `/order/orders/${user?.id}?page=${currentPage}&limit=${limit}&status=${selectedStatus}`
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
                orderId: orderCancel?.id,
            });

            toast.success(data);
            getOrders();
            onCloseCancelOrderModal();
        } catch (error) {
            errorResponse(error);
        }
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
        setOrderCancel(order);
        setCancelOrderModal(true);
    };

    const onCloseCancelOrderModal = () => {
        setOrderCancel({});
        setCancelOrderModal(false);
    };

    // RESPONSIVE
    const isDesktop = useMediaQuery({ query: "(min-width: 1080px)" });

    return (
        <>
            <Alert />
            <div className="orders">
                <h1 className="title">Mis Pedidos</h1>
                <p className="paragraph">
                    En este listado se pueden ver todos los pedidos realizados
                    por el usuario.
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
                                onOpenCancelOrderModal={onOpenCancelOrderModal}
                            />
                        ) : (
                            <TableMobile
                                orders={orders}
                                statuses={getStatuses()}
                                selectedStatus={selectedStatus}
                                handleStatusChange={handleStatusChange}
                                onOpenCancelOrderModal={onOpenCancelOrderModal}
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
                orderCancel={orderCancel}
            />
        </>
    );
}
