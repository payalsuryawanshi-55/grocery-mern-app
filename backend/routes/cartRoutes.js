import express from "express"; // ✅ Import Express, not Mongoose
import authUser from "../middleware/authUser.js";
import { update } from "../controllers/cartController.js";

const cartRouter = express.Router(); // ✅ Use express.Router()

cartRouter.post('/update', authUser, update);

export default cartRouter;