<template>
  <div v-if="product" class="h-screen flex items-center justify-center p-4 max-w-5xl mx-auto md:pl-48 ">
    <div class="bg-white rounded-xl shadow-md overflow-hidden w-full">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2 bg-gray-100 flex items-center justify-center p-4">
          <img :src="product.thumbnail" alt="Imagem do produto"
               class="max-h-96 w-full object-contain" />
        </div>

        <div class="md:w-1/2 p-6 flex flex-col justify-center">
          <router-link to="/" class="flex items-center gap-1 mb-4">
            <img src="../assets/icons/arrow-left-02.svg" alt="ícone de flecha apontado para a esquerda">        <span class="text-gray-600 hover:underline text-md">Voltar</span>
          </router-link>
          <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ product.title }}</h1>
          <p class="text-2xl text-green-600 font-semibold mb-4">R$ {{ product.price }}</p>
          <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const product = ref(null)
const route = useRoute()

onMounted(async () => { 
  const res = await axios.get(`https://dummyjson.com/products/${route.params.id}`)
  product.value = res.data
})
</script>
