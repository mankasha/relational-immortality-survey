import type { DerivedScores, SurveyAnswers } from "./types";

function mean(values: (number | undefined)[]): number | undefined {
  const valid = values.filter((v): v is number => typeof v === "number");
  if (valid.length === 0) return undefined;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
}

const REUNION_YES = new Set(["Probably yes", "Definitely yes"]);

export function computeDerivedScores(answers: SurveyAnswers): DerivedScores {
  const derived: DerivedScores = {};

  const selfMean = mean([
    answers.selfDifficultyNonexistence,
    answers.selfDistressNonexistence,
    answers.selfDesireContinuedExistence,
    answers.selfDesireAfterlifePersonal,
    answers.selfIntuitiveContinues,
  ]);

  const otherMean = mean([
    answers.otherDifficultyNonexistence,
    answers.otherDistressNonexistence,
    answers.otherDesireContinuedExistence,
    answers.otherDesireAfterlifePersonal,
    answers.otherIntuitiveContinues,
  ]);

  if (selfMean !== undefined && otherMean !== undefined) {
    derived.relationalMortalityAsymmetry = otherMean - selfMean;
  }

  if (
    answers.selfDifficultyNonexistence !== undefined &&
    answers.otherDifficultyNonexistence !== undefined
  ) {
    derived.relationalMortalityAsymmetryDifficulty =
      answers.otherDifficultyNonexistence - answers.selfDifficultyNonexistence;
  }

  if (
    answers.selfDistressNonexistence !== undefined &&
    answers.otherDistressNonexistence !== undefined
  ) {
    derived.relationalMortalityAsymmetryDistress =
      answers.otherDistressNonexistence - answers.selfDistressNonexistence;
  }

  if (
    answers.selfDesireContinuedExistence !== undefined &&
    answers.otherDesireContinuedExistence !== undefined
  ) {
    derived.relationalMortalityAsymmetryDesire =
      answers.otherDesireContinuedExistence -
      answers.selfDesireContinuedExistence;
  }

  if (answers.wpbWant !== undefined && answers.wpbBelief !== undefined) {
    derived.wantBeliefGap = answers.wpbWant - answers.wpbBelief;
  }

  if (answers.wpbWant !== undefined && answers.wpbPlausibility !== undefined) {
    derived.wantPlausibilityGap = answers.wpbWant - answers.wpbPlausibility;
  }

  if (answers.wpbBelief !== undefined && answers.wpbCertainty !== undefined) {
    derived.beliefCertaintyGap = answers.wpbCertainty - answers.wpbBelief;
  }

  if (
    answers.survivalProbLoved !== undefined &&
    answers.survivalProbStranger !== undefined
  ) {
    derived.targetSurvivalLovedMinusStranger =
      answers.survivalProbLoved - answers.survivalProbStranger;
  }

  if (
    answers.survivalProbLoved !== undefined &&
    answers.survivalProbSelf !== undefined
  ) {
    derived.targetSurvivalLovedMinusSelf =
      answers.survivalProbLoved - answers.survivalProbSelf;
  }

  const nrd = mean([
    answers.nrdIntellectualVsEmotional,
    answers.nrdSomewhereVsNowhere,
    answers.nrdPointOfView,
    answers.nrdElsewhereEasier,
  ]);
  if (nrd !== undefined) {
    derived.nonexistenceRepresentationDifficulty = nrd;
  }

  if (
    answers.eidExplicitNoExistence !== undefined &&
    answers.eidIntuitiveExists !== undefined
  ) {
    derived.explicitIntuitiveDissociation =
      answers.eidIntuitiveExists - (8 - answers.eidExplicitNoExistence);
  }

  const reunionResponses = answers.reunionScenarioResponses ?? {};
  const reunionValues = Object.values(reunionResponses);
  if (reunionValues.length > 0) {
    const yesCount = reunionValues.filter((v) => REUNION_YES.has(v)).length;
    derived.reunionIdentityThreshold = yesCount / reunionValues.length;
  }

  const tradeoffScores: number[] = [];
  if (answers.tradeoff1Choice === "B") tradeoffScores.push(1);
  if (answers.tradeoff1Choice === "A") tradeoffScores.push(0);
  if (answers.tradeoff2Choice === "B") tradeoffScores.push(1);
  if (answers.tradeoff2Choice === "A") tradeoffScores.push(0);
  if (answers.tradeoff3Choice === "B") tradeoffScores.push(1);
  if (answers.tradeoff3Choice === "A") tradeoffScores.push(0);
  if (tradeoffScores.length > 0) {
    derived.relationalImmortalityPreference =
      tradeoffScores.reduce((a, b) => a + b, 0) / tradeoffScores.length;
  }

  return derived;
}
