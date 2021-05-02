<template>
  <div>
    <div class="img">
      <div class="img-container">
        <!-- <div class="candle-container">
          <div class="candle-flame-wrapper">
            <div class="candle-flame" style="--scale: 70px; --color: red;"/>
            <div class="candle-flame" style="--scale: 55px; --color: orange;"/>
            <div class="candle-flame" style="--scale: 45px; --color: gold;"/>
            <div class="candle-flame" style="--scale: 35px; --color: white;"/>
          </div>
          <div class="candle-body"/>
        </div> -->
        <div class="img-blur">
          <div class="img-content">
            <h1>{{ $l("home.landing.title") }}</h1>
            <h2>{{ $l("home.landing.subtitle") }}</h2>
            <v-btn
              elevation="2"
              rounded
              color="accent"
              class="btn"
              :to="{ name: 'FindATutor' }"
            >
              {{ $l("home.landing.btn_find") }}
            </v-btn>
            <v-btn
              outlined
              elevation="2"
              rounded
              color="primary"
              class="btn"
              :to="{ name: 'Register' }"
            >
              {{ $l("home.landing.btn_become") }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <sliderLayout
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
    <checker-layout
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
  </div>
</template>

<script>
import CheckerLayout from "@/components/checkerLayout/CheckerLayout.vue";
import SliderLayout from "@/components/checkerLayout/SliderLayout.vue";
export default {
  name: "Home",
  path: "/",
  permissons: {
    roles: "ALL",
    redirect: "Home"
  },
  test: '',
  components: {
    CheckerLayout,
    SliderLayout,
  },
};
</script>

<style scoped lang="scss">
.img {
  margin-top: -56px;
  background-image: url("../assets/images/home.jpg");
  height: 100vh;
  width: 100vw;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 41%;
  position: relative;
}
.img-container {
  position: absolute;
  width: 100%;
  height: 100%;
  clip: rect(0, auto, auto, 0);
}
.img-blur {
  top: 40%;
  position: sticky;
  max-width: fit-content;
  float: right;
  margin: 20px var(--side-margin);
}
@media (min-width: 500px) {
  .img-content h2,
  .img-content h1 {
    text-align: start;
  }
}
.img-content::before {
  position: absolute;
  content: "";

  $size: calc(100% + 2 * var(--side-margin));
  width: $size;
  height: $size;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  mask: rgba(0, 0, 0, 1);
  mask: radial-gradient(
    closest-side,
    rgba(0, 0, 0, 1) max(40%, 130px),
    rgba(0, 0, 0, 0) 100%
  );
  backdrop-filter: blur(5px);
}

.btn {
  text-transform: none;
  margin: 5px;
  background-color: transparent;
  color: var(--v-secondary-base);
}
/* .candle-container {
  --height: 80%;
  --scale: 2;
  position: absolute;
  left: 10%;
  bottom: 0;
  width: 100px;
  height: calc(var(--height) / var(--scale));
  background: green;
  transform: translateY(calc(var(--height) / var(--scale) / -2)) scale(var(--scale));
}

.candle-flame-wrapper {
  position: sticky;
  top: 150px;
  width: 100px;
  height: 100px;
  animation: fire 10ms ease-in-out infinite;
  display: flex;
  justify-content: center;
}
.candle-flame {
  position: absolute;
  width: var(--scale);
  height: var(--scale);
  background: var(--color);
  box-shadow: 0px 0px 9px 4px var(--color);
  border-radius: 50% 0% 50% 50%;
  transform: translateY(calc(90px - 95%)) scaleX(.8) rotate(-45deg);
}
@keyframes fire {
  0% {transform: rotate(-1deg);}
  20% {transform: rotate(3deg) scaleY(1.1);}
  80% {transform: rotate(-3deg) scaleY(0.9);}
  100% {transform: rotate(-1deg);}
} */
</style>
