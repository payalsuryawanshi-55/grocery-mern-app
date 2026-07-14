import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
  const { sellerToken } = req.cookies;

  // ✅ If token is missing
  if (!sellerToken) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized - No Token Provided",
    });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    // ✅ Check if email matches seller email
    if (decoded.email !== process.env.SELLER_EMAIL) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized - Invalid Seller",
      });
    }

    // ✅ Pass to next middleware
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

export default authSeller;