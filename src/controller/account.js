const { sendError, sendSuccess } = require("../constants/response");
const AccountAction = require("../actions/AccountAction");

module.exports.registerAccount = (req, res) => {
  const { body } = req;
  AccountAction.registerAccount(body)
    .then(sendSuccess(req, res))
    .catch(sendError(req, res));
};

module.exports.login = (req, res) => {
  const { body } = req;
  AccountAction.login(body)
    .then(sendSuccess(req, res))
    .catch(sendError(req, res));
};

module.exports.settingRole = (req, res) => {
  const { accountId } = req.params;
  const { role } = req.body;

  AccountAction.settingRole({ accountId, role })
    .then(sendSuccess(req, res))
    .catch(sendError(req, res));
};
