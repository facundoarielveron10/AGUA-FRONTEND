// ICONS
import { IoIosAdd } from "react-icons/io";

const address = [
    {
        address: "Francia 1640",
        province: "CABA",
        country: "Argentina",
    },
    {
        address: "Rio Negro 450",
        province: "CABA",
        country: "Argentina",
    },
];

export default function Address() {
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
                        {address.length > 0 ? (
                            address.map((address, index) => (
                                <AddressCard key={index} address={address} />
                            ))
                        ) : (
                            <div className="list-no-data">
                                No hay ningún usuario disponible
                            </div>
                        )}
                        <button type="button" className="address-add">
                            <IoIosAdd className="address-add-icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AddressCard({ address }) {
    return (
        <div className="list-mobile-fields">
            <div className="list-mobile-field">
                <span className="list-mobile-label">Direccion:</span>
                <span className="list-mobile-value">{address?.address}</span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Provincia:</span>
                <span className="list-mobile-value">{address?.province}</span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Pais:</span>
                <span className="list-mobile-value">{address?.country}</span>
            </div>
            <div className="list-mobile-field">
                <span className="list-mobile-label">Acciones:</span>
                <div className="list-mobile-buttons">
                    <button
                        type="button"
                        className="list-button-table list-edit button"
                        onClick={() => console.log("Editar...")}
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        onClick={() => console.log("Eliminar...")}
                        className="list-button-table list-delete button"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
