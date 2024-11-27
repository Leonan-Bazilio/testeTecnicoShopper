import RideHistory, { IRideHistory } from "../models/ride-history";

export const getAllRideHistories = async (): Promise<IRideHistory[]> => {
  try {
    return await RideHistory.find().exec();
  } catch (error) {
    console.error("Error fetching ride history:", error);
    throw new Error("Error fetching ride history.");
  }
};

export const saveRide = async (
  rideData: IRideHistory
): Promise<IRideHistory> => {
  try {
    const newRide = new RideHistory(rideData);
    return await newRide.save();
  } catch (error) {
    console.error("Error saving the ride:", error);
    throw new Error("Error saving the ride.");
  }
};
