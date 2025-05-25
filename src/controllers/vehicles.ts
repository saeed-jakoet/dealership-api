import {errorResponse, successResponse} from "../utils/response";
import {
    addNewVehicle,
    fetchAllVehicles,
    fetchVehicleById,
    showVehicleInApp,
    updateVehicleById
} from "../queries/vehicles";
import {uploadImages} from "../helpers/uploader";


export const newVehicleController = async (c: any) => {
    try {
        const formData = await c.req.formData();
        const files = formData.getAll("file").filter((f: unknown) => typeof f !== "string") as Blob[];
        const folder = formData.get("folder") as string || "default-folder";

        const imageUrls = await uploadImages(files, folder);

        const data = Object.fromEntries(
            (Array.from(formData.entries()) as [string, any][])
                .filter(([key]) => key !== "file" && key !== "folder")
        );

        if (typeof data.vehicleDetails === "string") data.vehicleDetails = JSON.parse(data.vehicleDetails);
        if (typeof data.extras === "string") data.extras = JSON.parse(data.extras || "[]");

        data.imageUrl = imageUrls[0];
        data.imageUrls = imageUrls.slice(1);

        type VehicleInput = Parameters<typeof addNewVehicle>[0];
        const newVehicle = await addNewVehicle(data as VehicleInput);

        return successResponse(newVehicle, "Vehicle added successfully");
    } catch (error) {
        console.error("Error adding vehicle:", error);
        return errorResponse("Failed to add vehicle", 500);
    }
};

export const getAllVehiclesController = async () => {
    try {
        const vehicles = await fetchAllVehicles();

        return successResponse(vehicles, "Vehicles fetched successfully");
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return errorResponse("Failed to fetch vehicles", 500);
    }
}

export const getVehicleByIdController = async (c: any) => {
    try {
        const {id} = c.req.param();

        const vehicle = await fetchVehicleById(id);
        if (!vehicle) return errorResponse("Vehicle not found", 404);

        return successResponse(vehicle, "Vehicle fetched successfully");
    } catch (error) {
        console.error("Error fetching vehicle by ID:", error);
        return errorResponse("Failed to fetch vehicle", 500);
    }
};

export const updateVehicleDetails = async (c: any) => {
    try {
        const {id} = c.req.param();
        const body = await c.req.json();

        if (typeof body.vehicleDetails === "string") body.vehicleDetails = JSON.parse(body.vehicleDetails);
        if (typeof body.extras === "string") body.extras = JSON.parse(body.extras || "[]");

        const updatedVehicle = await updateVehicleById(id, body);
        return successResponse(updatedVehicle, "Vehicle updated successfully");
    } catch (error) {
        console.error("Error updating vehicle:", error);
        return errorResponse("Failed to update vehicle", 500);
    }
};

export const vehicleVisibility = async (c: any) => {
    try {
        const {id} = c.req.param()
        const body = await c.req.json();

        const updatedVisibility = await showVehicleInApp(id, body);

        return successResponse(updatedVisibility, "Vehicle visibility successfully updated");
    } catch (error) {
        console.error("Error updating vehicle:", error);
        return errorResponse("Failed to update vehicle", 500);
    }
}

