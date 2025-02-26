// UTILS
import { errorResponse } from "../../utils/error";

// REACT
import { useState } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ALERTS
import Alert from "../Alert.jsx";
import { toast } from "react-toastify";

// ZUSTAND
import { useLoginStore } from "src/zustand/loginStore.js";

// COMPONENTS
import Spinner from "../Spinner.jsx";

export default function Create() {
    // STATES
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);

    // ZUSTAND
    const { user } = useLoginStore();

    // FUNCTIONS
    const resetValues = () => {
        setAddress("");
        setCity("");
        setCountry("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([address, city, country].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }
        setLoading(true);
        try {
            const { data } = await clientAxios.post(
                "/directions/create-address",
                {
                    address,
                    city,
                    country,
                    userId: user?.id,
                    delivery: true,
                }
            );
            toast.success(data?.message);
            resetValues();
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Alert />
            <div className="createEditAddress">
                <h1 className="title">Creacion de Direccion</h1>
                <p className="paragraph">
                    Completa el siguiente formulario para crear una nueva
                    direccion, donde deberas colocar la direccion, ciudad y pais
                    de la nueva direccion.
                </p>
                {loading ? (
                    <div className="spinner">
                        <Spinner />
                    </div>
                ) : (
                    <form className="form" onSubmit={handleSubmit}>
                        {/* NAME */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="address">
                                Direccion
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        {/* LASTNAME */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="city">
                                Ciudad
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        {/* EMAIL */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="country">
                                Pais
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                        <button
                            className="createEditAddress-button form-submit button"
                            type="submit"
                        >
                            Crear direccion
                        </button>
                    </form>
                )}
            </div>
        </>
    );
}
