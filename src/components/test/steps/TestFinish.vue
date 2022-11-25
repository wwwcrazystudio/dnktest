<template>
    <div class="finish-container">
        <div class="results">
            <div class="title">
                <template v-if="store.result.title">Твой результат:
                    <span> {{ store.result.title }}!</span>
                </template>
                <template v-else>Тест успешно пройден!</template>
            </div>
            <div class="description">
                <template v-if="store.currentTest.code === 'A1'">
                    <p>Ты можешь быть успешен в таких профессиях, как:</p>
                    <ul>
                        <li v-for="item in store.result.items">{{ item }}</li>
                    </ul>
                </template>
                <template v-if="store.currentTest.code === 'A2'">
                    <p>{{ store.result.text }}</p>
                </template>
                <template v-if="store.currentTest.code === 'A3' || store.currentTest.code === 'B2'">
                    <h3>Доминирующий фактор: {{ store.result.highTitle }}</h3>
                    <p>{{ store.result.highText }}</p>
                    <h3>Минимальный фактор: {{ store.result.titleLess }}</h3>
                    <p>{{ store.result.textLess }}</p>
                </template>
                <template v-if="store.currentTest.code === 'C1'">
                    <p><i>{{ store.result['sub-title'] }}</i></p>
                    <div v-html="store.result.text"></div>
                </template>
                <template v-if="store.currentTest.code === 'C2'">
                    <p><b>Ты можешь быть успешен</b> в таких профессиях, как:</p>
                    <ul>
                        <li v-for="item in store.result.items">{{ item }}</li>
                    </ul><br />
                    <p>Если твоя цель – своевременный и точный выбор профессии с учетом своих возможностей, требований
                        профессии и рынка труда, <b>задай себе следующие вопросы:</b></p>
                    <ul>
                        <li>Каким должно быть содержание профессии, чтобы интересно было работать?</li>
                        <li>Есть ли у меня профессионально важные качества для этой работы?</li>
                        <li>Какое образование нужно для этой профессии?</li>
                        <li>На какой уровень образования я могу рассчитывать?</li>
                        <li>За какую минимальную заработную плату я могу работать?</li>
                        <li>Какой образ жизни я хочу вести – напряженный или свободный?</li>
                        <li>Хочу ли я работать рядом с домом, или мне это безразлично?</li>
                    </ul>
                </template>
                <template v-if="store.currentTest.code === 'C3'">
                    <p>{{ store.result.text }}</p>
                </template>
                <template v-if="store.currentTest.code === 'C4'">
                    <p><i>{{ store.result.text }}</i></p>
                </template>
            </div>
        </div>
        <div class="present">
            <div class="title">Забери свой <span>подарок</span>:</div>
            <div class="description">Подарок будет ждать тебя <b>на твоей электронной почте:</b></div>
            <form class="present-form" @submit.prevent="submit">
                <TextField placeholder="Твоя электронная почта" :error="error" v-model:value="email"
                    @focus="error = ''"></TextField>
                <Button class="submit"></Button>
            </form>
        </div>
        <Share :image="'/assets/' + test.image" :title="test.title" :description="shareDescription"></Share>
        <Button href="#tests" arrow @click="resetTest">Пройти другой тест</Button>
    </div>
</template>

<script lang="ts" setup>
import { useTests } from '@/assets/composables/useTests';
import Button from '@/components/elements/Button.vue'
import TextField from '@/components/elements/TextField.vue'
import Share from '@/components/Share.vue'
import { useStore } from '@/store';
import { ref, computed } from 'vue';

const test = useTests()
const store = useStore()

const email = ref<string>('')
const error = ref<string>('')

const isEmailValid = (email: string) => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

const submit = async () => {
    if (!email.value) error.value = 'Это поле необходимо заполнить'
    else if (!isEmailValid(email.value))
        error.value = 'Введите корректный e-mail'
    if (error.value) return false
    let result = JSON.stringify(store.result)
    if (store.currentTest.code === 'C2') {
        result = store.result.items.join(', ')
    }

    const meta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
    const token = meta?.content

    const data = new FormData()
    data.append('sex', store.selectedSex?.sexValue || '')
    data.append('age', store.selectedAge?.ageValue || '')
    data.append('test', store.currentTest.title)
    data.append('result', result)
    data.append('email', email.value)
    data.append('_token', token)

    const response = await fetch('/api/test_done', {
        method: 'POST',
        body: data
    })

    console.log(response)
}

const shareDescription = computed(() => {
    const genderWord = store.selectedSex?.sexValue === 'female' ? 'прошла' : 'прошел'
    const start = `Я успешно ${genderWord} этот тест.`
    const end = 'Попробуй и ты!'
    if (store.result.title)
        return `${start} Мой результат: ${store.result.title}! ${end}`
    return `${start} ${end}`
})

const resetTest = () => {
    store.changeCurrentTest({})
    store.changeStep('not_started')
}
</script>

<style scoped>
.finish-container {
    padding-top: 30px;
    line-height: 180%;
    color: #4e4a64;
    padding-left: 44px;
    padding-right: 44px;
}

.title {
    font-weight: bold;
    font-size: 22px;
    line-height: 130%;
    color: #0c0058;
    margin-bottom: 25px;
}

.title span {
    color: #fe6205;
}

.description p {
    margin-bottom: 25px;
}

.description p:last-child {
    margin-bottom: 0;
}

.present .description {
    margin-bottom: 15px;
}

.results,
.present,
.share {
    margin-bottom: 50px;
}

:deep(input) {
    background-color: #fff;
    border: 2px solid #fe6205;
}

.present-form {
    display: block;
    max-width: 430px;
    position: relative;
}

.present-form .submit {
    position: absolute;
    width: 44px;
    height: 44px;
    display: block;
    right: 10px;
    top: 10px;
    background-image: url('@/assets/arrow-right.svg'),
        linear-gradient(180deg, #ff9649 0%, #ff5c00 100%);
    border-radius: 11px;
    cursor: pointer;
    background-position: center, center;
    background-repeat: no-repeat, no-repeat;
    padding: 0;
}

.present-form .submit.loading {
    background-image: linear-gradient(180deg, #ff9649 0%, #ff5c00 100%);
}

.present-form .submit.btn :deep(svg.preloader) {
    margin-left: -11px;
}

.finish-container .description ul li {
    padding-left: 20px;
    margin-bottom: 10px;
    position: relative;
}

.finish-container .description ul li:before {
    content: '';
    display: block;
    width: 6px;
    position: absolute;
    height: 6px;
    background-color: #fe6205;
    border-radius: 100%;
    top: 50%;
    margin-top: -3px;
    left: 0;
}

@media screen and (max-width: 550px) {
    .finish-container {
        padding-left: 10px;
        padding-right: 10px;
    }

    .btn {
        padding: 15px 20px;
        font-size: 14px;
    }

    .results,
    .present,
    .share {
        margin-bottom: 30px;
    }
}
</style>
