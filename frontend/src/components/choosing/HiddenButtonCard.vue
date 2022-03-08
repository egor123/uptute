<template>
  <div id="wrapper">
    <div class="hiddenButtonCard">
      <slot name="static" />
      <div class="moving">
        <slot name="moving" />
      </div>
      <slot name="activator" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";
::v-deep {
  &#wrapper {
    padding: 10px 0;
    background: #ffffff00 !important;
    .hiddenButtonCard {
      position: relative;
      cursor: auto;
      display: flex;
      flex-direction: column;
      background: var(--v-card-base);
      @include box-shadow();

      border-radius: 15px;
      padding: 15px;

      @include from-left();

      .moving {
        margin: 76px 0 -36px 0;
      }

      .button {
        opacity: 0;
        pointer-events: none;

        &:hover {
          opacity: 1 !important;
          pointer-events: all;
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
}
</style>
