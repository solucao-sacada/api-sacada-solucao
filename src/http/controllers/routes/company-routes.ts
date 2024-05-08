import { Router } from "express";
import { DeleteCompanyController } from "../companys/delete/delete-company-controller";
import { FindCompanyController } from "../companys/find-by-id/find-by-id-company-controller";
import { UpdateCompanyController } from "../companys/update/update-user-controller";

export const companiesRoutes = Router();

const deleteCompanyController = new DeleteCompanyController();
const findCompanyController = new FindCompanyController();
const updateCompanyController = new UpdateCompanyController();

companiesRoutes.delete("/:id", deleteCompanyController.handle);

companiesRoutes.get("/:id", findCompanyController.handle);

companiesRoutes.put("/", updateCompanyController.handle);



