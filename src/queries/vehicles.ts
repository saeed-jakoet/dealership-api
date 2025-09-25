import connectToDatabase from '../utils/mongoose';
import {Vehicle} from "../schema/vehicles";


export const addNewVehicle = async (data: {
    name: string;
    used: boolean;
    mileage: string;
    transmissionType: string;
    price: string;
    fuelType: string;
    year: string;
    brand: string;
    imagePublicIds: string[];
    extras: string[];
    sellerComments: string;
    vehicleDetails: {
        previousOwners: number;
        serviceHistory: string;
        colour: string;
        bodyType: string;
        warranty: string;
    };
    visible: boolean;
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

export const fetchVehicleById = async (id: string) => {
    try {
        await connectToDatabase();

        const vehicle = await Vehicle.findById(id);
        if (!vehicle) throw new Error('Vehicle not found');

        return vehicle;
    } catch (error) {
        console.error('Error fetching vehicle by ID:', error);
        throw error;
    }
}

export const deleteVehicleById = async (id: string) => {
    try {
        await connectToDatabase();
        const vehicle = await Vehicle.findByIdAndDelete(id);
        if (!vehicle) throw new Error('Vehicle not found');

        return vehicle;
    } catch (error) {
        console.error('Error deleting vehicle by ID:', error);
        throw error;
    }
}

export const updateVehicleById = async (
    id: string,
    data: {
        name?: string;
        used?: boolean;
        mileage?: string;
        transmissionType?: string;
        price?: string;
        fuelType?: string;
        year?: string;
        brand?: string;
        imagePublicIds?: string[];
        extras?: string[];
        sellerComments?: string;
        vehicleDetails?: {
            previousOwners?: number;
            serviceHistory?: string;
            colour?: string;
            bodyType?: string;
            warranty?: string;
        };
    }
) => {
    try {
        await connectToDatabase();

        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            id,
            data,
            {new: true, runValidators: true}
        );

        if (!updatedVehicle) throw new Error('Vehicle not found');

        return updatedVehicle;
    } catch (error) {
        console.error('Error updating vehicle:', error);
        throw error;
    }
};

export const showVehicleInApp = async (id: string, data: {
    visible: boolean
}) => {
    try {
        await connectToDatabase();

        const showVehicle = await Vehicle.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!showVehicle) throw new Error('Vehicle not found');

        return showVehicle;
    } catch (error) {
        console.error('Error updating vehicle visibility:', error);
        throw error;
    }
}

export const updateVehicleImageOrder = async (
    id: string,
    reorderedPublicIds: string[]
) => {
    try {
        await connectToDatabase();

        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            id,
            {
                imagePublicIds: reorderedPublicIds,
            },
            {new: true, runValidators: true}
        );

        if (!updatedVehicle) throw new Error("Vehicle not found");

        return updatedVehicle;
    } catch (error) {
        console.error("Error updating image order:", error);
        throw error;
    }
};