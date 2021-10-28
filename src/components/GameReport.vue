<template>
  <div class="">
    <div @click="showForm = true" class="background custom-shadow relative cursor-pointer rounded w-max mx-auto py-3 px-4">Add Result</div>
    <transition-group name="fade">
      <div key="background" @click.self="showForm = false" v-show="showForm" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen  bg-gray-600 bg-opacity-90"></div>
      <div key="form" v-show="showForm" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-items-center items-center bg-slate-200 px-16 py-12 rounded-xl">
        <label class="block" for="player1">Player 1:</label>
        <select class="block custom-shadow bg-slate-200 border-0 w-full rounded m-0 mb-3" name="Player1" v-model="player1" id="player1">
          <option v-for="user in leaderboardData" v-show="user.name !== player2" :key="user.name" :value="user.name">{{ user.name }}</option>
        </select>
        <label class="block" for="player1">Player 2:</label>
        <select class="block custom-shadow bg-slate-200 border-0 w-full rounded m-0 mb-3" name="Player2" v-model="player2" id="player2">
          <option v-for="user in leaderboardData" v-show="user.name !== player1" :key="user.name" :value="user.name">{{ user.name }}</option>
        </select>
        <label class="block" for="player1">Winner:</label>
        <select class="block custom-shadow bg-slate-200 border-0 w-full rounded m-0 mb-6" name="Winner" v-model="winner" id="winner">
          <option :value="activePlayers[0]">{{ activePlayers[0] }}</option>
          <option :value="activePlayers[1]">{{ activePlayers[1] }}</option>
        </select>
        <div class="flex justify-start items-center mb-6 w-max">
          <input v-model="honestyBox" class="mr-4 rounded-full" type="checkbox" name="I promise I'm not cheating">
          <label class="block" for="I promise I'm not cheating">I promise I'm not cheating</label>
        </div>
        <div @click="subForm" class="background custom-shadow cursor-pointer block rounded w-max mx-auto py-3 px-4">Submit Result</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import {db, updateBasicStats, updatePoints} from '../firebase.js'
export default {
  data() {
    return {
      showForm: false,
      player1: null,
      player2: null,
      winner: null,
      loser: null,
      honestyBox: false
    }
  },
  props: {
    leaderboardData: Object
  },
  computed: {
    activePlayers () {
      return [
        this.player1 ? this.player1 : null,
        this.player2 ? this.player2 : null
      ]
    }
  },
  mounted () {
  },
  methods: {
    subForm () {
      if (this.honestyBox) {
        this.loser = this.player1 !== this.winner ? this.player1 : this.player2
        updateBasicStats(db, this.winner, true)
        updateBasicStats(db, this.loser, false)
  
        const winnerIndex = this.leaderboardData.findIndex((user) => {
          return user.name === this.winner
        })
        const loserIndex = this.leaderboardData.findIndex((user) => {
          return user.name === this.loser
        })
  
        // const winnerPoints = this.leaderboardData[winnerIndex].record.points
        // const loserPoints = this.leaderboardData[loserIndex].record.points
  
        let currentMax = 0
        let currentDiff = 0
        for (let index = Math.min(winnerIndex, loserIndex) + 1; index < Math.max(winnerIndex, loserIndex); index++) {
          if (this.leaderboardData[index].record.points !== currentMax) {
            currentMax = this.leaderboardData[index].record.points
            currentDiff += 1
          }
        }
        currentDiff = Math.max(currentDiff, 1)
                
        let loserNewPoints
        let winnerNewPoints
        if (winnerIndex < loserIndex) {
          winnerNewPoints = 3
          loserNewPoints = -3
        } else if (winnerIndex > loserIndex) {
          winnerNewPoints = (currentDiff * 3)
          loserNewPoints = -(currentDiff * 3)
        } else {
          winnerNewPoints = 3
          loserNewPoints = -3
        }
        updatePoints(db, this.winner, winnerNewPoints)
        updatePoints(db, this.loser, loserNewPoints)
  
        this.showForm = false
      } else {
        alert('BE HONEST')
      }
    },
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>