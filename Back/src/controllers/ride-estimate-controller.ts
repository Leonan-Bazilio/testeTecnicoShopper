import { Request, Response } from "express";
import { rideEstimateService } from "../services/ride-estimate-service";
import ReqEstimateDTO from "../dtos/req-estimate-DTO";
import ResApiGoogleDTO from "../dtos/res-api-google-DTO";
import CustomErrorDTO from "../dtos/errors/custom-error-DTO";

export const rideEstimateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const data: ReqEstimateDTO = req.body;
  try {
    const estimate: ResApiGoogleDTO = await rideEstimateService(data);
    return res.status(200).json(estimate);
  } catch (error: any) {
    if (error instanceof CustomErrorDTO) {
      return res.status(400).json({
        error_code: error.error_code,
        error_description: error.error_description,
      });
    } else {
      return res.status(400).json(error);
    }
  }
};
