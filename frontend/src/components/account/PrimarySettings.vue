<template>
  <div id="wrapper">
    <label id="imgLabel">
      <img :src="img.imageUrl" alt="" />
      <input type="file" accept="image/*" @change="addImg" />
    </label>
    <FilterPanel
      class="inputPanel"
      ref="panel"
      @next="(action) => $refs.panel2[action]()"
    >
      <TextField
        v-model="data.firstName"
        :counter="name.length"
        :label="$l('set_up.name')"
        :rules="(v) => ifPassesRules({ v, title: 'name' })"
        :borderRadius="'15px 15px 0px 0px'"
        :flat="false"
        :errMsg="name.errMsg"
        required
      />

      <TextField
        v-model="data.lastName"
        :counter="surname.length"
        :label="$l('set_up.surname')"
        :rules="(v) => ifPassesRules({ v, title: 'surname' })"
        :borderRadius="'0px 0px 15px 15px'"
        :flat="false"
        :errMsg="surname.errMsg"
        required
      />
    </FilterPanel>

    <FilterPanel class="inputPanel" ref="panel2">
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
      maxLength: 20,
      minLength: 3,
      name: {
        length: 0,
        errMsg: "",
      },
      surname: {
        length: 0,
        errMsg: "",
      },
    };
  },
  props: {
    data: {
      type: Object,
    },
  },
  methods: {
    addImg(e) {
      const file = e.target.files[0];

      this.img = {
        image: file,
        imageUrl: URL.createObjectURL(file),
      };
    },
    ifPassesRules({ v, title }) {
      const self = this;
      this[title].errMsg = "";

      const ifNotNull = (v) =>
        ruleBase({
          condition: !!v,
          pathEnd: `${title}.require`,
        });

      const ifNoSpaces = (v) =>
        ruleBase({
          condition: v.indexOf(" ") < 0,
          pathEnd: `no_spaces`,
        });

      const ifMoreThanMin = (v) =>
        ruleBase({
          condition: v.length >= this.minLength,
          pathEnd: `${title}.length.min`,
          lParams: {
            n: this.minLength,
          },
        });

      const ifLessThanMax = (v) =>
        ruleBase({
          condition: v.length <= this.maxLength,
          pathEnd: `${title}.length.max`,
          lParams: {
            n: this.maxLength,
          },
        });

      return (
        ifNotNull(v) && ifNoSpaces(v) && ifMoreThanMin(v) && ifLessThanMax(v)
      );

      function ruleBase({ condition, pathEnd, lParams }) {
        if (!condition)
          self[title].errMsg = self.$l(`auth.rules.${pathEnd}`, lParams || {});
        return condition;
      }
    },
    async isValid() {
      await this.$refs.panel.isValid();
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
