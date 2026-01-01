import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return Response.json(
                { error: "Username and password required" },
                { status: 400 }
            );
        }

        const { rows } =
            await sql`SELECT username, password FROM users WHERE username = ${username}`;

        if (rows.length === 0) {
            return Response.json(
                { error: "Wrong username or password" },
                { status: 401 }
            );
        }

        const user = rows[0];
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return Response.json(
                { error: "Wrong username or password" },
                { status: 401 }
            );
        }

        // ✅ SET COOKIE WITH CORRECT NAME
        cookies().set("token", user.username, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return Response.json({ success: true });
    } catch (err) {
        return Response.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
