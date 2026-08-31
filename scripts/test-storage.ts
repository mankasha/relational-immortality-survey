import { randomUUID } from "crypto";
import { computeDerivedScores } from "../src/lib/scoring";
import { loadAllResponses, responsesToCsv, saveResponse } from "../src/lib/storage";

async function main() {
  const id = randomUUID();
  const answers = {
    consented: true,
    experiencedCloseDeath: true,
    selfDifficultyNonexistence: 4,
    otherDifficultyNonexistence: 6,
    survivalProbSelf: 30,
    survivalProbLoved: 60,
    survivalProbStranger: 20,
    wpbWant: 5,
    wpbBelief: 4,
    wpbPlausibility: 3,
    wpbCertainty: 5,
  };

  const derived = computeDerivedScores(answers);

  await saveResponse({
    participantId: id,
    startedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    isTestResponse: true,
    randomization: {
      mortalityAsymmetryOrder: "self_first",
      survivalTargetOrder: ["self", "loved", "stranger"],
      reunionScenarioOrder: [],
      tradeoffAbFlipped: {},
      microExperimentCondition: "control",
      alternativeExplanationOrder: [],
    },
    answers,
    derived,
  });

  const all = await loadAllResponses();
  console.log("Saved responses:", all.length);
  console.log("Derived difficulty asymmetry:", derived.relationalMortalityAsymmetryDifficulty);
  console.log("CSV line count:", responsesToCsv(all).split("\n").length);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
