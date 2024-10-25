import {query} from "@/lib/database";
import {authenticateAPI} from "../userLogin/route"

function withMiddleware(handler) {
    return async (request, response) => {
      const authResponse = await authenticateAPI(request);
      if (authResponse) {
        return authResponse; // Return the middleware response if there is an error
      }
      return handler(request, response); // Otherwise, call the actual handler
    };
  }


    export const GET= withMiddleware(async (request, response) => {
        // Add authentication middleware here
      
        try{
            const users = await query({
                query: "SELECT * FROM contact",
                values: [],
            });
        
    
            return new Response(JSON.stringify({contacts: users,status:200}));
        }
        catch(err){
            return new Response(`Internal Server Error ${err}`, { status: 500 });
        }
      
    
    })
    
    export const POST=withMiddleware(async (request, response) => {
        try{
    
        const { name, email, phone_no,address,time_zone } = await request.json();
        const updateUsers = await query({
            query: "INSERT INTO contact (name, email, phone_no,address,time_zone) VALUES (?, ?, ?, ?, ?)",
            values: [name, email, phone_no, address, time_zone],
        });
        const result = updateUsers.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        return new Response(JSON.stringify({
            message: message,
            status: 200,
        }));
        
    }catch(err){
        return new Response(`Internal Server Error ${err}`, { status: 500 });
            
    }
    })
    
    
    export const PUT=withMiddleware(async (request,response)=>{
        try{
        const {id,name, email, phone_no,address,time_zone } = await request.json();
        const updateProducts = await query({
            query: "UPDATE contact SET name = ?, email = ?, phone_no = ?, address = ?, time_zone = ? WHERE id = ?",
            values: [name, email, phone_no,address, time_zone,id],
        });
    
        const result = updateProducts.affectedRows;
        let message = result ? "success" : "error";
    
     
    
        return new Response(JSON.stringify({
            message: message,
            status: 200,
        }), { headers: { 'Content-Type': 'application/json' } });
    
        
    }catch(err){
        return new Response(`Internal Server Error ${err}`, { status: 500 });
            
    }
    
    })
    
    
    export const DELETE=withMiddleware( async (request,response)=>{
        try{
        const { id } = await request.json();
        const deleteUser = await query({
            query: "DELETE FROM contact WHERE id = ?",
            values: [id],
        });
        const result = deleteUser.affectedRows;
        let message = "";
        if (result) {
            message = " Deleted successfully";
        } else {
            message = "error";
        }
       
        return new Response(JSON.stringify({
            message: message,
            status: 200,
        }));
        
    }catch(err){
        return new Response(`Internal Server Error ${err}`, { status: 500 });
            
    }
    
    })
    





