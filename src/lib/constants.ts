export const PUBLIC_TITLE =
  "Relationships, Identity, Mortality, and Beliefs About Consciousness";

export const INTERNAL_TITLE =
  "Relational Immortality: Attachment, Grief, and Beliefs About Continued Existence";

export const LIKERT_LABELS = [
  "Strongly disagree",
  "Disagree",
  "Somewhat disagree",
  "Neutral",
  "Somewhat agree",
  "Agree",
  "Strongly agree",
];

export const REUNION_OPTIONS = [
  "Definitely no",
  "Probably no",
  "Unsure",
  "Probably yes",
  "Definitely yes",
];

export const REUNION_SCENARIOS: Record<
  string,
  { scenario: string; question: string }
> = {
  consciousness_no_memories: {
    scenario:
      "What survived had their consciousness and awareness, but none of their autobiographical memories.",
    question:
      "Would reunion with this entity genuinely feel like seeing the person again?",
  },
  memories_different_personality: {
    scenario:
      "What survived had their memories, but a substantially different personality.",
    question:
      "Would reunion with this entity genuinely feel like seeing the person again?",
  },
  personality_no_memories_of_you: {
    scenario:
      "What survived had their personality, but no memories of you or your relationship.",
    question:
      "Would reunion with this entity genuinely feel like seeing the person again?",
  },
  psychological_no_body: {
    scenario:
      "What survived had complete psychological continuity (memories, personality, consciousness) but no physical body.",
    question:
      "Would reunion with this entity genuinely feel like seeing the person again?",
  },
  psychological_no_soul: {
    scenario:
      "What survived had everything psychological (memories, personality, consciousness) but no supernatural soul.",
    question:
      "Would reunion with this entity genuinely feel like seeing the person again?",
  },
  soul_no_memories_of_you: {
    scenario:
      "What survived had a soul or spiritual essence, but no memories of you.",
    question:
      "Would reunion with this entity genuinely feel like seeing the person again?",
  },
  memories_no_emotional_recognition: {
    scenario:
      "What survived had memories of you but did not recognize you emotionally upon reunion.",
    question:
      "Would reunion with this entity genuinely feel like seeing the person again?",
  },
  full_psychological_different_body: {
    scenario:
      "What survived had complete psychological continuity in a completely different body.",
    question:
      "Would reunion with this entity genuinely feel like seeing the person again?",
  },
};

export const MICRO_PROMPTS = {
  self_mortality: {
    title: "Brief reflection",
    text: "Take a moment to imagine that you will one day permanently cease to exist — that there will be no conscious experience, no awareness, no continuation of any kind. Notice what thoughts or feelings arise, if any.",
  },
  attachment_loss: {
    title: "Brief reflection",
    text: "Take a moment to imagine that someone you deeply love will permanently cease to exist — that there will be no conscious experience, no awareness, no continuation of any kind for them. Notice what thoughts or feelings arise, if any.",
  },
  control: {
    title: "Brief reflection",
    text: "Take a moment to imagine standing alone on a vast, quiet shoreline at dusk. The sky shifts through deep colors, the air is still, and the horizon stretches far into the distance. Notice what thoughts or feelings arise, if any.",
  },
};

export const TRADEOFFS = [
  {
    id: "tradeoff1",
    optionA:
      "You continue to exist after death, but the person you love permanently ceases to exist.",
    optionB:
      "The person you love continues peacefully after death, but you permanently cease to exist.",
  },
  {
    id: "tradeoff2",
    optionA:
      "You both exist forever after death, but can never interact or communicate again.",
    optionB:
      "You experience one completely authentic reunion in which you recognize one another, after which both of you permanently cease to exist.",
  },
  {
    id: "tradeoff3",
    optionA:
      "You personally live forever after death, but lose every memory of people you loved.",
    optionB:
      "You cease to exist eventually, but your important relationships remain mutually recognizable until then.",
  },
];

export const CONTINUING_BOND_OPTIONS = [
  { value: "dreams", label: "Dreams involving the deceased person" },
  { value: "sensed_presence", label: "A sense of their presence" },
  {
    value: "sensory",
    label:
      "Hearing, seeing, smelling, or feeling something associated with them",
  },
  { value: "signs", label: "Coincidences interpreted as signs from them" },
  { value: "internal_conversation", label: "Internal conversation with them" },
  {
    value: "guided",
    label: "Feeling guided or accompanied by them",
  },
  { value: "none", label: "None of the above" },
];

export const ALT_EXPLANATION_LABELS: Record<string, string> = {
  fear_own_death:
    "Fear of one's own death motivates afterlife beliefs",
  cultural_learning:
    "Cultural and religious teaching shapes afterlife beliefs",
  mind_body_dualism:
    "Intuitive mind-body dualism makes continued existence seem natural",
  moral_justice:
    "Belief in moral justice after death motivates afterlife beliefs",
  social_cohesion:
    "Social and community belonging motivates afterlife beliefs",
  unusual_experiences:
    "Unusual or anomalous experiences shape afterlife beliefs",
  meaning_making:
    "Meaning-making after loss shapes afterlife beliefs",
  attachment_grief:
    "Attachment and grief shape afterlife beliefs",
};

export const AGE_RANGES = [
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55-64",
  "65+",
];

export const RELATIONAL_LABELS = [
  "My mother",
  "My father",
  "My partner",
  "My friend",
  "My sibling",
  "My child",
  "My relative",
  "This person",
];

export function getPersonLabel(
  answers: { relationalLabel?: string; experiencedCloseDeath?: boolean }
): string {
  if (answers.experiencedCloseDeath && answers.relationalLabel) {
    return answers.relationalLabel.toLowerCase();
  }
  return "a deeply loved person";
}
