<template>
  <v-dialog itemid="dialog" width="500" id="dialog">
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot name="object" />
      </div>
    </template>

    <v-card id="card">
      <v-card-title id="cardTitle" class="justify-center text-h5 background">
        <slot name="title" />
      </v-card-title>

      <v-card-text id="cardText" class="pa-4">
        <slot name="text" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
#card {
  border-radius: 15px;
}
</style>
