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
        }

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
        }

        const {
            data,
            error
        } = await this.product.findOneProduct(param);
        if (error) {
            return utils.wrapperError(error)
        }
        return utils.wrapperData(data);
    }

    
}



export default QueryProduct;