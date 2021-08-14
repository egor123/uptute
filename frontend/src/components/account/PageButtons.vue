<template>
  <AccountSideButtons>
    <v-btn
      v-for="btn in buttons"
      :key="btn.index"
      :path="btn.path"
      class="pa-2"
      small
      text
      ref="button"
    >
      <v-icon class="mr-2">{{ btn.icon }}</v-icon>
      <p>{{ btn.label }}</p>
    </v-btn>
  </AccountSideButtons>
</template>

<script>
import AccountSideButtons from "@/components/account/AccountSideButtons.vue";

export default {
  components: {
    AccountSideButtons,
  },
  props: {
    buttons: Array,
  },
  mounted() {
    this.$refs.button.forEach((btn) => {
      const el = btn.$el;
      el.addEventListener("transitionend", (val) => {
        if (val.propertyName === "transform") btn.opened = this.isHover(el);
      });
      el.addEventListener("click", () => {
        let name = el.getAttribute("path");
        if (!this.$mb.isMobileInput() || btn.opened)
          this.$router.push({ name }).catch(() => {});
      });
    });
  },
  methods: {
    isHover(el) {
      return el.parentElement.querySelector(":hover") === el;
    },
  },
};
</script>

<style lang="scss" scoped>
$gap: 0.5rem;

.v-btn {
  margin-left: auto;
  margin-right: 0;
  border-radius: 15px 0 0 15px !important;
  border-right: none;
  padding: 0.3rem 0.5rem !important;
  height: fit-content !important;

  &:not(:hover) {
    transform: translateX(calc(100% - 2 * #{$gap} - 24px));
  }
}
</style>
