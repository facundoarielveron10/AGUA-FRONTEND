// UTILS
import { errorResponse } from "../../utils/error";
import { getRoles } from "../../utils/getData.js";

// REACT
import { useEffect, useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert.jsx";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore.js";

// COMPONENTS
import Spinner from "../Spinner.jsx";

export default function Edit({ id }) {
    // STATES
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [role, setRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    // ZUSTAND
    const { user, logout } = useLoginStore();

    // FUNCTIONS
    const resetValues = () => {
        setPassword("");
        setPasswordConfirm("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, lastname, email, role].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (
            name === userData?.name &&
            lastname === userData?.lastname &&
            email === userData?.email &&
            role === userData?.Role?.name &&
            password === "" &&
            passwordConfirm === ""
        ) {
            toast.error("No se han realizado cambios");
            return;
        }

        if (password !== passwordConfirm) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        try {
            setLoading(true);
            const { data } = await clientAxios.post("/user/edit-user", {
                userId: id,
                name,
                lastname,
                email,
                password,
                passwordConfirm,
                role,
            });

            toast.success(data);

            if (Number(id) === Number(user?.id) && role !== user?.role?.name) {
                logout();
            }

            resetValues();
            await getUser();
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    const getUser = async () => {
        try {
            setLoading(true);
            const { data } = await clientAxios.get(`/user/user/${id}`);

            setUserData(data);
            setName(data?.name);
            setLastname(data?.lastname);
            setEmail(data?.email);
            setRole(data?.Role?.name);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    // EFFECTS
    useEffect(() => {
        const getRolesData = async () => {
            const data = await getRoles();

            setRoles(data);
        };

        getRolesData();
        getUser();
    }, []);

    return (
        <>
            <Alert />
            <div className="createEditUser">
                <h1 className="title">Edicion de Usuario</h1>
                <p className="paragraph">
                    Cambia los datos del siguiente formulario para editar el
                    usuario, donde podemos cambiar los datos de nombre,
                    apellido, email, contraseña y rol del usuario.
                </p>
                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <form className="form" onSubmit={handleSubmit}>
                        {/* NAME */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">
                                Nombre
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {/* LASTNAME */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="lastname">
                                Apellido
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                id="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                        {/* EMAIL */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* PASSWORD */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                className="form-input"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {/* PASSWORD CONFIRM */}
                        <div className="form-group">
                            <label
                                className="form-label"
                                htmlFor="passwordConfirm"
                            >
                                Repetir Contraseña
                            </label>
                            <input
                                className="form-input"
                                type="password"
                                id="passwordConfirm"
                                value={passwordConfirm}
                                onChange={(e) =>
                                    setPasswordConfirm(e.target.value)
                                }
                            />
                        </div>
                        {/* ROL DEL USUARIO */}
                        <div className="form-group createEditUser-select">
                            <label
                                className="form-label"
                                htmlFor="passwordConfirm"
                            >
                                Rol del usuario
                            </label>
                            <select
                                className="form-input"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option
                                    disabled
                                    className="createEditUser-option"
                                    value=""
                                >
                                    Seleccionar Rol
                                </option>
                                {roles.length > 0
                                    ? roles.map((rol) => (
                                          <option
                                              key={rol?.id}
                                              className="createEditUser-option"
                                              value={rol?.name}
                                          >
                                              {rol?.nameDescriptive}
                                          </option>
                                      ))
                                    : null}
                            </select>
                        </div>

                        <button
                            className="createEditUser-button form-submit button"
                            type="submit"
                        >
                            Editar usuario
                        </button>
                    </form>
                )}
            </div>
        </>
    );
}
