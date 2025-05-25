import {Hono} from "hono";
import {
    newVehicleController,
    getAllVehiclesController,
    getVehicleByIdController,
    updateVehicleDetails
} from "../controllers/vehicles";

const vehicleRoutes = new Hono();

vehicleRoutes.post("/new", newVehicleController);

vehicleRoutes.get("/all", getAllVehiclesController);

vehicleRoutes.get("/:id", getVehicleByIdController);

vehicleRoutes.put('/edit/:id', updateVehicleDetails)

export default vehicleRoutes;