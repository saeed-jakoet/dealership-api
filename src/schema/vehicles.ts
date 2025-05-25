import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    name: String,
    used: Boolean,
    visible: Boolean,
    mileage: String,
    transmissionType: String,
    price: String,
    fuelType: String,
    year: String,
    brand: String,
    imageUrl: String,
    imageUrls: [String],
    extras: [String],
    sellerComments: String,
    vehicleDetails: {
        previousOwners: Number,
        serviceHistory: String,
        colour: String,
        bodyType: String,
        warranty: String,
    },
}, {timestamps: true});

export const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);
