import User from "../models/User.js";


//Update User CartData : /api/cart/update



export const update = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Now it will have value
    const { cartItems } = req.body;

    if (!cartItems || typeof cartItems !== "object") {
      return res.status(400).json({ success: false, message: "Invalid cart items" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.cartItems = cartItems;
    await user.save();

    return res.status(200).json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log("Cart update error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};