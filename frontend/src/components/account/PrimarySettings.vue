<template>
  <div id="wrapper">
    <div>
      <label for="uploadImg">
        <img id="userImg" :src="img.imageUrl" alt="" />
      </label>
      <input
        type="file"
        accept="image/*"
        @change="addImg"
        name="uploadImg"
        id="uploadImg"
      />
    </div>
    <div id="fullName">
      <TextField id="name" :label="$l('set_up.name')" />
      <TextField id="surname" :label="$l('set_up.surname')" />
    </div>

    <v-expansion-panels
      flat
      id="panels"
      class="nameAndAge"
      v-for="i in 1"
      :key="i"
    >
      <Birth ref="component" />
      <Grade ref="component" />
    </v-expansion-panels>
  </div>
</template>

<script>
import TextField from "@/components/global/textInput/TextField.vue";
import Birth from "@/components/filterPanel/Birth.vue";
import Grade from "@/components/filterPanel/Grade.vue";

export default {
  components: {
    TextField,
    Birth,
    Grade,
  },
  data() {
    return {
      img: {
        name: "profile",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9tbe0h9I_HCaMS2lyCsdTRXmznpSg9Rn5iA&usqp=CAU",
      },
    };
  },
  methods: {
    addImg(e) {
      const file = e.target.files[0];

      this.img = {
        image: file,
        imageUrl: URL.createObjectURL(file),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

#wrapper {
  width: 25rem;
  @media (max-width: 450px) {
    width: 100%;
    padding: 0 1rem;
  }

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
}

#panels {
  border-radius: 15px;
}

#userImg {
  @include box-size(100px);

  border-radius: 50%;
  border: 2px solid var(--v-secondary-darken2);

  opacity: 0.99; // bug - input desn't allow to select with full opacity
  cursor: pointer;

  transition: box-shadow 400ms;
  &:hover {
    box-shadow: 1px 2px 8px 0px var(--v-card-darken2);
  }
}

::v-deep {
  .v-text-field {
    &#name {
      border-radius: 15px 15px 0 0;
    }
    &#surname {
      border-radius: 0 0 15px 15px;
    }
  }
}
</style>
