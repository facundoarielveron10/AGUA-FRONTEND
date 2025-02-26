// REACT
import { useEffect, useState } from "react";

// ICONS
import { IoIosAdd } from "react-icons/io";
import { MdLocationPin, MdModeEdit, MdDelete } from "react-icons/md";

// UTILS
import { errorResponse } from "src/utils/error";
import { getAddress } from "src/utils/getData";

// COMPONENTS
import CreateAddressModal from "../modal/CreateAddressModal";
import EditAddressModal from "../modal/EditAddressModal";
import DeleteAddressModal from "../modal/DeleteAddressModal";

// ALERTS
import { toast } from "react-toastify";

// AXIOS
import clientAxios from "src/config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "src/zustand/loginStore";

export default function Address() {
    // STATES
    const [directions, setDirections] = useState([]);
    const [direction, setDirection] = useState({});
    const [address, setAddress] = useState([]);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [modalCreateAddress, setModalCreateAddress] = useState(false);
    const [modalEditAddress, setModalEditAddress] = useState(false);
    const [modalDeleteAddress, setModalDeleteAddress] = useState(false);
    const [loading, setLoading] = useState(false);

    // ZUSTAND
    const { user, canExecute } = useLoginStore();

    // FUNCTIONS
    const resetValues = () => {
        setAddress("");
        setCity("");
        setCountry("");
    };

    const onOpenCreateAddressModal = () => {
        setModalCreateAddress(true);
    };

    const onOpenEditAddressModal = (direction) => {
        setModalEditAddress(true);
        setDirection(direction);
        setAddress(direction.address);
        setCity(direction.city);
        setCountry(direction.country);
    };

    const onOpenDeleteAddressModal = (direction) => {
        setModalDeleteAddress(true);
        setDirection(direction);
    };

    const onCloseCreateAddressModal = () => {
        setModalCreateAddress(false);
    };

    const onCloseEditAddressModal = () => {
        setModalEditAddress(false);
        setDirection({});
        resetValues();
    };

    const onCloseDeleteAddressModal = () => {
        setModalDeleteAddress(false);
        setDirection({});
    };

    const handleCreateAddress = async (e) => {
        e.preventDefault();

        if ([address, city, country].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (directions.length >= 3) {
            toast.error("El Usuario ya tiene 3 direcciones");
            return;
        }

        try {
            const { data } = await clientAxios.post(
                "/directions/create-address",
                {
                    address,
                    city,
                    country,
                    userId: user?.id,
                }
            );

            setDirections([...directions, data.newAddress]);
            toast.success(data.message);
            resetValues();
            onCloseCreateAddressModal();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleEditAddress = async (e) => {
        e.preventDefault();

        if ([address, city, country].includes("")) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (
            direction.address === address &&
            direction.city === city &&
            direction.country === country
        ) {
            toast.error("No se ha modificado ningun valor");
            return;
        }

        try {
            const { data } = await clientAxios.post(
                `/directions/edit-address`,
                {
                    address,
                    city,
                    country,
                    directionId: direction.id,
                }
            );

            setDirections((prevDirections) =>
                prevDirections.map((dir) =>
                    dir.id === direction.id
                        ? { ...dir, address, city, country }
                        : dir
                )
            );

            toast.success(data.message);
            resetValues();
            onCloseEditAddressModal();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const handleDeleteAddress = async (e) => {
        e.preventDefault();

        try {
            const { data } = await clientAxios.post(
                `/directions/delete-address`,
                {
                    directionId: direction.id,
                }
            );

            setDirections((prevDirections) =>
                prevDirections.filter((dir) => dir.id !== direction.id)
            );

            toast.success(data);
            onCloseDeleteAddressModal();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    // EFFECTS
    useEffect(() => {
        getAddress(user?.id).then((data) => {
            setDirections(data);
        });
    }, []);

    return (
        <div className="address">
            <h1 className="title">Mis Direcciones de Envio</h1>
            <p className="paragraph">
                Aquí podrás gestionar tus direcciones, donde podrás agregar,
                editar y eliminar tus direcciones.
            </p>
            <div className="address-list">
                <div className="list-mobile-container">
                    <div className="list-mobile-header">
                        <h2 className="list-mobile-subtitle">Direcciones</h2>
                    </div>

                    <div className="list-mobile">
                        {directions.length > 0 ? (
                            directions.map((direction, index) => (
                                <AddressCard
                                    key={index}
                                    direction={direction}
                                    onOpenEditAddressModal={
                                        onOpenEditAddressModal
                                    }
                                    onOpenDeleteAddressModal={
                                        onOpenDeleteAddressModal
                                    }
                                />
                            ))
                        ) : (
                            <div className="list-no-data">
                                No hay ninguna dirección
                            </div>
                        )}
                        {canExecute("CREATE_ADDRESS") &&
                            directions.length <= 3 && (
                                <button
                                    type="button"
                                    className="address-add"
                                    onClick={onOpenCreateAddressModal}
                                >
                                    <IoIosAdd className="address-add-icon" />
                                </button>
                            )}
                    </div>
                </div>
            </div>
            <CreateAddressModal
                openCreateAddressModal={modalCreateAddress}
                onCloseCreateAddressModal={onCloseCreateAddressModal}
                handleCreateAddress={handleCreateAddress}
                address={address}
                setAddress={setAddress}
                city={city}
                setCity={setCity}
                country={country}
                setCountry={setCountry}
            />
            <EditAddressModal
                openEditAddressModal={modalEditAddress}
                onCloseEditAddressModal={onCloseEditAddressModal}
                handleEditAddress={handleEditAddress}
                address={address}
                setAddress={setAddress}
                city={city}
                setCity={setCity}
                country={country}
                setCountry={setCountry}
            />
            <DeleteAddressModal
                deleteAddressModal={modalDeleteAddress}
                onCloseDeleteAddressModal={onCloseDeleteAddressModal}
                handleDeleteAddress={handleDeleteAddress}
                addressDelete={direction}
            />
        </div>
    );
}

function AddressCard({
    direction,
    onOpenEditAddressModal,
    onOpenDeleteAddressModal,
}) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="list-mobile-fields">
            <div className="list-mobile-field">
                <span className="list-mobile-label">Direccion:</span>
                <span className="list-mobile-value">{direction?.address}</span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Ciudad:</span>
                <span className="list-mobile-value">{direction?.city}</span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Pais:</span>
                <span className="list-mobile-value">{direction?.country}</span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Acciones:</span>
                <div className="list-mobile-buttons">
                    {canExecute("EDIT_ADDRESS") && (
                        <button
                            type="button"
                            className="list-button-table list-edit button"
                            onClick={() => onOpenEditAddressModal(direction)}
                        >
                            <MdModeEdit className="list-button-table-icon-medium" />
                        </button>
                    )}
                    {canExecute("DELETE_ADDRESS") && (
                        <button
                            type="button"
                            onClick={() => onOpenDeleteAddressModal(direction)}
                            className="list-button-table list-delete button"
                        >
                            <MdDelete className="list-button-table-icon-medium" />
                        </button>
                    )}
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${direction.address}, ${direction.city}, ${direction.country}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="list-button-table button"
                    >
                        <MdLocationPin className="list-button-table-icon-medium" />
                    </a>
                </div>
            </div>
        </div>
    );
}
