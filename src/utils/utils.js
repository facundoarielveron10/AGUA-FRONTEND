export const haveArraysChanged = (originalArray, editedArray) => {
    if (originalArray.length !== editedArray.length) {
        return true;
    }

    const originalSorted = [...originalArray].sort();
    const editedSorted = [...editedArray].sort();

    for (let i = 0; i < originalSorted.length; i++) {
        if (originalSorted[i] !== editedSorted[i]) {
            return true;
        }
    }

    return false;
};

export const generateID = () => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 5; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return id;
};

export const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const formattedDate = `${day}/${month}/${year} ${hours}hs`;
    return formattedDate;
};

export const formatPrice = (price) => {
    if (price) {
        return price.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
        });
    }
};

export const formatStatus = (status) => {
    switch (status) {
        case "PENDING":
            return "Pendiente";
        case "ROAD":
            return "En Camino";
        case "DELIVERED":
            return "Entregado";
        case "CONFIRMED":
            return "Confirmado";
        case "CANCELLED":
            return "Cancelado";
        case "WAITING":
            return "En Espera";
        default:
            return "Desconocido";
    }
};

export const formatStatusColor = (status) => {
    switch (status) {
        case "PENDING":
            return "order-pending";
        case "ROAD":
            return "order-road";
        case "DELIVERED":
            return "order-delivered";
        case "CONFIRMED":
            return "order-confirmed";
        case "CANCELLED":
            return "order-cancelled";
        case "WAITING":
            return "order-waiting";
        default:
            return "order-unknown";
    }
};
