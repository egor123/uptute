<template>
  <Background :title="$l('find.header')">
    <div id="content">
      <FilterPanel
        ref="panel"
        @next="(action) => $refs.panel2[action]()"
      >
        <ExpandableListSelector
          v-model="subject"
          :label="$l('find.filters.subject.h')"
          :text="$l('data.subjects.' + subject)"
          :list="['MATH', 'BIOL', 'ESL', 'PHYS', 'GEOG', 'CHEM', 'CIS']"
          :convertor="(item) => $l('data.subjects.' + item)"
          :searchLabel="$l('find.filters.subject.search')"
          :rules="(item) => item != null"
        />
        <TextField
          v-model="topic"
          :label="$l('find.filters.topic')"
          :rules="(val) => val != '' && val != null"
        />
        <TextField
          v-model="details"
          :label="$l('find.filters.details')"
          :rules="(val) => val != '' && val != null"
          :area="true"
        />
      </FilterPanel>

      <PageViewer id="pageViewer" :imgs="imgs" :upload="true" />

      <FilterPanel ref="panel2">
        <ExpandableListSelector
          v-model="languages"
          :label="$l('find.filters.language.h')"
          :text="languages.map((l) => $l('data.languages.' + l)).join(', ')"
          :list="['EN', 'EST', 'RU']"
          :convertor="(item) => $l('data.languages.' + item)"
          :multiple="true"
          :rules="(item) => item.length > 0"
        />
        <ExpandableSlider
          v-model="age"
          :label="$l('find.filters.tutor_age.h')"
          :text="age.join(' - ')"
          :min="14"
          :max="21"
        />
        <ExpandableSlider
          v-model="price"
          :label="$l('find.filters.price.h')"
          :text="`${price[0]} - ${price[1]} UC/${$l('find.filters.price.p')}`"
          :min="0"
          :max="150"
        />
      </FilterPanel>
      <v-btn @click="refresh()" small text rounded id="refreshBtn">
        {{ $l("find.filters.refresh") }}
      </v-btn>
      <v-btn @click="request()" rounded outlined color="accent">
        {{ $l("find.request") }}
      </v-btn>
    </div>

    <v-snackbar max-width="800" color="accent" timeout="-1" v-model="showAlert">
      {{ $l("find.sure") }}
      <div id="snackButtons">
        <v-btn :to="{ name: 'ChooseATutor' }" text>
          {{ $l("find.begin") }}
        </v-btn>
        <v-btn @click="showAlert = false" text>
          {{ $l("find.cancel") }}
        </v-btn>
      </div>
    </v-snackbar>
  </Background>
</template>

<script>
import Background from "@/components/global/background/Background.vue";

import FilterPanel from "@/components/filterPanel/FilterPanel.vue";
import ExpandableListSelector from "@/components/filterPanel/ExpandableListSelector.vue";
import ExpandableSlider from "@/components/filterPanel/ExpandableSlider.vue";
import TextField from "@/components/filterPanel/TextField";

import PageViewer from "@/components/global/PageViewer.vue";

export default {
  permisions: {
    roles: "USER",
    redirect: "LogIn",
  },
  components: {
    Background,
    FilterPanel,
    ExpandableListSelector,
    ExpandableSlider,
    TextField,
    PageViewer,
  },
  data() {
    return {
      subject: "Math", // null
      topic: "123", // ""
      details: "123", // ""
      languages: ["EN"], // []

      age: [16, 18],
      price: [0, 150],

      checkInProgress: false,
      showAlert: false,
      imgs: [
        {
          name: "physics1.jpg",
          imageUrl:
            "https://d2vlcm61l7u1fs.cloudfront.net/media%2F8d1%2F8d1789e9-0fb5-467e-906c-7998be55dcf4%2Fphp2hhv2V.png",
        },
        {
          name: "physics2.jpg",
          imageUrl:
            "https://slideplayer.com/slide/6196941/18/images/22/Relationships+in+this+problem%3A.jpg",
        },
        {
          name: "physics3.jpg",
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROzKLzwCiWjKi4IIQVFeOvHoy2lW0ivmxVzA&usqp=CAU",
        },
      ],
    };
  },
  methods: {
    refresh() {
      this.$refs.panel.refresh();
    },
    async request() {
      if (this.checkInProgress) return;
      if (await this.$refs.panel.isValid()) this.showAlert = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

::v-deep .v-snack__wrapper {
  border-radius: 15px !important;
  .v-snack__content {
    @include flexbox(column);
  }
  #snackButtons .v-btn {
    border-radius: 15px !important;
    margin: 0.5rem 0.5rem 0 0.5rem;
  }
}

#content {
  @include flexbox(column);
  max-width: 350px;
  min-width: 250px;
  height: max-content;
  margin: calc(106px + 6rem) 1rem 6rem 1rem;
}
#pageViewer {
  margin: 2rem 0 2rem 0;
}
#refreshBtn {
  background-color: var(--v-background-base);
  color: var(--v-secondary-darken4);
  opacity: 0.6;
  margin-top: 0.3rem;
  margin-bottom: 1rem;
  transform: scale(0.9);

  transition: background-color 600ms;
  &:hover {
    background-color: var(--v-secondary-darken1);
  }
}
</style>
