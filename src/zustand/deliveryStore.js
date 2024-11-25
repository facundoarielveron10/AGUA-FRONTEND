// ZUSTAND
import { create } from "zustand";
import { persist } from "zustand/middleware";

// UTILS
import { errorResponse } from "../utils/error";

// AXIOS
import clientAxios from "../config/ClientAxios";

// MAPS
import polyline from "@mapbox/polyline";

export const useDeliveryStore = create(
    persist(
        (set, get) => ({
            route: [],
            bounds: null,
            markers: [],
            orders: [],
            startCoordinates: null,
            generateRoute: async (orders, addressStart) => {
                try {
                    const { data } = await clientAxios.post(
                        "/order/generate-route",
                        {
                            orders,
                            addressStart,
                        }
                    );

                    const decodedRoute = polyline
                        .decode(data.routes[0].geometry)
                        .map(([lat, lon]) => [lat, lon]);

                    const bbox = data.bbox;
                    const leafletBounds = [
                        [bbox[1], bbox[0]],
                        [bbox[3], bbox[2]],
                    ];
                    set({
                        route: decodedRoute,
                        bounds: leafletBounds,
                        orders: orders,
                        startCoordinates: [data.startLat, data.startLon],
                    });

                    const invertedMarkers = data.metadata.query.coordinates.map(
                        ([lat, lon]) => [lon, lat]
                    );

                    set({ markers: invertedMarkers });

                    window.location.assign("/order-map");
                } catch (error) {
                    return errorResponse(error);
                }
            },
            deleteRoute: () => {
                set({
                    route: [],
                    bounds: null,
                    markers: [],
                    orders: [],
                    startCoordinates: null,
                });
                window.location.reload();
            },
        }),
        {
            name: "maps",
            partialize: (state) => ({
                route: state.route,
                bounds: state.bounds,
                markers: state.markers,
                orders: state.orders,
                startCoordinates: state.startCoordinates,
            }),
        }
    )
);
