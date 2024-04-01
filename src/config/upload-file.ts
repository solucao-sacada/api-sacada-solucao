import { env } from "@/env";
import multer from "multer";
import { randomUUID } from "node:crypto";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

// Cria função para receber mais de um diretorio
const getDirectories = (source: string): string[] =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

// Variável tmpFolder recebe o caminho da pasta tmp
// const tmpFolder = resolve(__dirname, "..", "..", "src");
const envTmpFolder = env.NODE_ENV === "development" ? "src" : "app";
const tmpFolder = resolve(__dirname, "..", "..", envTmpFolder);

// Cria array de string vazia com
const tempDirectories: string[] = getDirectories(tmpFolder);

// Filtra o diretorio recebido retornando em um Objeto.assign
const tmpDirectoriesUploadConfig = tempDirectories
  .map((directory) => {
    const tmpFolder = resolve(__dirname, "..", directory);
    console.log(tmpFolder);
    return {
      [directory]: {
        directory: tmpFolder,
        storage: multer.diskStorage({
          destination: tmpFolder,
          filename(request, file, callback) {
            const fileHash = randomUUID();
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
          },
        }),
      },
    };
  })
  .reduce((object, item) => {
    const [key] = Object.keys(item);
    return Object.assign(object, { [key]: item[key] });
  }, {});

// Exporta variável que retorna caminho recebido
export { tmpDirectoriesUploadConfig };
