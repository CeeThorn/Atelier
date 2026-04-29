import { Request, Response } from "express";
import { supabase } from "../lib/supabase";

export const getConversations = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.query;

    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const createConversation = async (req: Request, res: Response) => {
  const { user_id, subject } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "user_id required" });
  }

  const { data, error } = await supabase
    .from("conversations")
    .insert({
      user_id,
      subject: subject || "New Conversation",
    })
    .select()
    .single();

  if (error) return res.status(500).json(error);

  res.json(data);
};