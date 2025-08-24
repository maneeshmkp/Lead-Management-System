import { Router } from "express";
import { createLead, getLeads, getLead, updateLead, deleteLead } from "../controllers/leadController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createLead);         
router.get("/", getLeads);            
router.get("/:id", getLead);          
router.put("/:id", updateLead);       
router.delete("/:id", deleteLead);   


export default router;
