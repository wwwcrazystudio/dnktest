<template>
  <div class="clue">
    <div class="title">
      <img :src="helper.image" alt="" />
      <span>{{ (caption || helper.name) }}</span>
    </div>
    <div class="text">
      {{ textBySex }}
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/store';
import barri from '@/assets/barri-small.svg'
import diana from '@/assets/diana-small.svg'

export interface Props {
  text?: {
    male: string
    female: string
  }
  showText?: boolean
  caption?: string
}

const props = defineProps<Props>()

const store = useStore()

const textBySex = computed(() => {
  const { selectedSex } = store
  if (props.text) {
    if (selectedSex) return props.text[selectedSex.sexValue]

    return props.text['male']
  }

  return ''
})

const helper = computed(() => {
  switch (store.selectedSex?.sexValue) {
    case 'female':
      return {
        name: 'Диана',
        image: diana
      }
    case 'male':
      return {
        name: 'Барри',
        image: barri
      }
    default:
      return {
        name: 'Барри',
        image: barri
      }
  }
})

</script>

<style scoped>
.clue {
  background: #fff;
  box-shadow: 0 0 22px rgba(28, 25, 88, 0.06);
  border-radius: 37px;
  padding: 20px 20px 26px;
}

.clue .title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  height: 53px;
}

.clue .title img {
  margin-right: 28px;
}

.clue .title span {
  font-weight: bold;
  font-size: 20px;
  line-height: 100%;
  color: #0c0058;
}

.clue .text {
  line-height: 165%;
  color: #4e4a64;
  text-align: left;
}

@media screen and (max-width: 550px) {
  .clue {
    padding-bottom: 30px;
  }
}
</style>