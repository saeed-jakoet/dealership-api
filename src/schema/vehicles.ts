import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    used: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
    mileage: { type: String, required: true },
    transmissionType: { type: String, required: true },
    price: { type: String, required: true },
    fuelType: { type: String, required: true },
    year: { type: String, required: true },
    brand: { type: String, required: true },
    // Cloudinary public IDs for image management (ordered array)
    imagePublicIds: [{ type: String }], // First ID is main image, rest are additional images
    extras: [{ type: String }],
    sellerComments: { type: String },
    vehicleDetails: {
        previousOwners: { type: Number, default: 0 },
        serviceHistory: { type: String },
        colour: { type: String, required: true },
        bodyType: { type: String, required: true },
        warranty: { type: String },
    },
}, {timestamps: true});

// Index for better query performance
vehicleSchema.index({ brand: 1, year: 1, visible: 1 });
vehicleSchema.index({ price: 1, visible: 1 });
vehicleSchema.index({ createdAt: -1 });

export const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);
