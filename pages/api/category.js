import {mongooseConnect} from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    await mongooseConnect();
    const category = await Category.find({ parent: { $exists: false } }, null, {
        sort: { _id: 1 },
      });
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
    res.status(201).json({category,commonProduct});
  }
  