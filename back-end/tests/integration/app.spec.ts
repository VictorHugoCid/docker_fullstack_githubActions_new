import prisma from "database";
import httpStatus from "http-status";
import app from "server";
import supertest from "supertest";

const agent = supertest(app);
//coment

describe("integration test", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it("should register a user", async () => {
    const { status } = await agent.get("/add");
    expect(status).toBe(httpStatus.CREATED);

    const users = await prisma.user.findMany();
    expect(users).toHaveLength(1);
  });

  it("should return all users", async () => {
    await prisma.user.createMany({
      data: [
        { name: "teste1", email: "teste1@gmail.com" },
        { name: "teste2", email: "teste2@gmail.com" },
      ],
    });

    const response = await agent.get("/all");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveLength(2);
  });
});
