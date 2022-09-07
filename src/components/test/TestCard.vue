<template>
  <div class="test-card">
    <Present></Present>
    <div class="main-block">
      <TestIntro v-if="step === 'not_started'"></TestIntro>
      <TestProcess v-if="step === 'in_progress'"></TestProcess>
      <TestStopper v-if="step === 'pause'"></TestStopper>
      <TestFinish v-if="step === 'finished'"></TestFinish>
    </div>
    <TestHelp></TestHelp>
  </div>
</template>

<script lang="ts" setup>
import Present from '@/components/test/Present.vue';
import TestHelp from '@/components/test/TestHelp.vue';
import TestIntro from '@/components/test/steps/TestIntro.vue';
import TestStopper from '@/components/test/steps/TestStopper.vue';
import TestProcess from '@/components/test/steps/TestProcess.vue';
import TestFinish from '@/components/test/steps/TestFinish.vue';
import { useStore } from '@/store';
import { computed } from 'vue';

const store = useStore()

const step = computed(() => {
  return store.step
})
</script>

<style scoped>
.test-card {
  display: flex;
  background: #fff;
  border-radius: 55px;
  max-width: 1272px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.main-block {
  flex: 1;
  padding: 31px 33px 50px 33px;
}

@media screen and (max-width: 550px) {
  .test-card {
    flex-direction: column;
    background-color: transparent;
  }

  .main-block {
    background-color: #fff;
    box-shadow: 0 0 22px rgb(28 25 88 / 6%);
    border-radius: 37px;
    /*margin-left: -15px;*/
    /*margin-right: -15px;*/
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    order: 3;
    margin-left: -20px;
    margin-right: -20px;
    padding-bottom: 30px;
  }
}
</style>