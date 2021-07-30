<template>
  <div class="hiddenButtonCard">
    <slot name="static" />
    <div class="moving">
      <slot name="moving" />
    </div>
    <slot name="activator" />
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

::v-deep {
  &.hiddenButtonCard {
    cursor: auto;
    display: flex;
    flex-direction: column;
    background: var(--v-card-base);
    @include box-shadow();

    animation: slideInFromLeft 0.6s ease-in-out;

    border-radius: 15px;
    margin: 15px auto;
    padding: 15px;

    @keyframes slideInFromLeft {
      from {
        transform: translateX(-4rem);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .moving {
      margin: 76px 0 -36px 0;
    }

    .button {
      opacity: 0;

      &:hover {
        opacity: 1 !important;
      }
    }

    &:not(:hover) {
      .moving {
        transition: all 500ms ease 200ms;
      }
      .button {
        transition: opacity 500ms ease 0ms;
      }
    }

    &:hover {
      .moving {
        transform: translateY(-56px);
        transition: all 600ms ease 0ms;
      }
      .button {
        opacity: 1;
        transition: opacity 800ms ease 100ms;
      }
    }
  }
}
</style>
