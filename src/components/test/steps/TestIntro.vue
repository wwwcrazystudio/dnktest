<template>
  <div class="test-container">
    <div class="title">{{ store.currentTest.title }}</div>
    <div class="test-image">
      <img v-if="store.currentTest.image" :src="store.currentTest.image" alt="" />
      <TestClue :text="{
        female: 'Этот тест нравится и мне самой! Давай начнем?',
        male: 'Этот тест нравится и мне самому! Давай начнем?'
      }"></TestClue>
    </div>
    <div class="buttons">
      <Button outlined data-fancybox="data-fancybox" href="#tests">Выбрать другой
      </Button>
      <Button @click="changeStep('in_progress')" arrow>Начать тест</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TestClue from '@/components/test/TestClue.vue';
import Button from '@/components/elements/Button.vue';
import { useStore } from '@/store';

const store = useStore()
const { changeStep } = store

/* export default defineComponent({
  name: 'TestIntro',
  components: { TestClue, Button, Image },
  data: () => ({
    testStore: useTest(),
    Step,
    currentTest: {}
  }),
  async created() {
    this.currentTest = await getTest();
  },
  methods: {
    start() {
      this.testStore.setStep(Step.IN_PROGRESS);
    }
  }
}); */
</script>

<style scoped>
.test-container .title {
  font-weight: bold;
  font-size: 28px;
  line-height: 125%;
  color: #0c0058;
  text-align: center;
  padding-top: 27px;
  margin-bottom: 44px;
}

.test-container :deep(.clue) {
  position: absolute;
  top: 40px;
  left: 40px;
  max-width: 290px;
}

.test-image {
  border-radius: 55px;
  height: 569px;
  overflow: hidden;
  position: relative;
}

.test-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.buttons {
  padding-top: 37px;
  display: flex;
  justify-content: center;
}

.buttons .btn {
  padding-top: 21px;
  padding-bottom: 21px;
}

.buttons .btn:first-child {
  margin-right: 35px;
}

@media screen and (max-width: 550px) {
  .buttons {
    padding-top: 30px;
  }

  .buttons .btn {
    padding: 15px 20px;
    font-size: 14px;
  }

  .buttons .btn:first-child {
    margin-right: 20px;
  }

  .test-image {
    height: 400px;
  }

  .test-container :deep(.clue) {
    top: 20px;
    left: 20px;
  }

  .test-container .title {
    margin-bottom: 30px;
  }
}
</style>