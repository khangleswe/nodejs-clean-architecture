const express = require("express");
const { loginSchema, registerSchema } = require("../validators/authValidator");

const authRoutes = ({ authController, validationMiddleware }) => {
  const router = express.Router();

  router.post(
    "/login",
    validationMiddleware({ body: loginSchema }),
    (req, res, next) => authController.login(req, res, next)
  );

  router.post(
    "/register",
    validationMiddleware({ body: registerSchema }),
    (req, res, next) => authController.register(req, res, next)
  );

  return router;
};

module.exports = authRoutes;
