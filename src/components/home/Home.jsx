// ZUSTAND
import { useLoginStore } from "src/zustand/loginStore";

export default function Home() {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="home">
            <div className="home-container">
                {/* PEDIDOS */}
                {canExecute("CREATE_ORDER") && (
                    <div className="home-order">
                        <div className="home-order-header">
                            <h1 className="title">Realizar Pedido</h1>
                            <p className="paragraph">
                                En esta sección de la aplicación, los usuarios
                                pueden realizar pedidos de bidones de agua. El
                                formulario permite seleccionar la dirección de
                                entrega de una lista desplegable, especificar la
                                cantidad de bidones deseados, y automáticamente
                                calcula y muestra el precio total del pedido.
                                Una vez completado el formulario, el usuario
                                puede enviar el pedido presionando el botón
                                "Realizar Pedido".
                            </p>
                        </div>
                        <div className="home-order-content">
                            <form className="form">
                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        htmlFor="address"
                                    >
                                        Dirección de entrega:
                                    </label>
                                    <div className="form-select-container">
                                        <select
                                            id="address"
                                            className="form-select"
                                            required
                                        >
                                            <option value="">
                                                Seleccione una dirección
                                            </option>
                                            <option value="dir1">
                                                Francia 1640
                                            </option>
                                            <option value="dir2">
                                                Rio Negro 450
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        htmlFor="amount"
                                    >
                                        Cantidad de bidones:
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        className="form-input"
                                        min="1"
                                        required
                                        onChange={(e) => {
                                            const cantidad = e.target.value;
                                            const precioTotal = cantidad * 50;
                                            document.getElementById(
                                                "precio"
                                            ).value = `S/ ${precioTotal.toFixed(
                                                2
                                            )}`;
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        htmlFor="price"
                                    >
                                        Precio Total:
                                    </label>
                                    <input
                                        type="price"
                                        id="precio"
                                        className="form-input"
                                        value="S/ 0.00"
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
                )}
            </div>
        </div>
    );
}
