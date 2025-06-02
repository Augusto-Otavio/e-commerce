<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      :class="[
        'md:hidden fixed top-4 z-50 bg-white border p-2 rounded-lg shadow flex items-center justify-center w-10 h-10',
        isOpen ? 'right-8' : 'left-4'
      ]"
      aria-label="Toggle menu"
    >
      <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <nav
      :class="[
        'bg-white border-r border-gray-200 p-6 transition-transform duration-300 z-40 fixed top-0 left-0 h-screen w-64 md:static md:translate-x-0 md:block',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <h2 class="text-xl font-semibold mb-6 text-gray-800">Categorias</h2>

      <ul>
        <li v-for="category in categories" :key="category.id" class="mb-3">
          <router-link
            :to="category.name ? `/category/${category.name}` : '/'"
            @click="isOpen = false"
            class="block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
            active-class="bg-blue-500 text-white font-semibold"
          >
            {{ category.label }}
          </router-link>
        </li>
      </ul>
    </nav>

    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
      @click="isOpen = false"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const categories = [
  { id: 0, name: '', label: 'Home' }, 
  { id: 1, name: 'smartphones', label: 'Smartphones' },
  { id: 2, name: 'laptops', label: 'Laptops' },
  { id: 3, name: 'fragrances', label: 'Fragrâncias' },
  { id: 5, name: 'home-decoration', label: 'Decoração' },
]
</script>
