// ZUSTAND
import { useLoginStore } from "src/zustand/loginStore";

// COMPONENTS
import CreateOrder from "../orders/CreateOrder";
import Orders from "../orders/Orders";

export default function Home() {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="home">
            <div className="home-container">
                {/* CREACION DE PEDIDOS */}
                {canExecute("CREATE_ORDER") && <CreateOrder />}
                {/* PEDIDOS */}
                {canExecute("ADMIN_ORDERS") && <Orders />}
            </div>
        </div>
    );
}
