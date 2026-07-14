import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"

//Add Product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    console.log("req.body.productData:", req.body.productData);
    const productData = JSON.parse(req.body.productData);
    console.log("Parsed productData:", productData);

    const images = req.files;
    if (!images || images.length === 0) {
      return res.json({ success: false, message: "No images uploaded" });
    }

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    ); 

   await Product.create({
  ...productData,
  image: imagesUrl[0],  
});


    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error("Error in addProduct:", error.message);
    res.json({ success: false, message: error.message });
  }
};


//Get Product : /api/product/list
export const productList = async (req , res)=>{
try {
    const products = await Product.find({})
    res.json({success: true, products})
} catch (error) {
     console.log(error.message);
    res.json({ success: false, message: error.message });
}


}

//Get single Product : /api/product/id
export const productById = async (req , res)=>{
    try {
        const { id } = res.body
        const product = await Product.findById(id)
        res.json({success: true, product})
    } catch (error) {
        console.log(error.message);
    res.json({ success: false, message: error.message });
    }
}

//Change Product instock: /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};