<template>
  <div id="containerMain">
    <Subheader>
      <img
        @click="goToAboutTutor()"
        class="userImg"
        src="@/assets/icons/user.svg"
      />
      <h3>{{ tutor.name }}</h3>
    </Subheader>

    <v-row id="contentMain" class="ma-0 justify-center">
      <v-col
        class="pa-0 col-10 col-sm-9 col-md-7 col-lg-5 col-xl-4"
        id="backgroundCard"
      >
        <v-col
          id="buttonWrapper"
          class="col-10 col-sm-9 col-md-7 col-lg-5 col-xl-4"
        >
          <v-btn
            @click="bookALesson()"
            class="orangeBackground "
            small
            text
            ref="blablabla"
            id="bookButton"
          >
            <v-icon class="mr-1">mdi-handshake-outline</v-icon>
            {{ $l("tutor.btn") }}
          </v-btn>
        </v-col>

        <div id="contentWrapper">
          <div id="headerInfo">
            <v-row class="ma-0 mb-2 profile justify-center">
              <p>{{ tutor.location }}, {{ tutor.grade }}</p>
            </v-row>

            <v-row id="rating" class="ma-0 justify-center">
              <Rating :value="tutor.rating" />
            </v-row>

            <v-row
              class="ma-0 mt-2 mb-2 hoursAndPrice align-center justify-center"
            >
              <img
                width="20px"
                height="20px"
                class="mr-1"
                src="@/assets/icons/clock.svg"
              />
              <p>{{ tutor.hours }}{{ $l("tutor.hour") }}</p>
              <p class="ml-5">{{ tutor.pph }}&euro;/{{ $l("tutor.hour") }}</p>
            </v-row>
          </div>

          <v-row class="ma-0">
            <v-col id="moto"> <Moto /> </v-col
          ></v-row>

          <v-row class="ma-0" id="aboutRow">
            <v-col id="about">
              <h4>{{ $l("tutor.about") }}</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Temporibus nostrum a debitis aliquam quasi, accusamus
                accusantium iure odio molestias unde, autem harum placeat ad?
                Odio vel fugit porro doloribus doloremque? Lorem, ipsum dolor
                sit amet consectetur adipisicing elit. Ut, magnam.
              </p>
            </v-col>
          </v-row>

          <v-row id="additionalInfoRow" class="ma-0 justify-center">
            <v-col cols="10" id="additionalInfo">
              <v-row class="ma-0">
                <v-col class="col-12 col-sm-6" id="subjects">
                  <h4>{{ $l("tutor.subjects") }}</h4>
                  <p>Maths</p>
                  <p>Chemistry</p>
                  <p>Biology</p>
                </v-col>
                <v-col class="col-12 col-sm-6" id="languages">
                  <h4>{{ $l("tutor.languages") }}</h4>
                  <p>Estonian</p>
                  <p>Russian</p>
                  <p>English</p>
                </v-col>
                <v-col class="col-12 col-sm-6" id="audience">
                  <h4>{{ $l("tutor.audience") }}</h4>
                  <p>{{ $l("tutor.grades") }} 1 - 10</p>
                </v-col>
                <v-col class="col-12 col-sm-6" id="age">
                  <h4>{{ $l("tutor.age") }}</h4>
                  <p>17</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="ma-0" id="comments">
            <v-col>
              <h4>{{ $l("tutor.comments") }}</h4>
              <Comments />
            </v-col>
          </v-row>
          <div id="commentRow"></div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Moto from "@/components/Moto.vue";
import Comments from "@/components/Comments.vue";
import Rating from "@/components/tutorPanel/Rating.vue";
import Subheader from "@/components/Header.vue";

export default {
  name: "AboutTutor",
  path: "/about_the_tutor",
  permisions: {
    roles: "ALL",
  },
  components: {
    Moto,
    Comments,
    Rating,
    Subheader,
  },
  data() {
    return {
      windowTop: 0,
      tutor: {
        name: "No Name",
        pph: 5,
        location: "HTG",
        grade: "11b",
        hours: 10,
        rating: 4.5,
        comments: 11,
      },
    };
  },

  async mounted() {
    this.tutor.rating = Math.random() * 3 + 2;
  },
  created() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    bookALesson() {
      console.log(this.$refs.blablabla);
      this.$router.push({ name: "ChooseATutor" });
    },
  },
};
</script>

<style lang="scss" scoped>
#subheader {
  opacity: 1;

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #bookButton {
    margin: 0;
  }
  h3 {
    margin-left: 1rem;
  }
  img {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0;
  }
}

#backgroundCard {
  margin: calc(106px + 6rem) 0 6rem 0;
  height: max-content;
  border-radius: 15px;
  background: #ffffffaa;
}

h4 {
  margin-bottom: 1rem;
}

p {
  margin: 0;
}

#aboutRow {
  & #about p {
    text-align: justify;
  }
}

#additionalInfo {
  & * {
    padding: 0;
  }
  & p {
    margin-bottom: 0.4rem;
    &:last-child {
      margin-bottom: 3rem;
    }
  }
}

.userImg {
  width: 40px;
  height: 40px;

  border-radius: 50%;
  border: 2px solid var(--v-primary-base);
  opacity: 0.2;

  margin-right: 1rem;
}

.hoursAndPrice {
  opacity: 0.4;
  & img {
    opacity: 0.7;
  }
}

#containerMain * {
  padding: 0;
}

#contentWrapper {
  padding: 3rem;
}

#buttonWrapper {
  position: fixed;
  overflow: hidden;
  flex: 100%;
  transform: translateY(5rem);
  #bookButton {
    position: sticky;
    padding: 15px;
    left: 100%;
    transform: translateX(76%);

    border-radius: 15px 0 0 15px !important;

    transition: transform 600ms ease-in-out;
    &:hover {
      transform: translateX(0%);
    }
  }
}

#headerInfo {
  margin-bottom: 2rem;
}

#aboutRow,
#additionalInfoRow {
  padding: 2rem 0rem;
}
</style>
