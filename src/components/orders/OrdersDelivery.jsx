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
import ChangeStateOrders from "../modal/ChangeStateOrders";

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
    const [ordersDeliveryAddress, setOrdersDeliveryAddress] = useState([]);
    const [ordersDelivery, setOrdersDelivery] = useState([]);
    const [openGenerateRoute, setOpenGenerateRoute] = useState(false);
    const [openChangeStates, setOpenChangeStates] = useState(false);

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
        return (
            ordersDelivery.some((orderData) => orderData?.id === order.id) &&
            ordersDeliveryAddress.some(
                (orderData) => orderData?.id === order.Address.id
            )
        );
    };

    const handleGenerateRoute = (checked, order) => {
        if (checked) {
            setOrdersDelivery([...ordersDelivery, order]);
            setOrdersDeliveryAddress([
                ...ordersDeliveryAddress,
                order?.Address,
            ]);
        } else {
            setOrdersDelivery(
                ordersDelivery.filter((orderData) => orderData.id !== order.id)
            );
            setOrdersDeliveryAddress(
                ordersDeliveryAddress.filter(
                    (orderData) => orderData?.id !== order?.Address?.id
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

    const onOpenChangeStates = () => {
        setOpenChangeStates(true);
    };

    const onCloseChangeStates = () => {
        setOpenChangeStates(false);
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
                    <div className="spinner">
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
                                ordersDelivery={ordersDelivery}
                                ordersDeliveryAddress={ordersDeliveryAddress}
                                handleGenerateRoute={handleGenerateRoute}
                                onOpenGenerateRoute={onOpenGenerateRoute}
                                onOpenChangeStates={onOpenChangeStates}
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
                                ordersDeliveryAddress={ordersDeliveryAddress}
                                handleGenerateRoute={handleGenerateRoute}
                                onOpenGenerateRoute={onOpenGenerateRoute}
                                isChecked={isChecked}
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
                ordersDeliveryAddress={ordersDeliveryAddress}
            />
            <ChangeStateOrders
                openChangeStates={openChangeStates}
                onCloseChangeStates={onCloseChangeStates}
                ordersDelivery={ordersDelivery}
                statuses={getStatuses()}
            />
        </>
    );
}
