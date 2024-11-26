import { Request, Response } from "express";
import { confirmRideService } from "../services/ride-confirm-service";
import CustomErrorDTO from "../errors/custom-error-DTO";

export const confirmRideController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const rideData = req.body;

    const result = await confirmRideService(rideData);

    return res.status(200).json({ success: true });
  } catch (error: any) {
    if (error instanceof CustomErrorDTO) {
      return res.status(error.statusCode).json({
        error_code: error.errorCode,
        error_description: error.errorDescription,
      });
    } else {
      return res.status(500).json(error);
    }
  }
};
