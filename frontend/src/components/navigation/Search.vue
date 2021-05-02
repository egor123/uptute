<template>
  <div>
    <br id="spacrer" />
    <div id="search">
      <v-text-field
        v-model="search"
        append-outer-icon="mdi-send"
        filled
        clear-icon="mdi-close-circle"
        clearable
        :label="$l('find.search')"
        type="text"
        @click:append-outer="sendMessage"
        @click:clear="clearMessage"
      />
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    search: "",
  }),
  methods: {
    sendMessage() {
      this.clearMessage();
    },
    clearMessage() {
      this.search = "";
    },
  },
};
</script>
<style scoped>
#container {
  width: 100%;
}
#search {
  margin: auto;
  margin-top: 40px;
  width: 30%;
  min-width: 300px;
  max-width: 700px;
}
</style>