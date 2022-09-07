<template>
    <div class="slider">
        <div class="current-value">{{ modelValue || 1 }}</div>
        <div class="slider-container">
            <div class="min-value">{{ minValue }}</div>
            <div class="slider-wrapper">
                <VueSlider :value="modelValue" :min="minValue" :max="maxValue" :silent="true" :height="33"
                    tooltip="none" :dotSize="41" @change="$emit('update:modelValue', $event)"></VueSlider>
            </div>
            <div class="max-value">{{ maxValue }}</div>
        </div>
    </div>
</template>
    
<script lang="ts" setup>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export interface Props {
    modelValue: number
}

export interface Emits {
    (e: 'update:modelValue', value: number): void
}

defineProps<Props>()
defineEmits<Emits>()

const minValue = 1
const maxValue = 10
</script>
    
    <style scoped>
    .slider {
        margin-bottom: 30px;
    }
    
    .current-value {
        font-weight: bold;
        font-size: 50px;
        line-height: 125%;
        text-align: center;
        color: #ff6202;
        margin-bottom: 15px;
    }
    
    .min-value,
    .max-value {
        font-weight: bold;
        font-size: 44px;
        line-height: 125%;
        color: #0c0058;
    }
    
    .min-value {
        margin-right: 35px;
    }
    
    .max-value {
        margin-left: 35px;
    }
    
    @media screen and (max-width: 550px) {
        .min-value {
            margin-right: 25px;
        }
    
        .max-value {
            margin-left: 25px;
        }
    
        .min-value,
        .max-value {
            font-size: 30px;
        }
    
        .current-value {
            font-size: 40px;
        }
    }
    
    .slider-container {
        background: #ececf0;
        border-radius: 21px;
        padding: 11px 33px;
        margin-left: -70px;
        margin-right: -70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    
    @media screen and (max-width: 550px) {
        .slider-container {
            margin-left: 0;
            margin-right: 0;
            padding-left: 15px;
            padding-right: 15px;
        }
    }
    
    .slider-wrapper {
        flex: 1;
    }
    
    :deep(.vue-slider-rail) {
        background: linear-gradient(124.95deg, #fff 29.43%, #f5f5f5 153.99%);
        border-radius: 8px;
    }
    
    :deep(.vue-slider-process) {
        background: linear-gradient(180deg, #ff9649 0%, #ff5c00 100%);
        box-shadow: 0 0 22px rgba(255, 107, 0, 0.4);
        border-radius: 8px;
    }
    
    :deep(.vue-slider-dot-handle) {
        border: 7px solid #fff;
        background: linear-gradient(180deg, #ff9649 0%, #ff5c00 100%);
        box-shadow: 0 0 0 1px #e1e1e1;
    }
    
    :deep(.vue-slider:hover .vue-slider-dot-handle) {
        border-color: #fff;
    }
    </style>