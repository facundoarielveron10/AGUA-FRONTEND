// MAPS
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";

// COMPONENTS
import Alert from "../Alert";

// ZUSTAND
import { useDeliveryStore } from "src/zustand/deliveryStore";

export default function MapOrder() {
    // ZUSTAND
    const { route, bounds, markers, deleteRoute, startCoordinates } =
        useDeliveryStore();

    const redIcon = new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const blueIcon = new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

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
                        <Polyline positions={route} color="red" />

                        {markers.map((marker, index) => (
                            <Marker
                                key={index}
                                position={marker}
                                icon={
                                    marker[0] == startCoordinates[1] &&
                                    marker[1] == startCoordinates[0]
                                        ? redIcon
                                        : blueIcon
                                }
                            />
                        ))}
                    </MapContainer>
                ) : (
                    <p className="map-not-map">No se ha generado ningun mapa</p>
                )}
            </div>
        </>
    );
}
