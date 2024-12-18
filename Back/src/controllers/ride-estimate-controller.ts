import { Request, Response } from "express";
import { rideEstimateService } from "../services/ride-estimate-service";
import CustomErrorDTO from "../errors/custom-error-DTO";
import { ResEstimate } from "../types/ride-estimate-types";

export const rideEstimateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const data = req.body;
  try {
    const estimate: ResEstimate = await rideEstimateService(data);
    return res.status(200).json(estimate);
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
