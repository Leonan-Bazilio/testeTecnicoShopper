import CustomErrorDTO from "../errors/custom-error-DTO";
import { ReqConfirmRide } from "../types/ride-confirm-types";
import DriverModel, { IDriver } from "../models/driver";
import RideHistoryModel, { IRideHistory } from "../models/ride-history";

export const confirmRideService = async (
  rideData: ReqConfirmRide
): Promise<void> => {
  const { origin, destination, customer_id, driver, distance } = rideData;
  console.log("aaaaaaaaa", rideData);
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
  let drivers: IDriver[] = [];
  try {
    drivers = await DriverModel.find();
  } catch (error) {
    throw new Error("Error while fetching drivers:");
  }

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

  const newRideData: IRideHistory = new RideHistoryModel({
    date: new Date(),
    ...rideData,
  });

  console.log("ZZZZZZZZZ", newRideData);
  try {
    await newRideData.save();
  } catch (error) {
    throw new Error("Error while saving rides:");
  }
};
