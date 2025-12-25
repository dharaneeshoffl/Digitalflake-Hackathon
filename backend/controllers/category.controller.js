import Category from "../models/Category.js";

export const create = async (req, res) => {
  const category = await Category.create({
    name: req.body.name,
    status: req.body.status,
    image: req.file ? `/uploads/${req.file.filename}` : "",
  });
  res.json(category);
};

export const getAll = async (req, res) => {
  res.json(await Category.find());
};

export const getOne = async (req, res) => {
  res.json(await Category.findById(req.params.id));
};

export const update = async (req, res) => {
  const data = {
    name: req.body.name,
    status: req.body.status,
  };
  if (req.file) data.image = `/uploads/${req.file.filename}`;

  res.json(
    await Category.findByIdAndUpdate(req.params.id, data, { new: true })
  );
};

export const remove = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
