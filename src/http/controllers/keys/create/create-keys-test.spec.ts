import { afterAll, beforeAll, describe, expect, test } from "vitest";

describe('Create Key (e2e)', ()=>{
    beforeAll(async()=>{
        await fastifyApp.ready()
    })

    afterAll(async()=>{
        await fastifyApp.close()
    })

    test('should be able to create a key', async()=>{
        const responseRegisterUser = await request(fastifyApp.server).post('/api/users').send({
            dateBirth: '2023-10-03',
            email: 'email22@test.com',
            name: 'Kaio Moreira',
            phone: '77-77777-7777',
            password: '123456',
            rvLength: 10,
            rvPlate: 'ABC-1234',
            touristType: 'ADMIRADOR',
            tugPlate: 'ABC-1234',
            vehicleType: 'CAMPER',
        })
        const responseLoginUser = await request(fastifyApp.server)
        .post('/api/users/login')
        .send({
            email: 'email22@test.com',
            password: '123456',
        })

        const {accessToken, user} = responseLoginUser.body
        
        const responseCreateKey = await request(fastifyApp.server)
        .post(`/api/keys`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send()
        
        expect(responseCreateKey.statusCode).toEqual(201)
    })
})