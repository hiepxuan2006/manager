"use strict";

module.exports.sendSuccess =
  (req, res) =>
  (data, status = 200) => {
    // _setQueryTime(req, res)
    res.actionStatus = "success";

    return res.status(status).send({
      success: true,
      data,
    });
  };

module.exports.sendError = (req, res) => (error) => {
  // _setQueryTime(req, res)
  res.actionStatus = "failed";
  const code =
    error.name && error.name === "ValidationError"
      ? 400
      : parseInt(error.code) || 500;

  const message = typeof error === "string" ? error : error.message || "";
  return res.status(code).send({
    success: false,
    message,
  });
};
