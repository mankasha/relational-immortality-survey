# Research Plan

**Study title (internal):** Relational Immortality: Attachment, Grief, and Beliefs About Continued Existence  
**Public title:** Relationships, Identity, Mortality, and Beliefs About Consciousness  
**Design:** Exploratory cross-sectional pilot with embedded micro-experiment  
**Status:** Pre-registered analysis plan for future work; current pilot is exploratory

---

## Purpose

This pilot generates hypotheses and estimates whether proposed effects may exist. It does **not** establish causal claims about the historical origins of religious or afterlife belief.

---

## Primary proposed hypotheses

### H1. Attachment strength and loved-person continuation desire

**Prediction:** Greater emotional closeness to a deceased loved person predicts greater desire for that person's continued existence, controlling for fear of one's own death (self-preservation items).

**Variables:** `ans_emotionalCloseness` → `ans_otherDesireContinuedExistence`, `ans_wpbWant`  
**Analysis:** Multiple regression; bereaved subsample  
**Status:** Exploratory (observational)

### H2. Nonexistence representation difficulty and reunion belief

**Prediction:** Difficulty representing a loved person's nonexistence (`derived_nonexistenceRepresentationDifficulty`) predicts reunion/continued-consciousness belief above and beyond self-mortality fear items.

**Variables:** NRD composite → `ans_beliefReunion`, `ans_wpbBelief`, `ans_survivalProbLoved`  
**Controls:** Self-mortality asymmetry items, demographics  
**Status:** Exploratory

### H3. Micro-experiment: attachment-loss condition and reunion outcomes

**Prediction:** The attachment-loss experimental condition produces a relatively stronger effect on reunion/loved-person-continuity outcomes than on moral punishment outcomes.

**Variables:** `rand_microExperimentCondition` × post-prompt measures  
**Analysis:** ANOVA or regression with condition contrasts; compare effect sizes across outcome families  
**Status:** Exploratory experimental contrast

### H4. Self-mortality salience and personal continuation

**Prediction:** Self-mortality salience condition preferentially predicts personal-continuation outcomes (`microDesirePersonalContinued`, `microPersonalImmortality`) over loved-person outcomes.

**Variables:** Condition × outcome interaction  
**Status:** Exploratory experimental contrast

### H5. Explicit–intuitive dissociation

**Prediction:** Some participants (especially atheists/agnostics) show explicit–intuitive dissociation: low explicit afterlife belief with persistent intuitive representation of the deceased.

**Variables:** `derived_explicitIntuitiveDissociation`, `ans_eidExplicitNoExistence`, `ans_eidIntuitiveExists`  
**Analysis:** Identify dissociation profiles; compare across religious identity groups  
**Status:** Exploratory

### H6. Target-specific survival judgments

**Prediction:** Survival-probability judgments are more favorable for a loved target than for an unknown deceased target.

**Variables:** `derived_targetSurvivalLovedMinusStranger`, `derived_targetSurvivalLovedMinusSelf`  
**Analysis:** Paired t-tests or mixed models for repeated measures across targets  
**Status:** Exploratory (confirmatory-ready for preregistration)

### H7. Continuing-bond experiences as mediator/moderator

**Prediction:** Continuing-bond experiences may mediate or moderate the relationship between attachment and metaphysical belief, but direction remains explicitly uncertain in this observational pilot.

**Variables:** `ans_continuingBondExperiences`, attachment, belief change items  
**Analysis:** Exploratory mediation/moderation — **not causal** without temporal design  
**Status:** Exploratory; direction pre-specified as uncertain

### H8. Bereavement-related belief change specificity

**Prediction:** Bereavement-related belief change will be more pronounced for continued existence/reunion than for moral punishment/judgment if the relational hypothesis is supported.

**Variables:** Timeline items (`timelineBefore*` vs `timelineNow*`) — compare change in reunion vs moral belief  
**Analysis:** Paired comparisons within bereaved subsample  
**Status:** Exploratory

---

## Secondary / exploratory analyses

- Relational Mortality Asymmetry (`derived_relationalMortalityAsymmetry`) correlates with theory plausibility ratings
- Want–Belief Gap (`derived_wantBeliefGap`) as indicator of motivated belief
- Reunion Identity Threshold (`derived_reunionIdentityThreshold`) and trade-off preferences (`derived_relationalImmortalityPreference`)
- God/human love module: temporal ordering (`ans_humanBeforeDivine`) by religious identity
- Alternative explanation filler items vs theory questions — convergent/discriminant patterns

---

## Psychometric considerations

### Reliability

- Compute Cronbach's alpha for multi-item composites when n ≥ 30 per subgroup:
  - Nonexistence Representation Difficulty (4 items)
  - Relational Mortality Asymmetry item sets (self, other)
  - Explicit–Intuitive Dissociation (4 items)
- Report alpha with caution; these are novel composites, not validated scales

### Factor analysis

- Exploratory factor analysis (EFA) only if sample size supports it (rule of thumb: n ≥ 100 for stable EFA)
- Do not over-interpret factor structure in small pilot samples

---

## Statistical methods

| Analysis type | Method |
|---------------|--------|
| Self vs loved vs stranger survival | Repeated-measures mixed model or paired t-tests |
| Experimental condition effects | One-way ANOVA or OLS regression with dummy coding |
| Attachment → belief | Multiple regression with controls |
| Mediation | Exploratory only; bootstrap CIs if pursued; acknowledge cross-sectional limits |
| Group comparisons | t-tests or ANOVA with effect sizes (Cohen's d, η²) |
| All tests | Report effect sizes and 95% confidence intervals |

---

## Multiple comparisons

- Pre-specify primary hypotheses (H1–H8) as exploratory family
- Apply false discovery rate (Benjamini–Hochberg) or Bonferroni correction for exploratory follow-ups
- Clearly label confirmatory vs exploratory in any future preregistered study
- **Do not p-hack:** report all pre-specified contrasts; do not selectively report significant results

---

## Missing data

- Document missingness rates per variable
- Primary approach: listwise deletion for primary analyses if missing < 5%; otherwise consider multiple imputation for continuous items
- Do not impute bereavement branch items for non-bereaved participants (structural missingness by design)

---

## Sample size

Pilot target: 50–200 participants for initial effect estimation. Power analysis for confirmatory study should be conducted separately before preregistration.

---

## Confirmatory vs exploratory distinction

| Confirmatory-ready (future preregistration) | Exploratory (this pilot) |
|---------------------------------------------|--------------------------|
| H6 target-specific survival | H7 mediation direction |
| Micro-experiment main effects (H3, H4) | EFA of novel composites |
| | Most regression models |
| | Open-text coding |

---

## Ethical notes

- Debrief explains competing hypotheses without revealing them during survey
- No leading language implying grief causes belief during data collection
- Participants may exit at any time
- Optional skip on micro-experiment reflection

---

## Data files

- Raw: JSON in `data/responses/` or CSV export via `/admin`
- Variable definitions: `DATA_DICTIONARY.md`
- Derived variables computed at submission in `src/lib/scoring.ts`

---

## Reporting standards

Report:
- Descriptive statistics for all primary variables
- Effect sizes with CIs, not only p-values
- Randomization checks (condition balance on demographics)
- Explicit statement that correlations do not imply causation
- Limitations: cross-sectional design, retrospective timeline items, self-report, novel measures
