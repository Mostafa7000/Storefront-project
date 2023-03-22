import { productBase } from "../models/product";
import supertest from "supertest";
import app from "../index";

const products= new productBase()
const server= supertest(app);

const auth= {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmbmFtZSI6Ik1vc3RhZmEiLCJsbmFtZSI6IkVtYWQiLCJwYXNzd29yZCI6IiQyYiQwNyRoLzluem82SmU2Vy9zdmxaRTNGdk11Nmx1TjZhRDRVekpiOGhWTFVrWXVjRkcxejVEMTFpdSJ9LCJpYXQiOjE2Njg0MTY0MTN9.reHc5TFLkJm2fd6dnoCL_81COICp6l7yBtpfDP_yrAg"
};

describe("Testing app end points",()=>{
    describe("User endpoints", ()=>{
        it ("Should return 200 OK for creating new user", async ()=>{
            const result= await server.post('/users').send({
                fname: "Mostafa",
                lname: "Tarek",
                password: "12345"
            })
            expect(result.status).toEqual(200);
        })
        it("Should return 200 OK for indexing", async ()=>{
            const result= await server.get('/users').set(auth);
            expect(result.status).toEqual(200);
        })
        it("Should return 404 NOT FOUND when showing a non-existing user", async ()=>{
            const result= await server.get('/users/55').set(auth);
            expect(result.status).toEqual(404);
        })
    })

    describe(" Testing Product end points", ()=>{
        it ("Should return 200 OK for creating new product", async ()=>{
            const result= await server.post('/products').send({
                name: "IPhone",
                price: 35000,
                category: "cell phones"
            }).set(auth)
            expect(result.status).toEqual(200);
        })
        it("Should return 200 OK for indexing", async ()=>{
            const result= await server.get('/products');
            expect(result.status).toEqual(200);
        })
        it("Should return 200 OK when showing an existing product", async ()=>{
            const id= (await products.create({
                name: "Jelly beans",
                price: 5,
                category: "sweets",
            })).id;
            const result= await server.get('/products/'+ id as string);
            expect(result.status).toEqual(200);
        })
        it("Should return 200 OK when searching for top five popular products", async ()=>{
            const result= await server.get("/products/top/5");
            expect(result.status).toEqual(200);
        })
    })

    describe("Testing order end points", ()=>{
        it("Should return 400 BAD REQUEST for adding product to non-existent order", async ()=>{
            const result= await server.post('/orders/30/products').send({
                name: "Dell G5",
                price: 20000,
                category: "Laptops"
            }).set(auth);
            expect(result.status).toEqual(400);
        })
        it ("Should return 401 for not including JWT token in the header", async ()=>{
            const result= await server.get('/orders/active/1');
            expect(result.status).toEqual(401);
        })
    })

})