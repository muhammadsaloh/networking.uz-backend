const UserController = require("../controllers/UserController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = require("express").Router();

router.post("/signup", UserController.UserSignUpPostController);
router.post("/login", UserController.UserLoginPostController);
router.get("/get_me", AuthMiddleware, UserController.GetMeController);

module.exports = {
	path: "/users",
	router,
};