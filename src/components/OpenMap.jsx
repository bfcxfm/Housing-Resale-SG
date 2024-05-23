import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

export default function OpenMap({ search }) {
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
    <div>
      <MapContainer
        center={[`${search.LATITUDE}`, `${search.LONGITUDE}`]}
        scrollWheelZoom={false}
        style={{ zIndex: 1 }}
      >
        <TileLayer
          detectRetina={true}
          maxZoom={19}
          minZoom={11}
          attribution='<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>'
          url="https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png"
        />
        <MapView search={search} />
      </MapContainer>
    </div>
  );
}
