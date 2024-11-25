// REACT
import { useEffect, useState } from "react";

// UTILS
import { errorResponse } from "../../utils/error";

// COMPONENTS
import Spinner from "../Spinner";
import Table from "./Table";
import TableMobile from "./TableMobile";
import DeleteAddressModal from "../modal/DeleteAddressModal";

// ALERTS
import { toast } from "react-toastify";
import Alert from "../Alert";

// AXIOS
import clientAxios from "../../config/ClientAxios";

// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

// MEDIA QUERY
import { useMediaQuery } from "react-responsive";

export default function Roles() {
    // STATES
    const [address, setAddress] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteAddressModal, setDeleteAddressModal] = useState();
    const [addressDelete, setAddressDelete] = useState();

    // ZUSTAND
    const { canExecute } = useLoginStore();

    // EFFECTS
    useEffect(() => {
        getAddress();
    }, []);

    // FUNCTIONS
    const getAddress = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.get(
                "/directions/address-delivery"
            );

            setAddress(data);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAddress = async (e) => {
        e.preventDefault();

        try {
            const { data } = await clientAxios.post(
                `/directions/delete-address`,
                {
                    directionId: addressDelete.id,
                }
            );

            toast.success(data);
            getAddress();
            onCloseDeleteAddressModal();
        } catch (error) {
            toast.error(errorResponse(error));
        }
    };

    const onOpenDeleteAddressModal = (address) => {
        setDeleteAddressModal(true);
        setAddressDelete(address);
    };

    const onCloseDeleteAddressModal = () => {
        setDeleteAddressModal(false);
        setAddressDelete({});
    };

    // RESPONSIVE
    const isDesktop = useMediaQuery({
        query: "(min-width: 768px)",
    });

    return (
        <>
            <Alert />
            <div className="addressDelivery">
                <h1 className="title">Listado de Direcciones</h1>
                <p className="paragraph">
                    En este Listado se puede ver todas las Direcciones de
                    partida del Repartidor
                </p>
                {loading ? (
                    <div className="addressDelivery-spinner">
                        <Spinner />
                    </div>
                ) : isDesktop ? (
                    <Table
                        address={address}
                        onOpenDeleteAddressModal={onOpenDeleteAddressModal}
                    />
                ) : (
                    <TableMobile
                        address={address}
                        onOpenDeleteAddressModal={onOpenDeleteAddressModal}
                    />
                )}
                {canExecute("CREATE_ADDRESS_DELIVERY") ? (
                    <a href="create-address" className="roles-button button">
                        Crear Direccion
                    </a>
                ) : null}
            </div>
            <DeleteAddressModal
                deleteAddressModal={deleteAddressModal}
                onCloseDeleteAddressModal={onCloseDeleteAddressModal}
                handleDeleteAddress={handleDeleteAddress}
                addressDelete={addressDelete}
            />
        </>
    );
}
