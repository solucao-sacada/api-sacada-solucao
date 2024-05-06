import { Router } from "express";
import { CreateBudgetController } from "../budgets/create/create-budgets-controller";
import { UpdateBudgetController } from "../budgets/update/update-budgets-controller";
import { DeleteBudgetController } from "../budgets/delete/delete-budgets-controller";
import { FindBudgetByIdController } from "../budgets/find-by-id/find-by-id-budgets-controller";
import { ListBudgetsController } from "../budgets/list/list-budgets-controller";
import { ListBudgetsByClientController } from "../budgets/list-by-client/list-by-client-budgets-controller";

export const budgetsRoutes = Router();

const createBudgetController = new CreateBudgetController();
const updateBudgetController = new UpdateBudgetController();
const deleteBudgetController = new DeleteBudgetController();
const findBudgetByIdController = new FindBudgetByIdController();
const listBudgetsController = new ListBudgetsController();
const listBudgetsByClientController = new ListBudgetsByClientController();

// criar um orçamento
budgetsRoutes.post("/", createBudgetController.handle)

// atualizar um orçamento
budgetsRoutes.put("/:id", updateBudgetController.handle)

// deletar um orçamento
budgetsRoutes.delete("/:id", deleteBudgetController.handle)

// buscar um orçamento pelo id
budgetsRoutes.get("/:id", findBudgetByIdController.handle)

// listar todos os orçamentos
budgetsRoutes.get("/", listBudgetsController.handle)

// buscar todos os orçamentos de um cliente
budgetsRoutes.get("/client/:id", listBudgetsByClientController.handle)