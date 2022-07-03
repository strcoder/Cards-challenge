export interface Card {
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
  St: number;
  Artist: string;
  SetAndNumber: string;
  Rarity: string;
  id: string;
  Set: string;
  CardInSet: number;
  CardNumber: number;
  Description: string;
}
