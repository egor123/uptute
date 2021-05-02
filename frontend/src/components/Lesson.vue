<template>
  <div id="container">
    <v-hover id="card" v-for="lesson in lessons" :key="lesson.id">
      <v-sheet>
        <h2>{{ lesson.subject }}</h2>
        <p>id:{{ lesson.id }}</p>
        <p>{{ lesson.description }}</p>
        <router-link :to="{ path: '/lessons/' + lesson.id }">
          registration
        </router-link>
      </v-sheet>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    lessons: {},
  },
};
</script>

<style scoped>
#container {
  width: 70%;
  float: right;
}
#card {
  border: 1px solid black;
  background-color: white;
  margin: 5px;
  border-radius: 5px;
  margin-top: 5px;
  text-align: left;
}
</style>