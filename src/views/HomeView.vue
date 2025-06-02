<template>
  <div class="p-4 max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row md:items-center mb-4 gap-4 pt-16 md:pt-0">
      <input
        v-model="search"
        @input="searchProducts"
        placeholder="Buscar produtos..."
        class="border border-gray-300 p-3 rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
      <select
        v-model="sortBy"
        class="border border-gray-300 p-3 rounded-lg bg-white text-gray-700 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      >
        <option value="">Ordenar</option>
        <option value="price-asc">Preço: Menor para Maior</option>
        <option value="price-desc">Preço: Maior para Menor</option>
        <option value="name-asc">Nome: A-Z</option>
        <option value="name-desc">Nome: Z-A</option>
      </select>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="product in displayedProducts"
        :key="product.id"
        class="border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-lg transition duration-300 bg-white flex flex-col w-full md:w-72 md:h-70"
      >
        <img :src="product.thumbnail" alt="" class="h-40 object-contain w-full rounded-md mb-2" />
        <h3 class="font-bold text-gray-800 text-lg truncate">{{ product.title }}</h3>
        <p class="text-blue-500 font-semibold mt-1">R$ {{ product.price }}</p>
        <router-link :to="`/product/${product.id}`" class="text-sm text-blue-500 hover:underline mt-2 block">
          Ver detalhes
        </router-link>
      </div>
    </div>

    <div class="mt-6 flex justify-between">
      <button
        @click="prevPage"
        :disabled="skip === 0"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
      >
        Anterior
      </button>
      <button
        @click="nextPage"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const products = ref([])
const search = ref('')
const sortBy = ref('')
const skip = ref(0)
const limit = 12

const fetchProducts = async () => {
  const res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip.value}`)
  products.value = res.data.products
}

const searchProducts = async () => {
  if (search.value.length > 0) {
    const res = await axios.get(`https://dummyjson.com/products/search?q=${search.value}`)
    products.value = res.data.products
  } else {
    fetchProducts()
  }
}

const displayedProducts = computed(() => {
  let sorted = [...products.value]
  if (sortBy.value === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  else if (sortBy.value === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  else if (sortBy.value === 'name-asc') sorted.sort((a, b) => a.title.localeCompare(b.title))
  else if (sortBy.value === 'name-desc') sorted.sort((a, b) => b.title.localeCompare(a.title))
  return sorted
})

const nextPage = () => {
  skip.value += limit
  fetchProducts()
}

const prevPage = () => {
  if (skip.value >= limit) {
    skip.value -= limit
    fetchProducts()
  }
}

onMounted(() => fetchProducts())
</script>
