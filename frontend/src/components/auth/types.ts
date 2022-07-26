type Rule<T> = (v: T) => string | true;

export type Rules<T> = Rule<T>[];
