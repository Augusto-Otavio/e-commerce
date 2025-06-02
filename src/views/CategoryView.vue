<template>
  <div class="p-4 max-w-7xl mx-auto flex flex-col justify-start min-h-screen">
    <h1 class="text-2xl text-center font-bold mb-6 capitalize text-gray-800">
      Produtos da categoria: <span class="text-blue-600">{{ categorySlug.replace('-', ' ') }}</span>
    </h1>
    <div v-if="loading" class="flex items-center justify-center min-h-screen text-gray-500 text-center">
      Carregando produtos...
    </div>
    <div v-else-if="products.length === 0" class="flex items-center justify-center min-h-screen text-gray-500 text-center">
      Nenhum produto encontrado nessa categoria.
    </div>


    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="border border-gray-200 py-4 px-8 rounded-xl shadow-sm hover:shadow-lg transition duration-300 bg-white justify-self-center w-64 h-70 md:w-72 md:h-70"
      >
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="h-40 object-contain w-full rounded-md mb-2"
        />
        <h3 class="font-semibold text-gray-800 text-lg truncate">{{ product.title }}</h3>
        <p class="text-blue-500 font-medium mt-1">R$ {{ product.price }}</p>
        <router-link
          :to="`/product/${product.id}`"
          class="text-sm text-blue-500 hover:underline mt-2 block"
        >
          Ver detalhes
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const categorySlug = ref(route.params.categorySlug || '')
const products = ref([])
const loading = ref(false)

const fetchProductsByCategory = async (slug) => {
  loading.value = true
  try {
    const res = await axios.get(`https://dummyjson.com/products/category/${slug}`)
    products.value = res.data.products
  } catch (err) {
    console.error('Erro ao buscar produtos:', err)
    products.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchProductsByCategory(categorySlug.value))

watch(
  () => route.params.categorySlug,
  (newSlug) => {
    categorySlug.value = newSlug
    fetchProductsByCategory(newSlug)
  }
)
</script>
