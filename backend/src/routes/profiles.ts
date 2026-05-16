//import express from "express"
import { Router } from "express";
import { getProfiles } from "../actions/profiles";
import { updateAddresses } from "../actions/addresses";


//const  router = express.Router();

const router = Router();

router.post("/", getProfiles);
router.put("/", updateAddresses);

export default router;