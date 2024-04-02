import { PrismaClient } from "@prisma/client";
import { addRolesTableData } from "./add_roles_table";
import { add_users } from "./add_users";


const primsa = new PrismaClient();
async function main(){
    addRolesTableData(primsa);
    add_users(primsa);
}
main().then(async()=>{
    await primsa.$disconnect();
})
.catch(async(e)=>{
    console.log(e);
    primsa.$disconnect();
    process.exit(1);
});