import err from '../../helpers/error.js';
import utils from '../../helpers/utils.js';
import QueryProduct from './query_products.js';

class CommandProduct {
    constructor() {
        this.query = new QueryProduct
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


}

export default CommandProduct;