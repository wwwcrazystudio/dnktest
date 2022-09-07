<template>
  <div class="present-block">
    <div class="title">В конце ты получишь <span>подарок!</span></div>
    <div class="description">
      <template v-if="step !== 'finished'">
        <template v-if="questionsCount">
          Ты сможешь забрать его через: {{ questionsLeft }}
          вопрос(ов)
        </template>
        <template v-else>
          Ты сможешь забрать его ответив на
          все вопросы
        </template>
      </template>
      <template v-else>
        Ты сможешь забрать его указав адрес электронной
        почты
      </template>
    </div>
    <!-- <Button :disabled="step !== 'finished'" @click="click">Забрать подарок </Button> -->
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/elements/Button.vue';
import { computed } from 'vue';
import { useStore } from '@/store';

const store = useStore()

const step = computed(() => {
  return store.step
})

const questionsCount = computed(() => {
  return store.questionsCount
})

const questionsLeft = computed(() => {
  return store.questionsCount - store.answersCount;
})

/* export default defineComponent({
  name: 'Present',
  data: () => ({
    testStore: useTest(),
    Step
  }),
  computed: {
    questionsLeft() {
      return this.testStore.questionsCount - this.testStore.answersCount;
    }
  },
  methods: {
    declOfNum,
    click() {
      emitter.emit('focus-finish-email');
    }
  },
  components: { Button }
}); */
</script>

<style scoped>
.present-block {
  background: #ececf0;
  box-shadow: 0 0 22px rgba(28, 25, 88, 0.06);
  border-radius: 37px;
  position: relative;
  background-image: url('@/assets/present.svg');
  background-position: center bottom;
  background-repeat: no-repeat;
  padding: 50px 40px;
  text-align: center;
  height: 570px;
  margin-top: 137px;
  margin-bottom: 144px;
  margin-left: -63px;
  width: 330px;
}

.title {
  font-weight: bold;
  font-size: 22px;
  line-height: 130%;
  color: #0c0058;
  margin-bottom: 23px;
}

.title span {
  color: #fe6205;
}

.description {
  font-size: 16px;
  line-height: 165%;
  color: #4e4a64;
  margin-bottom: 40px;
}

.btn {
  padding-top: 18px;
  padding-bottom: 18px;
}

.btn.btn-disabled {
  border: 1px solid #bcbcbc;
  box-shadow: 0 0 22px rgba(192, 192, 192, 0.4);
}

@media screen and (max-width: 550px) {
  .present-block {
    margin-top: 0;
    margin-bottom: 30px;
    margin-left: 0;
    width: 100%;
    height: auto;
    padding-bottom: 185px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .description {
    margin-bottom: 30px;
  }
}
</style>