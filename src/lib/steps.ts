import type { RandomizationMeta, SurveyAnswers } from "./types";
import { getMortalityStepsOrder } from "./randomization";

export interface StepDef {
  id: string;
  condition?: (answers: SurveyAnswers) => boolean;
}

export function buildStepList(
  randomization: RandomizationMeta,
  answers: SurveyAnswers
): string[] {
  const mortalityOrder = getMortalityStepsOrder(
    randomization.mortalityAsymmetryOrder
  );
  const mortalitySteps = mortalityOrder.flatMap((target) => [
    `mortality_${target}`,
  ]);

  const survivalSteps = randomization.survivalTargetOrder.map(
    (t) => `survival_${t}`
  );

  const reunionSteps = randomization.reunionScenarioOrder.map(
    (s) => `reunion_${s}`
  );

  const tradeoffSteps = ["tradeoff_1", "tradeoff_2", "tradeoff_3"];

  const altSteps = randomization.alternativeExplanationOrder.map(
    (k) => `alt_${k}`
  );

  const baseSteps: string[] = [
    "consent",
    "demographics",
    "metaphysical_beliefs",
    ...mortalitySteps,
    "want_belief_plausibility",
    ...survivalSteps,
    "bereavement_gate",
  ];

  const bereavedSteps: string[] =
    answers.experiencedCloseDeath === true
      ? [
          "bereavement_details",
          "nonexistence_representation",
          "explicit_intuitive",
          "continuing_bond",
          "continuing_bond_followup",
          "causal_timeline",
        ]
      : [];

  const remainingSteps: string[] = [
    ...reunionSteps,
    ...tradeoffSteps,
    "epistemic_resistance",
    "micro_prompt",
    "micro_measures",
    "god_human_love",
    ...altSteps,
    "theory_questions",
    "open_response",
    "debrief",
  ];

  const allSteps = [...baseSteps, ...bereavedSteps, ...remainingSteps];

  return allSteps.filter((stepId) => {
    if (stepId === "micro_measures" && answers.microSkipped) return false;
    return true;
  });
}

export function getStepProgress(currentIndex: number, total: number): number {
  if (total <= 1) return 0;
  return Math.round((currentIndex / (total - 1)) * 100);
}
