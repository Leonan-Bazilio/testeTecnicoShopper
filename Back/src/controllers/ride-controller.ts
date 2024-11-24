import { Request, Response } from "express";
import { getRidesService } from "../services/ride-service";

export const getRidesController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { customer_id } = req.params;
    const { driver_id } = req.query;
    const driverIdNumber = driver_id ? Number(driver_id) : undefined;
    const rides = await getRidesService(customer_id, driverIdNumber);

    return res.status(200).json({
      rides,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
