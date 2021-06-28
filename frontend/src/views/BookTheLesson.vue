<template>
  <div id="containerMain">
    <Subheader :title="$l('booking.subheader')" />

    <v-row id="contentMain" class="ma-0 justify-center">
      <v-col
        class="pa-0 col-11 col-sm-9 col-md-6 col-lg-5 col-xl-3"
        id="backgroundCard"
      >
        <div id="contentWrapper">
          <div class=" ma-0 justify-center align-center d-flex flex-row">
            <img
              @click="goToAboutTutor()"
              class="userImg"
              src="@/assets/icons/user.svg"
            />

            <h3>{{ tutor.name }}</h3>
          </div>

          <div class="pa-0">
            <table>
              <tr>
                <th>{{ $l("find.filters.subject.h") }}</th>
                <td>Maths</td>
                <td></td>
              </tr>
              <tr>
                <th>{{ $l("find.filters.language.h") }}</th>
                <td>English</td>
                <td></td>
              </tr>
              <tr>
                <th>{{ $l("find.filters.price.h") }}</th>
                <td>60 UC / h</td>
                <td>
                  <v-tooltip content-class="priceTooltip" right>
                    <template v-slot:activator="{ on, attrs }">
                      <div id="priceQuestionMark" v-bind="attrs" v-on="on">
                        ?
                      </div>
                    </template>
                    <span>{{ $l("booking.tooltip") }} </span>
                  </v-tooltip>
                </td>
              </tr>
            </table>

            <v-btn rounded outlined color="accent">
              {{ $l("booking.button") }}
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Subheader from "@/components/Header.vue";

export default {
  name: "BookTheLesson",
  path: "/book_the_lesson",
  permisions: {
    roles: "ALL",
  },
  components: {
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
      },
    };
  },
};
</script>

<style lang="scss" scoped>
#backgroundCard {
  margin: calc(106px + 6rem) 0 6rem 0;
  height: max-content;
  border-radius: 15px;
  background: #ffffffaa;
}

#contentWrapper {
  padding: 3rem;
}

.userImg {
  width: 50px;
  height: 50px;
  margin-right: 1rem;

  border-radius: 50%;
  border: 2px solid var(--v-primary-base);
  opacity: 0.2;
}

table {
  width: 100%;
  margin: 3rem 0;
}

td,
th {
  padding-bottom: 10px;
  margin: 0;
  width: calc(100% / 3);
}

tr:last-child {
  td,
  th {
    padding: 0;
  }
}

th {
  color: var(--v-secondary-darken2);
  font-weight: normal;
  text-align: left;
}

td {
  text-align: center;
}

#priceQuestionMark {
  width: fit-content;

  color: var(--v-secondary-darken2);
  cursor: default;
  padding: 1rem;
  margin: -1rem -1rem -1rem auto;
}

.priceTooltip {
  margin-left: 2rem;
  margin-right: 2vw;
  min-width: 200px;
  max-width: 350px;
  color: var(--v-primary-base);
  background: var(--v-secondary-base);
  opacity: 0.4 !important;
  border-radius: 15px;
  @media (max-width: 950px) {
    opacity: 1 !important;
    background: var(--v-secondary-darken1);
  }
}
</style>
