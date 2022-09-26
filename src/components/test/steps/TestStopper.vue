<template>
  <div class="test-stopper">
    <Progress></Progress>
    <div class="current-progress-container">
      <div class="current-progress" v-if="store.currentQuestionNumber">
        Ты уже прошёл {{ store.currentQuestionNumber }} вопроса(ов)</div>
    </div>
    <div class="image">
      <img :src="image" />
      <TestClue :class="cluePosition">{{ clueText }}</TestClue>
    </div>
    <div class="text-center">
      <Button @click="store.changeStep('in_progress')">Продолжить отвечать</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/elements/Button.vue';
import TestClue from '@/components/test/TestClue.vue';
import Progress from '@/components/test/Progress.vue';
import { useStore } from '@/store';
import { ref } from 'vue';

import stopper1 from '@/assets/stopper-1.png'
import stopper2 from '@/assets/stopper-2.png'
import stopper3 from '@/assets/stopper-3.png'
import stopper4 from '@/assets/stopper-4.png'
import stopper5 from '@/assets/stopper-5.png'
import stopper6 from '@/assets/stopper-6.png'
import stopper7 from '@/assets/stopper-7.png'
import stopper8 from '@/assets/stopper-8.png'
import stopper9 from '@/assets/stopper-9.png'
import stopper10 from '@/assets/stopper-10.png'
import stopper11 from '@/assets/stopper-11.png'
import stopper12 from '@/assets/stopper-12.png'

const store = useStore()
const cluePosition = ref<string>()
const clueText = ref<string>()
const image = ref<string>()

const images = [
  stopper1, stopper2, stopper3, stopper4, stopper5, stopper6, stopper7, stopper8, stopper9, stopper10, stopper11, stopper12
]

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
const randomNumber = random(1, 12);
const positions = [
  'left top', 'right top', 'right center',
  'right center', 'right top', 'right top',
  'left center', 'left top', 'right center',
  'left top', 'left center', 'right top'
];
image.value = images[randomNumber];
cluePosition.value = positions[(randomNumber - 1)];
const texts = [
  'Ты уже так далеко! Молодец! Продолжай в том же духе.',
  'Не останавливайся! Впереди будет только веселее.',
  'Ого, мы так далеко! Давай продолжим?',
  'Вот это да, мы так далеко!',
];
clueText.value = texts[random(0, 3)];
</script>

<style scoped>
.test-stopper .image {
  width: 675px;
  position: relative;
  margin-bottom: 38px;
  height: 520px;
}

@media screen and (max-width: 550px) {
  .test-stopper .image {
    width: 100%;
    height: auto;
  }
}

.test-stopper .current-progress-container {
  padding-top: 50px;
  padding-bottom: 30px;
  text-align: center;
}

.test-stopper .current-progress {
  background: #f3f2f6;
  border-radius: 5px;
  padding: 4px 18px 6px;
  line-height: 165%;
  color: #0c0058;
  display: inline-block;
}

.test-stopper .image img {
  max-width: 100%;
  height: auto;
}

.test-stopper :deep(.clue) {
  position: absolute;
  top: 40px;
  left: 40px;
  right: auto;
  max-width: 290px;
}

.test-stopper :deep(.clue.left) {
  left: 40px;
  right: auto;
}

.test-stopper :deep(.clue.right) {
  left: auto;
  right: 40px;
}

.test-stopper :deep(.clue.center) {
  top: 50%;
  margin-top: -100px;
}
</style>