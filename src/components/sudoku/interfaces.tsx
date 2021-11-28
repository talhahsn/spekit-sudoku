export interface IData {
  name: string;
  value?: string | string[] | number;
}

export interface DifficultyLevelState {
  list: Array<IData> | [];
}

export interface BoardValuesState {
    values: Array<Array<number>>
}

export const difficultyLevelsList = [
  {
    name: "Easy",
    value: "easy",
  },
  {
    name: "Medium",
    value: "medium",
  },
  {
    name: "Hard",
    value: "hard",
  },
  {
    name: "Random",
    value: "random",
  },
];
