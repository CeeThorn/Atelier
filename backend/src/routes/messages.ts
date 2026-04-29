//import express from "express"
import { Router } from "express";
import { createConversationWithMessage } from "../actions/messages";


//const  router = express.Router();

const router = Router();

router.post("/", createConversationWithMessage);

export default router;