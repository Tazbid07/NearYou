import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

export async function GET(req) {
    const user = cookies().get("token")?.value;

    if (!user) {
        return Response.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
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
        SELECT text
        FROM messages
        WHERE
          (sender = ${user} AND receiver = ${withUser})
          OR
          (sender = ${withUser} AND receiver = ${user})
        ORDER BY created_at DESC
        LIMIT 1
    `;

    return Response.json(rows[0] || {});
}
