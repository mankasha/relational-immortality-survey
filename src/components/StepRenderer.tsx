"use client";

import type { SurveyAnswers } from "@/lib/types";
import type { RandomizationMeta } from "@/lib/types";
import {
  AGE_RANGES,
  ALT_EXPLANATION_LABELS,
  CONTINUING_BOND_OPTIONS,
  getPersonLabel,
  MICRO_PROMPTS,
  PUBLIC_TITLE,
  RELATIONAL_LABELS,
  REUNION_OPTIONS,
  REUNION_SCENARIOS,
  TRADEOFFS,
} from "@/lib/constants";
import { LikertGroup, LikertScale } from "./LikertScale";
import { SliderInput } from "./SliderInput";
import { NavButtons } from "./NavButtons";

interface StepRendererProps {
  stepId: string;
  answers: SurveyAnswers;
  randomization: RandomizationMeta;
  updateAnswer: (key: string, value: unknown) => void;
  updateAndNext?: (key: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  onDecline: () => void;
  onExit: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function StepRenderer({
  stepId,
  answers,
  randomization,
  updateAnswer,
  updateAndNext,
  onNext,
  onBack,
  onDecline,
  onExit,
  isFirst,
  isLast,
}: StepRendererProps) {
  const person = getPersonLabel(answers);

  const setNum = (key: string) => (v: number) => updateAnswer(key, v);

  const setStr = (key: string) => (v: string) => updateAnswer(key, v);

  const setBool = (key: string) => (v: boolean) => updateAnswer(key, v);

  const heading = (title: string, desc?: string) => (
    <>
      <h1 className="mb-2 text-xl font-semibold leading-snug text-[#2c2a26]">
        {title}
      </h1>
      {desc && (
        <p className="mb-6 text-sm leading-relaxed text-[#5a554f]">{desc}</p>
      )}
    </>
  );

  const selectField = (
    label: string,
    key: string,
    options: { value: string; label: string }[],
    required = true
  ) => (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <select
        value={(answers[key] as string) ?? ""}
        onChange={(e) => updateAnswer(key, e.target.value)}
        className="w-full rounded-xl border border-[#d4cfc4] bg-white px-4 py-3 text-sm"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {required && !answers[key] && (
        <p className="mt-1 text-xs text-[#8a847c]">Required</p>
      )}
    </div>
  );

  switch (stepId) {
    case "consent":
      return (
        <div>
          {heading(
            PUBLIC_TITLE,
            "You are invited to participate in a research survey about relationships, identity, mortality, bereavement, and beliefs about consciousness. Some questions concern death and loss. Participation is voluntary. We do not collect email addresses. You may optionally provide your name in a later section."
          )}
          <div className="mb-6 rounded-xl border border-[#e8e4dc] bg-white p-4 text-sm leading-relaxed">
            <p className="mb-3">
              <strong>Eligibility:</strong> You must be 18 years of age or older.
            </p>
            <p className="mb-3">
              Estimated completion time: 10–15 minutes. You may exit at any time.
            </p>
            <p>
              By continuing, you confirm that you are 18+ and consent to
              anonymous participation in this research study.
            </p>
          </div>
          <NavButtons
            onNext={() => {
              updateAnswer("consented", true);
              onNext();
            }}
            nextLabel="I consent — begin survey"
            showBack={false}
            showExit
            onExit={onExit}
          />
          <button
            type="button"
            onClick={onDecline}
            className="mt-3 w-full text-center text-sm text-[#8a847c] underline"
          >
            I do not consent
          </button>
        </div>
      );

    case "demographics":
      return (
        <div>
          {heading("About you", "A few background questions. Name and gender are optional.")}
          {selectField(
            "Age range",
            "ageRange",
            AGE_RANGES.map((a) => ({ value: a, label: a }))
          )}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Country / region
            </label>
            <input
              type="text"
              value={answers.country ?? ""}
              onChange={(e) => updateAnswer("country", e.target.value)}
              placeholder="e.g. United States, UK, Canada"
              className="w-full rounded-xl border border-[#d4cfc4] bg-white px-4 py-3 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Name (optional)
            </label>
            <input
              type="text"
              value={answers.participantName ?? ""}
              onChange={(e) => updateAnswer("participantName", e.target.value)}
              placeholder="Optional — first name or nickname is fine"
              className="w-full rounded-xl border border-[#d4cfc4] bg-white px-4 py-3 text-sm"
              autoComplete="name"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Gender (optional)
            </label>
            <input
              type="text"
              value={answers.gender ?? ""}
              onChange={(e) => updateAnswer("gender", e.target.value)}
              placeholder="Optional"
              className="w-full rounded-xl border border-[#d4cfc4] bg-white px-4 py-3 text-sm"
            />
          </div>
          {selectField("Religious / spiritual identity", "religiousIdentity", [
            { value: "religious", label: "Religious" },
            { value: "spiritual", label: "Spiritual but not religious" },
            { value: "agnostic", label: "Agnostic" },
            { value: "atheist", label: "Atheist" },
            { value: "other", label: "Other" },
            { value: "prefer_not", label: "Prefer not to say" },
          ])}
          <LikertScale
            label="How important is religion or spirituality in your life?"
            value={answers.religionImportance}
            onChange={setNum("religionImportance")}
            lowLabel="Not at all important"
            highLabel="Extremely important"
          />
          {selectField("Childhood religious upbringing", "childhoodReligiousUpbringing", [
            { value: "religious", label: "Religious upbringing" },
            { value: "somewhat", label: "Somewhat religious" },
            { value: "nonreligious", label: "Non-religious upbringing" },
            { value: "mixed", label: "Mixed / varied" },
            { value: "none", label: "None / not applicable" },
          ])}
          <LikertScale
            label="Current belief in God or gods"
            value={answers.godBelief}
            onChange={setNum("godBelief")}
            lowLabel="Strongly do not believe"
            highLabel="Strongly believe"
          />
          <NavButtons
            onBack={onBack}
            onNext={onNext}
            nextDisabled={!answers.ageRange || !answers.country || !answers.religiousIdentity}
            showExit
            onExit={onExit}
          />
        </div>
      );

    case "metaphysical_beliefs":
      return (
        <div>
          {heading(
            "Current beliefs",
            "Please rate your current beliefs using the scales below. These are separate dimensions — answer each independently."
          )}
          <LikertGroup
            items={[
              {
                id: "beliefConsciousnessContinues",
                label:
                  "Some aspect of consciousness continues after bodily death.",
              },
              {
                id: "beliefIdentityContinues",
                label: "Personal identity continues after bodily death.",
              },
              {
                id: "beliefReunion",
                label:
                  "People may reunite with loved ones after death.",
              },
              {
                id: "beliefReincarnation",
                label: "Reincarnation or rebirth occurs.",
              },
              {
                id: "beliefDeceasedAware",
                label:
                  "Deceased people may remain aware of living people.",
              },
              {
                id: "beliefMoralJudgment",
                label:
                  "Moral reward, punishment, or judgment occurs after death.",
              },
            ]}
            values={answers as Record<string, number | undefined>}
            onChange={(id, v) => updateAnswer(id, v)}
          />
          <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
        </div>
      );

    case "mortality_self":
      return (
        <div>
          {heading(
            "Thinking about yourself",
            "Please consider your own mortality and rate each statement."
          )}
          <LikertGroup
            items={[
              {
                id: "selfDifficultyNonexistence",
                label:
                  "It is difficult for me to comprehend my own permanent nonexistence.",
              },
              {
                id: "selfDistressNonexistence",
                label:
                  "The idea of my own permanent nonexistence causes me distress.",
              },
              {
                id: "selfDesireContinuedExistence",
                label: "I desire my own continued existence.",
              },
              {
                id: "selfDesireAfterlifePersonal",
                label:
                  "I want to believe in an afterlife because I personally want to continue existing.",
              },
              {
                id: "selfIntuitiveContinues",
                label:
                  "I have an intuitive sense that I somehow continue after death.",
              },
            ]}
            values={answers as Record<string, number | undefined>}
            onChange={(id, v) => updateAnswer(id, v)}
          />
          <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
        </div>
      );

    case "mortality_other":
      return (
        <div>
          {heading(
            "Thinking about someone you love",
            "Now consider a deeply loved person (living or deceased) and rate each statement."
          )}
          <LikertGroup
            items={[
              {
                id: "otherDifficultyNonexistence",
                label:
                  "It is difficult for me to comprehend this person's permanent nonexistence.",
              },
              {
                id: "otherDistressNonexistence",
                label:
                  "The idea of this person's permanent nonexistence causes me distress.",
              },
              {
                id: "otherDesireContinuedExistence",
                label: "I desire this person's continued existence.",
              },
              {
                id: "otherDesireAfterlifePersonal",
                label:
                  "I want to believe in an afterlife because I want this person to continue existing.",
              },
              {
                id: "otherIntuitiveContinues",
                label:
                  "I have an intuitive sense that this person somehow continues after death.",
              },
            ]}
            values={answers as Record<string, number | undefined>}
            onChange={(id, v) => updateAnswer(id, v)}
          />
          <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
        </div>
      );

    case "want_belief_plausibility":
      return (
        <div>
          {heading(
            "Want, plausibility, belief, and certainty",
            `Consider the proposition: "${person.charAt(0).toUpperCase() + person.slice(1)} continues to exist in some form after bodily death." Rate each dimension separately.`
          )}
          <LikertGroup
            items={[
              {
                id: "wpbWant",
                label: "WANT: How strongly would you want this to be true?",
                lowLabel: "Not at all",
                highLabel: "Very strongly",
              },
              {
                id: "wpbPlausibility",
                label:
                  "PLAUSIBILITY: Ignoring what you want, how plausible does this seem?",
                lowLabel: "Not plausible at all",
                highLabel: "Very plausible",
              },
              {
                id: "wpbBelief",
                label: "BELIEF: What do you actually believe?",
                lowLabel: "Definitely false",
                highLabel: "Definitely true",
              },
              {
                id: "wpbCertainty",
                label:
                  "CERTAINTY: How confident are you that your belief is correct?",
                lowLabel: "Not confident at all",
                highLabel: "Completely confident",
              },
            ]}
            values={answers as Record<string, number | undefined>}
            onChange={(id, v) => updateAnswer(id, v)}
          />
          <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
        </div>
      );

    case "survival_self":
      return (
        <div>
          {heading("Probability judgment")}
          <SliderInput
            label="What probability would you assign to some aspect of your own consciousness continuing after bodily death?"
            value={answers.survivalProbSelf ?? 50}
            onChange={setNum("survivalProbSelf")}
          />
          <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
        </div>
      );

    case "survival_loved":
      return (
        <div>
          {heading("Probability judgment")}
          <SliderInput
            label={`What probability would you assign to some aspect of ${person}'s consciousness continuing after bodily death?`}
            value={answers.survivalProbLoved ?? 50}
            onChange={setNum("survivalProbLoved")}
          />
          <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
        </div>
      );

    case "survival_stranger":
      return (
        <div>
          {heading("Probability judgment")}
          <SliderInput
            label="What probability would you assign to some aspect of an unknown person who died continuing after bodily death?"
            value={answers.survivalProbStranger ?? 50}
            onChange={setNum("survivalProbStranger")}
          />
          <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
        </div>
      );

    case "bereavement_gate":
      return (
        <div>
          {heading(
            "Experiences of loss",
            "Have you experienced the death of someone to whom you felt very emotionally close?"
          )}
          <div className="mb-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                if (updateAndNext) updateAndNext("experiencedCloseDeath", true);
                else {
                  setBool("experiencedCloseDeath")(true);
                  onNext();
                }
              }}
              className="rounded-xl border border-[#d4cfc4] bg-white px-4 py-4 text-left text-sm transition hover:border-[#5a7a6a] hover:bg-[#faf8f4]"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => {
                if (updateAndNext) updateAndNext("experiencedCloseDeath", false);
                else {
                  setBool("experiencedCloseDeath")(false);
                  onNext();
                }
              }}
              className="rounded-xl border border-[#d4cfc4] bg-white px-4 py-4 text-left text-sm transition hover:border-[#5a7a6a] hover:bg-[#faf8f4]"
            >
              No
            </button>
          </div>
          <NavButtons onBack={onBack} showBack onExit={onExit} />
        </div>
      );

