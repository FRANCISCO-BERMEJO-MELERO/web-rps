export type GameType = {
    id: number;
    creator: string;
    opponent: string;
    bet: number;
    denom: string;
    state: 'pending' | 'active' | 'finished';
    creatorHash: string;
    opponentHash: string;
    creatorMove: string;
    opponentMove: string;
    winner: string;
    deadline: number;
    created_at: number;
};
