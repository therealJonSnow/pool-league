<template>
  <div class="grid grid-cols-5 grid-rows-1 items-center justify-items-center mb-1">
    <div>{{ user.name }}</div>
    <div>{{ user.record.played }}</div>
    <div>{{ user.record.win }}</div>
    <div>{{ user.record.loss }}</div>
    <div>{{ user.record.points }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    user: {
      type: Object
    }
  }
}
</script>

