<template>
  <Background :title="$l('find.header')">
    <div id="wrapper">
      <Refresh @click="refresh()" class="refresh" />

      <FilterPanel>
        <Subject v-model="f.subject.value" :isError="f.subject.isError" />
        <Topic v-model="f.topic.value" :isError="f.topic.isError" />
        <Detail v-model="f.details.value" :isError="filters.details.isError" />
      </FilterPanel>

      <ImgInput v-model="f.imgs.value" class="imgInput" />

      <FilterPanel>
        <Languages v-model="f.languages.value" :isError="f.languages.isError" />
        <Age v-model="f.age.value" :isError="f.age.isError" />
        <Price v-model="f.price.value" :isError="f.price.isError" />
      </FilterPanel>

      <RequestButton @click="tryRequest()" class="requestBtn" />
    </div>
  </Background>
</template>

<script lang="ts">
import Background from "@/components/global/background/Background.vue";
import Refresh from "@/components/findATutor/Refresh.vue";

import FilterPanel from "@/components/filterPanel/FilterPanel.vue";

import Subject from "@/components/findATutor/Subject.vue";
import Topic from "@/components/findATutor/Topic.vue";
import Detail from "@/components/findATutor/Details.vue";

import ImgInput from "@/components/findATutor/ImgInput.vue";

import Languages from "@/components/findATutor/Languages.vue";
import Age from "@/components/findATutor/Age.vue";
import Price from "@/components/findATutor/Price.vue";

import RequestButton from "@/components/findATutor/RequestButton.vue";

import StudentLesson from "@/store/modules/lesson/student/module";
import { Filters } from "@/components/findATutor/classes/Filters";
import helper from "@/components/findATutor/helper";

import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "FindATutor",
  permisions: {
    roles: ["ROLE_STUDENT"],
    redirect: "LogIn",
  },
  components: {
    Background,
    Refresh,

    FilterPanel,

    Subject,
    Topic,
    Detail,

    ImgInput,

    Languages,
    Age,
    Price,

    RequestButton,
  },
})
export default class FindATutor extends Vue {
  filters = new Filters();

  get f(): Filters {
    return this.filters;
  }

  refresh(): void {
    for (const filter of Object.values(this.filters))
      filter.value = filter.default;
  }

  async tryRequest(): Promise<void> {
    const sendLessonRequest = async () => {
      const info = helper.getInfo(this.filters);
      const bool = await StudentLesson.openRequest(info);
      if (bool) this.$router.push({ name: "ChooseATutor" });
    };

    if (!(await this.isValid())) return;
    if (!(await this.$pop.confirm(this.$l("find.sure")))) return;

    sendLessonRequest();
  }

  async isValid(): Promise<boolean> {
    const filtersArr = Object.values(this.filters);
    const isValid = filtersArr.every((f) => f.rules(f.value));

    if (isValid) {
      helper.clearErrorStyles(filtersArr);
      return true;
    } else {
      await helper.animateErrors(filtersArr);
      return false;
    }
  }

  onKeyPressed(e: KeyboardEvent) {
    if (e.key === "Enter") this.tryRequest();
  }
  mounted() {
    addEventListener("keypress", this.onKeyPressed);
  }
  beforeDestroy() {
    removeEventListener("keypress", this.onKeyPressed);
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.refresh {
  margin-bottom: 0.5rem;
  margin-left: auto;
}

#wrapper {
  @include flexbox(column);
  max-width: 350px;
  min-width: 250px;
  height: max-content;
  margin: calc(106px + 6rem) 1rem 6rem 1rem;
}
.imgInput {
  margin: 2rem 0 2rem 0;
}
.requestBtn {
  margin-top: 48px;
}
</style>
