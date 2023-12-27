import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { LoginUseCase } from "./login-usecase";
import { hash } from "bcrypt";
import 'dotenv/config'
import { InMemoryTokensRepository } from "@/repositories/in-memory/in-memory-tokens-repository";
import { DayjsDateProvider } from "@/providers/DateProvider/implementations/provider-dayjs";
import { AppError } from "@/usecases/errors/app-error";

let usersRepositoryInMemory: InMemoryUsersRepository;
let usersTokensRepositoryInMemory: InMemoryTokensRepository;
let dayjsDateProvider: DayjsDateProvider
let stu: LoginUseCase;

describe("Login user (unit)", () => {
    beforeEach(async () => {
        usersRepositoryInMemory = new InMemoryUsersRepository()
        usersTokensRepositoryInMemory = new InMemoryTokensRepository()
        dayjsDateProvider = new DayjsDateProvider()
        stu = new LoginUseCase(
            usersRepositoryInMemory, 
            usersTokensRepositoryInMemory, 
            dayjsDateProvider
        )

        await usersRepositoryInMemory.create({
            cpf: "12345678910",
            dateBirth: new Date('1999-06-01'),
            email: 'kaio-dev@outlook.com',
            name: 'John Doe',
            phone: '77-77777-7777',
            password: await hash('123456', 8),
        })
    });

    test("Should be able to login a account", async () => {
       const {user, accessToken, refreshToken} = await stu.execute({
        email: 'kaio-dev@outlook.com',
        password: '123456'
       })

       expect(user.id).toEqual(expect.any(String))
       expect(accessToken).toEqual(expect.any(String))
       expect(refreshToken).toEqual(expect.any(String))

       const usersToken = await usersTokensRepositoryInMemory.findByToken(refreshToken)
       expect(usersToken?.token).toEqual(refreshToken);

    });

    test('should not be able to login with wrong password', async()=>{
         await expect(()=> stu.execute({
            email: 'email@test.com',
            password: '12345666',
        }),
        ).rejects.toEqual(new AppError('Usuário ou senha incorretos', 401))
    })

    test('should not be able to login with wrong email', async()=>{
         await expect(()=> stu.execute({
            email: 'email@wrong.test',
            password: '12345666',
        }),
        ).rejects.toEqual(new AppError('Usuário ou senha incorretos', 401))
    })

   
});