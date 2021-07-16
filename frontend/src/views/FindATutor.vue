<template>
  <Background :title="$l('find.header')">
    <div id="content">
      <v-expansion-panels flat id="panels" v-for="i in 1" :key="i">
        <Subjects ref="component" />
        <TextField
          :label="$l('find.filters.topic')"
          :rules="(val) => val != ''"
          propURL="topic"
          ref="component"
        />
        <TextField
          :label="$l('find.filters.details')"
          :rules="(val) => val != ''"
          :area="true"
          propURL="details"
          id="details"
          ref="component"
        />
        <PageViewer id="pageViewer" :imgs="imgs" :upload="true" />

        <Languages class="languages" ref="component" />
        <Age ref="component" />
        <Price ref="component" />
      </v-expansion-panels>
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

import Subjects from "@/components/filterPanel/Subjects";
import TextField from "@/components/filterPanel/TextField";

import PageViewer from "@/components/global/PageViewer.vue";

import Languages from "@/components/filterPanel/Languages";
import Price from "@/components/filterPanel/Price";
import Age from "@/components/filterPanel/Age";

export default {
  permisions: {
    roles: "USER",
    redirect: "LogIn",
  },
  components: {
    Background,

    // TextField,
    // Textarea,
    Subjects,
    TextField,
    PageViewer,

    Languages,
    Price,
    Age,
  },
  data() {
    return {
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
    async isValid() {
      this.checkInProgress = true;
      var value = true;
      for (const e of this.$refs.component) {
        if (!e.$refs.base.isValid()) {
          value = false;
          await this.delay(100);
        }
      }
      if (!value) await this.delay(1100);
      this.checkInProgress = false;
      return value;
    },
    delay(time) {
      return new Promise((res) => setTimeout(res, time));
    },
    refresh() {
      this.$refs.component.forEach((e) => e.$refs.base.refresh());
    },
    async request() {
      if (this.checkInProgress) return;
      if (await this.isValid()) this.showAlert = true;
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

#panels {
  border-radius: 15px;
  #topic {
    border-radius: 0;
  }
  #details {
    border-radius: 0 0 15px 15px;
  }
  #pageViewer {
    margin: 2rem 0 2rem 0;
  }
  .languages {
    border-radius: 15px 15px 0 0;
  }
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
