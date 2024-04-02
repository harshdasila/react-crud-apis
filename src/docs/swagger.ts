import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express, Request, Response } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "React Crud Api",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: `http://localhost:3001`,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [], // This can be applied globally to all endpoints
      },
    ],
  },
  apis: ["./src/routes/*ts"], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { 
    swaggerOptions: {
      protocols: ['http'], // Specify the protocols to be used
    },
  }));

  app.get("api-docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`swagger docs at http://localhost:${port}`);
}

export default swaggerDocs;
