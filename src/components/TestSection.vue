<template>
    <section class="test-section" id="test">
        <div class="container">
            <h2>Давай скорее начинать</h2>
            <TestCard></TestCard>
        </div>
        <div class="background-4"></div>
    </section>
</template>

<script setup lang="ts">
import TestCard from './test/TestCard.vue';

document.documentElement.classList.remove('locked')
</script>