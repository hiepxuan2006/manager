const { getModel } = require("../connection/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const falcon = require("../helper/falcon");
const Account = getModel("Account");

module.exports.registerAccount = async (args = {}) => {
  const Account = getModel("Account");
  const { email, password } = args;

  const account = await Account.findOne({ email }).lean();

  if (account) throw new Error("Email already exists");
  const hashPassword = await bcrypt.hashSync(password, salt);

  const newAccount = new Account({
    email,
    password: hashPassword,
  });

  const result = await newAccount.save();
  return { message: "Register success", email: result.email };
};

module.exports.login = async (args = {}) => {
  const { password, email } = args;
  const _prefix = "refresh:token";

  const _getKeyRefreshToken = (email) => {
    return `${_prefix}:${email}`;
  };

  const account = await Account.findOne({ email }).lean();
  if (!account) {
    throw new Error("Email or password fail");
  }
  const {
    email: emailDb,
    _id,
    is_admin,
    roles,
    password: passwordDb,
  } = account;
  const validatorPassword = await bcrypt.compareSync(password, passwordDb);
  if (!validatorPassword) throw new Error("Email or password fail");

  const token = await jwt.sign(
    { id: _id, email, role: roles, is_admin },
    process.env.SECRET_KEY_TOKEN,
    {
      expiresIn: "1d",
    }
  );
  const refreshToken = await jwt.sign(
    { id: _id, email, role: roles },
    process.env.SECRET_KEY_REFRESH_TOKEN
  );
  const keySaveCateRefreshToken = _getKeyRefreshToken(email);
  await falcon.set({
    key: keySaveCateRefreshToken,
    value: refreshToken,
  });
  return {
    email: emailDb,
    roles,
    is_admin,
    access_token: token,
  };
};

module.exports.settingRole = async (args = {}) => {
  const { accountId, role } = args;
  const account = await Account.findOneAndUpdate(
    { _id: accountId },
    { $addToSet: { roles: "admin" } }
  );
  return accountId;
};
