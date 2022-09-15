<template>
    <div class="modal" v-show="show">
        <div class="modal-wrap">
            <div class="modal-content" @click.stop>
                <button class="modal-close" @click="$emit('close')">
                    <svg width="24" heigh="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1" stroke="#fe6205">
                        <path d="M20 20L4 4m16 0L4 20"></path>
                    </svg>
                </button>
                <div class="modal-header">
                    <slot name="header"></slot>
                </div>
                <div class="modal-description">
                    <slot name="description"></slot>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';

export interface ModalProps {
    show: boolean
}

export interface Emits {
    (e: 'close'): void
}

const emit = defineEmits<Emits>()
const props = defineProps<ModalProps>()

const handleDocumentClick = () => {
    emit('close')
}

onMounted(() => {
    document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
    document.removeEventListener('click', handleDocumentClick)
})

watch(() => props.show, () => {
    if (props.show) {
        document.documentElement.classList.add('locked')
        return
    }

    document.documentElement.classList.remove('locked')
})
</script>

<style scoped>
.modal {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.6);
}

.modal-wrap {
    height: calc(100vh - 60px);
    padding-top: 30px;
    padding-bottom: 30px;
    overflow: auto;
    display: flex;
}

.modal-close {
    position: absolute;
    top: 30px;
    right: 20px;
    background-color: transparent;
    border: none;
    z-index: 10;
}

.modal-content {
    background: #fff;
    border-radius: 54px;
    padding: 35px 95px 45px 45px;
    max-width: 606px;
    height: fit-content;
    margin: auto;
    position: relative;
}

.sex-modal {
    padding-left: 153px;
    padding-right: 153px;
    max-width: 100%;
}

.tests-modal {
    padding-left: 167px;
    padding-right: 167px;
    max-width: 100%;
}

.age-alert-modal {
    padding-left: 45px;
    padding-right: 45px;
}

.modal-header {
    font-weight: 600;
    font-size: 30px;
    line-height: 37px;
    color: #0c0058;
    margin-bottom: 10px;
}

.modal-description {
    line-height: 165%;
    color: #4e4a64;
    padding-bottom: 20px;
}

.modal-description:empty {
    display: none;
}

.modal :deep(.carousel__button.is-close) {
    top: 36px;
    right: 30px;
}

.modal :deep(.carousel__button.is-close svg) {
    stroke: #fe6205;
}

.modal :deep(:focus:not(.carousel__button.is-close)) {
    outline: none;
    box-shadow: none;
    -webkit-box-shadow: none;
}

@media screen and (max-width: 550px) {

    .modal-content {
        max-width: calc(100% - 30px);
        padding: 24px 36px;
        border-radius: 32px;
    }

    .age-alert-modal {
        padding-left: 20px;
        padding-right: 20px;
    }

    .tests-modal {
        padding-left: 20px;
        padding-right: 20px;
    }

    .sex-modal {
        width: 100%;
    }

    .modal-header :deep(.text-center) {
        text-align: left;
    }
}
</style>