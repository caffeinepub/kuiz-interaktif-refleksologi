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
export interface backendInterface {
    getAllQuestions(): Promise<Array<Question>>;
    getQuestion(index: bigint): Promise<Question>;
    getQuestionByText(text: string): Promise<Question>;
    getQuestionsByTopic(topic: string): Promise<Array<Question>>;
}
