import { Router } from "express";
import { getConversations } from "../actions/conversations";

const router = Router();

router.get("/", getConversations);

export default router;