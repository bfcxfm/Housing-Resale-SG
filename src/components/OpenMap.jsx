import {
  AttributionControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

export default function OpenMap({ search }) {
  if (!search.LATITUDE || !search.LONGITUDE) {
    return null; // Return null if search.LATITUDE or search.LONGITUDE is not available
  }
  const MapView = ({ search }) => {
    const map = useMap();

    useEffect(() => {
      map.setView([search.LATITUDE, search.LONGITUDE], 16);
      map.flyTo([search.LATITUDE, search.LONGITUDE], 16, {
        duration: 1,
      });
      map.panTo([search.LATITUDE, search.LONGITUDE]);
    }, [search, map]);

    return (
      <Marker position={[search.LATITUDE, search.LONGITUDE]}>
        <Popup>{search.ADDRESS}</Popup>
      </Marker>
    );
  };

  return (
    <Box>
      <MapContainer
        center={[`${search.LATITUDE}`, `${search.LONGITUDE}`]}
        scrollWheelZoom={false}
        style={{ zIndex: 1 }}
        attributionControl={false}
      >
        <TileLayer
          detectRetina={true}
          maxZoom={19}
          minZoom={11}
          attribution='<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>'
          url="https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png"
        />
        <AttributionControl position="bottomright" prefix={false} />
        <MapView search={search} />
      </MapContainer>
    </Box>
  );
}
