// MODAL
import Modal from "react-responsive-modal";

// UTILS
import { formatDate, formatPrice } from "src/utils/utils";

export default function CancelOrderModal({
    cancelOrderModal,
    onCloseCancelOrderModal,
    handleCancelOrder,
    orderCancel,
}) {
    return (
        <div>
            <Modal
                open={cancelOrderModal}
                onClose={onCloseCancelOrderModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <form onSubmit={handleCancelOrder}>
                    <h2 className="modal-title">
                        ¿Estas seguro de cancelar la orden?
                    </h2>
                    <p className="modal-paragraph">
                        Numero: <span>{orderCancel?.id}</span>
                    </p>
                    <p className="modal-paragraph">
                        Fecha: <span>{formatDate(orderCancel?.createdAt)}</span>
                    </p>
                    <p className="modal-paragraph">
                        Cantidad: <span>{orderCancel?.amount}</span>
                    </p>
                    <p className="modal-paragraph">
                        Precio Total:{" "}
                        <span>{formatPrice(orderCancel?.totalPrice)}</span>
                    </p>
                    <p className="modal-paragraph">
                        Direccion:{" "}
                        <span>
                            {orderCancel?.Address?.address},{" "}
                            {orderCancel?.Address?.city}
                        </span>
                    </p>

                    <button
                        type="submit"
                        className="button modal-delete modal-button"
                    >
                        Cancelar Orden
                    </button>
                </form>
            </Modal>
        </div>
    );
}
