<template>
  <AccountBase :title="$l('set_up.subheader')">
    <PrimarySettings />

    <div class="checkbox">
      <v-checkbox
        class="checboxBox"
        v-model="checkbox"
        color="accent"
        :rules="[(v) => !!v || '']"
        required
      ></v-checkbox>
      <p>
        {{ $l("auth.privacy", { terms: "", privacy: "test" }) }}
        <router-link :to="{ name: 'PrivacyPolicy' }">
          {{ $l("app.pages.privacy_policy") }}
        </router-link>
        {{ $l("app.pages.and") }}
        <router-link :to="{ name: 'TermsOfUse' }"
          >{{ $l("app.pages.with_terms") }}
        </router-link>
      </p>
    </div>

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
  data() {
    return {
      checkbox: false,
    };
  },
  methods: {
    routerPush(to) {
      this.$router.push({ name: to });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

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
::v-deep {
  // #container {
  //   padding: 0 1rem !important;
  // }
  .checkbox {
    margin-top: 3rem;
    // max-width: 400px;
    @include flexbox();

    .checboxBox {
      height: max-content;
      margin: auto 0;
      padding-top: 0;
      .v-input__slot {
        margin-bottom: 0 !important;
      }
      .v-messages {
        display: none !important;
      }
    }
    p {
      // margin-left: 2rem;
      height: max-content;
      text-align: left;
      margin-bottom: 0;
      position: relative;
      color: var(--v-primary-lighten3);
      font-size: 0.9rem;
    }
  }
}
</style>
