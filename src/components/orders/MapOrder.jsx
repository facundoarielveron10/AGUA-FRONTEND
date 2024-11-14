// COMPONENTS
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import Alert from "../Alert";
import { useDeliveryStore } from "src/zustand/deliveryStore";

export default function MapOrder() {
    // ZUSTAND
    const { route, bounds, markers, deleteRoute } = useDeliveryStore();

    return (
        <>
            <Alert />
            <div className="map">
                <h1 className="title">Mapa de la Ruta mas Optima</h1>
                <p className="paragraph">
                    En este mapa podras ver la ruta mas optima para los pedidos
                    seleccionados
                </p>
                {route.length > 0 ? (
                    <button
                        className="button map-button-delete"
                        type="button"
                        onClick={() => deleteRoute()}
                    >
                        Eliminar Mapa
                    </button>
                ) : null}
                {route.length > 0 ? (
                    <MapContainer
                        bounds={bounds}
                        style={{ height: "500px", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Polyline positions={route} color="blue" />

                        {markers.map((marker, index) => (
                            <Marker key={index} position={marker} />
                        ))}
                    </MapContainer>
                ) : (
                    <p className="map-not-map">No se ha generado ningun mapa</p>
                )}
            </div>
        </>
    );
}
