import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    tag: {
        type: String,
    },
});

const product = mongoose.model('Product', productSchema);

export default product;