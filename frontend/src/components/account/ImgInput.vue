<template>
  <label id="imgLabel">
    <img :src="input" alt="" />
    <input type="file" accept="image/*" @change="addImg" />
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class component_name extends Vue {
  @Prop(String) readonly value!: string;

  input: string = "";

  mounted() {
    this.input = this.value;
  }

  addImg(e: InputEvent & { target: { files: FileList } }) {
    if (e.target != null) this.input = URL.createObjectURL(e.target.files[0]);
  }

  @Watch("value")
  onValueChanged(val: string) {
    if (this.input != val) this.input = val;
  }
  @Watch("input")
  onInputChanged(input: string) {
    this.$emit("input", input);
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

#imgLabel {
  @include flexbox;
  input {
    display: none;
  }
  img {
    @include box-size(100px);
    border-radius: 50%;
    opacity: 0.99; // bug - input desn't allow to select with full opacity

    @include box-shadow();
    // border: 2px solid var(--v-secondary-darken2);
    cursor: pointer;

    transition: box-shadow 400ms;
    &:hover {
      box-shadow: 1px 2px 8px 0px var(--v-card-darken2);
    }
  }
}
</style>
