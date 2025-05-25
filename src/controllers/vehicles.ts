import { successResponse, errorResponse } from "../utils/response";
import { addNewVehicle, fetchAllVehicles } from "../queries/vehicles";
import { uploadImages } from "../helpers/uploader";


export const newVehicleController = async (c: any) => {
    try {
        const formData = await c.req.formData();
        const files = formData.getAll("file").filter(f => typeof f !== "string") as Blob[];
        const folder = formData.get("folder") as string || "default-folder";

        if (!files.length) {
            return errorResponse("No files uploaded", 400);
        }

        const imageUrls = await uploadImages(files, folder);

        const data = Object.fromEntries(
            Array.from(formData.entries()).filter(([key]) => key !== "file" && key !== "folder")
        );

        if (typeof data.vehicleDetails === "string") {
            data.vehicleDetails = JSON.parse(data.vehicleDetails);
        }

        if (typeof data.extras === "string") {
            data.extras = JSON.parse(data.extras || "[]");
        }

        data.imageUrl = imageUrls[0];
        data.imageUrls = imageUrls.slice(1);

        const newVehicle = await addNewVehicle(data);
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

// export const imageUploader = async (c: any) => {
//     const formData = await c.req.formData();
//     const files = formData.getAll("file").filter(f => typeof f !== "string");
//     const folder = formData.get("folder") as string;
//
//     if (!files.length) {
//         return errorResponse("No files uploaded or file data missing", 400);
//     }
//
//     const imageUrls: string[] = [];
//
//     for (const file of files) {
//         const arrayBuffer = await (file as Blob).arrayBuffer();
//         const fileBuffer = Buffer.from(arrayBuffer);
//
//         const imageUrl = await new Promise<string>((resolve, reject) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//                 { resource_type: "auto", folder },
//                 (error, result) => {
//                     if (error) return reject(error);
//                     resolve(result.secure_url);
//                 }
//             );
//             uploadStream.end(fileBuffer);
//         });
//
//         imageUrls.push(imageUrl);
//     }
//
//     return successResponse({ imageUrls }, "Images uploaded successfully");
// };
