const express = require("express");
const browserRouter = express.Router();
const { PostModel } = require("../models/Post.model");


browserRouter.get("/", async (req, res) => {
  const { sort, category, input } = req.query;
  try {
    if (sort && category) {
      if (sort === "asc" && category) {
        const data = await PostModel.find({ category }).sort({ postedAt: 1 });
        res.send(data);
      } else if (sort === "desc" && category) {
        const data = await PostModel.find({ category }).sort({ postedAt: -1 });
        res.send(data);
      }
    } else if (sort) {
      if (sort === "asc") {
        const data = await PostModel.find().sort({ postedAt: 1 });
        res.send(data);
      } else if (sort === "desc") {
        const data = await PostModel.find().sort({ postedAt: -1 });
        res.send(data);
      }
    } else if (category) {
      try {
        const data = await PostModel.find({ category });
        res.send(data);
      } catch (e) {
        res.status(500).send(e.message);
      }
    } else if (input) {
      try {
        const data = await PostModel.find({
          name: { $regex: input, $options: "i" },
        });
        res.send(data);
      } catch (e) {
        res.status(500).send(e.message);
      }
    } else {
      try {
        const data = await PostModel.find();
        res.send(data);
      } catch (e) {
        res.status(500).send(e.message);
      }
    }
  } catch (error) {
    console.log({ error: error });
    res.send({ msg: "Something went wrong" });
  }
});

browserRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.send("Deleted post successfully");
  } catch (err) {
    console.error(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  browserRouter,
};
