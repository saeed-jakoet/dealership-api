import connectToDatabase from '../utils/mongoose';
import { Vehicle} from "../schema/vehicles";


export const addNewVehicle = async (data: {
    name: string;
    used: boolean;
    mileage: string;
    transmissionType: string;
    price: string;
    fuelType: string;
    year: string;
    brand: string;
    imageUrl: string;
    imageUrls: string[];
    extras: string[];
    sellerComments: string;
    vehicleDetails: {
        previousOwners: number;
        serviceHistory: string;
        colour: string;
        bodyType: string;
        warranty: string;
    };
}) => {
    try {
        // Ensure DB connection is established
        await connectToDatabase();

        // Create a new vehicle document
        const newVehicle = new Vehicle(data);

        // Save the document to the database
        const savedVehicle = await newVehicle.save();

        return savedVehicle;
    } catch (error) {
        console.error('Error adding new vehicle:', error);
        throw error;
    }
};

export const fetchAllVehicles = async () => {
    try {
        // Ensure DB connection is established
        await connectToDatabase();

        // Fetch all vehicles from the database
        const vehicles = await Vehicle.find();

        return vehicles;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};