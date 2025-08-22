import { Router } from "express";
import {createLead, getLeads, getLead, updateLead, deleteLead } from "../controllers/leadController.js";


const router = router();

router.use(authMiddleware);
router.post("/", createLead);
router.post("/", getLeads);
router.post("/:id", getLead);
router.post("/:id", updateLead);
router.post("/:id", deleteLead);

export default router;