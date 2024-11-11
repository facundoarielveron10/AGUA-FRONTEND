// ZUSTAND
import { useLoginStore } from "src/zustand/loginStore";

// COMPONENTS
import CreateOrder from "../orders/CreateOrder";
import OrdersAdmin from "../orders/OrdersAdmin";
import OrdersDelivery from "../orders/OrdersDelivery";

export default function Home() {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="home">
            <div className="home-container">
                {/* CREACION DE PEDIDOS */}
                {canExecute("CREATE_ORDER") && <CreateOrder />}
                {/* PEDIDOS ADMINISTRADOR */}
                {canExecute("ADMIN_ORDERS") && <OrdersAdmin />}
                {/* PEDIDOS REPARTIDOR */}
                {canExecute("DELIVERY_ORDERS") && <OrdersDelivery />}
            </div>
        </div>
    );
}
