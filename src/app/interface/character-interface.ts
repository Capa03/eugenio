interface Keyword {
  meaning: string;
  type: number;
  keyword: string;
  hasLocution: boolean;
}

export interface Character {
  _id: number;
  created: string;
  downloads: number;
  tags: string[];
  synsets: string[];
  sex: boolean;
  lastUpdated: string;
  schematic: boolean;
  keywords: Keyword[];
  categories: string[];
  violence: boolean;
  hair: boolean;
  skin: boolean;
  aac: boolean;
  aacColor: boolean;
}

