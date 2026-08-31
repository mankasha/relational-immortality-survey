import { NextResponse } from "next/server";
import { computeDerivedScores } from "@/lib/scoring";
import { saveResponse } from "@/lib/storage";
import type { SurveyResponse } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response: SurveyResponse = {
      participantId: body.participantId,
      startedAt: body.startedAt,
      completedAt: body.completedAt ?? new Date().toISOString(),
      isTestResponse: body.isTestResponse ?? false,
      randomization: body.randomization,
      answers: body.answers,
      derived: body.derived ?? computeDerivedScores(body.answers),
    };

    if (!response.participantId || !response.answers?.consented) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    await saveResponse(response);
    return NextResponse.json({ success: true, id: response.participantId });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
