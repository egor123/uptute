<template>
  <div id="wrapper">
    <label id="imgLabel">
      <img :src="img.imageUrl" alt="" />
      <input type="file" accept="image/*" @change="addImg" />
    </label>
    <FilterPanel ref="panel" @next="(action) => $refs.panel2[action]()">
      <TextField
        v-model="data.firstName"
        :counter="nameLength"
        :label="$l('set_up.name')"
        :rules="(v) => v.length > 0"
        :borderRadius="'15px 15px 0px 0px'"
        :flat="false"
        required
      />
      <TextField
        v-model="data.lastName"
        :counter="surnameLength"
        :label="$l('set_up.surname')"
        :rules="(v) => v.length > 0"
        :borderRadius="'0px 0px 15px 15px'"
        :flat="false"
        required
      />
    </FilterPanel>

    <FilterPanel ref="panel2">
      <ExpandableCalendar
        v-model="data.birthday"
        :label="$l('set_up.birth')"
        :text="data.birthday"
        :rules="(item) => item != null"
        borderRadius="15px"
        :flat="false"
      />
    </FilterPanel>
  </div>
</template>

<script>
import FilterPanel from "@/components/filterPanel/FilterPanel.vue";
import ExpandableCalendar from "@/components/filterPanel/ExpandableCalendar.vue";
import TextField from "@/components/filterPanel/TextField";

export default {
  components: {
    FilterPanel,
    ExpandableCalendar,
    TextField,
  },
  data() {
    return {
      img: {
        name: "profile",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9tbe0h9I_HCaMS2lyCsdTRXmznpSg9Rn5iA&usqp=CAU",
      },
      // birthday: null, //"2003-07-24"
      // grade: null, //12
      nameLength: 20,
      surnameLength: 20,
      nameMinLength: 3,
      surnameMinLength: 3,
      // nameRules: [
      //   (v) => !!v || this.$l("auth.rules.require"),
      //   (v) => (v || "").indexOf(" ") < 0 || this.$l("auth.no_spaces"),
      //   (v) =>
      //     (v && v.length >= this.nameMinLength) ||
      //     this.$l("auth.rules.name.length.min", {
      //       n: this.nameMinLength,
      //     }),
      //   (v) =>
      //     (v && v.length <= this.nameLength) ||
      //     this.$l("auth.rules.name.length.max", {
      //       n: this.nameLength,
      //     }),
      // ],
      // surnameRules: [
      //   (v) => !!v || this.$l("auth.rules.require"),
      //   (v) => (v || "").indexOf(" ") < 0 || this.$l("auth.no_spaces"),
      //   (v) =>
      //     (v && v.length >= this.surnameMinLength) ||
      //     this.$l("auth.rules.surname.length.min", {
      //       n: this.surnameMinLength,
      //     }),
      //   (v) =>
      //     (v && v.length <= this.surnameLength) ||
      //     this.$l("auth.rules.surname.length.max", {
      //       n: this.surenameLength,
      //     }),
      // ],
    };
  },
  methods: {
    addImg(e) {
      const file = e.target.files[0];

      this.img = {
        image: file,
        imageUrl: URL.createObjectURL(file),
      };
    },
    async isValid() {
      await this.$refs.panel.isValid();
    },
  },
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#wrapper {
  width: 25rem;
  @media (max-width: 450px) {
    width: 100%;
    padding: 0 1rem;
  }
  & > * {
    margin-bottom: 2rem;
  }
}
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
