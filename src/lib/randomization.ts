import type {
  MicroExperimentCondition,
  MortalityOrder,
  RandomizationMeta,
  SurvivalTarget,
} from "./types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createRandomization(): RandomizationMeta {
  const conditions: MicroExperimentCondition[] = [
    "self_mortality",
    "attachment_loss",
    "control",
  ];

  const reunionScenarios = [
    "consciousness_no_memories",
    "memories_different_personality",
    "personality_no_memories_of_you",
    "psychological_no_body",
    "psychological_no_soul",
    "soul_no_memories_of_you",
    "memories_no_emotional_recognition",
    "full_psychological_different_body",
  ];

  const altExplanations = [
    "fear_own_death",
    "cultural_learning",
    "mind_body_dualism",
    "moral_justice",
    "social_cohesion",
    "unusual_experiences",
    "meaning_making",
    "attachment_grief",
  ];

  return {
    mortalityAsymmetryOrder:
      Math.random() < 0.5 ? "self_first" : "other_first",
    survivalTargetOrder: shuffle<SurvivalTarget>(["self", "loved", "stranger"]),
    reunionScenarioOrder: shuffle(reunionScenarios),
    tradeoffAbFlipped: {
      tradeoff1: Math.random() < 0.5,
      tradeoff2: Math.random() < 0.5,
      tradeoff3: Math.random() < 0.5,
    },
    microExperimentCondition:
      conditions[Math.floor(Math.random() * conditions.length)],
    alternativeExplanationOrder: shuffle(altExplanations),
  };
}

export function getMortalityStepsOrder(
  order: MortalityOrder
): ("self" | "other")[] {
  return order === "self_first" ? ["self", "other"] : ["other", "self"];
}
