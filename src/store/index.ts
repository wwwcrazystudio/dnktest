import type { Sex, Age, TestType, TestAnswer, TestQuestion } from '@/types/types'
import { defineStore } from 'pinia'

export interface StoreAnswers {
    answer: TestAnswer
    question: TestQuestion
}

export const useStore = defineStore({
    id: 'store',
    state: () => ({
      selectedAge: {} as Age | undefined,
      selectedSex: {} as Sex | undefined,
      currentTest: {} as TestType,
      currentQuestionNumber: 0,
      questionsCount: 0,
      answersCount: 0,
      answers: [] as StoreAnswers[],
      step: 'not_started',
      result: {} as any
    }),
    actions: {
      setResult(payload: any) {
        const isObject = (obj: any) => typeof obj === 'object' && obj !== null;
        if (!isObject(payload)) payload = {};
        this.result = payload;
      },
      changeAge(age: Age) {  
        this.selectedAge = age
      },
      changeSex(sex: Sex) {
        this.selectedSex = sex
      },
      changeCurrentTest(test: TestType) {
        this.currentTest = test
      },
      setQuestionsCount(payload: number) {
        this.questionsCount = payload;
      },
      incrementAnswersCount() {
        this.answersCount += 1;
      },
      setAnswersCount(payload: number) {
        this.answersCount = payload;
      },
      nextQuestion() {
        this.currentQuestionNumber += 1;
      },
      setQuestionNumber(payload: number) {
        this.currentQuestionNumber = payload;
      },
      addAnswer(payload: StoreAnswers) {
        this.answers.push(payload);
      },
      setAnswers(payload: StoreAnswers[]) {
        this.answers = payload;
      },
      changeStep(payload: string) {
        this.step = payload
      }
    },
  })

  