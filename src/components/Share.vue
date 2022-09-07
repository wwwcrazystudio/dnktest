<template>
    <div class="share">
        <div class="title">Поделись своим результатом:</div>
        <div class="soc-nets-list">
            <ShareNetwork v-for="network in networks" :key="network.network" :network="network.network"
                :url="location" :title="title" :media="image" :description="description">
                <Image :slug="network.icon"></Image>
            </ShareNetwork>
        </div>
    </div>
</template>
    
<script lang="ts" setup>
import vk from '@/assets/vk.svg'
import fb from '@/assets/fb.svg'
import telegram from '@/assets/telegram.svg'
import twitter from '@/assets/twitter.svg'
import odnoklassniki from '@/assets/odnoklassniki.svg'

export interface Props {
    title: string
    image: string
    description: string
}

const networks = [
    { network: 'vk', name: 'Vk', icon: vk },
    { network: 'facebook', name: 'Facebook', icon: fb },
    { network: 'telegram', name: 'Telegram', icon: telegram },
    { network: 'twitter', name: 'Twitter', icon: twitter },
    { network: 'odnoklassniki', name: 'Odnoklassniki', icon: odnoklassniki },
]

const location = window.location.origin

defineProps<Props>()
</script>
    
    <style scoped>
    .title {
        font-weight: bold;
        font-size: 22px;
        line-height: 100%;
        color: #0c0058;
        margin-bottom: 25px;
    }
    
    .soc-nets-list {
        display: flex;
    }
    
    .soc-nets-list a {
        margin-right: 17px;
    }
    
    .soc-nets-list a img {
        width: 46px;
    }
    </style>