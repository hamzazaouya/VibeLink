export interface MatchType {
    id: string,
    username: string,
    date: string,
    avatar: string
}

export interface MatchProps {
    matches: MatchType[]
}

export interface rightPanel {
    matches: MatchType[]
}