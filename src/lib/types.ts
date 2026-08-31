export type MicroExperimentCondition =
  | "self_mortality"
  | "attachment_loss"
  | "control";

export type MortalityOrder = "self_first" | "other_first";

export type SurvivalTarget = "self" | "loved" | "stranger";

export type RelationalLabel =
  | "My mother"
  | "My father"
  | "My partner"
  | "My friend"
  | "My sibling"
  | "My child"
  | "My relative"
  | "This person";

export interface RandomizationMeta {
  mortalityAsymmetryOrder: MortalityOrder;
  survivalTargetOrder: SurvivalTarget[];
  reunionScenarioOrder: string[];
  tradeoffAbFlipped: Record<string, boolean>;
  microExperimentCondition: MicroExperimentCondition;
  alternativeExplanationOrder: string[];
}

export interface SurveyAnswers {
  consented?: boolean;
  ageRange?: string;
  country?: string;
  gender?: string;
  religiousIdentity?: string;
  religionImportance?: number;
  childhoodReligiousUpbringing?: string;
  godBelief?: number;
  beliefConsciousnessContinues?: number;
  beliefIdentityContinues?: number;
  beliefReunion?: number;
  beliefReincarnation?: number;
  beliefDeceasedAware?: number;
  beliefMoralJudgment?: number;
  selfDifficultyNonexistence?: number;
  selfDistressNonexistence?: number;
  selfDesireContinuedExistence?: number;
  selfDesireAfterlifePersonal?: number;
  selfIntuitiveContinues?: number;
  otherDifficultyNonexistence?: number;
  otherDistressNonexistence?: number;
  otherDesireContinuedExistence?: number;
  otherDesireAfterlifePersonal?: number;
  otherIntuitiveContinues?: number;
  wpbWant?: number;
  wpbPlausibility?: number;
  wpbBelief?: number;
  wpbCertainty?: number;
  survivalProbSelf?: number;
  survivalProbLoved?: number;
  survivalProbStranger?: number;
  experiencedCloseDeath?: boolean;
  relationalLabel?: RelationalLabel;
  lossRelationship?: string;
  timeSinceDeath?: string;
  emotionalCloseness?: number;
  expectednessOfDeath?: number;
  ageAtLoss?: string;
  worldviewAtLoss?: string;
  nrdIntellectualVsEmotional?: number;
  nrdSomewhereVsNowhere?: number;
  nrdPointOfView?: number;
  nrdElsewhereEasier?: number;
  eidExplicitNoExistence?: number;
  eidIntuitiveExists?: number;
  eidBehavioralSpeak?: number;
  eidExpectancyEncounter?: number;
  continuingBondExperiences?: string[];
  cbBeliefBefore?: string;
  cbPlausibilityChange?: string;
  cbEmotionalComfortOnly?: string;
  cbWeakenedBelief?: string;
  timelineBeforeDesireContinued?: number;
  timelineBeforeBeliefConsciousness?: number;
  timelineBeforeBeliefReunion?: number;
  timelineBeforeBeliefGod?: number;
  timelineBeforeBeliefMoral?: number;
  timelineShortlyDesireContinued?: number;
  timelineShortlyBeliefConsciousness?: number;
  timelineShortlyBeliefReunion?: number;
  timelineShortlyBeliefGod?: number;
  timelineShortlyBeliefMoral?: number;
  timelineAfterExperienceDesireContinued?: number;
  timelineAfterExperienceBeliefConsciousness?: number;
  timelineAfterExperienceBeliefReunion?: number;
  timelineAfterExperienceBeliefGod?: number;
  timelineAfterExperienceBeliefMoral?: number;
  timelineNowDesireContinued?: number;
  timelineNowBeliefConsciousness?: number;
  timelineNowBeliefReunion?: number;
  timelineNowBeliefGod?: number;
  timelineNowBeliefMoral?: number;
  timelineWhichCameFirst?: string;
  reunionScenarioResponses?: Record<string, string>;
  tradeoff1Choice?: string;
  tradeoff1Strength?: number;
  tradeoff2Choice?: string;
  tradeoff2Strength?: number;
  tradeoff3Choice?: string;
  tradeoff3Strength?: number;
  epistemicLessConfident?: string;
  epistemicMoreConfident?: string;
  epistemicLovedVsGeneral?: string;
  epistemicOpenResponse?: string;
  microSkipped?: boolean;
  microDesirePersonalContinued?: number;
  microDesireLovedContinued?: number;
  microPlausibilityConsciousness?: number;
  microReunionBelief?: number;
  microPersonalImmortality?: number;
  microMoralReward?: number;
  microEmotionalIntensity?: number;
  loveParentalUnconditional?: number;
  loveParentalForgiving?: number;
  loveParentalProtective?: number;
  loveRomanticPermanent?: number;
  loveRomanticKnowing?: number;
  loveFriendshipResponsive?: number;
  loveDivineUnconditional?: number;
  loveDivineKnowing?: number;
  loveDivineComforting?: number;
  humanBeforeDivine?: string;
  altExplanationRatings?: Record<string, number>;
  theoryFearPersonalDeath?: number;
  theoryGrief?: number;
  theoryDesireReunion?: number;
  theoryDifficultyImagining?: number;
  theoryCulturalTeaching?: number;
  theoryMoralJustice?: number;
  theorySensedPresence?: number;
  theoryMeaningMaking?: number;
  theorySocialCohesion?: number;
  openBeliefChange?: string;
  openHardestAboutDeath?: string;
  [key: string]: unknown;
}

export interface DerivedScores {
  relationalMortalityAsymmetry?: number;
  relationalMortalityAsymmetryDifficulty?: number;
  relationalMortalityAsymmetryDistress?: number;
  relationalMortalityAsymmetryDesire?: number;
  wantBeliefGap?: number;
  wantPlausibilityGap?: number;
  beliefCertaintyGap?: number;
  targetSurvivalLovedMinusStranger?: number;
  targetSurvivalLovedMinusSelf?: number;
  nonexistenceRepresentationDifficulty?: number;
  explicitIntuitiveDissociation?: number;
  reunionIdentityThreshold?: number;
  relationalImmortalityPreference?: number;
}

export interface SurveyResponse {
  participantId: string;
  startedAt: string;
  completedAt: string;
  isTestResponse?: boolean;
  randomization: RandomizationMeta;
  answers: SurveyAnswers;
  derived: DerivedScores;
}

export type StepType =
  | "consent"
  | "info"
  | "demographics"
  | "likert-group"
  | "likert-single"
  | "slider-group"
  | "boolean"
  | "select"
  | "multi-select"
  | "reunion-scenarios"
  | "tradeoff"
  | "micro-prompt"
  | "micro-measures"
  | "text"
  | "open"
  | "debrief";

export interface LikertItem {
  id: keyof SurveyAnswers;
  label: string;
  lowLabel?: string;
  highLabel?: string;
}

export interface SurveyStep {
  id: string;
  type: StepType;
  title?: string;
  description?: string;
  items?: LikertItem[];
  options?: { value: string; label: string }[];
  condition?: (answers: SurveyAnswers) => boolean;
  meta?: Record<string, unknown>;
}
