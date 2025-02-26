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
import Spinner from "../Spinner.jsx";

export default function Profile() {
    // STATES
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    // ZUSTAND
    const { user } = useLoginStore();

    // FUNCTIONS
    const resetValues = () => {
        setPassword("");
        setPasswordConfirm("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, lastname, email].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (
            name === userData?.name &&
            lastname === userData?.lastname &&
            email === userData?.email &&
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
                userId: user?.id,
                name,
                lastname,
                email,
                password,
                passwordConfirm,
            });

            toast.success(data);

            resetValues();
            await getUser();
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(true);
        }
    };

    const getUser = async () => {
        try {
            setLoading(true);
            const { data } = await clientAxios.get(`/user/user/${user?.id}`);

            setUserData(data);
            setName(data?.name);
            setLastname(data?.lastname);
            setEmail(data?.email);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    // EFFECTS
    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <Alert />
            <div className="profile">
                <h1 className="title">Perfil de Usuario</h1>
                <p className="paragraph">
                    Cambia los datos del siguiente formulario para editar tu
                    perfil, donde podemos cambiar los datos de nombre, apellido,
                    email y contraseña.
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

                        <button
                            className="profile-button form-submit button"
                            type="submit"
                        >
                            Editar Perfil
                        </button>
                    </form>
                )}
            </div>
        </>
    );
}
