<template>
  <div class="test-container">
    <TestInstruction v-if="question.type === 'instruction'" :question="question" @next="$emit('answer', false)">
    </TestInstruction>
    <template v-else>
      <div class="question">
        <template v-if="extra.test.code === 'B1'">
          <div class="pre-title">Любите ли вы? Нравится ли вам? Хотели ли вы?</div>
        </template>
        <template v-if="extra.test.code === 'C1'">
          <div class="pre-title">Насколько важным для Вас является каждое из следующих утверждений?</div>
        </template>
        <template v-if="extra.test.code === 'C3'">
          <div class="pre-title">Выбери 2 варианта ответа: тот который отражает твою точку зрения и тот, который тебе не
            нравится.
          </div>
        </template>
        <div>{{ questionText }}</div>
      </div>

      <div class="question-image" v-if="extra.test.code === 'C4' && extra.questionImage">
        <img :src="extra.questionImage" />
      </div>

      <div class="answers" v-if="answers.length && extra.test.code !== 'C1'"
        :class="{ [`answers-${extra.test.code}`]: true }">

        <div class="answer" v-if="extra.test.code !== 'C3'" :class="{ active: answer?.id === currentAnswer?.id }"
          v-for="answer in answers" @click="currentAnswer = answer">
          <div class="status"></div>
          <div class="answer-text">{{ answerFormat(answer) }}</div>
        </div>

        <div class="answer" v-if="extra.test.code === 'C3'" v-for="answer in answers">
          <div class="status status-yes" :class="{ active: answer?.id === currentAnswer?.yesId }"
            @click="currentAnswer.yesId = answer.id">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.00877977 4.25554C1.52412 11.3015 4.20866 17.8859 8.0624 23.9781C8.60085 24.8242 11.8931 24.0088 12.1161 23.0858C13.0315 19.2628 13.9392 15.4398 14.8545 11.6169C15.2622 9.91691 15.6622 8.21697 16.0699 6.51701C16.6699 4.04016 17.0006 1.70176 20.1313 2.27097C21.1082 2.44789 24.6312 0.863319 23.4697 0.655632C19.9698 0.0248804 15.0545 -0.00588429 13.1161 3.64017C11.6854 6.34009 11.3777 10.0015 10.67 12.9553C9.80851 16.5629 8.94699 20.1782 8.08548 23.7858C9.43929 23.4858 10.7854 23.1858 12.1392 22.8935C8.28547 16.8013 5.60093 10.2169 4.08559 3.17095C3.8856 2.24021 -0.214291 3.2248 0.00877977 4.25554Z"
                fill="#C2C2C2" />
            </svg>
          </div>

          <div class="status status-no" :class="{ active: answer?.id === currentAnswer?.noId }"
            @click="currentAnswer.noId = answer?.id">
            <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21.6197 1.69755C16.8605 9.72986 11.4631 17.3063 5.4092 24.4178C4.55217 25.4207 0.166771 24.5819 0.713807 23.9345C6.75855 16.8231 12.1651 9.24664 16.9243 1.21434C17.5534 0.16585 22.1576 0.785826 21.6197 1.69755Z"
                fill="#C2C2C2" />
              <path
                d="M0.713697 1.69755C5.47291 9.72986 10.8703 17.3063 16.9242 24.4178C17.7812 25.4207 22.1666 24.5819 21.6196 23.9345C15.5748 16.8231 10.1683 9.24664 5.40909 1.21434C4.78911 0.16585 0.175778 0.785826 0.713697 1.69755Z"
                fill="#C2C2C2" />
            </svg>
          </div>

          <div class="answer-text">{{ answerFormat(answer) }}</div>

        </div>
      </div>

      <div class="answers-slider" v-if="extra.test.code === 'C1'">
        <SliderVue :is="sliderComponent" v-model:modelValue="sliderAnswer" :key="question.title" />
      </div>
      <div class="buttons">
        <Button outlined>Назад</Button>
        <a class="pause" href="javascript:" @click="pause">
          <img src="@/assets/pause.svg" alt="Пауза" />
        </a>
        <Button :disabled="isNextButtonDisabled" @click="next" arrow>Вперед</Button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/elements/Button.vue';
