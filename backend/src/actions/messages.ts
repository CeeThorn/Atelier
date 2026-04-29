import { Request, Response } from "express";
import { supabase } from "../lib/supabase";


export const getMessages = async (req: Request, res: Response) => {
  const { conversation_id } = req.query;

  if (!conversation_id) {
    return res.status(400).json({ error: "conversation_id required" });
  }

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversation_id)
    .order("created_at", { ascending: true });

  if (error) return res.status(500).json(error);

  res.json(data ?? []);
};

export const createMessage = async (req: Request, res: Response) => {
  const { conversation_id, user_id, message } = req.body;

  if (!conversation_id || !user_id || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id,
      user_id,
      message,
    })
    .select()
    .single();

  if (error) return res.status(500).json(error);

  res.json(data);
};




export const createConversationWithMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const { user_id, subject, message } = req.body;
        

    if (!user_id || !subject || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // 1. create conversation
    const { data: convo, error: convoError } = await supabase
      .from("conversations")
      .insert({
        user_id,
        subject,
        status: "open",
      })
      .select()
      .single();

    if (convoError) throw convoError;

    // 2. create first message
    const { data: msg, error: msgError } = await supabase
      .from("messages")
      .insert({
        conversation_id: convo.id,
        user_id: user_id,
        message,
      })
      .select()
      .single();

    if (msgError) throw msgError;

    return res.json({
      conversation: convo,
      message: msg,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};