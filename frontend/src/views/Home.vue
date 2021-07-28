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
            src="https://player.vimeo.com/video/20924263?muted=1&autoplay=1&loop=1&controls=1"
            frameborder="0"
            allow="autoplay"
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
    <Checker-layout
      inversed
      color="background"
      :title="$l('home.how_it_works.title')"
      :rows="[
        {
          img: 'start',
          title: $l('home.how_it_works.list.0.h'),
          txt: $l('home.how_it_works.list.0.p'),
        },
        {
          img: 'choosing',
          title: $l('home.how_it_works.list.1.h'),
          txt: $l('home.how_it_works.list.1.p'),
        },
        {
          img: 'calendar',
          title: $l('home.how_it_works.list.2.h'),
          txt: $l('home.how_it_works.list.2.p'),
        },
        {
          img: 'notebook',
          title: $l('home.how_it_works.list.3.h'),
          txt: $l('home.how_it_works.list.3.p'),
        },
        {
          img: 'rating',
          title: $l('home.how_it_works.list.4.h'),
          txt: $l('home.how_it_works.list.4.p'),
        },
      ]"
    />

    <CheckerLayout
      inversed
      color="header"
      :title="$l('why_us.student.title')"
      :rows="[
        {
          img: 'piggy-bank',
          title: $l('why_us.student.list.0.h'),
          txt: $l('why_us.student.list.0.p'),
        },
        {
          img: 'save-time',
          title: $l('why_us.student.list.1.h'),
          txt: $l('why_us.student.list.1.p'),
        },
        {
          img: 'fast',
          title: $l('why_us.student.list.2.h'),
          txt: $l('why_us.student.list.2.p'),
        },
        {
          img: 'friend',
          title: $l('why_us.student.list.3.h'),
          txt: $l('why_us.student.list.3.p'),
        },
        {
          img: 'laugh',
          title: $l('why_us.student.list.4.h'),
          txt: $l('why_us.student.list.4.p'),
        },
        {
          img: 'house',
          title: $l('why_us.student.list.5.h'),
          txt: $l('why_us.student.list.5.p'),
        },
      ]"
    />
    <CheckerLayout
      color="background"
      :title="$l('why_us.tutor.title')"
      :rows="[
        {
          img: 'skills',
          title: $l('why_us.tutor.list.0.h'),
          txt: $l('why_us.tutor.list.0.p'),
        },
        {
          img: 'goal',
          title: $l('why_us.tutor.list.1.h'),
          txt: $l('why_us.tutor.list.1.p'),
        },
        {
          img: 'profits',
          title: $l('why_us.tutor.list.2.h'),
          txt: $l('why_us.tutor.list.2.p'),
        },
        {
          img: 'money-bag',
          title: $l('why_us.tutor.list.3.h'),
          txt: $l('why_us.tutor.list.3.p'),
        },
        {
          img: 'time-management',
          title: $l('why_us.tutor.list.4.h'),
          txt: $l('why_us.tutor.list.4.p'),
        },
        {
          img: 'save-time',
          title: $l('why_us.tutor.list.5.h'),
          txt: $l('why_us.tutor.list.5.p'),
        },
        {
          img: 'house',
          title: $l('why_us.tutor.list.6.h'),
          txt: $l('why_us.tutor.list.6.p'),
        },
      ]"
    />
  </div>
</template>

<script>
import CheckerLayout from "@/components/global/layouts/CheckerLayout.vue";
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
    CheckerLayout,
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

#hero {
  position: relative;
  background: var(--v-background-base);
  top: 0;
  width: 100vw;
  height: 100vh;
  @include flexbox();
  #heroWrapper {
    // @include flexbox();
    border-radius: 15px;
    padding: 1rem;

    .iframeWrapper {
      @include box-size(fit-content);
      // background: green;
      border-radius: 15px;
      overflow: hidden;

      iframe {
        width: 54rem;
        height: 30.45rem;
        // width: 100vw;
        // height: 100vh;
        margin-bottom: -7px;
      }
    }
    #heroText {
      // padding: 0 1rem 0 2rem;
      padding: 3rem 0 2rem 0;
      @include flexbox();

      #beginWrapper {
        // border-radius: 15px 15px 0 0;
        width: max-content;
      }
    }
  }
}

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

// #begin {
//   // height: 100%;
//   width: max-content;
//   // @include flexbox();
//   padding: 0 1rem;
//   color: var(--v-accent-base) !important;
//   font-weight: 500;
//   text-transform: uppercase;
//   // background: red;
//   // text-align: center;
//   letter-spacing: 3px;
//   border-radius: 30px;
// }
</style>
