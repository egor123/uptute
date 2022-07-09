<template>
  <DialogCustom ref="dialog">
    <template v-slot:title> How was your lesson? </template>
    <template v-slot:text>
      <Rating id="rating" valueProp="5" :choosable="true" />
      <TextField
        id="textField"
        :label="$l('lesson.feedback.comment')"
        :area="true"
        :flat="false"
      />
      <v-btn rounded outlined color="accent">Send</v-btn>
    </template>
  </DialogCustom>
</template>

<script>
import DialogCustom from "@/components/global/Dialog.vue";
import Rating from "@/components/choosing/choosingATutor/Rating.vue";
import TextField from "@/components/filterPanel/TextField.vue";

export default {
  components: {
    DialogCustom,
    Rating,
    TextField,
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.userImg {
  width: 100px;
  height: 100px;
  background: red;
}

#rating {
  transform: scale(1.2);
}

#textField {
  margin: 1rem 0 2rem 0;
}
</style>
