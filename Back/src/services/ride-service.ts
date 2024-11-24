import path from "path";
import ResRidesHistoryDTO from "../dtos/res--rides-history-DTO";
import { RideRequestDTO } from "../dtos/ride-request-DTO";
import { readFileSync } from "fs";
import RideHistoryDTO from "../dtos/ride-history-DTO";

export const getRidesService = async (
  customerId: string,
  driverId?: number
): Promise<ResRidesHistoryDTO> => {
  const ridesFilePath = path.resolve(__dirname, "../data/ridesData.json");

  let rides: RideHistoryDTO[] = [];
  try {
    const ridesFileContents = readFileSync(ridesFilePath, "utf-8");
    rides = JSON.parse(ridesFileContents);
  } catch (error) {
    throw new Error("Error reading the rides data file.");
  }
  const formatedRides = rides.map((rideHistory: RideHistoryDTO) => ({
    id: rideHistory.id,
    date: rideHistory.date,
    origin: rideHistory.origin,
    destination: rideHistory.destination,
    distance: rideHistory.distance,
    duration: rideHistory.duration,
    driver: {
      id: rideHistory.driver.id,
      name: rideHistory.driver.name,
    },
    value: rideHistory.value,
  }));

  const history = {
    customer_id: customerId,
    rides: formatedRides,
  };
  return history;
};