    case "bereavement_details":
      return (
        <div>
          {heading(
            "About your loss",
            "Please answer about the single loss that affected you most deeply. You do not need to provide the person's real name."
          )}
          {selectField(
            "How would you like to refer to this person?",
            "relationalLabel",
            RELATIONAL_LABELS.map((l) => ({ value: l, label: l }))
          )}
          {selectField("Relationship category", "lossRelationship", [
            { value: "parent", label: "Parent" },
            { value: "partner", label: "Partner / spouse" },
            { value: "child", label: "Child" },
            { value: "sibling", label: "Sibling" },
            { value: "friend", label: "Friend" },
            { value: "other_relative", label: "Other relative" },
            { value: "other", label: "Other close relationship" },
          ])}
          {selectField("Approximate time since death", "timeSinceDeath", [
            { value: "under_1", label: "Less than 1 year" },
            { value: "1_3", label: "1–3 years" },
            { value: "3_10", label: "3–10 years" },
            { value: "10_plus", label: "More than 10 years" },
          ])}
          <LikertScale
            label="Emotional closeness to this person"
            value={answers.emotionalCloseness}
            onChange={setNum("emotionalCloseness")}
            lowLabel="Not close"
            highLabel="Extremely close"
          />
          <LikertScale
            label="Expectedness of the death"
            value={answers.expectednessOfDeath}
            onChange={setNum("expectednessOfDeath")}
            lowLabel="Completely unexpected"
            highLabel="Fully expected"
          />
          {selectField("Your age at the time of loss", "ageAtLoss", AGE_RANGES.map((a) => ({ value: a, label: a })))}
          {selectField("Your worldview at the time of loss", "worldviewAtLoss", [
            { value: "religious", label: "Religious" },
            { value: "spiritual", label: "Spiritual" },
            { value: "agnostic", label: "Agnostic" },
            { value: "atheist", label: "Atheist" },
            { value: "other", label: "Other" },
          ])}
          <NavButtons
            onBack={onBack}
            onNext={onNext}
            nextDisabled={!answers.relationalLabel}
            showExit
            onExit={onExit}
          />
        </div>
      );

