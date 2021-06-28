<template>
  <div id="container">
    <div id="content">
      <Header :title="$l('find.header')" />
      <v-expansion-panels
        flat
        hover
        focusable
        id="panels"
        v-for="i in 1"
        :key="i"
      >
        <Subjects ref="component" />
        <Languages ref="component" />
        <Price ref="component" />
        <Age ref="component" />
      </v-expansion-panels>
      <v-btn @click="refresh()" small text rounded id="refreshBtn">
        {{ $l("find.filters.refresh") }}
      </v-btn>
      <v-btn @click="request()" rounded outlined color="accent">
        {{ $l("find.request") }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Subjects from "@/components/sidepanel/Subjects";
import Languages from "@/components/sidepanel/Languages";
import Price from "@/components/sidepanel/Price";
import Age from "@/components/sidepanel/Age";

export default {
  permisions: {
    roles: "USER",
    redirect: "LogIn",
  },
  components: {
    Subjects,
    Languages,
    Price,
    Age,
    Header,
  },
  data() {
    return {
      checkInProgress: false,
    };
  },
  methods: {
    async isValid() {
      this.checkInProgress = true;
      var value = true;
      for (const e of this.$refs.component) {
        if (!e.$refs.base.isValid()) {
          value = false;
          await this.delay(100);
        }
      }
      if (!value) await this.delay(1100);
      this.checkInProgress = false;
      return value;
    },
    delay(time) {
      return new Promise((res) => setTimeout(res, time));
    },
    refresh() {
      this.$refs.component.forEach((e) => e.$refs.base.refresh());
    },
    async request() {
      if (this.checkInProgress) return;
      if (await this.isValid())
        this.$router.push({ name: "ChooseATutor", query: this.$route.query });
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  height: 100%;
  width: 100%;
  padding: calc(106px + 7rem) 1rem 7rem 1rem;
  background-color: var(--v-background-base);
}
#content {
  margin: auto;
  max-width: 350px;
  min-width: 250px;
  padding: 0 1rem;
  * {
    display: block;
    margin: auto;
  }
}
#panels {
  border-radius: 15px;
}
#refreshBtn {
  background-color: var(--v-background-base);
  color: var(--v-secondary-darken4);
  transition: background-color 600ms;
  opacity: 0.6;
  margin-top: 0.3rem;
  margin-bottom: 1rem;
  &:hover {
    background-color: var(--v-secondary-darken1);
  }
}
</style>
