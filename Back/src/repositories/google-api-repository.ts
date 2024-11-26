import axios from "axios";

const fetchApiRoutes = async (origin: string, destination: string) => {
  try {
    const response = await axios.post(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        origin: { address: origin },
        destination: { address: destination },
        travelMode: "DRIVE",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "routes.legs.startLocation.latLng,routes.legs.endLocation.latLng,routes.legs.distanceMeters,routes.legs.duration",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch route details from the API");
  }
};
export default fetchApiRoutes;
