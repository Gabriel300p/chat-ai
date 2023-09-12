import { Router } from "express";
import { criarAgendamento } from "../controllers/AgendamentoController";

const router = Router();

router.post("/agendamento", criarAgendamento);

export default router;
