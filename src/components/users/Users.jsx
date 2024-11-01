// CSS
import "react-responsive-modal/styles.css";

// REACT
import { useEffect, useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// UTILS
import { errorResponse } from "../../utils/error";
import { getRoles } from "../../utils/getData";

// COMPONENTS
import Spinner from "../Spinner";
import Table from "./Table";
import Pagination from "../Pagination";
import Search from "../Search";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";
import ChangeRoleModal from "../modal/ChangeRoleModal";
import DeleteUserModal from "../modal/DeleteUserModal";

export default function Users() {
    // STATES
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userDelete, setUserDelete] = useState({});
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [openChangeModal, setOpenChangeModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [changeRole, setChangeRole] = useState({});
    const [newRole, setNewRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");

    // ZUSTAND
    const { user, logout, canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        const getRolesData = async () => {
            setLoading(true);
            const data = await getRoles();
            setRoles(data);
            setLoading(false);
        };

        getRolesData();
    }, []);

    useEffect(() => {
        getUsers();
    }, [currentPage, selectedRole]);

    // FUNCTIONS
    const getUsers = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.get(
                `/user/users?page=${currentPage}&limit=${limit}&role=${selectedRole}`
            );
            setUsers(data.users);
            setFilteredUsers(data.users);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setSelectedRole(role);
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const onOpenChangeRoleModal = (user) => {
        setChangeRole(user);
        setNewRole("");
        setOpenChangeModal(true);
    };

    const onCloseChangeRoleModal = () => {
        setChangeRole({});
        setNewRole("");
        setOpenChangeModal(false);
    };

    const onOpenDeleteUserModal = (user) => {
        setOpenDeleteModal(true);
        setUserDelete(user);
    };

    const onCloseDeleteUserModal = () => {
        setOpenDeleteModal(false);
        setUserDelete({});
    };

    const handleChangeRole = async (e) => {
        e.preventDefault();
        try {
            const { data: roleData } = await clientAxios.post(
                "/user/change-role",
                {
                    role: newRole,
                    userId: changeRole.id,
                }
            );

            toast.success(roleData);

            if (changeRole.id === user?.id) {
                logout();
            }

            onCloseChangeRoleModal();
            await getUsers();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleActive = async (id) => {
        try {
            const { data } = await clientAxios.post("/user/active-user", {
                userId: id,
            });

            toast.success(data);

            await getUsers();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleDeleteUser = async (e) => {
        e.preventDefault();
        try {
            const { data } = await clientAxios.post("/user/delete-user", {
                userId: userDelete?.id,
            });

            toast.success(data);
            onCloseDeleteUserModal();

            if (userDelete?.id === user?.id) {
                logout();
            }

            await getUsers();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.post(
                `/user/search-users?page=${currentPage}&limit=${limit}&role=${selectedRole}`,
                {
                    search,
                }
            );
            setUsers(data.users);
            setFilteredUsers(data.users);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
            setSearch("");
        }
    };

    return (
        <>
            <Alert />
            <div className="listUser">
                <h1 className="title">Listado de usuarios</h1>
                <p className="paragraph">
                    En este listado se pueden ver todos los usuarios registrados
                    en el sistema, donde también se puede cambiarle los roles a
                    los mismos.
                </p>

                {loading ? (
                    <div className="listUser-spinner">
                        <Spinner />
                    </div>
                ) : (
                    <div className="listUser-users">
                        <Search
                            handleSearch={handleSearch}
                            handleClean={getUsers}
                            search={search}
                            setSearch={setSearch}
                        />
                        <Table
                            users={filteredUsers}
                            onOpenChangeRoleModal={onOpenChangeRoleModal}
                            onOpenDeleteUserModal={onOpenDeleteUserModal}
                            handleRoleChange={handleRoleChange}
                            handleActive={handleActive}
                            selectedRole={selectedRole}
                            roles={roles}
                        />
                        {filteredUsers.length > 0 ? (
                            <Pagination
                                handleNextPage={handleNextPage}
                                handlePreviousPage={handlePreviousPage}
                                currentPage={currentPage}
                                totalPages={totalPages}
                            />
                        ) : null}
                    </div>
                )}
            </div>
            <ChangeRoleModal
                openChangeModal={openChangeModal}
                onCloseChangeRoleModal={onCloseChangeRoleModal}
                handleChangeRole={handleChangeRole}
                role={changeRole}
                roles={roles}
                newRole={newRole}
                setNewRole={setNewRole}
            />
            <DeleteUserModal
                openDeleteModal={openDeleteModal}
                onCloseDeleteUserModal={onCloseDeleteUserModal}
                handleDeleteUser={handleDeleteUser}
                user={userDelete}
            />
            {canExecute("CREATE_USER") ? (
                <a href="create-user" className="listUser-button button">
                    Crear usuario
                </a>
            ) : null}
        </>
    );
}
