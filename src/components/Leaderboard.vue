<template>
    <table class="w-96 mx-auto">
      <thead class="text-center">
        <tr class="mb-3 border-b-2 border-pink-500">
          <th :style="'width: ' + (1/ (1+leaderboardData.length) * 100) + '%'" class="text-sm text-gray-400 border-r-2 border-pink-500"><span>player</span><span class="ml-4 inline-block transform -rotate-90 origin-center">vs</span></th>
          <th :style="'width: ' + (1/ (1+leaderboardData.length) * 100) + '%'" v-for="user in leaderboardData" :key="user.name">{{  user.name }}</th>
          <th :style="'width: ' + (1/ (1+leaderboardData.length) * 100) + '%'">Total</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr class="" v-for="(user, index) in leaderboardData" :key="user.name">
          <td :class="index === 0 ? 'pt-2' : 'pt-1'" class="pl-2 border-r-2 border-pink-500">{{  user.name }}</td>
          <td v-for="record in user.record.record" :key="record.player">{{ record.player !== user.name ? record.score : 'n/a'}}</td>
          <td v-html="totalScore(user.record.record)"></td>
        </tr>
      </tbody>
    </table>
</template>

<script>


export default {
  data() {
    return {
    }
  },
  props: {
    leaderboardData: Array
  },
  methods: {
    totalScore (user) {
      let score = 0
      user.forEach(record => {
        score += record.score
      });
      return score
    }
  }
}
</script>

<style  scoped>
.container {
  grid-template-columns: min-content auto;
}
</style>