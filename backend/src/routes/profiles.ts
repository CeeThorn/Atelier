//import express from "express"
import { Router } from "express";
import { getProfiles } from "../actions/profiles";


//const  router = express.Router();

const router = Router();

router.post("/", getProfiles);

export default router;