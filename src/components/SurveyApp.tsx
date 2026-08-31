"use client";

import { useCallback, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createRandomization } from "@/lib/randomization";
import { computeDerivedScores } from "@/lib/scoring";
import { buildStepList, getStepProgress } from "@/lib/steps";
import type { RandomizationMeta, SurveyAnswers } from "@/lib/types";
import { SurveyShell } from "./SurveyShell";
import { StepRenderer } from "./StepRenderer";

type AppState = "survey" | "declined" | "exited" | "submitting" | "complete" | "error";

export function SurveyApp() {
  const [randomization] = useState<RandomizationMeta>(() => createRandomization());
  const [participantId] = useState(() => uuidv4());
  const [startedAt] = useState(() => new Date().toISOString());
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [appState, setAppState] = useState<AppState>("survey");
  const [errorMsg, setErrorMsg] = useState("");

  const steps = useMemo(
    () => buildStepList(randomization, answers),
    [randomization, answers]
  );

  const currentStepId = steps[stepIndex] ?? "debrief";
  const progress = getStepProgress(stepIndex, steps.length);

  const updateAnswer = useCallback((key: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateAndNext = useCallback((key: string, value: unknown) => {
    setAnswers((prev) => {
      const nextAnswers = { ...prev, [key]: value };
      const nextSteps = buildStepList(randomization, nextAnswers);
      const nextIndex = Math.min(stepIndex + 1, nextSteps.length - 1);
      setStepIndex(nextIndex);
      return nextAnswers;
    });
  }, [randomization, stepIndex]);

  const goNext = useCallback(async () => {
    const isDebrief = currentStepId === "debrief";

    if (currentStepId === "open_response" && stepIndex === steps.length - 2) {
      setAppState("submitting");
      try {
        const derived = computeDerivedScores(answers);
        const res = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            participantId,
            startedAt,
            completedAt: new Date().toISOString(),
            randomization,
            answers,
            derived,
          }),
        });
        if (!res.ok) throw new Error("Submission failed");
        setStepIndex((i) => i + 1);
        setAppState("complete");
      } catch {
        setErrorMsg("Unable to submit. Please try again.");
        setAppState("error");
      }
      return;
    }

    if (isDebrief) return;

    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
    }
  }, [
    stepIndex,
    steps.length,
    currentStepId,
    answers,
    participantId,
    startedAt,
    randomization,
  ]);

  const goBack = useCallback(() => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }, [stepIndex]);

  if (appState === "declined") {
    return (
      <SurveyShell progress={0}>
        <h1 className="text-xl font-semibold">Thank you</h1>
        <p className="mt-4 text-sm text-[#5a554f]">
          You chose not to participate. You may close this page.
        </p>
      </SurveyShell>
    );
  }

  if (appState === "exited") {
    return (
      <SurveyShell progress={progress}>
        <h1 className="text-xl font-semibold">Survey exited</h1>
        <p className="mt-4 text-sm text-[#5a554f]">
          Your responses were not saved. You may close this page.
        </p>
      </SurveyShell>
    );
  }

  if (appState === "submitting") {
    return (
      <SurveyShell progress={99}>
        <p className="text-center text-sm text-[#5a554f]">Submitting your responses...</p>
      </SurveyShell>
    );
  }

  if (appState === "error") {
    return (
      <SurveyShell progress={progress}>
        <h1 className="text-xl font-semibold">Submission error</h1>
        <p className="mt-4 text-sm text-[#5a554f]">{errorMsg}</p>
        <button
          type="button"
          onClick={() => setAppState("survey")}
          className="mt-6 w-full rounded-xl bg-[#5a7a6a] px-6 py-3 text-white"
        >
          Try again
        </button>
      </SurveyShell>
    );
  }

  return (
    <SurveyShell progress={progress}>
      <StepRenderer
        stepId={currentStepId}
        answers={answers}
        randomization={randomization}
        updateAnswer={updateAnswer}
        updateAndNext={updateAndNext}
        onNext={goNext}
        onBack={goBack}
        onDecline={() => setAppState("declined")}
        onExit={() => setAppState("exited")}
        isFirst={stepIndex === 0}
        isLast={stepIndex === steps.length - 1}
      />
    </SurveyShell>
  );
}
