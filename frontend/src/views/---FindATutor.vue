<template>
  <div id="container">
    <coming-soon />
    <Subheader :title="$l('find.header')" />
    <Search />
    <v-dialog v-model="dialog" v-if="isMobileView()" max-width="300">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="accent" fab v-bind="attrs" v-on="on">
          <v-icon>mdi-wrench</v-icon>
        </v-btn>
      </template>
      <Sidepanel />
    </v-dialog>

    <div id="content">
      <!-- <Sidepanel class="sidepanel" v-if="!isMobileView()" /> -->
      <Panels :tutors="tutors" />
    </div>
    <PageSelectionPanel />
  </div>
</template>

<script>
import Subheader from "@/components/app/Subheader.vue";
import PageSelectionPanel from "@/components/navigation/PageSelectionPanel.vue";
import Search from "@/components/navigation/Search.vue";
import Panels from "@/components/choosing/choosingATutor/Panels";
// import Sidepanel from "@/components/filterPanel/filterPanel.vue";

export default {
  name: "FindATutorOld",
  path: "/find_a_tutor_old",
  permisions: {
    roles: "USER",
    redirect: "LogIn",
  },
  components: {
    Subheader,
    PageSelectionPanel,
    Panels,
    // Sidepanel,
    Search,
  },
  data: () => ({
    dialog: false,
    tutors: [
      {
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
    ],
  }),
  async mounted() {
    for (var i = 0; i < 5; i++) {
      this.tutors.push({ ...this.tutors[0] });
    }
    this.tutors.forEach((tutor) => {
      tutor.rating = Math.random() * 3 + 2;
    });
  },
  methods: {
    isMobileView() {
      return this.$vuetify.breakpoint.width < 850;
    },
  },
};
</script>

<style scoped lang="scss">
#container {
  background-color: var(--v-background-base);
}
#content {
  display: flex;
  padding: 10px var(--side-magin);
  .sidepanel {
    margin-left: 15px;
  }
}
</style>
