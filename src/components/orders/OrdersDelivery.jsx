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
import GenerateRouteModal from "../modal/GenerateRouteModal";

// ALERTS
import Alert from "../Alert";

// RESPONSIVE
import { useMediaQuery } from "react-responsive";

// ZUSTAND
import { useLoginStore } from "src/zustand/loginStore";

export default function OrdersDelivery() {
    // ZUSTAND
    const { user } = useLoginStore();

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
    const [ordersGenerateRoute, setOrdersGenerateRoute] = useState([]);
    const [openGenerateRoute, setOpenGenerateRoute] = useState(false);

    // FUNCTIONS
    const getOrders = async () => {
        try {
            setLoading(true);
            const { data } = await clientAxios.get(
                `/order/orders/orders-delivery/${user?.id}?page=${currentPage}&limit=${limit}&status=${selectedStatus}&startDate=${startDate}&endDate=${endDate}&date=${date}`
            );
            setOrders(data.orders);
            setTotalPages(data.totalPages);
        } catch (error) {
            errorResponse(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterDate = () => {
        getOrders();
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

    const handleAdvancedDates = (value) => {
        setDate(null);
        setStartDate(null);
        setEndDate(null);
        setAdvancedDates(value);
    };

    // FUNCTIONS
    const isChecked = (order) => {
        return ordersGenerateRoute.some(
            (orderData) => orderData?.id === order.id
        );
    };

    const handleGenerateRoute = (checked, order) => {
        if (checked) {
            setOrdersGenerateRoute([...ordersGenerateRoute, order]);
        } else {
            setOrdersGenerateRoute(
                ordersGenerateRoute.filter(
                    (orderData) => orderData.id !== order.id
                )
            );
        }
    };

    const onOpenGenerateRoute = () => {
        setOpenGenerateRoute(true);
    };

    const onCloseGenerateRoute = () => {
        setOpenGenerateRoute(false);
    };

    // RESPONSIVE
    const isDesktop = useMediaQuery({ query: "(min-width: 1080px)" });

    // EFFECTS
    useEffect(() => {
        getOrders();
    }, [currentPage, selectedStatus]);

    return (
        <>
            <Alert />
            <div className="orders">
                <h1 className="title">Administracion de Reparto de Pedidos</h1>
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
                                isChecked={isChecked}
                                ordersGenerateRoute={ordersGenerateRoute}
                                handleGenerateRoute={handleGenerateRoute}
                                onOpenGenerateRoute={onOpenGenerateRoute}
                            />
                        ) : (
                            <TableMobile
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
                                ordersGenerateRoute={ordersGenerateRoute}
                                handleGenerateRoute={handleGenerateRoute}
                                onOpenGenerateRoute={onOpenGenerateRoute}
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
            <GenerateRouteModal
                openGenerateRoute={openGenerateRoute}
                onCloseGenerateRoute={onCloseGenerateRoute}
                ordersGenerateRoute={ordersGenerateRoute}
            />
        </>
    );
}
