// TOAST
import { toast } from "react-toastify";

// UTILS
import { errorResponse } from "./error";

// AXIOS
import clientAxios from "../config/ClientAxios";

export const getTypeActions = () => {
    const types = ["Usuarios", "Roles", "Pedidos"];

    return types;
};

export const getSections = () => {
    const sections = [
        {
            title: "Usuarios",
            description:
                "En esta sección podrás gestionar todos los usuarios del sistema. Puedes crear nuevos usuarios, editar sus datos, asignar roles y permisos, y mantener un control de su actividad dentro de la plataforma. Asegúrate de que cada usuario tenga las credenciales adecuadas para acceder a las funcionalidades necesarias.",
            url: `/users`,
            permission: "GET_USERS",
        },
        {
            title: "Roles",
            description:
                "Define y gestiona los roles dentro de tu organización. Aquí puedes establecer diferentes niveles de acceso para los usuarios, asegurando que cada persona tenga los permisos adecuados para realizar sus tareas. Los roles permiten personalizar la experiencia del usuario y garantizar la seguridad del sistema.",
            url: `/roles`,
            permission: "GET_ROLES",
        },
    ];

    return sections;
};

export const getRoles = async () => {
    try {
        const { data } = await clientAxios.get("/role-action/roles");

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getActions = async (currentPage, limit, selectedType) => {
    try {
        const { data } = await clientAxios.get(
            `/role-action/actions?page=${currentPage}&limit=${limit}&type=${selectedType}`
        );

        return data;
    } catch (error) {
        toast.error(errorResponse(error));
    }
};

export const getDateNow = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
};
