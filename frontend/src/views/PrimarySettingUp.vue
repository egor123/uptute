<template>
  <AccountBase :title="$l('set_up.subheader')">
    <PrimarySettings />

    <div id="buttons">
      <v-btn
        @click="routerPush('FindATutor')"
        id="student"
        rounded
        outlined
        color="accent"
      >
        {{ $l("set_up.as_student") }}
      </v-btn>
      <v-btn
        @click="routerPush('SecondarySettingUp')"
        id="tutor"
        rounded
        outlined
        color="accent"
      >
        {{ $l("set_up.as_tutor") }}</v-btn
      >
    </div>
  </AccountBase>
</template>

<script>
import PrimarySettings from "@/components/account/PrimarySettings.vue";
import AccountBase from "@/components/account/AccountBase.vue";

export default {
  permisions: {
    roles: "ALL",
  },
  components: {
    PrimarySettings,
    AccountBase,
  },
  methods: {
    routerPush(to) {
      this.$router.push({ name: to });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  #buttonWrapper {
    display: none;
  }
}

#buttons {
  display: flex;
  margin-top: 3rem;
  #student {
    border-radius: 15px 0 0 15px;
    border-right: 0px;
  }
  #tutor {
    border-radius: 0 15px 15px 0;
    border-left: 1px dashed var(--v-accent-base);
  }
}
</style>
