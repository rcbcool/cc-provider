import express, { Request, Response } from "express";
import { validateCard, addUserCard, getAllUserCards } from "./services";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello from the TypeScript world!!</h1>");
});

router.get("/api/user/card/list", async function (req: Request, res: Response) {
  const results = await getAllUserCards();
  res.json(results);
});

router.post("/api/user/card/add", async function (req: Request, res: Response) {
  const result = await addUserCard(
    req.body.name,
    req.body.card_no,
    req.body.limit
  );
  if (result) {
    res
      .status(200)
      .json({ status: "success", message: "Details created success!" });
  } else {
    res
      .status(400)
      .json({ status: "error", message: "Some error. Please try later." });
  }
});

router.delete(
  "/api/user/card/:id",
  async function (req: Request, res: Response) {
    res.json({ success: "Deleted!" });
  }
);

export default router;
