import Product from "../models/Product.js";


export const create = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      status: req.body.status,
      category: req.body.category,
      subcategory: req.body.subcategory,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAll = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subcategory");

    res.json(
      products.map((p) => ({
        ...p._doc,
        categoryName: p.category?.name || "",
        subCategoryName: p.subcategory?.name || "",
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};


export const update = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      status: req.body.status,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const remove = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
