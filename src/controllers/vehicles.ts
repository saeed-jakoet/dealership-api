import { errorResponse, successResponse } from "../utils/response";
import {
  addNewVehicle,
  deleteVehicleById,
  fetchAllVehicles,
  fetchVehicleById,
  showVehicleInApp,
  updateVehicleById,
  updateVehicleImageOrder,
  fetchVisibleVehicles,
} from "../queries/vehicles";
import { uploadImages, deleteImagesFromCloudinary } from "../helpers/uploader";
import { generateImageUrls } from "../utils/cloudinary";

async function blobToBuffer(blob: Blob): Promise<Buffer> {
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export const newVehicleController = async (c: any) => {
  try {
    const formData = await c.req.formData();

    const blobs = formData
      .getAll("file")
      .filter((f: unknown) => typeof f !== "string") as Blob[];

    if (blobs.length === 0) {
      return errorResponse("At least one image is required", 400);
    }

    const data = Object.fromEntries(
      (Array.from(formData.entries()) as [string, any][]).filter(
        ([key]) => key !== "file" && key !== "folder"
      )
    );

    if (typeof data.vehicleDetails === "string")
      data.vehicleDetails = JSON.parse(data.vehicleDetails);
    if (typeof data.extras === "string")
      data.extras = JSON.parse(data.extras || "[]");

    const folder = data.name || "vehicles";

    const buffers = await Promise.all(blobs.map(blobToBuffer));
    const { imagePublicIds } = await uploadImages(buffers, folder);

    data.imagePublicIds = imagePublicIds;

    type VehicleInput = Parameters<typeof addNewVehicle>[0];
    const newVehicle = await addNewVehicle(data as VehicleInput);

    const vehicleObj = newVehicle.toObject();
    const imageUrls = generateImageUrls(vehicleObj.imagePublicIds || []);
    const responseData = {
      ...vehicleObj,
      imageUrl: imageUrls[0] || "",
      imageUrls: imageUrls.slice(1),
      allImageUrls: imageUrls,
    };

    return successResponse(responseData, "Vehicle added successfully");
  } catch (error) {
    console.error("Error adding vehicle:", error);
    return errorResponse("Failed to add vehicle", 500);
  }
};

export const getAllVehiclesController = async () => {
  try {
    const vehicles = await fetchAllVehicles();

    const vehiclesWithImages = vehicles.map((vehicle) => {
      const vehicleObj = vehicle.toObject();
      const imageUrls = generateImageUrls(vehicleObj.imagePublicIds || []);

      return {
        ...vehicleObj,
        imageUrl: imageUrls[0] || "",
        imageUrls: imageUrls.slice(1),
        allImageUrls: imageUrls,
      };
    });

    return successResponse(vehiclesWithImages, "Vehicles fetched successfully");
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return errorResponse("Failed to fetch vehicles", 500);
  }
};

export const getAllVisibleVehiclesController = async () => {
  try {
    const vehicles = await fetchVisibleVehicles();

    const vehiclesWithImages = vehicles.map((vehicle) => {
      const vehicleObj = vehicle.toObject();
      const imageUrls = generateImageUrls(vehicleObj.imagePublicIds || []);

      return {
        ...vehicleObj,
        imageUrl: imageUrls[0] || "",
        imageUrls: imageUrls.slice(1),
        allImageUrls: imageUrls,
      };
    });

    return successResponse(vehiclesWithImages, "Vehicles fetched successfully");
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return errorResponse("Failed to fetch vehicles", 500);
  }
};

export const getVehicleByIdController = async (c: any) => {
  try {
    const { id } = c.req.param();

    const vehicle = await fetchVehicleById(id);
    if (!vehicle) return errorResponse("Vehicle not found", 404);

    const vehicleObj = vehicle.toObject();
    const imageUrls = generateImageUrls(vehicleObj.imagePublicIds || []);
    const responseData = {
      ...vehicleObj,
      imageUrl: imageUrls[0] || "",
      imageUrls: imageUrls.slice(1),
      allImageUrls: imageUrls,
    };

    return successResponse(responseData, "Vehicle fetched successfully");
  } catch (error) {
    console.error("Error fetching vehicle by ID:", error);
    return errorResponse("Failed to fetch vehicle", 500);
  }
};

export const updateVehicleDetails = async (c: any) => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();

    if (typeof body.vehicleDetails === "string")
      body.vehicleDetails = JSON.parse(body.vehicleDetails);
    if (typeof body.extras === "string")
      body.extras = JSON.parse(body.extras || "[]");

    const updatedVehicle = await updateVehicleById(id, body);

    const vehicleObj = updatedVehicle.toObject();
    const imageUrls = generateImageUrls(vehicleObj.imagePublicIds || []);
    const responseData = {
      ...vehicleObj,
      imageUrl: imageUrls[0] || "",
      imageUrls: imageUrls.slice(1),
      allImageUrls: imageUrls,
    };

    return successResponse(responseData, "Vehicle updated successfully");
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return errorResponse("Failed to update vehicle", 500);
  }
};

