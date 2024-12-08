import mongoose, { Schema } from "mongoose";

const medicineSchem = new Schema({
    name: {
        type: String,
        index: true,
        trim: true
    },
    manufacturers: {
        type: String,
        default: ""
    },
    salt_composition: {
        type: String,
        default: ""
    },
    medicine_type: {
        type: String,
        default: ""
    },
    introduction: {
        type: String,
        default: ""
    },
    benefits: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    how_to_use: {
        type: String,
        default: ""
    },
    safety_advise: {
        type: String,
        default: ""
    },
    if_miss: {
        type: String,
        default: ""
    },
    packaging_details: {
        type: String,
        default: ""
    },
    package_type: {
        type: String,
        default: ""
    },
    quantity: {
        type: String,
        default: ""
    },
    product_form: {
        type: String,
        default: ""
    },
    price: {
        type: String,
        default: ""
    },
    prescription_required: {
        type: String,
        default: ""
    },
    fact_box: {
        type: String,
        default: ""
    },
    primary_use: {
        type: String,
        default: ""
    },
    storage: {
        type: String,
        default: ""
    },
    use_of: {
        type: String,
        default: ""
    },
    common_side_effect: {
        type: String,
        default: ""
    },
    alcohol_interaction: {
        type: String,
        default: ""
    },
    pregnancy_interaction: {
        type: String,
        default: ""
    },
    lactation_interaction: {
        type: String,
        default: ""
    },
    driving_interaction: {
        type: String,
        default: ""
    },
    kidney_interaction: {
        type: String,
        default: ""
    },
    liver_interaction: {
        type: String,
        default: ""
    },
    manufacturer_address: {
        type: String,
        default: ""
    },
    qa: {
        type: String,
        default: ""
    },
    how_it_works: {
        type: String,
        default: ""
    },
    interaction: {
        type: String,
        default: ""
    },
    manufacturer_details: {
        type: String,
        default: ""
    },
    marketer_details: {
        type: String,
        default: ""
    },
    reference: {
        type: String,
        default: ""
    },
    image_url: [{
        type: String,
    }]
}, { timestamps: true });

export const Medicine = mongoose.model('Medicine', medicineSchem);