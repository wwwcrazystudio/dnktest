<script setup lang="ts">
import AgeSection from './components/AgeSection.vue';
import TestSection from './components/TestSection.vue';
import { useStore } from '@/store/index'
import { watch } from 'vue';

const store = useStore()

const storageTest = localStorage.getItem('currentTest')
const storageAnswers = localStorage.getItem('answers')
const storageCurrentQuestion = localStorage.getItem('currentQuestion')
const storageAge = localStorage.getItem('age')
const storageSex = localStorage.getItem('sex')
const storageAnswersCount = localStorage.getItem('answersCount')

if (storageTest) {
  //@ts-ignore
  const age = JSON.parse(storageAge)
  //@ts-ignore
  const sex = JSON.parse(storageSex)
  store.changeSex(sex)
  store.changeAge(age)
  store.changeCurrentTest(JSON.parse(storageTest))
  store.changeStep('pause')
}

if (storageAnswers) {
  store.setAnswers(JSON.parse(storageAnswers))
}

if (storageCurrentQuestion) {
  store.setQuestionNumber(parseInt(storageCurrentQuestion))
}

if (storageAnswersCount) {
  store.setAnswersCount(parseInt(storageAnswersCount))
}

watch(() => store.currentTest, () => {
  const currentTest = JSON.stringify(store.currentTest)
  const sex = JSON.stringify(store.selectedSex)
  const age = JSON.stringify(store.selectedAge)
  localStorage.setItem('currentTest', currentTest)
  localStorage.setItem('sex', sex)
  localStorage.setItem('age', age)
})

watch(() => store.answers, () => {
  const currentAnswers = JSON.stringify(store.answers)
  localStorage.setItem('answers', currentAnswers)
})

watch(() => store.currentQuestionNumber, () => {
  localStorage.setItem('currentQuestion', String(store.currentQuestionNumber))
})

watch(() => store.answersCount, () => {
  localStorage.setItem('answersCount', String(store.answersCount))
})
</script>

<template>
  <div class="tests">
    <template v-if="!store.currentTest.title">
      <AgeSection />
    </template>
    <template v-else>
      <TestSection />
    </template>

  </div>
</template>

<style>
.locked {
  overflow: hidden;
}

.tests {
  overflow: hidden;
}
</style>