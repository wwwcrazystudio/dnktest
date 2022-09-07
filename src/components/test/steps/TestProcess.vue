<template>
  <div>
    <Progress />
    <Question :key="currentQuestion.id || currentQuestion.title" @answer="handleAnswer($event)"
      :question-text="questionText" :question="currentQuestion" :answers="currentAnswers" :answer-format="answerFormat"
      :extra="extra" />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import { useTests } from "@/assets/composables/useTests";
import type { TestAnswer, TestType, TestQuestion } from "@/types/types";
import Progress from '@/components/test/Progress.vue';
import Question from '@/components/test/Question.vue';
import { ref, watch } from "vue";

export interface Extra {
  test?: TestType
  questionImage?: string
}

const extra = ref<Extra>({})

const questionsCount = ref<number>(0)

const store = useStore()
const test = useTests()

const { questions, answers } = test;

const currentQuestion = ref<TestQuestion>(questions[store.currentQuestionNumber])
const currentAnswers = ref<TestAnswer[]>(answers)
const questionText = ref<string>('')

watch(() => questionsCount.value, () => {
  console.log(questionsCount.value)
  store.setQuestionsCount(questionsCount.value)
})

const init = () => {
  //@ts-ignore
  extra.test = test;
  calcResult()
}

const handleAnswer = (answer: TestAnswer) => {
  //@ts-ignore
  if (answer) store.addAnswer({ answer, question: { id: currentQuestion.value.id, group: currentQuestion.value.group } });
  if (store.currentQuestionNumber + 1 >= test.questions.length) {
    calcResult();
    store.changeStep('finished');
  } else {
    if (answer) store.incrementAnswersCount();
    store.nextQuestion();
    init();
  }
};

const answerFormat = (i: TestAnswer) => i.title

const defaultTest = () => {
  const { questions, answers } = test;
  currentQuestion.value = questions[store.currentQuestionNumber];
  questionText.value = currentQuestion.value?.title;
  currentAnswers.value = answers;
  questionsCount.value = questions.length

  if (store.answers.length) {
    const groupScores = store.answers.reduce((acc, { answer, question }) => {
      if (question.group) {
        if (!acc[question.group]) acc[question.group] = 0;
        acc[question.group] += currentAnswers.value;
      }
      return acc;
    }, {} as any);
    if (groupScores.length) {
      const groupId = Object.keys(groupScores).reduce((a, b) => groupScores[a] > groupScores[b] ? a : b);
      const group = test.groups?.find((group: { id: number }) => Number(group.id) === Number(groupId));
      store.setResult(group);
    }
  }

}