export const deleteVehicle = async (c: any) => {
  try {
    const { id } = c.req.param();

    const vehicle = await fetchVehicleById(id);
    if (!vehicle) return errorResponse("Vehicle not found", 404);

    const publicIdsToDelete = vehicle.imagePublicIds || [];
    await deleteVehicleById(id);

    if (publicIdsToDelete.length > 0) {
      try {
        await deleteImagesFromCloudinary(publicIdsToDelete);
      } catch (cloudinaryError) {
        console.error(
          "Warning: Failed to delete images from Cloudinary:",
          cloudinaryError
        );
      }
    }

    return successResponse(
      "Vehicle and associated images deleted successfully"
    );
  } catch (error) {
    console.error("Error deleting vehicle", error);
    return errorResponse("Failed to delete vehicle", 500);
  }
};

export const shuffleImages = async (c: any) => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();
    const { publicIds } = body;

    if (
      !Array.isArray(publicIds) ||
      publicIds.some((id) => typeof id !== "string")
    ) {
      return errorResponse("Invalid or missing publicIds array", 400);
    }

    const updatedVehicle = await updateVehicleImageOrder(id, publicIds);

    const vehicleObj = updatedVehicle.toObject();
    const imageUrls = generateImageUrls(vehicleObj.imagePublicIds || []);
    const responseData = {
      ...vehicleObj,
      imageUrl: imageUrls[0] || "",
      imageUrls: imageUrls.slice(1),
      allImageUrls: imageUrls,
    };

    return successResponse(responseData, "Images reordered successfully");
  } catch (error) {
    console.error("Error in shuffleImages:", error);
    return errorResponse("Failed to reorder images", 500);
  }
};

export const vehicleVisibility = async (c: any) => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();

    const updatedVisibility = await showVehicleInApp(id, body);

    const vehicleObj = updatedVisibility.toObject();
    const imageUrls = generateImageUrls(vehicleObj.imagePublicIds || []);
    const responseData = {
      ...vehicleObj,
      imageUrl: imageUrls[0] || "",
      imageUrls: imageUrls.slice(1),
      allImageUrls: imageUrls,
    };

    return successResponse(
      responseData,
      "Vehicle visibility successfully updated"
    );
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return errorResponse("Failed to update vehicle", 500);
  }
};

export const updateVehicleImages = async (c: any) => {
  try {
    const { id } = c.req.param();
    const formData = await c.req.formData();

    const existingVehicle = await fetchVehicleById(id);
    if (!existingVehicle) return errorResponse("Vehicle not found", 404);

    // Use the vehicle's name as the folder, fallback to "vehicles" if no name
    const folder = existingVehicle.name || "vehicles";

    const blobs = formData
      .getAll("file")
      .filter((f: unknown) => typeof f !== "string") as Blob[];

    if (blobs.length === 0) {
      return errorResponse("At least one image is required", 400);
    }

    const buffers = await Promise.all(blobs.map(blobToBuffer));
    const { imagePublicIds: newImagePublicIds } = await uploadImages(
      buffers,
      folder,
      id
    );

    // Append new images to existing ones instead of replacing
    const existingPublicIds = existingVehicle.imagePublicIds || [];
    const combinedPublicIds = [...existingPublicIds, ...newImagePublicIds];

    const updateData = {
      imagePublicIds: combinedPublicIds,
    };

    const updatedVehicle = await updateVehicleById(id, updateData);

    const vehicleObj = updatedVehicle.toObject();
    const imageUrls = generateImageUrls(vehicleObj.imagePublicIds || []);
    const responseData = {
      ...vehicleObj,
      imageUrl: imageUrls[0] || "",
      imageUrls: imageUrls.slice(1),
      allImageUrls: imageUrls,
    };

    return successResponse(responseData, "Vehicle images added successfully");
  } catch (error) {
    console.error("Error adding vehicle images:", error);
    return errorResponse("Failed to add vehicle images", 500);
  }
};

export const clearVehicleImages = async (c: any) => {
  try {
    const { id } = c.req.param();

    const existingVehicle = await fetchVehicleById(id);
    if (!existingVehicle) return errorResponse("Vehicle not found", 404);

    // Clear all image references from the database
    const updateData = {
      imagePublicIds: [],
    };

    const updatedVehicle = await updateVehicleById(id, updateData);

    const vehicleObj = updatedVehicle.toObject();
    const responseData = {
      ...vehicleObj,
      imageUrl: "",
      imageUrls: [],
      allImageUrls: [],
    };

    return successResponse(
      responseData,
      "Vehicle image references cleared successfully"
    );
  } catch (error) {
    console.error("Error clearing vehicle images:", error);
    return errorResponse("Failed to clear vehicle images", 500);
  }
};
