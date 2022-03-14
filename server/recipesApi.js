import { Router } from "express";

export function RecipesApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const recipe = await mongoDatabase
      .collection("Food-recipes")
      .find()
      .map(
        ({
          _id,
          name,
          type,
          recipeType,
          time,
          difficulty,
          topText,
          ingredients,
          img,
        }) => ({
          _id,
          name,
          type,
          recipeType,
          time,
          difficulty,
          topText,
          ingredients,
          img,
        })
      )
      .limit(10)
      .toArray();
    res.json(recipe);
  });

  router.post("/new", (req, res) => {
    const { title } = req.body;
    const result = mongoDatabase.collection("recipe").insertOne({
      title,
    });
    res.sendStatus(500);
  });

  return router;
}
