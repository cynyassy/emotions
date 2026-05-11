export interface EmotionCategory {
  name: string;
  emotions: string[];
}

export const goodEmotions: EmotionCategory[] = [
  {
    name: "AFFECTIONATE",
    emotions: [
      "compassionate",
      "friendly", 
      "loving",
      "open-hearted",
      "sympathetic",
      "tender",
      "warm"
    ]
  },
  {
    name: "CONFIDENT", 
    emotions: [
      "empowered",
      "open",
      "proud", 
      "safe",
      "secure"
    ]
  },
  {
    name: "EXCITED",
    emotions: [
      "amazed",
      "animated",
      "ardent",
      "aroused",
      "astonished",
      "dazzled",
      "eager",
      "energetic",
      "enthusiastic", 
      "giddy",
      "invigorated",
      "lively",
      "passionate",
      "surprised",
      "vibrant"
    ]
  },
  {
    name: "ENGAGED",
    emotions: [
      "absorbed",
      "alert",
      "curious",
      "engrossed",
      "enchanted",
      "entranced",
      "fascinated",
      "interested",
      "intrigued",
      "involved",
      "spellbound",
      "stimulated"
    ]
  },
  {
    name: "GRATEFUL",
    emotions: [
      "appreciative",
      "moved",
      "thankful",
      "touched"
    ]
  },
  {
    name: "HOPEFUL",
    emotions: [
      "expectant",
      "encouraged",
      "optimistic"
    ]
  },
  {
    name: "INSPIRED",
    emotions: [
      "amazed",
      "awed", 
      "wonder"
    ]
  },
  {
    name: "JOYFUL",
    emotions: [
      "amused",
      "delighted",
      "glad",
      "happy",
      "jubilant",
      "pleased",
      "tickled"
    ]
  },
  {
    name: "EXHILARATED",
    emotions: [
      "blissful",
      "ecstatic",
      "elated",
      "enthralled", 
      "exuberant",
      "radiant",
      "rapturous",
      "thrilled"
    ]
  },
  {
    name: "PEACEFUL",
    emotions: [
      "calm",
      "clear-headed",
      "comfortable",
      "centered",
      "content",
      "equanimous",
      "fulfilled",
      "mellow",
      "quiet",
      "relaxed",
      "relieved",
      "satisfied",
      "serene",
      "still",
      "tranquil",
      "trusting"
    ]
  },
  {
    name: "REFRESHED",
    emotions: [
      "enlivened",
      "rejuvenated",
      "renewed",
      "rested",
      "restored",
      "revived"
    ]
  }
];

export const badEmotions: EmotionCategory[] = [
  {
    name: "AFRAID",
    emotions: [
      "apprehensive",
      "dread",
      "foreboding",
      "frightened",
      "mistrustful",
      "panicked",
      "petrified",
      "scared",
      "suspicious",
      "terrified",
      "wary",
      "worried"
    ]
  },
  {
    name: "ANNOYED",
    emotions: [
      "aggravated",
      "dismayed",
      "disgruntled",
      "displeased",
      "exasperated",
      "frustrated",
      "impatient",
      "irritated",
      "irked"
    ]
  },
  {
    name: "ANGRY",
    emotions: [
      "enraged",
      "furious",
      "incensed",
      "indignant",
      "irate",
      "livid",
      "outraged",
      "resentful"
    ]
  },
  {
    name: "AVERSION",
    emotions: [
      "animosity",
      "appalled",
      "contempt",
      "disgusted",
      "dislike",
      "hate",
      "horrified",
      "hostile",
      "repulsed"
    ]
  },
  {
    name: "CONFUSED",
    emotions: [
      "ambivalent",
      "baffled",
      "bewildered",
      "dazed",
      "hesitant",
      "lost",
      "mystified",
      "perplexed",
      "puzzled",
      "torn"
    ]
  },
  {
    name: "DISCONNECTED",
    emotions: [
      "alienated",
      "aloof",
      "apathetic",
      "bored",
      "cold",
      "detached",
      "distant",
      "distracted",
      "indifferent",
      "numb",
      "removed",
      "uninterested",
      "withdrawn"
    ]
  },
  {
    name: "DISQUIET",
    emotions: [
      "agitated",
      "alarmed",
      "discombobulated",
      "disconcerted",
      "disturbed",
      "perturbed",
      "rattled",
      "restless",
      "shocked",
      "startled",
      "surprised",
      "troubled",
      "turbulent",
      "turmoil",
      "uncomfortable",
      "uneasy",
      "unnerved",
      "unsettled",
      "upset"
    ]
  },
  {
    name: "EMBARRASSED",
    emotions: [
      "ashamed",
      "chagrined",
      "flustered",
      "guilty",
      "mortified",
      "self-conscious"
    ]
  },
  {
    name: "FATIGUE",
    emotions: [
      "beat",
      "burnt out",
      "depleted",
      "exhausted",
      "lethargic",
      "listless",
      "sleepy",
      "tired",
      "weary",
      "worn out"
    ]
  },
  {
    name: "PAIN",
    emotions: [
      "agony",
      "anguished",
      "bereaved",
      "devastated",
      "grief",
      "heartbroken",
      "hurt",
      "lonely",
      "miserable",
      "regretful",
      "remorseful"
    ]
  },
  {
    name: "SAD",
    emotions: [
      "depressed",
      "dejected",
      "despair",
      "despondent",
      "disappointed",
      "discouraged",
      "disheartened",
      "forlorn",
      "gloomy",
      "heavy hearted",
      "hopeless",
      "melancholy",
      "unhappy",
      "wretched"
    ]
  },
  {
    name: "TENSE",
    emotions: [
      "anxious",
      "cranky",
      "distressed",
      "distraught",
      "edgy",
      "fidgety",
      "frazzled",
      "irritable",
      "jittery",
      "nervous",
      "overwhelmed",
      "restless",
      "stressed out"
    ]
  },
  {
    name: "VULNERABLE",
    emotions: [
      "fragile",
      "guarded",
      "helpless",
      "insecure",
      "leery",
      "reserved",
      "sensitive",
      "shaky"
    ]
  },
  {
    name: "YEARNING",
    emotions: [
      "envious",
      "jealous",
      "longing",
      "nostalgic",
      "pining",
      "wistful"
    ]
  }
];

// Initial emotion categories for "good" feelings
export const initialGoodCategories = [
  "Affectionate",
  "Engaged", 
  "Hopeful",
  "Confident",
  "Excited",
  "Grateful",
  "Inspired", 
  "Joyful",
  "Exhilarated",
  "Peaceful",
  "Refreshed"
];

// Initial emotion categories for "bad" feelings
export const initialBadCategories = [
  "Afraid",
  "Annoyed",
  "Angry", 
  "Aversion",
  "Confused",
  "Disconnected",
  "Disquiet",
  "Embarrassed",
  "Fatigue",
  "Pain",
  "Sad",
  "Tense",
  "Vulnerable",
  "Yearning"
];