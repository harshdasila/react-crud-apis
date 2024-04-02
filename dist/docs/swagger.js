"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
                url: `https://localhost:3001`,
            },
        ],
    },
    apis: ["./src/routes/*ts"], // Path to your route files
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, {
        swaggerOptions: {
            protocols: ['http'], // Specify the protocols to be used
        },
    }));
    app.get("api-docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
    });
    console.log(`swagger docs at https://localhost:${port}`);
}
exports.default = swaggerDocs;
