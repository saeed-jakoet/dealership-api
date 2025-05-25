import {Hono} from "hono";
import {
    newVehicleController,
    getAllVehiclesController,
} from "../controllers/vehicles";

const vehicleRoutes = new Hono();

vehicleRoutes.post("/new", newVehicleController);

vehicleRoutes.get("/all", getAllVehiclesController);


export default vehicleRoutes;