    case "nonexistence_representation":
      return (
        <div>
          {heading(
            "Representing absence",
            `The following questions concern ${person}. There are no right or wrong answers.`
          )}
          <LikertGroup
            items={[
              {
                id: "nrdIntellectualVsEmotional",
                label: `I understand intellectually that ${person} died, but it is difficult to represent them emotionally as simply no longer existing anywhere.`,
              },
              {
                id: "nrdSomewhereVsNowhere",
                label: `When I think about ${person}, my mind tends to represent them as being somewhere rather than nowhere.`,
              },
              {
                id: "nrdPointOfView",
                label: `I sometimes catch myself thinking about ${person} as though they still have a point of view.`,
              },
              {
                id: "nrdElsewhereEasier",
                label: `It feels easier to imagine ${person} being elsewhere than not existing at all.`,
              },
            ]}
            values={answers as Record<string, number | undefined>}
            onChange={(id, v) => updateAnswer(id, v)}
          />
          <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
        </div>
      );

    case "explicit_intuitive":
      return (
        <div>
          {heading(
            "Explicit and intuitive beliefs",
            `These questions explore whether your explicit beliefs and intuitive representations of ${person} may differ.`
          )}
          <LikertGroup
            items={[
              {
                id: "eidExplicitNoExistence",
                label: `EXPLICIT: I believe ${person} no longer exists in any conscious form.`,
              },
              {
                id: "eidIntuitiveExists",
                label: `INTUITIVE: When I think about ${person}, my mind still tends to represent them as existing somewhere.`,
              },
              {
                id: "eidBehavioralSpeak",
                label: `BEHAVIORAL: I sometimes speak to ${person} internally or imagine what they would say.`,
              },
              {
                id: "eidExpectancyEncounter",
                label: `EXPECTANCY: Some part of me feels as though I could encounter ${person} again.`,
              },
            ]}
            values={answers as Record<string, number | undefined>}
            onChange={(id, v) => updateAnswer(id, v)}
          />
          <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
        </div>
      );

