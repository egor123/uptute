<template>
  <div>
    <div class="img">
      <div class="img-container">
        <div class="img-blur">
          <div class="img-content">
            <h1>{{ $l("home.landing.title") }}</h1>
            <h2>{{ $l("home.landing.subtitle") }}</h2>
            <v-btn
              elevation="3"
              rounded
              class="btn orangeBackground"
              :to="{ name: 'FindATutor' }"
            >
              {{ $l("home.landing.btn_find") }}
            </v-btn>
            <v-btn
              outlined
              elevation="3"
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
    redirect: "Home",
  },
  components: {
    CheckerLayout,
    SliderLayout,
  },
};
</script>

<style scoped lang="scss">
.img {
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
@media (min-width: 700px) {
  .img-content h2,
  .img-content h1 {
    text-align: center;
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
  margin: 10px 5px;
  background-color: transparent;
  color: var(--v-secondary-base);
}
</style>
