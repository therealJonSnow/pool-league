
<template>
  <div v-if="isDataLoaded" class="background absolute top-1/2 left-1/2  rounded-3xl transform -translate-x-1/2 -translate-y-1/2 custom-shadow flex flex-col items-center justify-center p-10">
    <h1 class="text-3xl mb-6">POPCOMMS P&#127921;&#127921;L LEAGUE</h1>
    <Leaderboard class="mb-6" :leaderboardData="leaderboardData"></Leaderboard>
    <GameReport :leaderboardData="leaderboardData" @updateBoard="updateBoard"></GameReport>
  </div>
</template>

<script>
import {getUsers, db} from '../firebase.js'

export default {
  data() {
    return {
      leaderboardData: null,
      show: false
    }
  },
  computed: {
    isDataLoaded () {
      if (this.leaderboardData !== null) {
        return true
      }
      return false
    }
  },
  methods: {
    updateBoard () {
      getUsers(db).then((x) => {
        this.leaderboardData = x;
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.show = true
    }, 1000);
    getUsers(db).then((x) => {
      this.leaderboardData = x;
    })
  }
}
</script>

<style>
.custom-shadow {
  box-shadow: inset 0 0 0 white,
    -6px -6px 8px rgba(255, 255, 255, 0.9),
    5px 5px 8px rgba(0, 0, 0, 0.07);
  transition: box-shadow 1s ease;
}
</style>