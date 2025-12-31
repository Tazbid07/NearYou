import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        const cookieStore = cookies();
        const from = cookieStore.get("user")?.value;

        if (!from) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { to, text, type } = await req.json();

        if (!to || !text) {
            return Response.json(
                { message: "Invalid message" },
                { status: 400 }
            );
        }

        const { rows } = await sql`
      INSERT INTO messages (sender, receiver, text, type)
      VALUES (${from}, ${to}, ${text}, ${type})
      RETURNING id, sender, receiver, text, type, created_at
    `;

        return Response.json({
            id: rows[0].id,
            from: rows[0].sender,
            to: rows[0].receiver,
            text: rows[0].text,
            type: rows[0].type,
            created_at: rows[0].created_at,
        });
    } catch (err) {
        return Response.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
