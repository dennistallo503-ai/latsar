import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);



export async function POST(
  request: Request
) {

  try {


    const body = await request.json();



    const {
      error
    } = await supabase
      .from("visitor_logs")
      .insert({

        page: body.page,

        user_agent: body.user_agent,

        referer: body.referer,

      });



    if(error){

      throw error;

    }



    return NextResponse.json({

      success:true

    });



  } catch(error:any){


    return NextResponse.json(

      {
        success:false,
        message:error.message
      },

      {
        status:500
      }

    );


  }

}