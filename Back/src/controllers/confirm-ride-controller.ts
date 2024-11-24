import { Request, Response } from "express";
import { confirmRideService } from "../services/confirm-ride-service";
import { RideRequestDTO } from "../dtos/ride-request-DTO";

export const confirmRideController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const rideData: RideRequestDTO = req.body;

    const result = await confirmRideService(rideData, "1");

    return res.status(200).json({ success: true });
  } catch (error: any) {
    if (error.code === "INVALID_DATA") {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: error.message,
      });
    }
    if (error.code === "DRIVER_NOT_FOUND") {
      return res.status(404).json({
        error_code: "DRIVER_NOT_FOUND",
        error_description: error.message,
      });
    }
    if (error.code === "INVALID_DISTANCE") {
      return res.status(406).json({
        error_code: "INVALID_DISTANCE",
        error_description: error.message,
      });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
