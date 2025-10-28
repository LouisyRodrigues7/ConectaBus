// backend/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["Estudante", "Governo", "Cidadão"], required: true },
  secret: { type: String }, // chave MFA
  isMFAEnabled: { type: Boolean, default: false }
});

// Exportando como default para ES Modules
export default mongoose.model("User", UserSchema);
