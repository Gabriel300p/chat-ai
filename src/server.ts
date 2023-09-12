import express from "express";
import agendamentoRoutes from "./routes";

const app = express();
app.use(express.json());

app.use("/agendamentos", agendamentoRoutes);

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000.");
});
