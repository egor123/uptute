<template>
  <div id="containerMain">
    <Subheader>
      <v-row class="justify-center">
        <v-col class="pa-0 col-10 col-sm-9 col-md-7 col-lg-5 col-xl-4">
          <v-row id="subheader">
            <v-col class="pa-0 center">
              <img
                @click="goToAboutTutor()"
                class="userImg"
                src="@/assets/icons/user.svg"
              />
              <h3>{{ tutor.name }}</h3>
            </v-col>

            <v-col class="pa-0 center">
              <v-btn
                class="orangeBackground"
                small
                rounded
                text
                id="bookButton"
              >
                {{ $l("tutor.btn") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </Subheader>

    <v-row id="contentMain" class="ma-0 justify-center">
      <v-col
        class=" col-10 col-sm-9 col-md-7 col-lg-5 col-xl-4"
        id="backgroundCard"
      >
        <v-row class="ma-0" id="contentWrapper">
          <v-col>
            <v-btn class="orangeBackground" rounded text id="bookButton">
              {{ $l("tutor.btn") }}
            </v-btn>

            <div id="headerInfo">
              <v-row class="ma-0 mb-2 profile justify-center">
                <img
                  @click="goToAboutTutor()"
                  class="userImg"
                  src="@/assets/icons/user.svg"
                />
                <div>
                  <h3>{{ tutor.name }}</h3>
                  <p>{{ tutor.location }}, {{ tutor.grade }}</p>
                </div>
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
          </v-col>
        </v-row>
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
      tutor: {
        name: "No Name",
        pph: 5,
        location: "HTG",
        grade: "11b",
        hours: 10,
        rating: 4.5,
        comments: 11,
        days: [
          {
            times: [
              { start: "8:00", end: "12:30" },
              { start: "14:01", end: "15:30" },
              { start: "15:41", end: "23:00" },
            ],
            date: new Date(),
          },
          {
            times: [
              { start: "8:00", end: "12:30" },
              { start: "15:00", end: "22:00" },
            ],
            date: new Date(new Date().getTime() + 86400000),
          },
          {
            times: [{ start: "15:00", end: "24:00" }],
            date: new Date(new Date().getTime() + 86400000 * 2),
          },
          {
            times: [{ start: "15:00", end: "23:00" }],
            date: new Date(new Date().getTime() + 86400000 * 3),
          },
          {
            times: [{ start: "15:00", end: "23:00" }],
            date: new Date(new Date().getTime() + 86400000 * 4),
          },
          {
            date: new Date(new Date().getTime() + 86400000 * 5),
          },
          {
            times: [{ start: "10:00", end: "20:00" }],
            date: new Date(new Date().getTime() + 86400000 * 6),
          },
        ],
      },
    };
  },

  async mounted() {
    this.tutor.rating = Math.random() * 3 + 2;
  },
};
</script>

<style lang="scss" scoped>
#subheader {
  margin: 0.5rem 0;
  & .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & #bookButton {
    margin: 0;
  }
  & h3 {
    margin-left: 1rem;
  }
  & img {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0;
  }
}

#backgroundCard {
  margin: calc(106px + 6rem) 0 6rem 0;
  height: max-content;
  background: white;
  border-radius: 15px;
  opacity: 0.7;
}

h4 {
  margin-bottom: 1rem;
}

p {
  margin: 0;
}

#bookButton {
  padding: 15px;
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

.profile div {
  text-align: left;
}

.userImg {
  width: 50px;
  height: 50px;

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

#bookButton {
  margin-bottom: 2rem;
  padding: 0 1rem;
}

#headerInfo,
#aboutRow,
#additionalInfoRow {
  padding: 2rem 0rem;
}
</style>
