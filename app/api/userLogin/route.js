

import {query} from "@/lib/database"
import bcrypt from "bcrypt" 
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";


export async function POST(request) {
    try{
    const {email,password} = await request.json();
    const checkUser = await query({
        query: "SELECT * FROM user WHERE email =?",
        values: [email],
    });

    
    if (checkUser.length===0){
        return new Response(JSON.stringify({
            err_msg: "Email not exists",
            status: 400,
        }));
    }else{
        let isPasswordMatch=await bcrypt.compare(password,checkUser[0].password)
        if(isPasswordMatch===true){
            const payload={email:checkUser.email,user_id:checkUser.user_id}
            const token=jwt.sign(payload,process.env.SECRET_KEY)
            return new Response(JSON.stringify({
                message: " User Login Successfully",
                status: 200,
                jwt_token:token
            }));
        }else{
            return new Response(JSON.stringify({
                err_msg: "Invalid Password",
                status: 400,
            }));
        }
    }   
}catch(err){
    return new Response(JSON.stringify({err_msg: `${err.message}`,status:500}));
        
}
}

export async function authenticateAPI(req,res,next){
  try{

    const authHeaders= req.headers.get('Authorization');
    let jwtToken; 
    if (authHeaders!==undefined){
      jwtToken=authHeaders.split(" ")[1]
    }
    console.log(jwtToken)
    if (jwtToken===undefined){
      return new Response(JSON.stringify({err_msg:"Invalid jwt token",status:401}))
    }else{
      const secretKey = process.env.SECRET_KEY;
      const payload = jwt.verify(jwtToken, secretKey);

      req.user_id=payload.user_id
      req.email=payload.email
     NextResponse.next;
    }
  }
  catch(err){
    return new Response(JSON.stringify({err_msg:"Invalid jwt token"}));
        
  }
  
  }

  

  
  