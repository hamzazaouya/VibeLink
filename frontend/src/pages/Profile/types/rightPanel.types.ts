export interface MatchType {
    id: string,
    username: string,
    date: string,
    avatar: string
}

export interface ViewsType {
    id: string,
    avatar: string,
    user_name: string,
    view_time: string,
    visit_count: number
}

export interface MatchProps {
    matches: MatchType[]
}

export interface rightPanel {
    matches?: MatchType[],
    views?: ViewsType[]
}

export interface ViewsProps {
    views: ViewsType[]
}