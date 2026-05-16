import { Router } from "express";
import { deleteConversation, getConversations } from "../actions/conversations";

const router = Router();

router.get("/", getConversations);
router.delete("/"), deleteConversation

export default router;