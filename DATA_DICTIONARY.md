# Data Dictionary

Working variable names for the pilot study **Relational Immortality: Attachment, Grief, and Beliefs About Continued Existence**.

Scale note: Unless otherwise noted, 1–7 Likert items use: 1 = strongly disagree / not at all, 7 = strongly agree / very much.

---

## Identifiers and metadata

| Variable | Description |
|----------|-------------|
| `participant_id` | Anonymous UUID, generated client-side |
| `started_at` | ISO timestamp when survey began |
| `completed_at` | ISO timestamp when survey submitted |
| `is_test_response` | Boolean flag for test submissions |

---

## Randomization metadata (prefix: `rand_`)

| Variable | Description |
|----------|-------------|
| `rand_mortalityAsymmetryOrder` | `self_first` or `other_first` — order of self vs loved-other mortality items |
| `rand_survivalTargetOrder` | Pipe-separated order of survival probability targets (self, loved, stranger) |
| `rand_reunionScenarioOrder` | Pipe-separated order of reunion identity scenarios |
| `rand_tradeoffAbFlipped` | JSON object — whether A/B options were flipped per tradeoff item |
| `rand_microExperimentCondition` | `self_mortality`, `attachment_loss`, or `control` |
| `rand_alternativeExplanationOrder` | Pipe-separated order of alternative explanation filler items |

---

## Demographics (prefix: `ans_`)

| Variable | Description |
|----------|-------------|
| `ans_ageRange` | Age range category (18-24, 25-34, etc.) |
| `ans_country` | Free-text country/region |
| `ans_gender` | Optional free-text gender |
| `ans_religiousIdentity` | religious, spiritual, agnostic, atheist, other, prefer_not |
| `ans_religionImportance` | 1–7 importance of religion/spirituality |
| `ans_childhoodReligiousUpbringing` | Category of childhood religious exposure |
| `ans_godBelief` | 1–7 current belief in God/gods |

---

## Baseline metaphysical beliefs (1–7, separate items)

| Variable | Description |
|----------|-------------|
| `ans_beliefConsciousnessContinues` | Consciousness continues after bodily death |
| `ans_beliefIdentityContinues` | Personal identity continues |
| `ans_beliefReunion` | People may reunite with loved ones |
| `ans_beliefReincarnation` | Reincarnation/rebirth |
| `ans_beliefDeceasedAware` | Deceased may remain aware of living |
| `ans_beliefMoralJudgment` | Moral reward/punishment/judgment after death |

---

## Construct 1: Relational Mortality Asymmetry

### Self items (1–7)

| Variable | Description |
|----------|-------------|
| `ans_selfDifficultyNonexistence` | Difficulty comprehending own permanent nonexistence |
| `ans_selfDistressNonexistence` | Distress from own permanent nonexistence |
| `ans_selfDesireContinuedExistence` | Desire for own continued existence |
| `ans_selfDesireAfterlifePersonal` | Desire for afterlife because personal continuation wanted |
| `ans_selfIntuitiveContinues` | Intuitive sense of own continuation |

### Loved-other items (1–7)

| Variable | Description |
|----------|-------------|
| `ans_otherDifficultyNonexistence` | Difficulty comprehending loved person's nonexistence |
| `ans_otherDistressNonexistence` | Distress from loved person's nonexistence |
| `ans_otherDesireContinuedExistence` | Desire for loved person's continued existence |
| `ans_otherDesireAfterlifePersonal` | Desire for afterlife because loved person should continue |
| `ans_otherIntuitiveContinues` | Intuitive sense loved person continues |

### Derived (prefix: `derived_`)

| Variable | Description |
|----------|-------------|
| `derived_relationalMortalityAsymmetry` | Mean(other items) − Mean(self items) |
| `derived_relationalMortalityAsymmetryDifficulty` | otherDifficulty − selfDifficulty |
| `derived_relationalMortalityAsymmetryDistress` | otherDistress − selfDistress |
| `derived_relationalMortalityAsymmetryDesire` | otherDesire − selfDesire |

---

