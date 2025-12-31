import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

export async function GET(req) {
    try {
        const cookieStore = cookies();
        const user = cookieStore.get("user")?.value;

        if (!user) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const withUser = searchParams.get("with");

        if (!withUser) {
            return Response.json(
                { message: "Missing user" },
                { status: 400 }
            );
        }

        const { rows } = await sql`
      SELECT id, sender, receiver, text, type, created_at
      FROM messages
      WHERE 
        (sender = ${user} AND receiver = ${withUser})
        OR
        (sender = ${withUser} AND receiver = ${user})
      ORDER BY created_at ASC
    `;

        const formatted = rows.map((m) => ({
            id: m.id,
            from: m.sender,
            to: m.receiver,
            text: m.text,
            type: m.type,
            created_at: m.created_at,
        }));

        return Response.json(formatted);
    } catch (err) {
        return Response.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
