import Product from "./repositories_products.js";
import utils from "../../helpers/utils.js";

class QueryProduct {
    constructor() {
        this.product = new Product()
    }

    async getProduct() {
        const {
            data,
            error
        } = await this.product.findManyProduct({});
        if (error || data.length == 0) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }

    async getProductById(productId) {
        const param = {
            _id: productId
        };
        const {
            data,
            error
        } = await this.product.findOneProduct(param);
        if (error) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data)
    }

    async getProductByName(name) {
        const param = {
            name: name
        };
        const {
            data,
            error
        } = await this.product.findOneProduct(param);
        if (error) {
            return utils.wrapperError(error)
        }
        return utils.wrapperData(data);
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
        } = await this.product.insertOneProduct(dataProduct);
        if (error) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }

    async deleteProduct(productId) {
        const param = {
            _id: productId
        }
        const {
            data,
            error
        } = await this.product.deleteOneProduct(param);
        if (error) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }

    async deleteProducts() {
        const {
            data,
            error
        } = await this.product.deleteManyProduct();
        if (error) {
            return utils.wrapperError(error);
        }
        return utils.wrapperData(data);
    }
}



export default QueryProduct;