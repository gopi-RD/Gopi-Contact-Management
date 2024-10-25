
import {query} from "@/lib/database"
import bcrypt from "bcrypt" 



export async function POST(request) {
    try{
    const {username,email,password} = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkUser = await query({
        query: "SELECT * FROM user WHERE email =?",
        values: [email],
    });
    
    if (checkUser.length===1){
        return new Response(JSON.stringify({
            message: "Email already exists",
            status: 400,
        }));
    }else{

        const registerUsers = await query({
            query: "INSERT INTO user (username,email,password) VALUES (?, ?, ?)",
            values: [username,email,hashedPassword],
        });
        const result = registerUsers.affectedRows;
        let message = "";
        if (result) {
            message = " User Successfully Register";
        } else {
            message = "error";
        }
        return new Response(JSON.stringify({
            message: message,
            status: 200,
        }));
        

    }   
}catch(err){
    return new Response(JSON.stringify({err_msg: `${err.message}`,status:500}));
        
}
}

