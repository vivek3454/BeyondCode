import { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

adminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const Admin = models?.Admin || model("Admin", adminSchema);
export default Admin;