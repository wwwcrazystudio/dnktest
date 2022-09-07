<script setup lang="ts">
import AgeSection from './components/AgeSection.vue';
import TestSection from './components/TestSection.vue';
import { useStore } from '@/store/index'

const store = useStore()
</script>

<template>
  <div>
    <template v-if="!store.currentTest.title">
      <AgeSection />
    </template>
    <template v-else>
      <TestSection />
    </template>

  </div>
</template>

<style>
body {
  background: linear-gradient(88.62deg, #1e1c57 12.62%, #12103a 95.96%);
}
</style>