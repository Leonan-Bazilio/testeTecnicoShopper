import { Request, Response } from "express";
import { getRidesService } from "../services/ride-history-service";
import CustomErrorDTO from "../errors/custom-error-DTO";

export const getRidesController = async (
  req: Request,
  res: Response
): Promise<any> => {
  let rides;
  try {
    const { customer_id } = req.params;
    if (req.query?.driver_id) {
      let { driver_id } = req.query;
      const driverIdNumber = Number(driver_id);
      rides = await getRidesService(customer_id, driverIdNumber);
    } else {
      rides = await getRidesService(customer_id);
    }
    return res.status(200).json({
      rides,
    });
  } catch (error) {
    if (error instanceof CustomErrorDTO) {
      return res.status(error.statusCode).json({
        error_code: error.errorCode,
        error_description: error.errorDescription,
      });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
