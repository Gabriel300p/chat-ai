import { Request, Response } from "express";
import { ChatGPTService } from "../utils/chatGPT";
import { db } from "../libs/db";

const openaiApiKey = process.env.OPENAI_API_KEY || "";
const chatGPTService = new ChatGPTService(openaiApiKey);

export async function criarAgendamento(
  req: Request,
  res: Response
): Promise<void> {
  const { mensagem } = req.body;

  try {
    const response = await chatGPTService.generateResponse(mensagem);

    const [servico, data] = response.split("\n");
    const [, nomeServico] = servico.split(". ");
    const [, nomeData, nomeHorario] = data.split(": ");

    // Salvar os dados no banco de dados usando o Prisma
    await db.agendamentos.create({
      data: {
        servico: nomeServico,
        data: nomeData,
        horario: nomeHorario,
      },
    });

    res.status(200).json({ message: "Agendamento criado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro durante o agendamento." });
  }
}