## Construct 2: Want / Plausibility / Belief / Certainty

| Variable | Description |
|----------|-------------|
| `ans_wpbWant` | How strongly want continued existence to be true |
| `ans_wpbPlausibility` | Plausibility ignoring desire |
| `ans_wpbBelief` | Actual belief |
| `ans_wpbCertainty` | Confidence in belief |

| Derived | Description |
|---------|-------------|
| `derived_wantBeliefGap` | want − belief |
| `derived_wantPlausibilityGap` | want − plausibility |
| `derived_beliefCertaintyGap` | certainty − belief |

---

## Construct 3: Target-Specific Survival Effect

| Variable | Description |
|----------|-------------|
| `ans_survivalProbSelf` | 0–100 probability for self |
| `ans_survivalProbLoved` | 0–100 probability for loved person |
| `ans_survivalProbStranger` | 0–100 probability for unknown deceased |

| Derived | Description |
|---------|-------------|
| `derived_targetSurvivalLovedMinusStranger` | loved − stranger |
| `derived_targetSurvivalLovedMinusSelf` | loved − self |

---

## Bereavement branch

| Variable | Description |
|----------|-------------|
| `ans_experiencedCloseDeath` | Boolean — close bereavement experienced |
| `ans_relationalLabel` | Neutral label for deceased (e.g., "My mother") |
| `ans_lossRelationship` | Relationship category |
| `ans_timeSinceDeath` | Approximate time since death |
| `ans_emotionalCloseness` | 1–7 emotional closeness |
| `ans_expectednessOfDeath` | 1–7 expectedness |
| `ans_ageAtLoss` | Participant age at time of loss |
| `ans_worldviewAtLoss` | Worldview at time of loss |

---

## Construct 4: Nonexistence Representation Difficulty (bereaved, 1–7)

| Variable | Description |
|----------|-------------|
| `ans_nrdIntellectualVsEmotional` | Intellectual understanding vs emotional representation |
| `ans_nrdSomewhereVsNowhere` | Representing as somewhere vs nowhere |
| `ans_nrdPointOfView` | Thinking they still have a point of view |
| `ans_nrdElsewhereEasier` | Elsewhere easier than nonexistence |

| Derived | Description |
|---------|-------------|
| `derived_nonexistenceRepresentationDifficulty` | Mean of four items |

---

## Construct 5: Explicit–Intuitive Afterlife Dissociation (bereaved, 1–7)

| Variable | Description |
|----------|-------------|
| `ans_eidExplicitNoExistence` | Explicit belief person no longer exists |
| `ans_eidIntuitiveExists` | Intuitive representation as existing |
| `ans_eidBehavioralSpeak` | Internal conversation with deceased |
| `ans_eidExpectancyEncounter` | Expectancy of future encounter |

| Derived | Description |
|---------|-------------|
| `derived_explicitIntuitiveDissociation` | intuitiveExists − reversed(explicitNoExistence) |

---

## Continuing bond experiences (bereaved)

| Variable | Description |
|----------|-------------|
| `ans_continuingBondExperiences` | JSON array: dreams, sensed_presence, sensory, signs, internal_conversation, guided, none |
| `ans_cbBeliefBefore` | Belief before experiences |
| `ans_cbPlausibilityChange` | Change in plausibility |
| `ans_cbEmotionalComfortOnly` | Comfort without intellectual change |
| `ans_cbWeakenedBelief` | Weakened previous belief |

---

## Causal timeline (bereaved, 1–7 at three timepoints)

Timepoints: `timelineBefore*`, `timelineShortly*`, `timelineAfterExperience*` (shown only if continuing-bond experiences reported), `timelineNow*`

Items at each: desireContinued, beliefConsciousness, beliefReunion, beliefGod, beliefMoral

| Variable | Description |
|----------|-------------|
| `ans_timelineWhichCameFirst` | Retrospective causal ordering |

---

## Construct 6: Reunion Identity Threshold

| Variable | Description |
|----------|-------------|
| `ans_reunionScenarioResponses` | JSON object: scenario_key → Definitely no / Probably no / Unsure / Probably yes / Definitely yes |

