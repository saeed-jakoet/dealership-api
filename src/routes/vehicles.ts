import {Hono} from "hono";
import {
    getAllVehiclesController,
    getVehicleByIdController,
    newVehicleController,
    updateVehicleDetails,
    vehicleVisibility
} from "../controllers/vehicles";
import {jwtMiddleware} from "../middleware/authenticateToken";

const vehicleRoutes = new Hono();

vehicleRoutes.post("/new", newVehicleController);

vehicleRoutes.get("/all", jwtMiddleware, getAllVehiclesController);

vehicleRoutes.get("/:id", getVehicleByIdController);

vehicleRoutes.put('/edit/:id', updateVehicleDetails);

vehicleRoutes.put('/visible/:id', vehicleVisibility);

export default vehicleRoutes;