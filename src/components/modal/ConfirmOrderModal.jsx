// MODAL
import Modal from "react-responsive-modal";

// UTILS
import { formatDate, formatPrice } from "src/utils/utils";

export default function ConfirmOrderModal({
    confirmOrderModal,
    onCloseConfirmOrderModal,
    handleConfirmOrder,
    orderConfirm,
}) {
    return (
        <div>
            <Modal
                open={confirmOrderModal}
                onClose={onCloseConfirmOrderModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <form onSubmit={handleConfirmOrder}>
                    <h2 className="modal-title">
                        ¿Estas seguro de confirmar la orden?
                    </h2>
                    <p className="modal-paragraph">
                        Numero: <span>{orderConfirm?.id}</span>
                    </p>
                    <p className="modal-paragraph">
                        Fecha:{" "}
                        <span>{formatDate(orderConfirm?.createdAt)}</span>
                    </p>
                    <p className="modal-paragraph">
                        Cantidad: <span>{orderConfirm?.amount}</span>
                    </p>
                    <p className="modal-paragraph">
                        Precio Total:{" "}
                        <span>{formatPrice(orderConfirm?.totalPrice)}</span>
                    </p>
                    <p className="modal-paragraph">
                        Direccion:{" "}
                        <span>
                            {orderConfirm?.Address?.address},{" "}
                            {orderConfirm?.Address?.city}
                        </span>
                    </p>

                    <button
                        type="submit"
                        className="button modal-confirm modal-button"
                    >
                        Confirmar Orden
                    </button>
                </form>
            </Modal>
        </div>
    );
}
