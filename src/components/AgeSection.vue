<template>
    <section class="age-section">
        <div class="container">
            <h2>Выбери свой возраст</h2>
            <div class="age-cards">
                <div class="age-card" @click.stop="handleAgeSelect(age)" v-for="age in ages">
                    <div class="photo">
                        <img :src="age.icon" alt="">
                    </div>
                    <div class="content">
                        <div class="label">Возраст</div>
                        <div class="age"><b>{{ age.ageValue }}</b> Лет</div>
                    </div>
                    <Button outlined>Выбрать</Button>
                    <img :src="age.img" alt="" class="image">
                </div>
            </div>
        </div>
        <div class="before parallax"></div>
        <div class="after parallax"></div>

        <Modal :show="showSexModal" @close="showSexModal = false">
            <template #header>
                <div class="text-center">Выбери свой пол</div>
            </template>
            <div class="sex-chooser">
                <div class="sex-item" :class="selectedSex?.label === sex.label && 'active'"
                    @click.stop="selectedSex = sex" v-for="sex in sexes">
                    <img :src="sex.img" :alt="sex.label" />
                </div>

            </div>
            <div class="text-center">
                <Button @click="handleUserDataChange" :disabled="!selectedSex" arrow>Выбрать тест</Button>
            </div>
        </Modal>

        <Modal :show="showTestsModal" @close="showTestsModal = false">
            <template #header>
                <div class="text-center">Какой тест тебе нравится?</div>
            </template>
            <div class="tests-list" v-if="testTypes.length">
                <div class="test-card" :key="test.code" v-for="test in testsByAge" @click.stop="selectedTest = test"
                    :class="selectedTest?.code === test.code && 'active'">
                    <div class="image">
                        <img :src="test.image" :alt="test.title" />
                        <div class="status"></div>
                    </div>
                    <div class="title">{{ test.title }}</div>
                </div>
                <div class="text-center width-100">
                    <Button @click="selectedTest && changeCurrentTest(selectedTest)" :disabled="!selectedTest"
                        arrow>
                        Начать тест
                    </Button>
                </div>
            </div>
            <div class="empty-content" v-else>
                <div class="empty-content-text">В данной категории пока нет тестов</div>
                <Button arrow>Выбрать другую категорию</Button>
            </div>
        </Modal>
    </section>
</template>

<script lang="ts" setup>
import Button from '@/components/elements/Button.vue';
import type { Age, Sex, TestType } from '@/types/types';
import { useStore } from '@/store/index'
import { testTypes } from '@/data/tests';

import icon1 from '@/assets/age-photo-1.svg'
import icon2 from '@/assets/age-photo-2.svg'
import icon3 from '@/assets/age-photo-3.svg'
import img1 from '@/assets/age-image-1.svg'
import img2 from '@/assets/age-image-2.svg'
import img3 from '@/assets/age-image-3.svg'
import fem from '@/assets/female.svg'
import male from '@/assets/male.svg'

import Modal from './elements/Modal.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue';

const selectedSex = ref<Sex>()
const selectedAge = ref<Age>()
const selectedTest = ref<TestType>()

const showSexModal = ref<boolean>(false)
const showTestsModal = ref<boolean>(false)

const store = useStore()
const { changeAge, changeSex, changeCurrentTest } = store

const testsByAge = computed(() => {
    if (selectedAge.value) return testTypes.filter((test) => test.age === selectedAge.value?.type)

    return testTypes
})

const handleAgeSelect = (age: Age) => {
    selectedAge.value = age
    showSexModal.value = true
}

const handleUserDataChange = () => {
    selectedSex.value && changeSex(selectedSex.value)
    selectedAge.value && changeAge(selectedAge.value)
    showSexModal.value = false
    showTestsModal.value = true
}

const ages = [
    {
        type: 'A',
        ageValue: '8-12',
        img: img1,
        icon: icon1,
    },
    {
        type: 'B',
        ageValue: '12-14',
        img: img2,
        icon: icon2,
    },
    {
        type: 'C',
        ageValue: '14+',
        img: img3,
        icon: icon3,
    },
]

const sexes = [
    {
        label: 'Девочка',
        sexValue: 'female',
        img: fem
    },
    {
        label: 'Мальчик',
        sexValue: 'male',
        img: male
    }
]


</script>


<style scoped>
.age-section {
    padding-top: 245px;
    padding-bottom: 250px;
    position: relative;
}

.age-section .before {
    background-image: url('@/assets/asteroid-2.svg');
    display: block;
    position: absolute;
    top: -100px;
    left: 0;
    width: 216px;
    height: 610px;
}

