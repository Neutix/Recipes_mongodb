import { Router } from "express";

export function RecipesApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const recipe = await mongoDatabase
      .collection("Food-recipes")
      .find()
      .map(({ _id, name, type, recipeType, time, topText, img }) => ({
        _id,
        name,
        type,
        recipeType,
        time,
        topText,
        img,
      }))
      .limit(100)
      .toArray();
    res.json(recipe);
  });

  router.post("/new", (req, res) => {
    const { name, type, recipeType, time, topText, img } = req.body;
    console.log(name, type, recipeType, time, topText, img);
    const result = mongoDatabase.collection("Food-recipes").insertOne({
      name,
      type,
      recipeType,
      time,
      topText,
      img,
    });
  });

  return router;
}
