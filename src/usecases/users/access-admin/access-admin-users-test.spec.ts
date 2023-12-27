import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcrypt";
import { AccessAdminUsersUseCase } from "./access-admin-users-usecases";
import { InMemoryKeysRepository } from "@/repositories/in-memory/in-memory-keys-repository";
import { randomUUID } from "crypto";
import { AppError } from "@/usecases/errors/app-error";

let usersRepositoryInMemory: InMemoryUsersRepository;
let keysRepositoryInMemory: InMemoryKeysRepository
let stu: AccessAdminUsersUseCase;

describe("Get Access Admin for user (unit)", () => {
    beforeEach(async () => {
        usersRepositoryInMemory = new InMemoryUsersRepository()
        keysRepositoryInMemory = new InMemoryKeysRepository()
        stu = new AccessAdminUsersUseCase(
            usersRepositoryInMemory,
            keysRepositoryInMemory 
        )

         await usersRepositoryInMemory.create({
            id:'0c2db0f2-04b4-4ff3-9a4f-013b9a740f3a',
            cpf: "12345678910",
            email: 'user-test@email.com',
            name: 'John Doe',
            phone: '77-77777-7777',
            password: await hash('123456', 8),
        }); 
        await keysRepositoryInMemory.create({
            id: 'a87f108e-f876-4ff0-93d9-7ad9c85202b6',
            key:'YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2',
            active: false,
            createdAt: new Date(),
        })

    });

    test("Should be able to change access admin user with key", async () => {
        const getAccessAdmin = await stu.execute({
            idUser: '0c2db0f2-04b4-4ff3-9a4f-013b9a740f3a',
            key:'YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2'
        });
        expect(getAccessAdmin.user).toEqual(
            expect.objectContaining({
                role: "ADMIN"
            })
        )
    });

    test("Should not be able to change access admin user with key invalid", async () => {
        await expect(()=> stu.execute({
            idUser: '0c2db0f2-04b4-4ff3-9a4f-013b9a740f3a',
            key:'fake-key'
        })).rejects.toEqual(new AppError('Chave não encontrada', 404))
    });

    test("Should not be able to change access admin user with idUser invalid", async () => {
        const fakeId = randomUUID()

        await expect(()=> stu.execute({
            idUser: fakeId,
            key:'YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2'
        })).rejects.toEqual(new AppError('Usuário não encontrado', 404))
    });

    test("Should not be able to change access admin user with key already active", async () => {
        await stu.execute({
            idUser: '0c2db0f2-04b4-4ff3-9a4f-013b9a740f3a',
            key:'YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2'
        });
 
        await expect(() => stu.execute({
            idUser: '0c2db0f2-04b4-4ff3-9a4f-013b9a740f3a',
            key:'YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2YTg3ZjEwOGUtZjg3Ni00ZmYwLTkzZDktN2FkOWM4NTIwMmI2'
        })).rejects.toEqual(new AppError('Chave já utilizada', 401))
    });

})