import { Request, Response } from "express";
import { addUser, getUser } from "../services/UserService";

export const getUserController = async (req: Request, res: Response) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const addUserController = async (req: Request, res: Response) => {
  try {
    const id = await addUser(req.body);
    res.status(201).json({ message: "User created", id });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
