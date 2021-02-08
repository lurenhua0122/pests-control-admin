<template>
  <div class="dashboard-container">
    <div class="dashboard-text">nickname: {{ nickname }}   mobile: {{ mobile }}   sex: {{ sex }}   name: {{ name }}   id: {{ id }}   age: {{ age }}    avatar: {{ avatar }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'nickname',
      'id',
      'name',
      'sex',
      'age',
      'avatar',
      'mobile'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
