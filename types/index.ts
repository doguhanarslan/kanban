export type TaskTypes = {
    id: string;
    title: string;
    description: string;
    priorty: string;
    deadline: number;
    image?: string;
    alt?: string;
    tags: { title: string, bg: string, text: string }[];
}

type Column = {
    name: string;
    items: TaskTypes[];
}

export type Columns = {
    [key: string]: Column;
}