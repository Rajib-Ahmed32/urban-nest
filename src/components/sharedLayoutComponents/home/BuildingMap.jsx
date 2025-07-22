import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const BuildingMap = () => {
  const position = [24.4334, 90.7866];

  return (
    <section className="bg-white pt-20 pb-32">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#ec5407] mb-4">
            Apartment Location
          </h2>
          <p className="text-gray-700 text-base md:px-16 lg:px-0 mb-6 leading-relaxed">
            Nestled in the heart of{" "}
            <span className="font-semibold">Kishoreganj</span>, our apartment
            offers easy access to essential services and nearby landmarks —
            perfect for families, students, and working professionals.
          </p>

          <div className="text-sm text-gray-700 space-y-4">
            <div>
              <p className="font-medium text-gray-800">Ekrampur Bus Stand</p>
              <p>Just 2 minutes away – quick commuting made simple.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">
                Kishoreganj Sadar Hospital
              </p>
              <p>Close for urgent care and health emergencies.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">
                Gurudayal College & Local Schools
              </p>
              <p>Academic institutes within walking distance.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Local Markets & Shops</p>
              <p>All your daily needs just around the corner.</p>
            </div>
          </div>

          <p className="italic text-sm text-gray-500 mt-6">
            Tip: Click the map marker for navigation assistance.
          </p>
        </div>

        <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-md border z-0">
          <MapContainer
            center={position}
            zoom={16}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Our Building Location <br /> Welcome!
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default BuildingMap;
