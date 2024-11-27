import CustomErrorDTO from "../errors/custom-error-DTO";
import { IRideHistory } from "../models/ride-history";
import { ResRidesHistory } from "../types/ride-history-types";
import { getAllRideHistories } from "./history-service";

export const getRidesService = async (
  customer_id: string,
  driver_id?: number
): Promise<ResRidesHistory> => {
  if (!customer_id) {
    throw new CustomErrorDTO(
      400,
      "INVALID_DATA",
      "The 'customer_id' field is required."
    );
  }

  let ridesHistory: IRideHistory[] = [];
  try {
    ridesHistory = await getAllRideHistories();
  } catch (error) {
    throw new Error("Error reading the rides data file.");
  }

  ridesHistory = ridesHistory.filter(
    (ride) => customer_id === ride.customer_id
  );

  if (driver_id) {
    ridesHistory = ridesHistory.filter((ride) => driver_id === ride.driver.id);
    if (ridesHistory.length === 0) {
      throw new CustomErrorDTO(
        400,
        "INVALID_DRIVER",
        `Driver with id '${driver_id}' not found.'`
      );
    }
  }

  if (ridesHistory.length === 0) {
    throw new CustomErrorDTO(
      404,
      "NO_RIDES_FOUND",
      `No rides found for the user '${customer_id}'`
    );
  }

  ridesHistory.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  const history: ResRidesHistory = {
    customer_id: customer_id,
    rides: ridesHistory.map((ride) => ({
      id: ride.id,
      date: ride.date,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driver.id,
        name: ride.driver.name,
      },
      value: ride.value,
    })),
  };

  return history;
};
