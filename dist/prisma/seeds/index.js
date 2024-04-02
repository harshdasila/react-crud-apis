"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const add_roles_table_1 = require("./add_roles_table");
const add_users_1 = require("./add_users");
const primsa = new client_1.PrismaClient();
async function main() {
    (0, add_roles_table_1.addRolesTableData)(primsa);
    (0, add_users_1.add_users)(primsa);
}
main().then(async () => {
    await primsa.$disconnect();
})
    .catch(async (e) => {
    console.log(e);
    primsa.$disconnect();
    process.exit(1);
});
