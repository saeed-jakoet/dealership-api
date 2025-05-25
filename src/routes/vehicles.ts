import {Hono} from "hono";
import {
    newVehicleController,
    getAllVehiclesController,
    getVehicleByIdController
} from "../controllers/vehicles";

const vehicleRoutes = new Hono();

vehicleRoutes.post("/new", newVehicleController);

vehicleRoutes.get("/all", getAllVehiclesController);

vehicleRoutes.get("/:id", getVehicleByIdController);

export default vehicleRoutes;