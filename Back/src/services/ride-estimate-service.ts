import path from "path";
import { readFileSync } from "fs";
import CustomErrorDTO from "../errors/custom-error-DTO";
import fetchApiRoutes from "../repositories/google-api-repository";
import {
  FormattedDriver,
  ReqEstimate,
  ResEstimate,
} from "../types/ride-estimate-types";
import { Driver } from "../types/driver-type";

export const rideEstimateService = async (
  data: ReqEstimate
): Promise<ResEstimate> => {
  const { origin, destination, customer_id } = data;

  if (!origin) {
    throw new CustomErrorDTO(
      400,
      "INVALID_DATA",
      "The 'origin' field is required."
    );
  } else if (!destination) {
    throw new CustomErrorDTO(
      400,
      "INVALID_DATA",
      "The 'destination' field is required."
    );
  } else if (!customer_id) {
    throw new CustomErrorDTO(
      400,
      "INVALID_DATA",
      "The 'customer_id' field is required."
    );
  }

  if (origin === destination) {
    throw new CustomErrorDTO(
      400,
      "INVALID_DATA",
      "The origin and destination addresses cannot be the same."
    );
  }

  let response;
  try {
    response = await fetchApiRoutes(origin, destination);
  } catch (error) {
    throw new Error("Error calling the API");
  }
  const responseData = response.data.routes[0].legs[0];

  const distance: number = responseData.distanceMeters;
  const distanceInKm: number = distance / 1000;
  const duration: string = responseData.duration;

  const filePath = path.resolve(__dirname, "../data/drivers.json");
  const fileContents = readFileSync(filePath, "utf-8");
  const drivers: Driver[] = JSON.parse(fileContents);

  const availableDrivers = drivers.filter(
    (driver) => distanceInKm >= driver.minDistanceInKm
  );
  if (availableDrivers.length === 0) {
    throw new Error(
      "No drivers are available for this trip because the requested distance does not meet the minimum requirement."
    );
  }

  const formattedDrivers: FormattedDriver[] = availableDrivers.map(
    (driver: Driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: parseFloat(driver.review.rating), // Converte a string para número
        comment: driver.review.comment,
      },
      value: distanceInKm * driver.ratePerKmInCent,
    })
  );

  formattedDrivers.sort((a, b) => a.value - b.value);
  return {
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
    options: formattedDrivers,
    routeResponse: responseData,
  };
};
