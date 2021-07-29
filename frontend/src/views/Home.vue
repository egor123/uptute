<template>
  <div id="container">
    <!-- <div class="img">
      <div class="img-container">
        <div class="img-blur">
          <div class="img-content">
            <h1>{{ $l("home.landing.title") }}</h1>
            <h2>{{ $l("home.landing.subtitle") }}</h2>
          </div>
        </div>
      </div>
    </div> -->

    <div id="hero">
      <div id="heroWrapper" class="boxShadow">
        <div class="iframeWrapper">
          <iframe
            src="https://player.vimeo.com/video/20924263?muted=1&autoplay=1&loop=1&sidedock=0&color=ffa500"
            frameborder="0"
            allow="autoplay"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
          ></iframe>
        </div>
        <div id="heroText" ref="container">
          <div id="beginWrapper">
            <Begin
              color="var(--v-background-base)"
              textColor="var(--v-secondary-darken3)"
              borderRadius="15px"
              border="dashed 2px var(--v-accent-base)"
            />
          </div>
        </div>
      </div>
    </div>

    <SliderLayout
      :title="$l('home.mission.title')"
      :elements="[
        {
          img: 'happiness',
          txt: $l('home.mission.list.0'),
        },
        {
          img: 'heart',
          txt: $l('home.mission.list.1'),
        },
        {
          img: 'coins',
          txt: $l('home.mission.list.2'),
        },
      ]"
    />
    <HowItWorks />
    <WhyUpTute />
  </div>
</template>

<script>
import WhyUpTute from "@/components/global/layouts/WhyUpTute.vue";
import HowItWorks from "@/components/global/layouts/HowItWorks.vue";
import SliderLayout from "@/components/global/layouts/SliderLayout.vue";
import Begin from "@/components/global/Begin.vue";

export default {
  name: "Home",
  path: "/",
  permissons: {
    roles: "ALL",
    redirect: "Home",
  },
  components: {
    WhyUpTute,
    HowItWorks,
    SliderLayout,
    Begin,
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/mixins.scss";

#container {
  overflow: hidden;
}

h1 {
  color: var(--v-primary-base);
}

#hero {
  position: relative;
  background: var(--v-background-base);
  top: 0;
  width: 100vw;
  height: 100vh;
  @include flexbox();
  #heroWrapper {
    border-radius: 15px;
    padding: 1rem;

    .iframeWrapper {
      @include box-size(fit-content);
      border-radius: 15px;
      overflow: hidden;

      iframe {
        --videoWidth: calc(55vh * 16 / 9);
        @media (max-width: "1000px") {
          --videoWidth: 85vw;
        }

        width: var(--videoWidth);
        height: calc(var(--videoWidth) / 16 * 9);
        margin-bottom: -7px;
      }
    }
    #heroText {
      padding: 3rem 0 2rem 0;
      @include flexbox();

      #beginWrapper {
        width: max-content;
      }
    }
  }
}

// .img {
//   background-image: url("../assets/images/home.jpg");
//   height: 100vh;
//   width: 100vw;
//   background-attachment: fixed;
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: 41%;
//   position: relative;
// }
// .img-container {
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   clip: rect(0, auto, auto, 0);
// }
// .img-blur {
//   top: 5%;
//   position: sticky;
//   max-width: fit-content;
//   float: right;
//   margin: 20px var(--side-margin);
// }
// @media (min-width: 700px) {
//   .img-content h2,
//   .img-content h1 {
//     text-align: center;
//   }
// }
// .img-content::before {
//   position: absolute;
//   content: "";

//   $size: calc(100% + 2 * var(--side-margin));
//   width: $size;
//   height: $size;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   z-index: -1;
//   mask: rgba(0, 0, 0, 1);
//   mask: radial-gradient(
//     closest-side,
//     rgba(0, 0, 0, 1) max(40%, 130px),
//     rgba(0, 0, 0, 0) 100%
//   );
//   backdrop-filter: blur(5px);
//   background-color: rgba($color: #fff, $alpha: 0.4);
// }
</style>
