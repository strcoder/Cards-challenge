interface Card {
  Number: number;
  Name: string;
  CardType: string;
  Faction: string;
  Ability: {
    effects: {
      headline: string;
      filters: string[];
    }[];
    triggers: string[];
    conditions: string[];
  }[];
  Artist: string;
  SetAndNumber: string;
  Rarity: string;
  id: string;
  Set: string;
  CardInSet: number;
  CardNumber: number;
  Description: string;
  imgUrl?: string;
}

export interface HeadQuarter extends Card {
  St: number;
}

export interface Character extends Card {
  HP: number;
  Atk: number;
  Rank: string;
  Gender: string;
  AtkType: string;
  AtkRange: number;
  AtkNature: string;
}

export interface Technology extends Card {
  Atk: number;
  Res: number;
  Class: string;
  AtkNature: string;
};
