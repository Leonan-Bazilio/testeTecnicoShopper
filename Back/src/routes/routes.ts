import { Router } from "express";
import { rideEstimateController } from "../controllers/ride-estimate-controller";
import { confirmRideController } from "../controllers/ride-confirm-controller";
import { getRidesController } from "../controllers/ride-history-controller";

const router = Router();

router.post("/ride/estimate", rideEstimateController);
router.patch("/ride/confirm", confirmRideController);
router.get("/ride/:customer_id", getRidesController);
export default router;
