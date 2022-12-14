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
      questionText.value = `?????? ???????????????? ${currentQuestion.value.title}`;
      break;
    case 'A3':
      defaultTest();
      questionText.value = questionText.value || '???????????? ???????????????????? ??????????????';
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

      if (currentQuestion.value?.group === 2) questionText.value = '?????????????? ???????????? ??????????, ???? ???????????????????? ???? ???????????? ?? ?????????????? ???????????? ???? ???????? ??????????????????';
      else if (currentQuestion.value?.group === 7) questionText.value = currentQuestion.value?.id + '. ?????????????? ???????????????????? ????????????';
      else if (currentQuestion.value?.group === 8) questionText.value = currentQuestion.value?.id + '. ???????????????? ???????????????????? ??????????';
      else questionText.value = currentQuestion.value?.title;
      if (currentQuestion.value?.answers) currentAnswers.value = currentQuestion.value.answers;
      if (currentQuestion.value?.group === 7 || currentQuestion.value?.group === 8) {
        currentAnswers.value = [{ id: 1, title: '??' }, { id: 2, title: '??' }, { id: 3, title: '??' }, { id: 4, title: '??' }, { id: 5, title: '??' }];
        extra.value.questionImage = '' + currentQuestion.value.image;
      }
      questionsCount.value = questions2.length

      const keyArr = ['',
        '1??, 2??, 3??, 4??, 5??, 6??, 7??, 8??, 9??, 10??, 11??, 12??, 13??, 14??, 15??, 16??, 17??, 18??, 19??, 20??',
        '21??, 22??, 23?? 24??, 25??, 26??, 27??, 28??, 29??, 30??, 31 ??, 32??, 33??, 34??, 35??, 36??, 37??, 38??, 39??, 40??',
        '41??, 42??, 43??, 44??, 45??, 46??, 47??, 48??, 49??, 50??, 51??, 52??, 53??, 54??, 55??, 56??, 57??, 58??, 59??, 60??',
        '61??, 62??, 63??,64??,65??,66??,67??,68??,69??,70??,71??,72??,73??,74??,75??,76??',
        '77??, 78??, 79??, 80??, 81??, 82??, 83??, 84??, 85??, 86??, 87??, 88??, 89??, 90??, 91??, 92??, 93??, 94??, 95??, 96??',
        '97??, 98??, 99??, 100??, 101??, 102??, 103??, 104??, 105??, 106??, 107??, 108??, 109??, 110??, 111??, 112??, 113??, 114??, 115??, 116??',
        '117??, 118??, 119??, 120??, 121??, 122??, 123 ??, 124??, 125??, 126??, 127??, 128??, 129??, 130??, 131??, 132??, 133??, 134??, 135??, 136??',
        '137??, 138??, 139??, 140??, 141??, 142??, 143??, 144??, 145??, 146??, 147??, 148??, 149??, 150??, 151??, 152??, 153??, 154??, 155??, 156??',
      ];
      const trim = (i: string) => i.trim();
      const isRightAnswer = (questionId: number, answerId: number, groupId: number) => {
        const keyGroup = keyArr[groupId].split(',').map(trim);
        const answerLetter = ['', '??', '??', '??', '??', '??'][answerId];
        return !!keyGroup.find((key) => key === `${questionId}${answerLetter}`);
      }
      const score = store.answers.reduce((acc: string | number, { answer, question }: any) => {
        //@ts-ignore
        acc += isRightAnswer(Number(question.id), Number(answer.id), Number(question.group)) ? 1 : 0;
        return acc;
      }, 0);

      const getText = (score: number) => {
        if (score < 70) return '?????????????? ???????????????????? ?????????? ????????????';
        if (score < 85) return '???????????? ?????????????? ????????????????????';
        if (score < 115) return '?????????????? ?????????????? ????????????????????';
        if (score < 130) return '?????????????? ?????????????? ????????????????????';
        return '?????????? ?????????????? ??????????????';
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