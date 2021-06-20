<template>
  <div id="container">
    <Header :title="$l('find.header')" />

    <div class="content">
      <div class="innerContent">
        <div v-if="!chosen">
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
  margin: 15vh 0;
  width: 350px; //!!!!! should be changed
}

#sidepanel {
  position: static;
}
</style>
