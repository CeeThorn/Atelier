import { Request, Response } from "express";
import { supabase } from "../lib/supabase";

export const getAddresses = async (req: Request, res: Response) => {
const {user_id} = req.query;
let query = supabase
.from("addresses")
.select("*")

}

export const updateAddresses = async (req: Request, res: Response) => {
const {user_id, street, city, state, country, postal_code} = req.body;
 const {data, error} = await supabase

 .from("addresses")
 .update({
    street,
    city,
    state,
    country,
    postal_code,
 })
 .eq("id", user_id)//eq means equals or WHERE id = user.Id
 .select();

 if(error){
    throw error;
 }

 return data;
}