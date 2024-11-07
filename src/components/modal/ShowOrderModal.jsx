// MODAL
import Modal from "react-responsive-modal";

// UTILS
import { formatDate, formatPrice } from "src/utils/utils";

export default function ShowOrderModal({
    showOrderModal,
    onCloseShowOrderModal,
    orderShow,
}) {
    return (
        <div>
            <Modal
                open={showOrderModal}
                onClose={onCloseShowOrderModal}
                center
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeIcon: "customCloseIcon",
                }}
            >
                <div>
                    <h2 className="modal-title">Detalles de la Orden</h2>
                    <p className="modal-paragraph">
                        Numero: <span>{orderShow?.id}</span>
                    </p>
                    <p className="modal-paragraph">
                        Fecha: <span>{formatDate(orderShow?.createdAt)}</span>
                    </p>
                    <p className="modal-paragraph">
                        Cantidad: <span>{orderShow?.amount}</span>
                    </p>
                    <p className="modal-paragraph">
                        Precio Total:{" "}
                        <span>{formatPrice(orderShow?.totalPrice)}</span>
                    </p>
                    <p className="modal-paragraph">
                        Direccion:{" "}
                        <span>
                            {orderShow?.Address?.address},{" "}
                            {orderShow?.Address?.city}
                        </span>
                    </p>
                    <p className="modal-paragraph">
                        Nombre Completo del Cliente:{" "}
                        <span>{orderShow?.User?.name}</span>{" "}
                        <span>{orderShow?.User?.lastname}</span>
                    </p>
                    <p className="modal-paragraph">
                        Email del Cliente: <span>{orderShow?.User?.email}</span>
                    </p>
                </div>
            </Modal>
        </div>
    );
}
