import utils from "../../helpers/utils.js";
import schema from "./validation_products.js";
import QueryProduct from "./query_products.js";
import CommandProduct from "./command_products.js";

const query = new QueryProduct();
const command = new CommandProduct();

const getProduct = async (req, res) => {
    const response = await query.getProduct();
    return (response.error) ? utils.responseFail(res, response.error) : utils.responseSuccess(res, 200, 'Success Get Product', response.data);
}

const getProductById = async (req, res) => {
    const productId = req.params.productId;
    const validateParam = utils.validateSchema(productId, schema.getProductSchema);
    if (validateParam.error) return utils.responseFail(res, validateParam.error)
    const response = await query.getProductById(productId)
    return (response.error) ? utils.responseFail(res, response.error) : utils.responseSuccess(res, 200, 'Success Get Product', response.data);
}

const getProductByName = async (req, res) => {
    const productName = req.params.productName;
    const validateName = utils.validateSchema(productName, schema.getProductByNameSchema);
    if (validateName.error) return utils.responseFail(res, validateName.error);
    const response = await query.getProductByName(productName);
    return (response.error) ? utils.responseFail(res, response.error) : utils.responseSuccess(res, 200, 'Success Get Product', response.data);
}

const postProduct = async (req, res) => {
    const body = req.body;
    const validateParam = utils.validateSchema(body, schema.addProductSchema);
    if (validateParam.error) return utils.responseFail(res, validateParam.error);
    const response = await query.insertProduct(body);
    return (response.error) ? utils.responseFail(res, response.error) : utils.responseSuccess(res, 201, 'Success Add Produtc', response.data)
}

const updateProduct = async (req, res) => {
    const params = req.params.productId;
    const body = req.body;
    const validateParam = utils.validateSchema(params, schema.getProductSchema);
    if (validateParam.error) return utils.responseFail(res, validateParam.error);
    const validateBody = utils.validateSchema(body, schema.updateProductSchema);
    if (validateBody.error) return utils.responseFail(res, validateBody.error);
    const response = await command.updateProduct(params, body);
    return (response.error) ? utils.responseFail(res, response.error) : utils.responseSuccess(res, 200, 'Success Update Product', response.data)
}

const deleteProduct = async (req, res) => {
    const params = req.params.productId
    const validateParam = utils.validateSchema(params, schema.deleteProductSchema);
    if (validateParam.error) return utils.responseFail(res, validateParam.error);
    const response = await query.deleteProduct(params);
    return (response.error) ? utils.responseFail(err, response.error) : utils.responseSuccess(res, 200, 'Success Delete Product', response.data)
}

const deleteProducts = async (req, res) => {
    const response = await query.deleteProducts();
    return (response.error) ? utils.responseFail(err, response.error) : utils.responseSuccess(res, 200, 'Success Delete Product', response.data);
}

export default {
    getProduct,
    getProductById,
    getProductByName,
    postProduct,
    updateProduct,
    deleteProduct,
    deleteProducts
}