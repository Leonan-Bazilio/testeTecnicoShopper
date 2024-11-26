import path from "path";
import { readFileSync } from "fs";
import CustomErrorDTO from "../errors/custom-error-DTO";
import { ResRidesHistory, RideHistory } from "../types/ride-history-types";

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

  const ridesHistoryFilePath = path.resolve(
    __dirname,
    "../data/ridesData.json"
  );
  let ridesHistory: RideHistory[];
  try {
    const historyFileContents = readFileSync(ridesHistoryFilePath, "utf-8");
    ridesHistory = JSON.parse(historyFileContents);
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

  const history = {
    customer_id: customer_id,
    rides: ridesHistory,
  };
  return history;
};
