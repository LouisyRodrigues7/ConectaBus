// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import path from "path";
import { fileURLToPath } from "url";

import User from "./models/User.js"; 

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, "../frontend")));

// Abrir login.html quando acessar "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
  });
  

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.error("Erro ao conectar:", err));

//  Cadastro de usuário
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "E-mail já cadastrado!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const secret = speakeasy.generateSecret({ name: `ProjetoParadas (${email})` });

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      userType,
      secret: secret.base32,
      isMFAEnabled: true
    });

    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

    res.json({ message: "Usuário criado!", qrCodeUrl });
  } catch (err) {
    res.status(500).json({ message: "Erro ao cadastrar", error: err.message });
  }
});

// Login - verifica senha
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Senha incorreta" });

  res.json({ message: "Senha correta, digite o código MFA", email });
});

//  Verifica código MFA
app.post("/verify-mfa", async (req, res) => {
  const { email, token } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

  const verified = speakeasy.totp.verify({
    secret: user.secret,
    encoding: "base32",
    token
  });

  if (verified) {
    res.json({ message: "Login bem-sucedido!" });
  } else {
    res.status(400).json({ message: "Código MFA inválido" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
