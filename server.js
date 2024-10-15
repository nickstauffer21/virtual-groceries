import { createServer, Model, Response } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", {
        id: "123",
        email: "e@e.com",
        password: "321",
        name: "Bob",
      });
    },

    routes() {
      this.namespace = "api";
      this.logging = false;
      this.passthrough("https://firestore.googleapis.com/**");

      this.post("/login", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const foundUser = schema.users.findBy({ email, password });

        if (!foundUser) {
          return new Response(
            401,
            {},
            { message: "No user with those credentials found!" }
          );
        }

        foundUser.password = undefined;
        return {
          user: foundUser,
          token: "here's your token.",
        };
      });
      this.get("/profile", (schema, request) => {
        const userId = request.requestHeaders.authorization;

        const user = schema.users.find(userId);

        if (!user) {
          return new Response(401, {}, { message: "user not found" });
        }
        return {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        };
      });
    },
  });

  return server;
}
