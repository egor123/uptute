<template>
  <div id="container">
    <Header :title="$l('find.header')" />

    <div class="content">
      <div class="innerContent">
        <Sidepanel id="sidepanel" />
        <v-btn
          :to="{ name: 'ChooseATutor' }"
          rounded
          class="orangeBackground mt-3"
        >
          {{ $l("find.request") }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Sidepanel from "@/components/sidepanel/Sidepanel.vue";

export default {
  name: "FindATutor",
  path: "/find_a_tutor",
  permisions: {
    roles: "USER",
    redirect: "LogIn",
  },
  components: {
    Header,
    Sidepanel,
  },
};
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  height: 100%;
}

.content {
  display: flex;
  flex: 100%;
  background-color: var(--v-background-base);
  justify-content: center;
}

.innerContent {
  margin: 8rem 0;
  width: 350px;
  justify-content: center;
}

#sidepanel {
  position: static;
  margin: 0 auto;
  padding: 0;
}

@media (max-width: 320px) {
  .innerContent {
    transform: scale(0.9);
    margin: 4rem -0.8rem;
  }
}

@media (max-width: 280px) {
  .innerContent {
    transform: scale(0.8);
    margin: 2.5rem -1.7rem;
  }
}
</style>
