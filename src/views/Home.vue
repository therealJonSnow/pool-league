
<template>
  <div v-if="isDataLoaded" class="background absolute top-1/2 left-1/2  rounded-3xl transform -translate-x-1/2 -translate-y-1/2 custom-shadow flex flex-col items-center justify-center p-10">
    <h1 class="text-3xl mb-6">POPCOMMS P&#127921;&#127921;L LEAGUE</h1>
    <Leaderboard class="mb-6" :leaderboardData="leaderboardData"></Leaderboard>
    <GameReport v-if="user" :leaderboardData="leaderboardData" @updateBoard="updateBoard"></GameReport>
  </div>

  <div class="custom-shadow absolute top-4 right-4 rounded-3xl" :class="user ? 'p-4' : 'p-10'">
    <form v-if="!user" class="flex flex-col items-center justify-center space-y-2" action="">
      <div>
        <label for="fullName" class="block text-sm font-medium text-gray-700">FullName</label>
        <div class="mt-1">
          <input type="fullName" name="fullName" v-model="fullName" id="fullName" class=" px-3 py-2 border shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Jon Snow">
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <div class="mt-1">
          <input type="email" name="email" v-model="email" id="email" class="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="you@example.com">
        </div>
      </div>
      <div>
        <label for="user-password" class="block text-sm font-medium text-gray-700">Password</label>
        <div class="mt-1">
          <input type="user-password" name="user-password" v-model="password" id="user-password" class=" px-3 py-2 border shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="password">
        </div>
      </div>
      <div class="flex space-x-2 pt-3">
        <button @click="createNewUser" type="button" class="custom-shadow inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-500 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">Register</button>
        <button @click="signInUser" type="button" class="custom-shadow inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-500 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">Sign in</button>
      </div>
    </form>
    <div class="cursor-pointer" v-else @click="signOut">Log Out</div>
  </div>
</template>

<script>
import { getUsers, db } from '../firebase.js'
import { auth } from '../firebase.js'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setPersistence, browserSessionPersistence } from "firebase/auth";

export default {
  data() {
    return {
      leaderboardData: null,
      show: false,
      email: null,
      password: null,
      user: null,
      fullName: null
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
    signOut() {
      auth.signOut().then(function() {
        console.log('Signed Out');
        this.checkAuth()
      }, function(error) {
        console.error('Sign Out Error', error);
      })
    },
    checkAuth() {
      const $vm = this
      auth.onAuthStateChanged((user) => {
        if (user) {
            $vm.user = user
        } else {
            $vm.user = null
        } 
      });
    },
    signInUser() {
      const $vm = this
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, this.email, this.password)        
            .then((userCredential) => {
              const user = userCredential.user;
              $vm.user = user
            })
            .catch((error) => {
              console.log(error.message)
            })
        })
    },
    createNewUser(){
      const $vm = this
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(data => {
          $vm.user = data.user
          updateProfile(auth.currentUser, {
            displayName: this.fullName
          })
        })
        .catch(function(error) {
          console.log(error.message);
        })
    },
    updateBoard () {
      getUsers(db).then((x) => {
        this.leaderboardData = x;
      })
    }
  },
  mounted () {
    this.checkAuth()
    setTimeout(() => {
      this.show = true
    }, 1000);
    getUsers(db).then((x) => {
      x.forEach(player => {
        player.record.record = player.record.record.sort(function(a, b) {
          if (a.player < b.player) return -1;
          if (a.player > b.player) return 1;
          return 0;
        });
        
      });
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