import express, { Request, Response } from "express";
import { validateCard, addUserCard, getAllUserCards } from "./services";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello from the TypeScript world!!</h1>");
});

router.get("/api/user/card/list", async function (req: Request, res: Response) {
  const results = getAllUserCards();
  res.json(results);
});

router.post("/api/user/card/add", async function (req: Request, res: Response) {
  validateCard(req.body.card);
  addUserCard(req.body.name, req.body.card, req.body.limit);
  res.json({ success: "Inserted!" });
});

router.delete(
  "/api/user/card/:id",
  async function (req: Request, res: Response) {
    res.json({ success: "Deleted!" });
  }
);

export default router;
