<template>
    <div>
        <input :value="value" type="text" :class="{ error }" :placeholder="placeholder"
            @input="$emit('update:value', $event.target.value)" autcomplete="off">
        <span class="error-text" v-if="error">{{ error }}</span>
    </div>
</template>
    
<script lang="ts" setup>
export interface Props {
    value: string
    error: string
    placeholder: string
}

export interface Emits {
    (e: 'update:value', value: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
    
    <style scoped>
    input,
    textarea {
        background: #f2f2f7;
        border-radius: 18px;
        font-weight: 500;
        font-size: 16px;
        line-height: 175%;
        font-family: 'Montserrat', sans-serif;
        color: rgba(12, 0, 88, 0.61);
        padding: 15px 20px;
        border: none;
        outline: none;
        width: 100%;
        resize: none;
        box-shadow: none;
        -webkit-box-shadow: none;
    }
    
    .error {
        background: #ee9b9b;
        color: #fff;
    }
    
    *:focus {
        outline: none;
        box-shadow: none;
        -webkit-box-shadow: none;
    }
    
    ::placeholder {
        color: rgba(12, 0, 88, 0.25);
        opacity: 1;
    }
    
    :-ms-input-placeholder {
        color: rgba(12, 0, 88, 0.25);
    }
    
    ::-ms-input-placeholder {
        color: rgba(12, 0, 88, 0.25);
    }
    
    .error::placeholder {
        color: #fff;
        opacity: 1;
    }
    
    .error:-ms-input-placeholder {
        color: #fff;
    }
    
    .error::-ms-input-placeholder {
        color: #fff;
    }
    
    .error-text {
        font-size: 10px;
        position: absolute;
        bottom: -20px;
        left: 16px;
        line-height: 20px;
    }
    </style>