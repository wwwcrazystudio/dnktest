<template>
  <div class="test-help-block" :class="[store.selectedSex?.sexValue ,clue.showHelper && 'show-helper']">

    <div class="title">
      Буду тебе помогать
    </div>

    <TestClue :caption="clue.caption">
      <div v-html="clue.text"></div>
    </TestClue>

    <template v-if="clue.showHelper">
      <div class="helper-name">{{ helper.name }}</div>
      <div class="helper-description">Твой помощник</div>
    </template>

  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store';
import { computed, onMounted, ref } from 'vue';
import { useTests } from '@/assets/composables/useTests';
import TestClue from './TestClue.vue';

export interface Clue {
  caption: string
  text: string
  showHelper: boolean
}

const store = useStore()
const clue = ref<Clue>({
      caption: 'Подсказка',
      text: 'Этот вопрос очень важный, отвечай на него честно!',
      showHelper: true
})

onMounted(() => {
  if (store.currentTest.code === 'A2') {
      console.log(store.currentTest.code)
      const test = useTests();
      console.log(test)
      const text = test.answers.reduce((acc: string, answer: { description: string, title: string }) => {
        acc += `<li><b>${answer.title}</b> ${answer.description}</li>`
        return acc;
      }, '');
      clue.value = {
        caption: 'Инструкция',
        text: `<ul class="clue-long">${text}</ul>`,
        showHelper: false
      }
}

if (store.currentTest.code === 'C1') {
    clue.value = {
        caption: 'Инструкция',
        text: '<p class="small-text">Варианты ответов: по шкале от 1 до 10, где 1 – абсолютно не важно, 10 – исключительно важно</p>',
        showHelper: true
    }
}
})


const helper = computed(() => {
  switch (store.selectedSex?.sexValue) {
    case 'female':
      return {
        name: 'Диана', 
      }
    case 'male': 
      return {
        name: 'Барри', 
      }
    default: 
      return {
        name: 'Барри', 
      }
  }
})
</script>

<style scoped>
:deep(.clue-long) {
  font-size: 14px;
  line-height: 21px;
}

:deep(.clue-long li) {
  margin-bottom: 10px;
}

:deep(.clue-long li b) {
  width: 20px;
  display: inline-block;
  text-align: center;
  font-size: 16px;
}

:deep(.clue p.small-text) {
  font-size: 14px;
  line-height: 23px;
}

.test-help-block {
  background: #ececf0;
  box-shadow: 0 0 22px rgba(28, 25, 88, 0.06);
  border-radius: 37px;
  position: relative;
  background-position: center bottom;
  background-repeat: no-repeat;
  padding: 50px 21px;
  text-align: center;
  height: 726px;
  margin-top: 58px;
  margin-bottom: 66px;
  margin-right: -63px;
  width: 330px;
}

.test-help-block.female {
  background-image: url('@/assets/diana.svg');
}

.test-help-block.male {
  background-image: url('@/assets/barri.svg');
}

.test-help-block:not(.show-helper) {
  background-image: none;
}

.title {
  font-weight: bold;
  font-size: 22px;
  line-height: 100%;
  color: #0c0058;
  margin-bottom: 43px;
}

.clue {
  margin-bottom: 42px;
}

.helper-name {
  font-weight: bold;
  font-size: 30px;
  line-height: 100%;
  color: #0c0058;
  margin-bottom: 7px;
}

.helper-description {
  font-size: 16px;
  line-height: 175%;
  color: #4e4a64;
}

@media screen and (max-width: 550px) {
  .test-help-block {
    width: 100%;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 30px;
  }
}
</style>