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
    const params = req.params.productId;
    const validateParams = utils.validateSchema(params, schema.getProductSchema);
    if (validateParams.error) return utils.responseFail(res, validateParams.error)
    const response = await query.getProductById(params)
    return (response.error) ? utils.responseFail(res, response.error) : utils.responseSuccess(res, 200, 'Success Get Product', response.data);
}

const getProductByName = async (req, res) => {
    const params = req.params.productName;
    const validateParams = utils.validateSchema(params, schema.getProductByNameSchema);
    if (validateParams.error) return utils.responseFail(res, validateName.error);
    const response = await query.getProductByName(params);
    return (response.error) ? utils.responseFail(res, response.error) : utils.responseSuccess(res, 200, 'Success Get Product', response.data);
}

const postProduct = async (req, res) => {
    const payload = req.body;
    const validatePayload = utils.validateSchema(payload, schema.addProductSchema);
    if (validatePayload.error) return utils.responseFail(res, validatePayload.error);
    const response = await command.insertProduct(payload);
    return (response.error) ? utils.responseFail(res, response.error) : utils.responseSuccess(res, 201, 'Success Add Produtc', response.data)
}

const updateProduct = async (req, res) => {
    const params = req.params.productId;
    const payload = req.body;
    const validateParam = utils.validateSchema(params, schema.getProductSchema);
    if (validateParam.error) return utils.responseFail(res, validateParam.error);
    const validateBody = utils.validateSchema(payload, schema.updateProductSchema);
    if (validateBody.error) return utils.responseFail(res, validateBody.error);
    const response = await command.updateProduct(params, payload);
    return (response.error) ? utils.responseFail(res, response.error) : utils.responseSuccess(res, 200, 'Success Update Product', response.data)
}

const deleteProduct = async (req, res) => {
    const params = req.params.productId
    const validateParams = utils.validateSchema(params, schema.deleteProductSchema);
    if (validateParams.error) return utils.responseFail(res, validateParams.error);
    const response = await command.deleteProduct(params);
    return (response.error) ? utils.responseFail(err, response.error) : utils.responseSuccess(res, 200, 'Success Delete Product', response.data)
}

const deleteProducts = async (req, res) => {
    const response = await command.deleteProducts();
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