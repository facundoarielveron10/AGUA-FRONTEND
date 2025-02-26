// UTILS
import { errorResponse } from "../../utils/error";

// REACT
import { useState, useEffect } from "react";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ALERTS
import Alert from "../Alert.jsx";
import { toast } from "react-toastify";

// COMPONENTS
import Spinner from "../Spinner.jsx";

export default function Edit({ id }) {
    // STATES
    const [addressEdit, setAddressEdit] = useState({});
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);

    // FUNCTIONS
    const getAddress = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.get(
                `/directions/address-id/${id}`
            );
            setAddressEdit(data);
            setAddress(data?.address);
            setCity(data?.city);
            setCountry(data?.country);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([address, city, country].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (
            addressEdit.address === address &&
            addressEdit.city === city &&
            addressEdit.country === country
        ) {
            toast.error("No se ha modificado ningun valor");
            return;
        }
        setLoading(true);
        try {
            const { data } = await clientAxios.post(
                `/directions/edit-address`,
                {
                    address,
                    city,
                    country,
                    directionId: addressEdit.id,
                }
            );

            toast.success(data.message);
            getAddress();
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    // EFFECTS
    useEffect(() => {
        getAddress();
    }, []);

    return (
        <>
            <Alert />
            <div className="createEditAddress">
                <h1 className="title">Edicion de Direccion</h1>
                <p className="paragraph">
                    Cambia los datos del siguiente formulario para editar la
                    direccion, donde se podra modificar la direccion, ciudad y
                    pais.
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
                            Editar direccion
                        </button>
                    </form>
                )}
            </div>
        </>
    );
}
