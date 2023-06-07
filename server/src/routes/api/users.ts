import { Router } from "express";
import {
    getAllUsers,
    deleteUser,
    getUser,
    updateUser,
} from "../../controllers/usersController.js";
import verifyRoles from "../../middleware/verifyRoles.js";
import ROLES_LIST from "../../config/roles_list.js";

const userApiRouter = Router();

userApiRouter.route("/").get(getAllUsers);

userApiRouter
    .route("/:id")
    .get(getUser)
    .put(updateUser)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

export default userApiRouter;
