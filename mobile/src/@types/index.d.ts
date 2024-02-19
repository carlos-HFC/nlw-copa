type User = {
  name: string;
  avatarUrl?: string;
};

type Guess = {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
};

type Game = {
  id: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: null | Guess;
};

type Participant = {
  id: string;
  user: User;
};

type Pool = {
  id: string;
  code: string;
  title: string;
  ownerId: string;
  createdAt: string;
  owner: {
    name: string;
  },
  participants: Participant[];
  _count: {
    participants: number;
  };
};