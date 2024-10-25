import {query} from "@/lib/database";
import {authenticateAPI} from "../../userLogin/route"

function withMiddleware(handler) {
    return async (request, response) => {
      const authResponse = await authenticateAPI(request);
      if (authResponse) {
        return authResponse; // Return the middleware response if there is an error
      }
      return handler(request, response); // Otherwise, call the actual handler
    };
  }


  export const GET= withMiddleware(async (request,{ params }) => {
    // Add authentication middleware here
    try{
      const {id}=params
        const [users] = await query({
            query: "SELECT * FROM contact WHERE id = ?",
            values: [id],
        });
    

        return new Response(JSON.stringify(users));
    }
    catch(err){
        return new Response(`Internal Server Error ${err}`, { status: 500 });
    }
  

})