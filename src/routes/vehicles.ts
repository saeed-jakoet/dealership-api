import {Hono} from "hono";
import {
    deleteVehicle,
    getAllVehiclesController,
    getVehicleByIdController,
    newVehicleController,
    shuffleImages,
    updateVehicleDetails,
    vehicleVisibility
} from "../controllers/vehicles";
import {jwtMiddleware} from "../middleware/authenticateToken";

const vehicleRoutes = new Hono();

vehicleRoutes.post("/new", jwtMiddleware, newVehicleController);

vehicleRoutes.get("/all", getAllVehiclesController);

vehicleRoutes.get("/:id", jwtMiddleware, getVehicleByIdController);

vehicleRoutes.put('/edit/:id', jwtMiddleware, updateVehicleDetails);

vehicleRoutes.put('/visible/:id', jwtMiddleware, vehicleVisibility);

vehicleRoutes.put('/shuffle/:id', jwtMiddleware, shuffleImages)

vehicleRoutes.delete('/del/:id', jwtMiddleware, deleteVehicle);

export default vehicleRoutes;