import { NextResponse } from "next/server";
import { loadAllResponses, responsesToCsv } from "@/lib/storage";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const adminSecret = process.env.ADMIN_SECRET ?? "change-me-in-production";

  if (!secret || secret !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const includeTest = searchParams.get("includeTest") === "true";
  let responses = await loadAllResponses();

  if (!includeTest) {
    responses = responses.filter((r) => !r.isTestResponse);
  }

  const csv = responsesToCsv(responses);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="survey-responses-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const adminSecret = process.env.ADMIN_SECRET ?? "change-me-in-production";

  if (body.secret !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const responses = await loadAllResponses();
  return NextResponse.json({
    count: responses.length,
    responses: responses.map((r) => ({
      id: r.participantId,
      completedAt: r.completedAt,
      isTest: r.isTestResponse,
      bereaved: r.answers.experiencedCloseDeath,
      condition: r.randomization.microExperimentCondition,
    })),
  });
}
