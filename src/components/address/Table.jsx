// ZUSTAND
import { useLoginStore } from "../../zustand/loginStore";

export default function Table({ address, onOpenDeleteAddressModal }) {
    // ZUSTAND
    const { canExecute } = useLoginStore();

    return (
        <div className="list-container">
            <div className="list">
                <h2 className="list-subtitle">Direcciones</h2>
                <table className="list-table">
                    <thead>
                        <tr>
                            <th>Direccion</th>
                            <th>Ciudad</th>
                            <th>Pais</th>
                            <th className="list-head-actions">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {address.map((address) => (
                            <tr key={address.id}>
                                <td data-label="Direccion">
                                    {address.address}
                                </td>
                                <td data-label="Ciudad">{address.city}</td>
                                <td data-label="Pais">{address.country}</td>
                                <td data-label="Acciones">
                                    <div className="list-buttons">
                                        {canExecute("EDIT_ADDRESS_DELIVERY") ? (
                                            <a
                                                href={`edit-address/${address.id}`}
                                                className="list-button-table list-edit button"
                                            >
                                                Editar
                                            </a>
                                        ) : null}
                                        {canExecute(
                                            "DELETE_ADDRESS_DELIVERY"
                                        ) ? (
                                            <button
                                                onClick={() =>
                                                    onOpenDeleteAddressModal(
                                                        address
                                                    )
                                                }
                                                className="list-button-table list-delete button"
                                            >
                                                Eliminar
                                            </button>
                                        ) : null}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
