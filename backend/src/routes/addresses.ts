import { Router } from "express";
import { getAddresses, updateAddresses } from "../actions/addresses";

const router = Router();

router.get("/", getAddresses);
router.put("/", updateAddresses);//use put or patch when updating data

export default router;