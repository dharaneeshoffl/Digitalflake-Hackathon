import SubCategory from "../models/SubCategory.js";


export const create = async (req, res) => {
  try {
    const subCategory = await SubCategory.create({
      name: req.body.name,
      status: req.body.status,
      category: req.body.category,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAll = async (req, res) => {
  try {
    const data = await SubCategory.find().populate("category");

    res.json(
      data.map((item) => ({
        ...item._doc,
        categoryName: item.category?.name || "",
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getOne = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    res.json(subCategory);
  } catch (error) {
    res.status(404).json({ message: "SubCategory not found" });
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

    const updated = await SubCategory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const remove = async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
