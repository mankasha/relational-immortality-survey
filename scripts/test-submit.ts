/**
 * Test script: submits dummy bereaved and non-bereaved responses.
 * Run with: npx tsx scripts/test-submit.ts
 * (Requires dev server running on localhost:3000)
 */

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

async function submitDummy(bereaved: boolean, label: string) {
  const { randomUUID } = await import("crypto");
  const participantId = randomUUID();
  const now = new Date().toISOString();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  const randomization = {
    mortalityAsymmetryOrder: "self_first",
    survivalTargetOrder: ["self", "loved", "stranger"],
    reunionScenarioOrder: [
      "consciousness_no_memories",
      "memories_different_personality",
    ],
    tradeoffAbFlipped: { tradeoff1: false, tradeoff2: true, tradeoff3: false },
    microExperimentCondition: bereaved ? "attachment_loss" : "control",
    alternativeExplanationOrder: ["fear_own_death", "attachment_grief"],
  };

  const answers: Record<string, unknown> = {
    consented: true,
    ageRange: "25-34",
    country: "Test Country",
    religiousIdentity: "agnostic",
    religionImportance: 3,
    childhoodReligiousUpbringing: "somewhat",
    godBelief: 3,
    beliefConsciousnessContinues: 4,
    beliefIdentityContinues: 3,
    beliefReunion: 5,
    beliefReincarnation: 2,
    beliefDeceasedAware: 4,
    beliefMoralJudgment: 3,
    selfDifficultyNonexistence: 5,
    selfDistressNonexistence: 4,
    selfDesireContinuedExistence: 5,
    selfDesireAfterlifePersonal: 4,
    selfIntuitiveContinues: 3,
    otherDifficultyNonexistence: 6,
    otherDistressNonexistence: 6,
    otherDesireContinuedExistence: 7,
    otherDesireAfterlifePersonal: 6,
    otherIntuitiveContinues: 5,
    wpbWant: 6,
    wpbPlausibility: 4,
    wpbBelief: 4,
    wpbCertainty: 5,
    survivalProbSelf: 30,
    survivalProbLoved: 55,
    survivalProbStranger: 20,
    experiencedCloseDeath: bereaved,
    tradeoff1Choice: "B",
    tradeoff1Strength: 5,
    tradeoff2Choice: "B",
    tradeoff2Strength: 6,
    tradeoff3Choice: "A",
    tradeoff3Strength: 4,
    microDesirePersonalContinued: 4,
    microDesireLovedContinued: 6,
    microPlausibilityConsciousness: 4,
    microReunionBelief: 5,
    microPersonalImmortality: 3,
    microMoralReward: 3,
    microEmotionalIntensity: 5,
    theoryFearPersonalDeath: 5,
    theoryGrief: 6,
    theoryDesireReunion: 6,
    theoryDifficultyImagining: 5,
    theoryCulturalTeaching: 5,
    theoryMoralJustice: 4,
    theorySensedPresence: 4,
    theoryMeaningMaking: 5,
    theorySocialCohesion: 3,
  };

  if (bereaved) {
    Object.assign(answers, {
      relationalLabel: "My friend",
      lossRelationship: "friend",
      timeSinceDeath: "1_3",
      emotionalCloseness: 7,
      expectednessOfDeath: 2,
      ageAtLoss: "25-34",
      worldviewAtLoss: "agnostic",
      nrdIntellectualVsEmotional: 6,
      nrdSomewhereVsNowhere: 6,
      nrdPointOfView: 5,
      nrdElsewhereEasier: 6,
      eidExplicitNoExistence: 5,
      eidIntuitiveExists: 6,
      eidBehavioralSpeak: 6,
      eidExpectancyEncounter: 5,
      continuingBondExperiences: ["dreams", "internal_conversation"],
      cbBeliefBefore: "no",
      cbPlausibilityChange: "increased",
      timelineBeforeBeliefReunion: 3,
      timelineNowBeliefReunion: 6,
      timelineWhichCameFirst: "desire_continue",
    });
  }

  const res = await fetch(`${BASE}/api/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      participantId,
      startedAt: now,
      completedAt: now,
      isTestResponse: true,
      randomization,
      answers,
      derived: {},
    }),
    signal: controller.signal,
  });
  clearTimeout(timeout);

  const data = await res.json();
  console.log(`${label}:`, res.status, data);
}

async function main() {
  await submitDummy(false, "Non-bereaved dummy");
  await submitDummy(true, "Bereaved dummy");
  console.log("Done. Check data/responses/ or /admin for CSV.");
}

main().catch(console.error);
