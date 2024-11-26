import path from "path";
import { readFileSync, writeFileSync } from "fs";
import CustomErrorDTO from "../errors/custom-error-DTO";
import { RideHistory } from "../types/ride-history-types";
import { ReqConfirmRide } from "../types/ride-confirm-types";
import { Driver } from "../types/driver-type";

export const confirmRideService = async (
  rideData: ReqConfirmRide
): Promise<void> => {
  const { origin, destination, customer_id, driver, distance } = rideData;

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
  } else if (!driver) {
    throw new CustomErrorDTO(
      400,
      "DRIVER_NOT_FOUND",
      "The 'driver' field is required."
    );
  }

  if (origin === destination) {
    throw new CustomErrorDTO(
      400,
      "INVALID_DATA",
      "The origin and destination addresses cannot be the same."
    );
  }
  const driversFilePath = path.resolve(__dirname, "../data/drivers.json");
  const fileContents = readFileSync(driversFilePath, "utf-8");
  const drivers: Driver[] = JSON.parse(fileContents);

  const driverExists = drivers.find((eachDriver) => {
    return driver.id === eachDriver.id;
  });
  if (!driverExists) {
    throw new CustomErrorDTO(
      404,
      "DRIVER_NOT_FOUND",
      `Driver with id ${driver.id} not found. `
    );
  }
  if (distance / 1000 < driverExists.minDistanceInKm) {
    throw new CustomErrorDTO(
      406,
      "INVALID_DISTANCE",
      `The distance of ${
        distance / 1000
      } km is invalid. For this driver, at least ${
        driverExists.minDistanceInKm
      } km is required.`
    );
  }
  const ridesFilePath = path.resolve(__dirname, "../data/ridesData.json");
  let rides: RideHistory[] = [];
  try {
    const ridesFileContents = readFileSync(ridesFilePath, "utf-8");
    rides = JSON.parse(ridesFileContents);
  } catch (error) {
    throw new Error("Error reading the rides data file.");
  }
  const newRideData: RideHistory = {
    id: Math.round(Math.random() * 1000),
    date: new Date(),
    ...rideData,
  };
  console.log("AAAAAAAAA", newRideData);
  rides.push(newRideData);

  try {
    writeFileSync(ridesFilePath, JSON.stringify(rides), "utf-8");
  } catch (err) {
    throw new Error("Error saving the rides data file.");
  }
};
