<template>
  <div class="w-96 mx-auto">
    <div class="grid grid-cols-5 grid-rows-1 items-center justify-items-center font-bold border-b-2 border-b-pink-500 mb-2">
      <div>name</div>
      <div>played</div>
      <div>win</div>
      <div>loss</div>
      <div>points</div>
    </div>
    <LeaderboardUser v-for="user in leaderboardData" :key="user.name" :user="user"></LeaderboardUser>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  props: {
    leaderboardData: Array
  }
}
</script>
