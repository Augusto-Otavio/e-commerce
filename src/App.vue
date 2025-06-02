<template>
  <div class="flex">
    <SidebarMenu />
    <main class="flex min-h-screen p-4 mb-10">
      <div class="flex flex-col items-center justify-center text-center min-h-screen">
        <router-view />
      </div>
      <Footer />
    </main>
  </div>
</template>

<script setup>
import SidebarMenu from './components/SideBarMenuComponent.vue'
import Footer from './components/FooterComponent.vue'
</script>
