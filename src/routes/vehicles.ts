import {Hono} from "hono";
import {
    clearVehicleImages,
    deleteVehicle,
    getAllVehiclesController,
    getVehicleByIdController,
    newVehicleController,
    shuffleImages,
    updateVehicleDetails,
    updateVehicleImages,
    vehicleVisibility
} from "../controllers/vehicles";
import {jwtMiddleware} from "../middleware/authenticateToken";

const vehicleRoutes = new Hono();

vehicleRoutes.post("/new", newVehicleController);

vehicleRoutes.get("/all", getAllVehiclesController);

vehicleRoutes.get("/:id", getVehicleByIdController);

vehicleRoutes.put('/edit/:id', jwtMiddleware, updateVehicleDetails);

vehicleRoutes.put('/images/:id', jwtMiddleware, updateVehicleImages);

vehicleRoutes.delete('/images/:id', clearVehicleImages);

vehicleRoutes.put('/visible/:id', jwtMiddleware, vehicleVisibility);

vehicleRoutes.put('/shuffle/:id', jwtMiddleware, shuffleImages)

vehicleRoutes.delete('/del/:id', jwtMiddleware, deleteVehicle);

export default vehicleRoutes;