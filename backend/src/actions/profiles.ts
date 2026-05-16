import { Request, Response } from "express";
import { supabase } from "../lib/supabase";

export const getProfiles = async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role");

  if (error) return res.status(500).json(error);

  res.json(data);
};

export const updateProfile = async (req: Request, res: Response) => {
const { user_id, email, phone_number, avatar_url, first_name, last_name} = req.body;
const {data, error} = await supabase

.from("profiles")
.update({
  email,
  phone_number,
  avatar_url,
  first_name,
  last_name,
})
.eq("id", user_id)
.select();

if(error){
  throw error;
}

return data;
}   