<template>
  <DialogCustom>
    <template v-slot:object>
      <v-btn rounded outlined color="accent">Join</v-btn>
    </template>

    <template v-slot:title> Room id </template>

    <template v-slot:text>
      <TextField
        v-model="roomId"
        label="Room id"
        :rules="() => true"
        :borderRadius="'15px 15px 15px 15px'"
        :flat="true"
        :errMsg="errMsg"
        required
      />
      <v-btn rounded outlined color="accent" class="mt-4" @click="emitJoin()"
        >Enter</v-btn
      >
    </template>
  </DialogCustom>
</template>

<script>
import TextField from "@/components/filterPanel/TextField.vue";
import DialogCustom from "@/components/global/Dialog.vue";
export default {
  data() {
    return {
      roomId: "",
      errMsg: "",
    };
  },
  components: {
    DialogCustom,
    TextField,
  },
  methods: {
    emitJoin() {
      this.$emit("join", this.roomId);
    },
  },
};
</script>
