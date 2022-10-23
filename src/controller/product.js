const { sendError, sendSuccess } = require("../constants/response");
const ProductAction = require("../actions/ProductAction");

module.exports.createProduct = (req, res) => {
  ProductAction.createProduct()
    .then(sendSuccess(req, res))
    .catch(sendError(req, res));
};
