import axios from "axios";
import ReqEstimateDTO from "../dtos/req-estimate-DTO";
import ResApiGoogleDTO from "../dtos/res-api-google-DTO";
import path from "path";
import { readFileSync } from "fs";
import DriverDTO from "../dtos/driver-DTO";
import CustomErrorDTO from "../dtos/errors/custom-error-DTO";

export const rideEstimateService = async (
  data: ReqEstimateDTO
): Promise<ResApiGoogleDTO> => {
  const { origin, destination, customer_id } = data;

  if (!origin) {
    throw new CustomErrorDTO("INVALID_DATA", "The 'origin' field is required.");
  } else if (!destination) {
    throw new CustomErrorDTO(
      "INVALID_DATA",
      "The 'destination' field is required."
    );
  } else if (!customer_id) {
    throw new CustomErrorDTO(
      "INVALID_DATA",
      "The 'customer_id' field is required."
    );
  }

  if (origin === destination) {
    throw new CustomErrorDTO(
      "INVALID_DATA",
      "The origin and destination addresses cannot be the same."
    );
  }

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

    const responseData = response.data.routes[0].legs[0];

    const distance: number = responseData.distanceMeters;
    const distanceInKm: number = distance / 1000;
    const duration: string = responseData.duration;

    const filePath = path.resolve(__dirname, "../data/drivers.json");
    const fileContents = readFileSync(filePath, "utf-8");
    const drivers = JSON.parse(fileContents);

    const availableDrivers = drivers.filter(
      (driver: DriverDTO) => distanceInKm >= driver.minDistanceInKm
    );

    const formatedDrivers = availableDrivers.map((driver: DriverDTO) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: parseFloat(driver.review.rating), // Converte a string para número
        comment: driver.review.comment,
      },
      value: distanceInKm * driver.ratePerKmInCent,
    }));

    console.log("aaaaa", formatedDrivers);
    const result: ResApiGoogleDTO = {
      origin: {
        latitude: responseData.startLocation.latLng.latitude,
        longitude: responseData.startLocation.latLng.longitude,
      },
      destination: {
        latitude: responseData.endLocation.latLng.latitude,
        longitude: responseData.endLocation.latLng.longitude,
      },
      distance: distance,
      duration: duration,
      options: formatedDrivers,
      routeResponse: responseData,
    };

    return result;
  } catch (error: any) {
    console.error(
      "Erro ao obter dados da rota:",
      error.response?.data || error.message
    );
    throw new Error("Não foi possível calcular a rota");
  }
};
