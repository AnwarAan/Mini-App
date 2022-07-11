import utils from "../../helpers/utils.js";
import err from '../../helpers/error.js'
import product from "../../models/products_model.js";

class Product {
    async findManyProduct() {
        try {
            const result = await product.find({})
            return utils.wrapperData(result);
        } catch (error) {
            return utils.wrapperError(err.notFound('Product Not Found'));
        }
    }

    async findOneProduct(params) {
        try {
            const result = await product.find(params);
            if (result) return utils.wrapperData(result);
            else return utils.wrapperError(err.notFound('Product Not Found'));
        } catch (error) {
            return utils.wrapperError(err.notFound('Product Not Found'))
        }
    }

    async insertOneProduct(data) {
        try {
            const addProduct = new product(data);
            const result = await addProduct.save();
            return utils.wrapperData(result);
        } catch (error) {
            console.log(error);
            return utils.wrapperError(err.internalServerError('Insert Product Failed'));
        }
    }

    async updateProduct(data, params) {
        try {
            const result = await product.updateOne(params, data);
            return utils.wrapperData(result);
        } catch (error) {
            console.log(error);
            return utils.wrapperError(err.internalServerError('Update Product Failed'));
        }
    }

    async deleteOneProduct(params) {
        try {
            const result = await product.deleteOne(params);
            return utils.wrapperData(result);
        } catch (error) {
            console.log(error)
            return utils.wrapperError(err.internalServerError('Delete Product Failed'));
        }
    }

    async deleteManyProduct() {
        try {
            const result = await product.deleteMany({});
            return utils.wrapperData(result);
        } catch (error) {
            console.log(error);
            return utils.wrapperError(err.internalServerError('Delete Product Failed'));
        }
    }
}

export default Product;