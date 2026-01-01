import { cookies } from "next/headers";

export async function GET() {
    const user = cookies().get("token")?.value;

    if (!user) {
        return Response.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    return Response.json({ username: user });
}
