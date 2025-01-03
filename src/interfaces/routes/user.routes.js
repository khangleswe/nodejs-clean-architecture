const express = require("express");

const userRoutes = ({ userController, authMiddleware }) => {
  const router = express.Router();

  router.get("/profile", authMiddleware, (req, res, next) =>
    userController.getProfile(req, res, next)
  );

  router.put("/profile", authMiddleware, (req, res, next) =>
    userController.updateProfile(req, res, next)
  );

  return router;
};

module.exports = userRoutes;
