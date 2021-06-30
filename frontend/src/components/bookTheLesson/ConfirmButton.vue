<template>
  <v-dialog itemid="dialog" width="500" id="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn rounded outlined color="accent" v-bind="attrs" v-on="on">
        {{ $l("booking.button") }}
      </v-btn>
    </template>

    <v-card id="card">
      <v-card-title id="cardTitle" class="justify-center text-h5 background">
        Your lesson's link
      </v-card-title>

      <v-card-text id="cardText" class="pa-4">
        <a
          target="_blank"
          href="https://us04web.zoom.us/j/5839697402?pwd=T01CeDdOMGZHZVplOGdzK2ZieGpZdz09"
        >
          https://us04web.zoom.us/j/5839697402?pwd=T01CeDdOMGZHZVplOGdzK2ZieGpZdz09
        </a>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
#card {
  border-radius: 15px;
}
</style>
