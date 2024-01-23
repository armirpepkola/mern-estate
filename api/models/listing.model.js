import mongoose from 'mongoose';

// Define the schema for the Listing model
const listingSchema = new mongoose.Schema(
    {
        // Name of the listing
        name: {
        type: String,
        required: true,
        },
        // Description of the listing
        description: {
        type: String,
        required: true,
        },
        // Address of the listing
        address: {
        type: String,
        required: true,
        },
        // Regular price of the listing
        regularPrice: {
        type: Number,
        required: true,
        },
        // Discounted price of the listing
        discountPrice: {
        type: Number,
        required: true,
        },
        // Number of bathrooms in the listing
        bathrooms: {
        type: Number,
        required: true,
        },
        // Number of bedrooms in the listing
        bedrooms: {
        type: Number,
        required: true,
        },
        // Indicates if the listing is furnished or not
        furnished: {
        type: Boolean,
        required: true,
        },
        // Indicates if parking is available for the listing
        parking: {
        type: Boolean,
        required: true,
        },
        // Type of the listing (e.g., sale or rent)
        type: {
        type: String,
        required: true,
        },
        // Indicates if there is an offer on the listing
        offer: {
        type: Boolean,
        required: true,
        },
        // Array of image URLs for the listing
        imageUrls: {
        type: Array,
        required: true,
        },
        // Reference to the user who created the listing
        userRef: {
        type: String,
        required: true,
        },
    },
    // Add timestamps to track creation and modification dates
    { timestamps: true }
);

// Create the Listing model using the schema
const Listing = mongoose.model('Listing', listingSchema);

// Export the Listing model
export default Listing;