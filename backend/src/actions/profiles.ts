import { Request, Response } from "express";
import { supabase } from "../lib/supabase";

export const getProfiles = async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role");

  if (error) return res.status(500).json(error);

  res.json(data);
};