import { Request, Response } from "express";
import { supabase } from "../lib/supabase";

export const getConversations = async (req: Request, res: Response) => {
  const { user_id } = req.query;

  let query = supabase
    .from("conversations")
    .select("*")
    .order("created_at", { ascending: false });

  // if NOT admin request → filter
  if (user_id) {
    query = query.eq("user_id", user_id);
  }

  const { data, error } = await query;

  if (error) return res.status(500).json(error);

  res.json(data);
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

export const deleteConversation = async (req: Request, res: Response) => {
  const { id } = req.params;

  await supabase
    .from("messages")
    .delete()
    .eq("conversation_id", id);

  const { error } = await supabase
    .from("conversations")
    .delete()
    .eq("id", id);

  if (error) return res.status(500).json(error);

  res.json({ success: true });
};