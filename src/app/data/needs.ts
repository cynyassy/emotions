export interface NeedCategory {
  name: string;
  needs: string[];
}

export const universalNeeds: NeedCategory[] = [
  {
    name: "Connection",
    needs: [
      "Acceptance",
      "Affection", 
      "Clarity",
      "Communication",
      "Confirmation",
      "Compassion",
      "Intimacy",
      "Understanding",
      "Authenticity",
      "Love"
    ]
  },
  {
    name: "Autonomy", 
    needs: [
      "Choice",
      "Space",
      "Spontaneity"
    ]
  },
  {
    name: "Peace",
    needs: [
      "Beauty",
      "Ease", 
      "Harmony",
      "Order",
      "Wholeness"
    ]
  },
  {
    name: "Interconnection",
    needs: [
      "Belonging",
      "Consideration",
      "Community",
      "Cooperation", 
      "Dignity",
      "Mutuality",
      "Support",
      "Trust"
    ]
  },
  {
    name: "Meaning",
    needs: [
      "Contribution",
      "Creativity",
      "Hope",
      "Inspiration", 
      "Purpose"
    ]
  },
  {
    name: "Celebration",
    needs: [
      "Joy",
      "Mourning",
      "Play"
    ]
  },
  {
    name: "Competence",
    needs: [
      "Effectiveness",
      "Efficiency",
      "Growth",
      "Learning",
      "Power"
    ]
  },
  {
    name: "Honesty",
    needs: [
      "Authenticity",
      "Integrity"
    ]
  },
  {
    name: "Basic Survival",
    needs: [
      "Shelter",
      "Food & Water",
      "Rest",
      "Safety",
      "Security",
      "Touch"
    ]
  }
];

// Flattened list of all needs for easier searching
export const allNeeds = universalNeeds.flatMap(category => category.needs);