const calcResult = () => {
  switch (test.code) {
    case 'A1':
      defaultTest();
      questionText.value = `Мне нравится ${currentQuestion.value.title}`;
      break;
    case 'A3':
      defaultTest();
      questionText.value = questionText.value || 'Выбери подходящий вариант';
      const currentSex = store.selectedSex?.sexValue || 'male'
      // @ts-ignore
      currentAnswers.value = currentQuestion.value[currentSex];

      test.groups?.map((group: { score: number; answers: any[]; }) => {
        group.score = store.answers.reduce((acc, { answer, question }) => {
          const key = (Number(question.group) - 1) * 60 + Number(question.id);
          if (group.answers.find((_answer: { questionId: number; id: string | number; }) => _answer.questionId === key && answer.id === _answer.id)) acc += 1;
          return acc;
        }, 0);
        return group;
      })
        .sort((a: { score: any; }, b: { score: any; }) => Number(b.score) - Number(a.score));

      console.log(test.groups);

      store.setResult({
        highTitle: test.groups[0].title,
        highText: test.groups[0].text,
        titleLess: test.groups[11].title,
        textLess: test.groups[11].text
      });

      break;
    case 'B2':
      defaultTest()

      // @ts-ignore
      currentAnswers.value = currentQuestion.value.answers;

      test.groups?.map((group: { score: any; answers: any[]; }) => {
        group.score = store.answers.reduce((acc: number, { answer, question }: any) => {
          const key = Number(question.id);
          if (group.answers.find((_answer) => _answer.questionId === key && answer.id === _answer.id)) acc += 1;
          return acc;
        }, 0);
        return group;
      }).sort((a: { score: any; }, b: { score: any; }) => Number(b.score) - Number(a.score));
      console.log(test.groups);
      store.setResult({
        highTitle: test.groups[0].title,
        highText: test.groups[0].textPlus,
        titleLess: test.groups[15].title,
        textLess: test.groups[15].textMinus
      });
    case 'C2':
      const questions = test.questions;
      currentQuestion.value = questions[store.currentQuestionNumber];
      questionText.value = currentQuestion.value.title;
      if (currentQuestion.value?.answers) currentAnswers.value = currentQuestion.value.answers;
      questionsCount.value = questions.length;

      if (store.answers.length) {
        const result = test.results?.find(({ x, y }: any) =>
          Number(x) === Number(store.answers[1].answer?.id) &&
          Number(y) === Number(store.answers[0].answer?.id)
        );

        store.setResult(result);
      }


      break;
    case 'C3':
      defaultTest();
      if (currentQuestion.value?.answers) currentAnswers.value = currentQuestion.value?.answers;

      test.groups?.map((group: { score: any; answers: any[]; }) => {
        group.score = 30 + store.answers.reduce((acc: number, { answer, question }: any) => {
          if (group.answers) {
            const key = group.answers[Number(question.id)];
            if (key === answer.yesId) acc += 1;
            if (key === answer.noId) acc -= 1;
          }
          return acc;
        }, 0);
        return group;
      }, {});
      const maxGroup = test.groups?.sort((a: { score: any; }, b: { score: any; }) => Number(b.score) - Number(a.score))[0] as any;
      store.setResult({ title: maxGroup.title || '', text: maxGroup.text || '' });
      break;
    case 'C4':
      const questions2 = test.questions;
      currentQuestion.value = questions2[store.currentQuestionNumber];

      if (currentQuestion.value?.group === 2) questionText.value = 'Найдите лишнее слово, не подходящее по смыслу к четырем другим из пяти названных';
      else if (currentQuestion.value?.group === 7) questionText.value = currentQuestion.value?.id + '. Найдите подходящую фигуру';
      else if (currentQuestion.value?.group === 8) questionText.value = currentQuestion.value?.id + '. Выберите подходящий кубик';
      else questionText.value = currentQuestion.value?.title;
      if (currentQuestion.value?.answers) currentAnswers.value = currentQuestion.value.answers;
      if (currentQuestion.value?.group === 7 || currentQuestion.value?.group === 8) {
        currentAnswers.value = [{ id: 1, title: 'а' }, { id: 2, title: 'б' }, { id: 3, title: 'в' }, { id: 4, title: 'г' }, { id: 5, title: 'д' }];
        extra.value.questionImage = '' + currentQuestion.value.image;
      }
      questionsCount.value = questions2.length

      const keyArr = ['',
        '1г, 2в, 3д, 4д, 5в, 6а, 7г, 8б, 9д, 10в, 11б, 12д, 13в, 14а, 15г, 16а, 17в, 18б, 19д, 20г',
        '21д, 22б, 23в 24г, 25б, 26г, 27в, 28г, 29д, 30в, 31 д, 32г, 33а, 34в, 35д, 36в, 37а, 38г, 39б, 40б',
        '41в, 42д, 43б, 44д, 45а, 46г, 47б, 48в, 49б, 50г, 51г, 52б, 53б, 54б, 55г, 56д, 57в, 58в, 59б, 60г',
        '61а, 62б, 63б,64а,65а,66б,67а,68а,69б,70а,71б,72а,73б,74а,75б,76а',
        '77а, 78б, 79а, 80а, 81а, 82б, 83а, 84а, 85б, 86б, 87б, 88б, 89а, 90а, 91а, 92б, 93а, 94а, 95а, 96а',
        '97б, 98б, 99а, 100б, 101б, 102б, 103б, 104а, 105а, 106б, 107а, 108а, 109а, 110а, 111а, 112а, 113а, 114а, 115а, 116а',
        '117б, 118г, 119в, 120в, 121д, 122г, 123 д, 124а, 125а, 126Б, 127д, 128в, 129д, 130г, 131в, 132а, 133г, 134г, 135б, 136в',
        '137б, 138б, 139в, 140а, 141г, 142а, 143б, 144д, 145в, 146г, 147а, 148б, 149д, 150г, 151в, 152б, 153д, 154а, 155в, 156д',
      ];
      const trim = (i: string) => i.trim();
      const isRightAnswer = (questionId: number, answerId: number, groupId: number) => {
        const keyGroup = keyArr[groupId].split(',').map(trim);
        const answerLetter = ['', 'а', 'б', 'в', 'г', 'д'][answerId];
        return !!keyGroup.find((key) => key === `${questionId}${answerLetter}`);
      }
      const score = store.answers.reduce((acc: string | number, { answer, question }: any) => {
        //@ts-ignore
        acc += isRightAnswer(Number(question.id), Number(answer.id), Number(question.group)) ? 1 : 0;
        return acc;
      }, 0);

      const getText = (score: number) => {
        if (score < 70) return 'Уровень интеллекта очень низкий';
        if (score < 85) return 'Низкий уровень интеллекта';
        if (score < 115) return 'Средний уровень интеллекта';
        if (score < 130) return 'Высокий уровень интеллекта';
        return 'Очень высокий уровень';
      }
      //@ts-ignore
      store.setResult({ title: `IQ ${score}`, text: getText(score) });
      break
    default:
      defaultTest()
      break;
  }
}

extra.value.test = test;
init()


</script>