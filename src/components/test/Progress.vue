<template>
  <div class="progress-bar" v-if="store.answersCount && store.questionsCount">
    <div class="progress-line" :style="{ width: `${value}%` }"></div>
    <div class="progress-value" v-if="value">{{ value }} %</div>
    <div class="progress-info">Вопрос {{ (store.answersCount + 1) }} из {{ store.questionsCount }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store';
import { computed } from 'vue';

const store = useStore()

console.log(store.questionsCount)
console.log(store.answersCount)

const value = computed(() => {
  return Math.floor(100 / store.questionsCount * store.answersCount);
})
</script>

<style>
.progress-bar {
  height: 48px;
  position: relative;
  border-radius: 105px;
  width: 100%;
  border: 3px solid #fe6205;
  overflow: hidden;
  background-color: #c8c9e3;
}

@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }

  to {
    background-position: 0 0;
  }
}

@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }

  to {
    background-position: 0 0;
  }
}

.progress-line {
  transition: .2s;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fe6205;
  -webkit-animation: progress-bar-stripes 2s linear infinite;
  -o-animation: progress-bar-stripes 2s linear infinite;
  animation: progress-bar-stripes 2s linear infinite;
  background-image: linear-gradient(135deg, hsla(0, 0%, 100%, .25) 25%, transparent 0, transparent 50%, hsla(0, 0%, 100%, .25) 0, hsla(0, 0%, 100%, .25) 75%, transparent 0, transparent);
  background-size: 40px 40px;
}

.progress-value {
  font-weight: bold;
  font-size: 20px;
  line-height: 125%;
  color: #fff;
  position: absolute;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  top: 50%;
  margin-top: -15px;
  left: 20px;
}

.progress-info {
  width: 200px;
  position: absolute;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  margin-top: -15px;
  margin-left: -100px;
  font-size: 16px;
  line-height: 175%;
  /*color: #b4b4b4;*/
  color: #fff;
}
</style>