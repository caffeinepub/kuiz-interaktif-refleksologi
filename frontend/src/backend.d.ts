import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Question {
    topic: string;
    answers: Array<string>;
    explanation: string;
    text: string;
    correctAnswerIndex: bigint;
}
export interface Result {
    topic: string;
    total: bigint;
    date: string;
    name: string;
    score: bigint;
    timestamp: bigint;
    percentage: number;
}
export interface backendInterface {
    getAllQuestions(): Promise<Array<Question>>;
    getQuestion(index: bigint): Promise<Question>;
    getQuestionByText(text: string): Promise<Question>;
    getQuestionsByTopic(topic: string): Promise<Array<Question>>;
    getResults(): Promise<Array<Result>>;
    submitResult(name: string, date: string, topic: string, score: bigint, total: bigint, percentage: number): Promise<void>;
}
