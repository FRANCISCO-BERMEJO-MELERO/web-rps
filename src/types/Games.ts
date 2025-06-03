export type GameType = {
    id: number;
    creator: string;
    opponent: string;
    bet: number;
    denom: string;
    state: 'pending' | 'active' | 'finished';
    creator_hash: string;
    opponent_hash: string;
    creator_move: string;
    opponent_move: string;
    winner: string;
    deadline: number;
    created_at: number;
};
