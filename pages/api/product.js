import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";

const featuredProductId =  '64917e6124a69896fe51d71f';
export default async function handler(req, res) {
    await mongooseConnect();
    const featuredProduct = await Product.findById(featuredProductId);
    const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    const commonProduct = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: "$categoryData",
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryData.parent",
          foreignField: "_id",
          as: "parentCategoryData",
        },
      },
      {
        $match: {
          $or: [
            { category: { $exists: true } },
            { "categoryData.parent": { $exists: true } },
            { "parentCategoryData._id": { $exists: true } },
          ],
          _id: { $exists: true }, // Added condition for _id field
        },
      },
    ]);
    res.status(201).json({featuredProduct,newProducts,commonProduct,products});
  }
  