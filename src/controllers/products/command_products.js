import err from '../../helpers/error.js';
import utils from '../../helpers/utils.js';
import QueryProduct from './query_products.js';

class CommandProduct {
    constructor() {
        this.query = new QueryProduct
    }

    async insertProduct(payload) {
        const {
            name,
            price,
            rating,
            tag
        } = payload;

        const dataProduct = {
            name: name,
            price: price,
            rating: rating,
            tag: tag
        }

        const {
            data,
            error
        } = await this.query.product.insertOneProduct(dataProduct);
        if (error) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }
    
    async updateProduct(params, payload) {
        const {
            name,
            price,
            rating,
            tag
        } = payload;

        const product = await this.query.getProductById(params);
        if (product.error) {
            return utils.wrapperError(err.notFound('Upload Product Failed'))
        }
        const renewProduct = product.data;
        let updateData = {};

        if (name !== renewProduct.name) {
            updateData.name = name;
        }
        if (price !== renewProduct.price) {
            updateData.price = price;
        }
        if (rating !== renewProduct.rating) {
            updateData.rating = rating;
        }
        if (tag !== renewProduct.tag) {
            updateData.tag = tag;
        }

        const param = {
            _id: params
        }
        const updateProduct = await this.query.product.updateProduct(updateData, param)
        if (updateProduct.error) {
            return updateProduct.error;
        }
        return utils.wrapperData(renewProduct);
    }

    async deleteProduct(productId) {
        const param = {
            _id: productId
        }
        
        const {
            data,
            error
        } = await this.query.product.deleteOneProduct(param);
        if (error) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }

    async deleteProducts() {
        const {
            data,
            error
        } = await this.query.product.deleteManyProduct();
        if (error) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }
}

export default CommandProduct;