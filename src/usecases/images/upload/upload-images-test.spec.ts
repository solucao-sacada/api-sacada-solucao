import { beforeEach, describe, expect, test } from "vitest";
import { UploadImageUseCase } from "./upload-images-usecase";
import { hash } from "bcrypt";

let campingRepositoryInMemory: InMemoryCampingRepository
let storageProviderInMemory: InMemoryStorageProvider
let addressRepositoryInMemory: InMemoryAddressesRepository
let userRepositoryInMemory: InMemoryUsersRepository
let boxTypeRepositoryInMemory: InMemoryBoxTypesRepository
let imagesRepositoryInMemory: InMemoryImagesRepository
let stu: UploadImageUseCase;

describe("Upload images (unit)", () => {
    beforeEach(async() => {
        boxTypeRepositoryInMemory = new InMemoryBoxTypesRepository()
        boxesRepositoryInMemory = new InMemoryBoxRepository()
        userRepositoryInMemory = new InMemoryUsersRepository()
        addressRepositoryInMemory = new InMemoryAddressesRepository()
        imagesRepositoryInMemory = new InMemoryImagesRepository()
        campingRepositoryInMemory = new InMemoryCampingRepository(addressRepositoryInMemory)
        storageProviderInMemory = new InMemoryStorageProvider()
        stu = new UploadImageUseCase(
            campingRepositoryInMemory,
            storageProviderInMemory,
            boxesRepositoryInMemory,
            userRepositoryInMemory,
            imagesRepositoryInMemory
        )

        // criar usuario
        await userRepositoryInMemory.create({
            id: '9cb97913-5e9c-496d-b606-57902495cebd',
            name: 'user test',
            email: 'user@email.com',
            password:  await hash('123456', 8),
        });
        
        // criar box type
         await boxTypeRepositoryInMemory.create({
            id: '130344f1-a3ef-41f9-a405-39ab3553131c',
            name: 'Caixa Grande',
            active: true,
            typeOfCharge: "PERSON"
        })

        // criar box
        await boxesRepositoryInMemory.create({
            id: "2ddfda05-21ec-440d-b4bc-f9fc6d800fee",
            idBoxType: '130344f1-a3ef-41f9-a405-39ab3553131c',
            idCamping: '1edbd710-bfcb-4795-9b99-3aca168cbc88',
            convenience: 'ferramentas, tomada, agua',
            name: 'Caixa de Equipamentos',
            price: 89.99,
        })

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

    test("Should be able to upload images for campings", async () => {
        const uploadImage = await stu.execute({ 
        idUser: '9cb97913-5e9c-496d-b606-57902495cebd',
        names: ["nestjs.png", "turista-logo.png"],
        });
        const findImageExists = await imagesRepositoryInMemory.findByName("turista-logo.png")

        expect(findImageExists).toHaveProperty("id");
    });

    test("Should be able to upload images for box", async () => {
        const uploadImage = await stu.execute({ 
        idUser: '9cb97913-5e9c-496d-b606-57902495cebd',
        names: ["nestjs.png", "turista-logo.png"],
        });

        const findImageExists = await imagesRepositoryInMemory.findByName("turista-logo.png")

        expect(findImageExists).toHaveProperty("id");
    });

    test("Should not be able to upload images for campings with invalid user", async () => {
        await expect(()=> stu.execute({ 
            idUser: '7748f869-4b56-4212-8bc5-080099660b4d',
            names: ["nestjs.png", "turista-logo.png"],
            })).rejects.toEqual(new AppError("User not found", 404));
    });

    test("Should not be able to upload images for campings with invalid camping", async () => {
        await expect(()=> stu.execute({ 
            idUser: '9cb97913-5e9c-496d-b606-57902495cebd',
            names: ["nestjs.png", "turista-logo.png"],
            })).rejects.toEqual(new AppError("Camping not found", 404));
    });

    test("Should not be able to upload images for campings with invalid box", async () => {
        await expect(()=> stu.execute({ 
            idUser: '9cb97913-5e9c-496d-b606-57902495cebd',
            names: ["nestjs.png", "turista-logo.png"],
            })).rejects.toEqual(new AppError("Box not found", 404));
    });
});