import TestInstruction from '@/components/test/TestInstruction.vue';
import { computed, ref, watch } from 'vue';
import type { TestAnswer, TestQuestion, TestType } from '@/types/types';
import { useStore } from '@/store';
import SliderVue from '../elements/Slider.vue';

export interface Emits {
  (e: 'answer', value: any): void
}

export interface Extra {
  test?: TestType
  questionImage?: string
}

export interface Props {
  questionText: string
  answers: TestAnswer[]
  answerFormat: Function
  extra: Extra
  question: TestQuestion
}

const currentAnswer = ref<any>({})
const sliderComponent = ref<any>()
const sliderAnswer = ref<any>()

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const store = useStore()

watch(() => sliderAnswer.value, () => {
  if (props.extra.test?.code === 'C1') {
    // @ts-ignore
    currentAnswer.value = props.answers.find(({ id }) => Number(id) === Number(sliderAnswer.value));
  }
})

const isNextButtonDisabled = computed(() => {
  console.log(currentAnswer.value)
  if (props.extra.test?.code === 'C3') return !currentAnswer.value?.yesId || !currentAnswer.value?.noId;
  return !currentAnswer.value?.id;
})


const next = () => {
  emit('answer', currentAnswer);
  currentAnswer.value = {};
}

const pause = () => {
  store.changeStep('pause');
}

</script>

<style scoped>
.test-container {
  padding-top: 58px;
  max-width: 520px;
  margin: 0 auto;
}

.question {
  font-weight: bold;
  font-size: 28px;
  line-height: 125%;
  text-align: center;
  color: #0c0058;
  margin-bottom: 50px;
}

.answers .answer {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.answers.answers-A2 .answer .answer-text {
  font-size: 44px;
  line-height: 125%;
  color: #0c0058;
  font-weight: bold;
}

.answers .answer .status {
  background-color: #fff;
  box-shadow: 0 0 22px rgba(28, 25, 88, 0.14);
  width: 48px;
  height: 48px;
  border-radius: 100%;
  flex-shrink: 0;
}

.answers .answer .status-yes,
.answers .answer .status-no {
  display: flex;
  align-items: center;
  justify-content: center;
}

.answers .answer .status-yes {
  margin-right: 15px;
}

.answers .answer .status-yes.active {
  background: radial-gradient(92.31% 92.31% at 19.93% 9.79%, #68af06 0%, #83d017 100%);
}

.answers .answer .status-no.active {
  background: radial-gradient(92.31% 92.31% at 19.93% 9.79%, #b94848 0%, #e86b6b 100%);
}

.answers .answer .status-yes.active :deep(svg path),
.answers .answer .status-no.active :deep(svg path) {
  fill: #fff;
}

.answers .answer .status-no {}

.answers .answer.active .status {
  background-image: url('@/assets/checked.svg'), linear-gradient(180deg, #ff9649 0%, #ff5c00 100%);
  background-repeat: no-repeat, no-repeat;
  background-position: center, center;
  box-shadow: 0 0 22px rgba(255, 102, 12, 0.2);
}

.answers .answer .answer-text {
  line-height: 150%;
  color: #4e4a64;
  margin-left: 35px;
}

.buttons {
  padding-top: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttons .btn {
  padding-top: 21px;
  padding-bottom: 21px;
}

.buttons .pause {
  margin: 0 20px;
}

.buttons .btn:first-child {
  /*margin-right: 45px;*/
}

.pre-title,
.pre-title {
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 150%;
  color: #4e4a64;
  font-weight: normal;
}

.question-image {
  margin-bottom: 40px;
  text-align: center;
}

.question-image img {
  max-width: 100%;
}

@media screen and (max-width: 550px) {
  .buttons {
    padding-top: 10px;
  }

  .buttons .btn {
    padding: 15px 20px;
    font-size: 14px;
  }

  .test-container {
    padding-top: 30px;
  }

  .question {
    font-size: 20px;
    margin-bottom: 30px;
  }

  .answers .answer {
    margin-bottom: 20px;
  }

  .answers .answer .status {
    width: 24px;
    height: 24px;
  }

  .answers .answer .answer-text {
    margin-left: 15px;
  }
}
</style>