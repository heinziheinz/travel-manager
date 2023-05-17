import mongoose from "mongoose";
const { Schema, model } = mongoose;

const locationSchema = new Schema({
    images: {
        type: String,
        required: true
    },
    capion: {
        type: String,
        required: true
    },
    caption2: {
        type: String,
        required: true
    },
    foreignKey: {
        type: String,
        required: true
    }
}, { timestamps: true });


const Location = model('Location', locationSchema);


export default Location;
