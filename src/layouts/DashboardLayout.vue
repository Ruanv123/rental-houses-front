<script setup lang="ts">
import HeaderComp from '@/components/shared/HeaderComp.vue'
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <HeaderComp />
    <main>
      <RouterView />
    </main>
  </div>
</template>
