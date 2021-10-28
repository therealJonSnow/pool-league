<script setup>

</script>

<template>
  <div>
    <main class="background relative h-screen w-screen">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.background {
  background: #f2f3f7;
}
body * {
  @apply text-gray-800;
  font-family: 'Poppins', sans-serif;
}
</style>
