import mongoose from "mongoose";
const { Schema, model } = mongoose;

const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },
    capion: {
        type: String,
        required: true
    },
    trickUser: {
        type: String,
        required: true
    },
    foreignKey: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
}, { timestamps: true });


const Location = model('Location', locationSchema);


export default Location;
