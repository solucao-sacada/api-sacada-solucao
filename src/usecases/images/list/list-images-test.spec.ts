import { beforeEach, describe, expect, test } from "vitest";
import { hash } from "bcrypt";
import { ListImageUseCase } from "./list-images-usecase";

let campingRepositoryInMemory: InMemoryCampingRepository
let addressRepositoryInMemory: InMemoryAddressesRepository
let userRepositoryInMemory: InMemoryUsersRepository
let imagesRepositoryInMemory: InMemoryImagesRepository
let stu: ListImageUseCase;

describe("List images (unit)", () => {
    beforeEach(async() => {
        userRepositoryInMemory = new InMemoryUsersRepository()
        addressRepositoryInMemory = new InMemoryAddressesRepository()
        imagesRepositoryInMemory = new InMemoryImagesRepository()
        campingRepositoryInMemory = new InMemoryCampingRepository(addressRepositoryInMemory)
        stu = new ListImageUseCase(
            imagesRepositoryInMemory,
        )

        // criar usuario
        await userRepositoryInMemory.create({
            id: '9cb97913-5e9c-496d-b606-57902495cebd',
            name: 'user test',
            email: 'user@email.com',
            password:  await hash('123456', 8),
        });

        // criar camping
        await campingRepositoryInMemory.create({
            id: '1edbd710-bfcb-4795-9b99-3aca168cbc88',
            idUser: 'bd3234d7-21e6-4e1d-8129-8b823c4d331a',
            baseValue: 100,
            name: "Camping Test",
            propertyRules: "Proibido fumar, Proibido animais",
            active: true,
            description: "Camping Test",
            categories: [{
                category:{
                    id: '4d941afa-5c2e-4159-96fd-ad6612cfd54c',
                    name: "Motor Home",
                    type: "CAMPING",
                }
            }] as Prisma.CampingOnCategoryUncheckedCreateNestedManyWithoutCampingInput,
            address:{
                create:{
                    id: '2ec106e5-e47e-4b2d-8ad2-fc8fe2abb071',
                    city: 'city test',
                    complement: 'complement test',
                    country: 'country test',
                    district: 'district test',
                    num: 123,
                    reference: 'reference test',
                    state: 'state test',
                    street: 'street test',
                    zipCode: 12345678,
                }
            }
        });
        
    });

    test("Should be able to list images", async () => {
        for(let i = 0; i < 5; i++){
            await imagesRepositoryInMemory.upload({
                id: '1edbd710-bfcb-4795-9b99-3aca168cbc88',
                name: "image test",
                idUser: '9cb97913-5e9c-496d-b606-57902495cebd',
                url: "image test",
            });

        }
        const listImages = await stu.execute();

        expect(listImages.length).toBe(5);
    });
});