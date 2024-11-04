export interface User {
  lastName: string;
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
  score: Score[];
}

export interface Score {
  id: number;
  name: string;
  points: number;
  team: TeamInfo;
  user: User;
}

export interface TeamInfo {
  id: number;
  name: string;
}
