import { signinService } from "../services/auth.services.js";

export async function signin(req, res) {
  const { email, password } = req.body;
  try {
    const result = await signinService({ email, password });
    res.send(result);
  } catch (err) {
    res.status(401).send(err.message);
  }
}
