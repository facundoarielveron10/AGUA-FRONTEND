// CSS
import "react-responsive-modal/styles.css";

// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";
import { getRoles } from "../../utils/getData";

// COMPONENTS
import Spinner from "../Spinner";
import TableMobile from "./TableMobile";
import Table from "./Table";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// MODAL
import Modal from "react-responsive-modal";

// MEDIA QUERY
import { useMediaQuery } from "react-responsive";

export default function Roles() {
    // STATES
    const [roles, setRoles] = useState([]);
    const [open, setOpen] = useState(false);
    const [roleDelete, setRoleDelete] = useState({});

    // ZUSTAND
    const { canExecute, user, logout } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        getRolesData();
    }, []);

    // FUNCTIONS
    const getRolesData = async () => {
        const data = await getRoles();
        setRoles(data);
    };

    const onOpenDeleteRoleModal = (rol) => {
        setOpen(true);
        setRoleDelete(rol);
    };

    const onCloseDeleteRoleModal = () => {
        setOpen(false);
        setRoleDelete({});
    };

    const handleDeleteRole = async (e) => {
        e.preventDefault();

        try {
            const { data } = await clientAxios.post(
                "/role-action/delete-role",
                {
                    idRole: roleDelete.id,
                }
            );

            if (roleDelete.name === user.role.name) {
                logout();
            }

            toast.success(data);
            onCloseDeleteRoleModal();
            getRolesData();
        } catch (error) {
            toast.error(errorResponse(error));
            setRoleDelete({});
        }
    };

    const handleActive = async (id) => {
        try {
            const { data } = await clientAxios.post(
                "/role-action/active-role",
                {
                    idRole: id,
                }
            );

            toast.success(data);
            getRolesData();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    // RESPONSIVE
    const isDesktop = useMediaQuery({
        query: "(min-width: 768px)",
    });

    return (
        <>
            <Alert />
            <div className="roles">
                <h1 className="title">Listado de Roles</h1>
                <p className="paragraph">
                    En este Listado se puede ver todos los Roles que existen en
                    el sistema, donde tambien se puede crear nuevos roles
                </p>
                {roles.length === 0 ? (
                    <div className="roles-spinner">
                        <Spinner />
                    </div>
                ) : isDesktop ? (
                    <Table
                        roles={roles}
                        onOpenDeleteRoleModal={onOpenDeleteRoleModal}
                        handleActive={handleActive}
                    />
                ) : (
                    <TableMobile
                        roles={roles}
                        onOpenDeleteRoleModal={onOpenDeleteRoleModal}
                        handleActive={handleActive}
                    />
                )}
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={onCloseDeleteRoleModal}
                    center
                    classNames={{
                        overlay: "customOverlay",
                        modal: "customModal",
                        closeIcon: "customCloseIcon",
                    }}
                >
                    <form onSubmit={handleDeleteRole}>
                        <h2 className="roles-modal-title">
                            ¿Estas seguro de eliminar el rol?
                        </h2>
                        <div className="roles-modal-rol">
                            <p>
                                Nombre: <span>{roleDelete.name}</span>
                            </p>
                            <p>
                                Nombre descriptivo:{" "}
                                <span>{roleDelete.nameDescriptive}</span>
                            </p>
                            <p>
                                Descripcion:{" "}
                                <span>{roleDelete.description}</span>
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="button roles-delete roles-modal-button"
                        >
                            Eliminar Rol
                        </button>
                    </form>
                </Modal>
            </div>
            {canExecute("CREATE_ROLE") ? (
                <a href="create-role" className="roles-button button">
                    Crear Rol
                </a>
            ) : null}
        </>
    );
}
