<template>
  <Background :title="$l('find.header')">
    <div id="wrapper">
      <Refresh @click="refresh()" class="refresh" />

      <FilterPanel>
        <Subject v-model="f.subject.value" :isError="f.subject.isError" />
        <Topic v-model="f.topic.value" :isError="f.topic.isError" />
        <Detail v-model="f.details.value" :isError="f.details.isError" />
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

import { Filters } from "@/components/findATutor/classes/Filters";
import helper from "@/components/findATutor/helper";

import { Vue, Component, Watch } from "vue-property-decorator";
import { isValid } from "@/utility/validate";
import { ValidatableField } from "@/types";

@Component({
  name: "FindATutor",
  // permisions: {
  //   roles: ["ROLE_STUDENT"],
  //   redirect: "LogIn",
  // },
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
  private filters = new Filters();

  public get f(): Filters {
    return this.filters;
  }
  private get filtersArr(): ValidatableField<unknown>[] {
    return Object.values(this.filters);
  }

  public refresh(): void {
    for (const filter of this.filtersArr) filter.value = filter.default;
  }

  public async tryRequest(): Promise<void> {
    if (!(await isValid(this.filtersArr))) return;
    if (!(await this.$pop.confirm(this.$l("find.sure")))) return;

    const bool = await helper.postLessonRequest(this.filters);

    if (bool) this.$router.push({ name: "ChooseATutor" });
  }

  private onKeyPressed(e: KeyboardEvent): void {
    if (e.key === "Enter") this.tryRequest();
  }
  mounted() {
    addEventListener("keypress", this.onKeyPressed);
  }
  beforeDestroy() {
    removeEventListener("keypress", this.onKeyPressed);
  }

  @Watch("f.subject.value") onSubject = () => isValid(this.filters.subject);
  @Watch("f.topic.value") onTopic = () => isValid(this.filters.topic);
  @Watch("f.details.value") onDetails = () => isValid(this.filters.details);
  @Watch("f.imgs.value") onImgs = () => isValid(this.filters.imgs);
  @Watch("f.languages.value") onLang = () => isValid(this.filters.languages);
  @Watch("f.age.value") onAge = () => isValid(this.filters.age);
  @Watch("f.price.value") onPrice = () => isValid(this.filters.price);
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
