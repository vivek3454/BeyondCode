import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                try {
                    await connectToDatabase();
                    const admin = await Admin.findOne({ email: credentials.email });

                    if (!admin) {
                        throw new Error("Admin not found");
                    }

                    const isValid = bcrypt.compare(credentials.password, admin.password);

                    if (!isValid) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: admin?._id.toString(),
                        email: admin?.email
                    };
                } catch (error) {
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        jwt: async function ({ token, admin }) {
            if (admin) {
                console.log("admin", admin);

                token.id = admin.id;
                token.email = admin.email;
            }
            return token;
        },
        session: async function ({ session, token }) {
            if (session.admin) {
                session.admin.id = token.id;
                session.admin.email = token.email;
            }
            return session;
        }
    },
    pages: {
        signIn: "/sign-in",
        error: "/sign-in",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET
};