.age-section .after {
    background-image: url('@/assets/asteroid-3.svg');
    display: block;
    position: absolute;
    top: 80px;
    left: 281px;
    width: 101px;
    height: 97px;
}

.age-cards {
    display: flex;
    padding-top: 150px;
    justify-content: center;
}

.age-card {
    background: #fff;
    border-radius: 70px;
    position: relative;
    margin-left: 50px;
    width: 433px;
    height: 272px;
    padding: 40px;
    z-index: 2;
    cursor: pointer;
}

.age-card.active {
    /*cursor: default;*/
}

.age-card.active .btn {
    background: linear-gradient(180deg, #ff9649 0%, #ff5c00 100%);
    box-shadow: 0 0 22px rgba(255, 107, 0, 0.4);
    color: #fff;
}

.age-card:first-child {
    margin-left: 0;
}

.age-card .photo {
    height: 106px;
    width: 106px;
    border-radius: 100%;
    background: #fff;
    box-shadow: 0 0 22px rgba(28, 25, 88, 0.14);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -53px;
    left: 42px;
}

.age-card .image {
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 0 0 70px 0;
}

.age-card:nth-child(3) .image {
    right: -55px;
}

.age-card .content {
    margin-top: 32px;
    margin-bottom: 30px;
}

.age-card .content .label {
    line-height: 165%;
    color: #7b7698;
    margin-bottom: 5px;
}

.age-card .content .age {
    font-size: 18px;
    line-height: 165%;
    color: #7b7698;
    position: relative;
    z-index: 1;
}

.age-card .content .age b {
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
    color: #0c0058;
}

@media screen and (max-width: 550px) {
    .age-section {
        padding-top: 80px;
        padding-bottom: 70px;
    }

    .age-section h2 {
        position: relative;
        z-index: 2;
    }

    .age-cards {
        flex-direction: column;
        padding-top: 100px;
    }

    .age-card {
        margin-left: 0;
        width: auto;
        margin-bottom: 90px;
    }

    .age-card .image {
        max-width: 40%;
    }

    .age-card:last-child {
        margin-bottom: 0;
    }
}

.sex-chooser {
    display: flex;
    padding-top: 118px;
    justify-content: center;
    padding-bottom: 82px;
}

.sex-item {
    background: #fff;
    box-shadow: 0 0 53px rgba(28, 25, 88, 0.11);
    border-radius: 51px;
    width: 294px;
    height: 204px;
    position: relative;
    flex-shrink: 0;
    cursor: pointer;
}

.sex-item.active {
    background: linear-gradient(180deg, #ff9649 0%, #ff5c00 100%), #ff5c00;
}

.sex-item:first-child {
    margin-right: 50px;
}

.sex-item img {
    position: absolute;
    bottom: 0;
    left: 50%;
}

.sex-item:nth-child(1) img {
    margin-left: -113px;
}

.sex-item:nth-child(2) img {
    margin-left: -108px;
}

@media screen and (max-width: 550px) {
    .sex-chooser {
        flex-direction: column;
        align-items: center;
        padding-top: 90px;
        padding-bottom: 40px;
    }

    .sex-item:first-child {
        margin-right: 0;
        margin-bottom: 100px;
    }
}

.tests-list {
    display: flex;
    flex-wrap: wrap;
    width: 610px;
    justify-content: space-between;
    padding-top: 40px;
    padding-bottom: 10px;
}

.empty-content {
    padding-top: 40px;
    padding-bottom: 20px;
}

.empty-content-text {
    padding-bottom: 30px;
}

.test-card {
    margin-bottom: 40px;
    text-align: center;
    position: relative;
    width: 270px;
    cursor: pointer;
}

.test-card .image {
    position: relative;
}

.test-card .status {
    width: 48px;
    height: 48px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -24px;
    border-radius: 100%;
}

.test-card img {
    max-width: 100%;
    height: 148px;
    display: inline-block;
    margin-bottom: 18px;
    box-shadow: 0 0 53px rgba(28, 25, 88, 0.11);
    border-radius: 29px;
    width: 100%;
    object-fit: cover;
}

.test-card.active .status {
    background-image: url('@/assets/checked.svg'), linear-gradient(180deg, #ff9649 0%, #ff5c00 100%);
    background-color: #fff;
    background-repeat: no-repeat, no-repeat;
    background-position: center, center;
    box-shadow: 0 0 22px rgba(255, 102, 12, 0.2);
}

.test-card .title {
    line-height: 175%;
    color: #0c0058;
}

@media screen and (max-width: 550px) {
    .tests-list {
        width: auto;
        justify-content: center;
    }
}
</style>