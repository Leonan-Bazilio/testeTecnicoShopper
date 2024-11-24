import path from "path";
import { RideRequestDTO } from "../dtos/ride-request-DTO";
import { readFileSync, writeFileSync } from "fs";
import DriverDTO from "../dtos/driver-DTO";
import RideHistoryDTO from "../dtos/ride-history-DTO";

export const confirmRideService = async (
  rideData: RideRequestDTO,
  userId: string
): Promise<void> => {
  const { origin, destination, driver } = rideData;

  if (!origin) {
    throw new Error("The 'origin' field is required.");
  } else if (!destination) {
    throw new Error("The 'destination' field is required.");
  } else if (!userId) {
    throw new Error("The 'userId' field is required.");
  }

  if (origin === destination) {
    throw new Error("The origin and destination addresses cannot be the same.");
  }
  const driversFilePath = path.resolve(__dirname, "../data/drivers.json");
  const fileContents = readFileSync(driversFilePath, "utf-8");
  const drivers = JSON.parse(fileContents);

  const driverExists = drivers.some((eachDriver: DriverDTO) => {
    return driver.id === eachDriver.id;
  });
  if (!driverExists) {
    throw new Error(`Driver with id ${driver.id} not found.`);
  }

  const ridesFilePath = path.resolve(__dirname, "../data/ridesData.json");

  let rides: RideHistoryDTO[] = [];
  try {
    const ridesFileContents = readFileSync(ridesFilePath, "utf-8");
    rides = JSON.parse(ridesFileContents);
  } catch (error) {
    throw new Error("Error reading the rides data file.");
  }
  const newRideData = {
    id: Math.floor(Math.random() * 1000000),
    date: new Date(),
    ...rideData,
  };
  console.log("AAAAAAAAA", newRideData);
  rides.push(newRideData);

  try {
    writeFileSync(ridesFilePath, JSON.stringify(rides), "utf-8");
    console.log("Viagem salva no banco de dados:", newRideData);
  } catch (err) {
    throw new Error("Error saving the rides data file.");
  }
};
