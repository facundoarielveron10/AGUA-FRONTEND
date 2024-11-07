// REACT
import { useState, useEffect } from "react";

// ALERT
import { toast } from "react-toastify";

// ZUSTAND
import { useLoginStore } from "src/zustand/loginStore";

// UTILS
import { getAddress } from "src/utils/getData";
import { errorResponse } from "src/utils/error";

// AXIOS
import clientAxios from "src/config/ClientAxios";

// COMPONENTS
import Alert from "../Alert";

export default function CreateOrder() {
    // STATES
    const [directions, setDirections] = useState([]);
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);

    // ZUSTAND
    const { canExecute, user } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        if (!canExecute("GET_ADDRESS")) {
            return;
        }

        getAddress(user?.id).then((data) => {
            setDirections(data);
        });
    }, []);

    // FUNCTIONS
    const resetValues = () => {
        setAddress("");
        handleChangeAmount(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (address === "" || amount <= 0 || price <= 0) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        try {
            const { data } = await clientAxios.post("/order/create-order", {
                amount,
                totalPrice: price,
                addressId: address,
                userId: user?.id,
            });

            toast.success(data);
            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleChangeAmount = (amount) => {
        const totalPrice = amount * 50;

        setAmount(amount);
        setPrice(totalPrice);
    };

    return (
        <>
            <Alert />
            <div className="order">
                <div className="order-header">
                    <h1 className="title">Realizar Pedido</h1>
                    <p className="paragraph">
                        En esta sección de la aplicación, los usuarios pueden
                        realizar pedidos de bidones de agua. El formulario
                        permite seleccionar la dirección de entrega de una lista
                        desplegable, especificar la cantidad de bidones
                        deseados, y automáticamente calcula y muestra el precio
                        total del pedido. Una vez completado el formulario, el
                        usuario puede enviar el pedido presionando el botón
                        "Realizar Pedido".
                    </p>
                </div>
                <div className="order-content">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label className="form-label" htmlFor="address">
                                Dirección de entrega:
                            </label>
                            <div className="form-select-container">
                                <select
                                    onChange={(e) => setAddress(e.target.value)}
                                    id="address"
                                    value={address}
                                    className="form-select"
                                >
                                    <option value="">
                                        Seleccione una dirección
                                    </option>
                                    {directions.map((direction, index) => (
                                        <option
                                            key={index}
                                            value={direction.id}
                                        >
                                            {direction.address}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="amount">
                                Cantidad de bidones:
                            </label>
                            <input
                                type="number"
                                id="amount"
                                className="form-input"
                                min="1"
                                value={amount}
                                onChange={(e) =>
                                    handleChangeAmount(e.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="price">
                                Precio Total:
                            </label>
                            <input
                                type="price"
                                id="precio"
                                className="form-input"
                                value={`S/ ${price}`}
                                readOnly
                            />
                        </div>

                        <div className="form-submit">
                            <button type="submit" className="button">
                                Realizar Pedido
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
