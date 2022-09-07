<template>
  <div class="test-instruction">
    <div class="title"> {{ question.title }}</div>
    <div class="description" v-html="question.text"></div>
    <div class="text-center">
      <Button @click="$emit('next')" arrow>Продолжить</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/elements/Button.vue';


export interface Props {
  question: {
    title: string
    text: string
  }
}

export interface Emits {
  (e: 'next'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.test-instruction {
  line-height: 180%;
  color: #4e4a64;
}

.description {
  margin-bottom: 60px;
}

.description :deep(img) {
  max-width: 100%;
}

.title {
  font-weight: bold;
  font-size: 28px;
  line-height: 125%;
  text-align: center;
  color: #0c0058;
  margin-bottom: 50px;
}
</style>