import { Hono } from "hono";
import {
  clearVehicleImages,
  deleteVehicle,
  getAllVehiclesController,
  getVehicleByIdController,
  newVehicleController,
  shuffleImages,
  updateVehicleDetails,
  updateVehicleImages,
  vehicleVisibility,
  getAllVisibleVehiclesController,
} from "../controllers/vehicles";
import { jwtMiddleware } from "../middleware/authenticateToken";

const vehicleRoutes = new Hono();

vehicleRoutes.post("/new", jwtMiddleware, newVehicleController);

vehicleRoutes.get("/all", jwtMiddleware, getAllVehiclesController);

vehicleRoutes.get("/all/visible", getAllVisibleVehiclesController);

vehicleRoutes.get("/:id", jwtMiddleware, getVehicleByIdController);

vehicleRoutes.put("/edit/:id", jwtMiddleware, updateVehicleDetails);

vehicleRoutes.put("/images/:id", jwtMiddleware, updateVehicleImages);

vehicleRoutes.delete("/images/:id", jwtMiddleware, clearVehicleImages);

vehicleRoutes.put("/visible/:id", jwtMiddleware, vehicleVisibility);

vehicleRoutes.put("/shuffle/:id", jwtMiddleware, shuffleImages);

vehicleRoutes.delete("/del/:id", jwtMiddleware, deleteVehicle);

export default vehicleRoutes;