    case "continuing_bond":
      return (
        <div>
          {heading(
            "Continuing experiences",
            "Have you experienced any of the following since the death? Select all that apply."
          )}
          <div className="mb-6 space-y-2">
            {CONTINUING_BOND_OPTIONS.map((opt) => {
              const selected = (answers.continuingBondExperiences ?? []).includes(
                opt.value
              );
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    const current = answers.continuingBondExperiences ?? [];
                    const next = selected
                      ? current.filter((v) => v !== opt.value)
                      : opt.value === "none"
                        ? ["none"]
                        : [...current.filter((v) => v !== "none"), opt.value];
                    updateAnswer("continuingBondExperiences", next);
                  }}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                    selected
                      ? "border-[#5a7a6a] bg-[#eef3ef]"
                      : "border-[#d4cfc4] bg-white hover:bg-[#faf8f4]"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
        </div>
      );

    case "continuing_bond_followup":
      return (
        <div>
          {heading(
            "Experiences and belief",
            "If you selected any experiences above, please answer the following. Otherwise, select the most applicable option."
          )}
          {selectField(
            "Did you already believe in continued existence before these experiences?",
            "cbBeliefBefore",
            [
              { value: "yes_strong", label: "Yes, strongly" },
              { value: "yes_somewhat", label: "Yes, somewhat" },
              { value: "no", label: "No" },
              { value: "unsure", label: "Unsure / not applicable" },
            ],
            false
          )}
          {selectField(
            "Did the experience change how plausible continued existence seemed?",
            "cbPlausibilityChange",
            [
              { value: "increased", label: "Yes, increased plausibility" },
              { value: "decreased", label: "Yes, decreased plausibility" },
              { value: "no_change", label: "No change" },
              { value: "unsure", label: "Unsure / not applicable" },
            ],
            false
          )}
          {selectField(
            "Did it primarily feel emotionally comforting without changing intellectual belief?",
            "cbEmotionalComfortOnly",
            [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "unsure", label: "Unsure / not applicable" },
            ],
            false
          )}
          {selectField(
            "Did it weaken your previous belief?",
            "cbWeakenedBelief",
            [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "unsure", label: "Unsure / not applicable" },
            ],
            false
          )}
          <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
        </div>
      );

    case "causal_timeline":
      return (
        <div>
          {heading(
            "Beliefs over time",
            "Please estimate your beliefs at different points. Use your best retrospective judgment."
          )}
          <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[#6b6560]">
            Before the death
          </p>
          <LikertGroup
            items={[
              { id: "timelineBeforeDesireContinued", label: "Desire for their continued existence" },
              { id: "timelineBeforeBeliefConsciousness", label: "Belief in continued consciousness" },
              { id: "timelineBeforeBeliefReunion", label: "Belief in reunion" },
              { id: "timelineBeforeBeliefGod", label: "Belief in God / spirituality" },
              { id: "timelineBeforeBeliefMoral", label: "Belief in moral judgment after death" },
            ]}
            values={answers as Record<string, number | undefined>}
            onChange={(id, v) => updateAnswer(id, v)}
          />
          <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[#6b6560]">
            Shortly after the death
          </p>
          <LikertGroup
            items={[
              { id: "timelineShortlyDesireContinued", label: "Desire for their continued existence" },
              { id: "timelineShortlyBeliefConsciousness", label: "Belief in continued consciousness" },
              { id: "timelineShortlyBeliefReunion", label: "Belief in reunion" },
              { id: "timelineShortlyBeliefGod", label: "Belief in God / spirituality" },
              { id: "timelineShortlyBeliefMoral", label: "Belief in moral judgment after death" },
            ]}
            values={answers as Record<string, number | undefined>}
            onChange={(id, v) => updateAnswer(id, v)}
          />
          {(answers.continuingBondExperiences ?? []).some(
            (e) => e !== "none"
          ) && (
            <>
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[#6b6560]">
                After an important dream, sensed presence, or sign experience
              </p>
              <LikertGroup
                items={[
                  { id: "timelineAfterExperienceDesireContinued", label: "Desire for their continued existence" },
                  { id: "timelineAfterExperienceBeliefConsciousness", label: "Belief in continued consciousness" },
                  { id: "timelineAfterExperienceBeliefReunion", label: "Belief in reunion" },
                  { id: "timelineAfterExperienceBeliefGod", label: "Belief in God / spirituality" },
                  { id: "timelineAfterExperienceBeliefMoral", label: "Belief in moral judgment after death" },
                ]}
                values={answers as Record<string, number | undefined>}
                onChange={(id, v) => updateAnswer(id, v)}
              />
            </>
          )}
          <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[#6b6560]">
            Now
          </p>
          <LikertGroup
            items={[
              { id: "timelineNowDesireContinued", label: "Desire for their continued existence" },
              { id: "timelineNowBeliefConsciousness", label: "Belief in continued consciousness" },
              { id: "timelineNowBeliefReunion", label: "Belief in reunion" },
              { id: "timelineNowBeliefGod", label: "Belief in God / spirituality" },
              { id: "timelineNowBeliefMoral", label: "Belief in moral judgment after death" },
            ]}
            values={answers as Record<string, number | undefined>}
            onChange={(id, v) => updateAnswer(id, v)}
          />
          {selectField("Which came first, if any?", "timelineWhichCameFirst", [
            { value: "desire_continue", label: "Stronger desire that the person continue" },
            { value: "belief_continued", label: "Stronger belief that they continued" },
            { value: "contact_experience", label: "An experience that felt like contact or presence" },
            { value: "own_mortality", label: "Increased thoughts about my own mortality" },
            { value: "religious_practice", label: "Increased religious/spiritual practice" },
            { value: "none", label: "None / cannot tell" },
          ], false)}
          <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
        </div>
      );

    default:
      if (stepId.startsWith("reunion_")) {
        const scenarioKey = stepId.replace("reunion_", "");
        const scenario = REUNION_SCENARIOS[scenarioKey];
        if (!scenario) return null;
        return (
          <div>
            {heading("Hypothetical reunion", "Imagine a scenario after death:")}
            <div className="mb-4 rounded-xl border border-[#e8e4dc] bg-white p-4 text-sm leading-relaxed">
              {scenario.scenario}
            </div>
            <p className="mb-4 text-sm">{scenario.question}</p>
            <div className="mb-6 flex flex-col gap-2">
              {REUNION_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    const current = answers.reunionScenarioResponses ?? {};
                    updateAnswer("reunionScenarioResponses", {
                      ...current,
                      [scenarioKey]: opt,
                    });
                    onNext();
                  }}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                    answers.reunionScenarioResponses?.[scenarioKey] === opt
                      ? "border-[#5a7a6a] bg-[#eef3ef]"
                      : "border-[#d4cfc4] bg-white hover:bg-[#faf8f4]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <NavButtons onBack={onBack} showExit onExit={onExit} />
          </div>
        );
      }

      if (stepId.startsWith("tradeoff_")) {
        const idx = parseInt(stepId.split("_")[1]) - 1;
        const tradeoff = TRADEOFFS[idx];
        const flipKey = `tradeoff${idx + 1}`;
        const flipped = randomization.tradeoffAbFlipped[flipKey];
        const optA = flipped ? tradeoff.optionB : tradeoff.optionA;
        const optB = flipped ? tradeoff.optionA : tradeoff.optionB;
        const choiceKey = `tradeoff${idx + 1}Choice`;
        const strengthKey = `tradeoff${idx + 1}Strength`;
        const storedChoice = answers[choiceKey] as string | undefined;
        const displayChoice =
          storedChoice === "A"
            ? flipped
              ? "B"
              : "A"
            : storedChoice === "B"
              ? flipped
                ? "A"
                : "B"
              : undefined;

        return (
          <div>
            {heading(
              "Hypothetical choice",
              "Please choose the option you would prefer. There is no right answer."
            )}
            <div className="mb-4 flex flex-col gap-3">
              {[
                { key: "A", text: optA },
                { key: "B", text: optB },
              ].map(({ key, text }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    const stored = flipped ? (key === "A" ? "B" : "A") : key;
                    updateAnswer(choiceKey, stored);
                  }}
                  className={`rounded-xl border px-4 py-4 text-left text-sm leading-relaxed transition ${
                    displayChoice === key
                      ? "border-[#5a7a6a] bg-[#eef3ef]"
                      : "border-[#d4cfc4] bg-white hover:bg-[#faf8f4]"
                  }`}
                >
                  <span className="font-medium">Option {key}:</span> {text}
                </button>
              ))}
            </div>
            {storedChoice && (
              <LikertScale
                label="How strongly do you prefer your chosen option?"
                value={answers[strengthKey] as number | undefined}
                onChange={setNum(strengthKey)}
                lowLabel="Slightly prefer"
                highLabel="Strongly prefer"
              />
            )}
            <NavButtons
              onBack={onBack}
              onNext={onNext}
              nextDisabled={!storedChoice}
              showExit
              onExit={onExit}
            />
          </div>
        );
      }

      if (stepId.startsWith("alt_")) {
        const key = stepId.replace("alt_", "");
        const label = ALT_EXPLANATION_LABELS[key] ?? key;
        const ratings = answers.altExplanationRatings ?? {};
        return (
          <div>
            {heading("Possible explanations", "How much does each factor seem to influence afterlife beliefs in general?")}
            <LikertScale
              label={label}
              value={ratings[key]}
              onChange={(v) =>
                updateAnswer("altExplanationRatings", { ...ratings, [key]: v })
              }
              lowLabel="Not at all"
              highLabel="Very much"
            />
            <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
          </div>
        );
      }

      if (stepId === "epistemic_resistance") {
        return (
          <div>
            {heading(
              "Evidence and confidence",
              "These questions concern what might change your confidence about continued existence."
            )}
            {selectField(
              "What kind of evidence, if any, could make you substantially less confident that consciousness continues after death?",
              "epistemicLessConfident",
              [
                { value: "scientific", label: "Strong scientific evidence against it" },
                { value: "logical", label: "Logical or philosophical arguments" },
                { value: "personal", label: "Personal experiences suggesting otherwise" },
                { value: "none", label: "Nothing would substantially change my confidence" },
                { value: "unsure", label: "Unsure" },
              ],
              false
            )}
            {selectField(
              "What kind of experience or evidence could make you substantially more confident?",
              "epistemicMoreConfident",
              [
                { value: "scientific", label: "Scientific evidence supporting it" },
                { value: "personal", label: "Personal or relational experiences" },
                { value: "religious", label: "Religious or spiritual experiences" },
                { value: "none", label: "Nothing would substantially change my confidence" },
                { value: "unsure", label: "Unsure" },
              ],
              false
            )}
            {selectField(
              "Would evidence concerning the specific person you loved affect you differently from evidence concerning humans in general?",
              "epistemicLovedVsGeneral",
              [
                { value: "yes_much", label: "Yes, very differently" },
                { value: "yes_somewhat", label: "Yes, somewhat differently" },
                { value: "no", label: "No, about the same" },
                { value: "unsure", label: "Unsure / not applicable" },
              ],
              false
            )}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">
                Optional: anything else about what would change your confidence?
              </label>
              <textarea
                value={answers.epistemicOpenResponse ?? ""}
                onChange={(e) => updateAnswer("epistemicOpenResponse", e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-[#d4cfc4] bg-white px-4 py-3 text-sm"
                placeholder="Optional"
              />
            </div>
            <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
          </div>
        );
      }

      if (stepId === "micro_prompt") {
        const prompt = MICRO_PROMPTS[randomization.microExperimentCondition];
        return (
          <div>
            {heading(prompt.title, prompt.text)}
            <div className="mb-6 rounded-xl border border-[#e8e4dc] bg-white p-4 text-sm text-[#5a554f]">
              Take a few seconds to reflect before continuing. You may skip this section if you prefer.
            </div>
            <NavButtons onBack={onBack} onNext={onNext} nextLabel="Continue" showExit onExit={onExit} />
            <button
              type="button"
              onClick={() => {
                if (updateAndNext) updateAndNext("microSkipped", true);
                else {
                  updateAnswer("microSkipped", true);
                  onNext();
                }
              }}
              className="mt-3 w-full text-center text-sm text-[#8a847c] underline"
            >
              Prefer not to continue this section
            </button>
          </div>
        );
      }

      if (stepId === "micro_measures") {
        return (
          <div>
            {heading(
              "Your current reactions",
              "Based on your reflection (or your current state), please rate the following."
            )}
            <LikertGroup
              items={[
                { id: "microDesirePersonalContinued", label: "Desire for my own continued existence" },
                { id: "microDesireLovedContinued", label: "Desire for a loved person's continued existence" },
                { id: "microPlausibilityConsciousness", label: "Perceived plausibility of consciousness continuing after death" },
                { id: "microReunionBelief", label: "Belief in reunion with loved ones" },
                { id: "microPersonalImmortality", label: "Belief in personal immortality" },
                { id: "microMoralReward", label: "Belief in moral reward/punishment after death" },
                { id: "microEmotionalIntensity", label: "Emotional intensity of my current thoughts" },
              ]}
              values={answers as Record<string, number | undefined>}
              onChange={(id, v) => updateAnswer(id, v)}
            />
            <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
          </div>
        );
      }

      if (stepId === "god_human_love") {
        return (
          <div>
            {heading(
              "Concepts of love",
              "Rate how strongly you associate each quality with different kinds of love."
            )}
            <p className="mb-2 text-xs font-medium text-[#6b6560]">Ideal parental love</p>
            <LikertGroup
              items={[
                { id: "loveParentalUnconditional", label: "Unconditional" },
                { id: "loveParentalForgiving", label: "Forgiving" },
                { id: "loveParentalProtective", label: "Protective" },
              ]}
              values={answers as Record<string, number | undefined>}
              onChange={(id, v) => updateAnswer(id, v)}
            />
            <p className="mb-2 text-xs font-medium text-[#6b6560]">Romantic love</p>
            <LikertGroup
              items={[
                { id: "loveRomanticPermanent", label: "Permanently available" },
                { id: "loveRomanticKnowing", label: "Knowing (deeply understands you)" },
              ]}
              values={answers as Record<string, number | undefined>}
              onChange={(id, v) => updateAnswer(id, v)}
            />
            <LikertGroup
              items={[
                { id: "loveFriendshipResponsive", label: "Close friendship: Responsive" },
              ]}
              values={answers as Record<string, number | undefined>}
              onChange={(id, v) => updateAnswer(id, v)}
            />
            <p className="mb-2 text-xs font-medium text-[#6b6560]">Divine love (if applicable)</p>
            <LikertGroup
              items={[
                { id: "loveDivineUnconditional", label: "Unconditional" },
                { id: "loveDivineKnowing", label: "Knowing" },
                { id: "loveDivineComforting", label: "Comforting" },
              ]}
              values={answers as Record<string, number | undefined>}
              onChange={(id, v) => updateAnswer(id, v)}
            />
            {selectField(
              "Did your understanding of these qualities in human relationships precede your understanding of them as qualities of God/divinity?",
              "humanBeforeDivine",
              [
                { value: "def_human", label: "Definitely human first" },
                { value: "prob_human", label: "Probably human first" },
                { value: "cannot_tell", label: "Cannot tell" },
                { value: "prob_divine", label: "Probably divine first" },
                { value: "def_divine", label: "Definitely divine first" },
                { value: "na", label: "Not applicable" },
              ],
              false
            )}
            <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
          </div>
        );
      }

      if (stepId === "theory_questions") {
        return (
          <div>
            {heading(
              "Your views on explanations",
              "How plausible do YOU find each of the following as explanations for why people believe in continued existence after death?"
            )}
            <LikertGroup
              items={[
                { id: "theoryFearPersonalDeath", label: "Fear of personal nonexistence", lowLabel: "Not plausible", highLabel: "Very plausible" },
                { id: "theoryGrief", label: "Grief after losing someone", lowLabel: "Not plausible", highLabel: "Very plausible" },
                { id: "theoryDesireReunion", label: "Desire for reunion with loved ones", lowLabel: "Not plausible", highLabel: "Very plausible" },
                { id: "theoryDifficultyImagining", label: "Difficulty imagining another mind ceasing to exist", lowLabel: "Not plausible", highLabel: "Very plausible" },
                { id: "theoryCulturalTeaching", label: "Cultural and religious teaching", lowLabel: "Not plausible", highLabel: "Very plausible" },
                { id: "theoryMoralJustice", label: "Belief in moral justice", lowLabel: "Not plausible", highLabel: "Very plausible" },
                { id: "theorySensedPresence", label: "Sensed-presence or similar experiences", lowLabel: "Not plausible", highLabel: "Very plausible" },
                { id: "theoryMeaningMaking", label: "Meaning-making after loss", lowLabel: "Not plausible", highLabel: "Very plausible" },
                { id: "theorySocialCohesion", label: "Social and community effects", lowLabel: "Not plausible", highLabel: "Very plausible" },
              ]}
              values={answers as Record<string, number | undefined>}
              onChange={(id, v) => updateAnswer(id, v)}
            />
            <NavButtons onBack={onBack} onNext={onNext} showExit onExit={onExit} />
          </div>
        );
      }

      if (stepId === "open_response") {
        return (
          <div>
            {heading("Optional reflections", "These questions are optional.")}
            <div className="mb-4">
              <label className="mb-2 block text-sm">
                If losing someone changed your beliefs about consciousness, death, religion, or an afterlife, what changed?
              </label>
              <textarea
                value={answers.openBeliefChange ?? ""}
                onChange={(e) => updateAnswer("openBeliefChange", e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-[#d4cfc4] bg-white px-4 py-3 text-sm"
                placeholder="Optional"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm">
                What do you think humans find hardest to comprehend about death?
              </label>
              <textarea
                value={answers.openHardestAboutDeath ?? ""}
                onChange={(e) => updateAnswer("openHardestAboutDeath", e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-[#d4cfc4] bg-white px-4 py-3 text-sm"
                placeholder="Optional"
              />
            </div>
            <NavButtons
              onBack={onBack}
              onNext={onNext}
              nextLabel={isLast ? "Submit survey" : "Continue"}
              showExit
              onExit={onExit}
            />
          </div>
        );
      }

      if (stepId === "debrief") {
        return (
          <div>
            {heading("Thank you for participating")}
            <div className="space-y-4 text-sm leading-relaxed text-[#2c2a26]">
              <p>
                This study explored how people think about relationships, mortality, and beliefs about continued existence after death.
              </p>
              <p>
                Researchers distinguish several possible explanations for afterlife beliefs, including:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Self-preservation:</strong> wanting or believing in continued existence because one does not want to cease existing
                </li>
                <li>
                  <strong>Attachment-preservation:</strong> wanting or believing in continued existence because it is difficult to represent a loved person as permanently nonexistent, or because one desires relational continuity or reunion
                </li>
                <li>Cognitive intuitions about minds and bodies</li>
                <li>Cultural, moral, and social explanations</li>
              </ul>
              <p>
                This pilot study is exploratory. It does <strong>not</strong> prove that religion or afterlife belief historically originated from grief, nor does it establish causal relationships. Its purpose is to generate hypotheses and estimate whether proposed effects may exist for future research.
              </p>
              <p className="text-[#5a554f]">
                If this survey raised difficult feelings, consider speaking with a counselor or support service in your area.
              </p>
            </div>
          </div>
        );
      }

      return (
        <div>
          <p>Unknown step: {stepId}</p>
          <NavButtons onBack={onBack} onNext={onNext} />
        </div>
      );
  }
}
