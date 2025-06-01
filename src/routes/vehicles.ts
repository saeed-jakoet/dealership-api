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

vehicleRoutes.post("/new", jwtMiddleware, newVehicleController);

vehicleRoutes.get("/all", jwtMiddleware, getAllVehiclesController);

vehicleRoutes.get("/:id", jwtMiddleware, getVehicleByIdController);

vehicleRoutes.put('/edit/:id', jwtMiddleware, updateVehicleDetails);

vehicleRoutes.put('/visible/:id', jwtMiddleware, vehicleVisibility);

export default vehicleRoutes;