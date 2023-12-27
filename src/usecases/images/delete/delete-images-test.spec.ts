import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryCampingRepository } from "@/repositories/in-memory/in-memory-camping-repository";
import { InMemoryImagesRepository } from "@/repositories/in-memory/in-memory-images-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcrypt";
import { InMemoryAddressesRepository } from "@/repositories/in-memory/in-memory-addresses-repository";
import { Prisma } from "@prisma/client";
import { DeleteImageUseCase } from "./delete-images-usecase";
import { InMemoryStorageProvider } from "@/providers/StorageProvider/in-memory/in-memory-storage-provider";
import { FileTMPProvider } from "@/providers/StorageProvider/implementations/file-tmp.provider";
import { AppError } from "@/usecases/errors/app-error";

let campingRepositoryInMemory: InMemoryCampingRepository
let addressRepositoryInMemory: InMemoryAddressesRepository
let userRepositoryInMemory: InMemoryUsersRepository
let imagesRepositoryInMemory: InMemoryImagesRepository
let storageProviderInMemory: InMemoryStorageProvider
let fileProviderInMemory: FileTMPProvider
let stu: DeleteImageUseCase;

describe("Delete image (unit)", () => {
    beforeEach(async() => {
        fileProviderInMemory = new FileTMPProvider()
        storageProviderInMemory = new InMemoryStorageProvider()
        userRepositoryInMemory = new InMemoryUsersRepository()
        addressRepositoryInMemory = new InMemoryAddressesRepository()
        imagesRepositoryInMemory = new InMemoryImagesRepository()
        campingRepositoryInMemory = new InMemoryCampingRepository(addressRepositoryInMemory)
        stu = new DeleteImageUseCase(
            imagesRepositoryInMemory,
            storageProviderInMemory,
            fileProviderInMemory
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

        // criar image
        await imagesRepositoryInMemory.upload({
            id: '4567f574-c5ae-429f-b40c-013ba4e09ce1',
            name: "image test",
            idUser: '9cb97913-5e9c-496d-b606-57902495cebd',
            url: "image test",
        });
        
    });

    test("Should be able to delete image", async () => {
        const deleteImage = await stu.execute({
            id: "4567f574-c5ae-429f-b40c-013ba4e09ce1"
        })
        const findImageExists = await imagesRepositoryInMemory.findById("4567f574-c5ae-429f-b40c-013ba4e09ce1")

        expect(findImageExists).toBeNull()
    });

    test("Should not be able to delete image with invalid id", async () => {
        await expect(()=> stu.execute({
            id: "f75efe35-f562-40e5-a4be-6d49e9512c09"
        })).rejects.toEqual(new AppError('Image not found', 404))
    });
});