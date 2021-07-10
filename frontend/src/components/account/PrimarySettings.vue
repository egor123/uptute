<template>
  <div id="wrapper">
    <img id="userImg" src="@/assets/icons/user.svg" alt="" />

    <div id="fullName">
      <TextField id="name" :label="$l('set_up.name')" />
      <TextField id="surname" :label="$l('set_up.surname')" />
    </div>

    <v-expansion-panels
      flat
      hover
      focusable
      id="panels"
      class="nameAndAge"
      v-for="i in 1"
      :key="i"
    >
      <Birth ref="component" />
      <Grade ref="component" />
    </v-expansion-panels>
  </div>
</template>

<script>
import TextField from "@/components/textInput/TextField.vue";
import Birth from "@/components/filterPanel/Birth.vue";
import Grade from "@/components/filterPanel/Grade.vue";

export default {
  components: {
    TextField,
    Birth,
    Grade,
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

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
}

#panels {
  border-radius: 15px;
}

#userImg {
  @include box-size(100px);

  border-radius: 50%;
  border: 2px solid var(--v-primary-base);
  opacity: 0.2;
  cursor: pointer;

  transition: box-shadow 400ms;
  &:hover {
    box-shadow: 1px 2px 5px 2.5px var(--v-primary-lighten4);
  }
}

::v-deep {
  .v-text-field {
    &#name {
      border-radius: 15px 15px 0 0;
    }
    &#surname {
      border-radius: 0 0 15px 15px;
    }
  }
}
</style>