| Derived | Description |
|---------|-------------|
| `derived_reunionIdentityThreshold` | Proportion of scenarios answered Probably/Definitely yes |

---

## Construct 7: Relational Immortality Preference (trade-offs)

| Variable | Description |
|----------|-------------|
| `ans_tradeoff1Choice` | A or B (see randomization for semantic mapping) |
| `ans_tradeoff1Strength` | 1–7 preference strength |
| `ans_tradeoff2Choice` | A or B |
| `ans_tradeoff2Strength` | 1–7 |
| `ans_tradeoff3Choice` | A or B |
| `ans_tradeoff3Strength` | 1–7 |

| Derived | Description |
|---------|-------------|
| `derived_relationalImmortalityPreference` | Mean score favoring relational/reunion options (B-coded) |

---

## Construct 8: Attachment-Conditioned Epistemic Resistance

| Variable | Description |
|----------|-------------|
| `ans_epistemicLessConfident` | What would reduce confidence |
| `ans_epistemicMoreConfident` | What would increase confidence |
| `ans_epistemicLovedVsGeneral` | Loved-specific vs general evidence |
| `ans_epistemicOpenResponse` | Optional open text |

---

## Micro-experiment

| Variable | Description |
|----------|-------------|
| `rand_microExperimentCondition` | Assigned condition |
| `ans_microSkipped` | Whether participant skipped reflection |
| `ans_microDesirePersonalContinued` | Post-prompt measure |
| `ans_microDesireLovedContinued` | Post-prompt measure |
| `ans_microPlausibilityConsciousness` | Post-prompt measure |
| `ans_microReunionBelief` | Post-prompt measure |
| `ans_microPersonalImmortality` | Post-prompt measure |
| `ans_microMoralReward` | Post-prompt measure |
| `ans_microEmotionalIntensity` | Post-prompt measure |

---

## God / human love module

| Variable | Description |
|----------|-------------|
| `ans_loveParentalUnconditional` | 1–7 |
| `ans_loveParentalForgiving` | 1–7 |
| `ans_loveParentalProtective` | 1–7 |
| `ans_loveRomanticPermanent` | 1–7 |
| `ans_loveRomanticKnowing` | 1–7 |
| `ans_loveFriendshipResponsive` | 1–7 |
| `ans_loveDivineUnconditional` | 1–7 |
| `ans_loveDivineKnowing` | 1–7 |
| `ans_loveDivineComforting` | 1–7 |
| `ans_humanBeforeDivine` | Temporal ordering of human vs divine love concepts |

---

## Alternative explanations (filler/control, 1–7)

Stored in `ans_altExplanationRatings` as JSON object with keys: fear_own_death, cultural_learning, mind_body_dualism, moral_justice, social_cohesion, unusual_experiences, meaning_making, attachment_grief

---

## Final theory plausibility ratings (1–7)

| Variable | Description |
|----------|-------------|
| `ans_theoryFearPersonalDeath` | Plausibility as explanation |
| `ans_theoryGrief` | Plausibility as explanation |
| `ans_theoryDesireReunion` | Plausibility as explanation |
| `ans_theoryDifficultyImagining` | Plausibility as explanation |
| `ans_theoryCulturalTeaching` | Plausibility as explanation |
| `ans_theoryMoralJustice` | Plausibility as explanation |
| `ans_theorySensedPresence` | Plausibility as explanation |
| `ans_theoryMeaningMaking` | Plausibility as explanation |
| `ans_theorySocialCohesion` | Plausibility as explanation |

---

## Open responses (optional text)

| Variable | Description |
|----------|-------------|
| `ans_openBeliefChange` | How loss changed beliefs |
| `ans_openHardestAboutDeath` | What humans find hardest about death |

---

## Notes

- These are **working construct names** for an exploratory pilot. They are not validated psychometric scales.
- Derived variables are computed at submission time and stored alongside raw responses.
- Do not interpret any association as causal without experimental or longitudinal design.
