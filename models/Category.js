import mongoose from "mongoose";

const { Schema, model } = mongoose;

let Category;

try {
  // Try to retrieve the existing model
  Category = model('Category');
} catch (error) {
  // If the model doesn't exist, create it
  const CategorySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    properties: [{ type: Object }],
  });

  Category = model('Category', CategorySchema);
}

export { Category };