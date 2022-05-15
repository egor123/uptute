<template>
  <SidepanelBase :isToggled="isToggled" :isLeft="true">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ornare arcu odio ut sem
    nulla pharetra. Enim eu turpis egestas pretium aenean pharetra. Et leo duis
    ut diam quam nulla. Magna fermentum iaculis eu non diam phasellus vestibulum
    lorem sed. Tristique nulla aliquet enim tortor at auctor urna nunc id. Metus
    dictum at tempor commodo. Placerat in egestas erat imperdiet. Quam nulla
    porttitor massa id neque aliquam vestibulum morbi blandit. Sed felis eget
    velit aliquet sagittis id. Dignissim cras tincidunt lobortis feugiat vivamus
    at augue. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Sit
    amet consectetur adipiscing elit pellentesque habitant. Morbi blandit cursus
    risus at ultrices. Amet consectetur adipiscing elit ut aliquam purus sit
    amet luctus. Sit amet facilisis magna etiam tempor orci eu. Scelerisque
    mauris pellentesque pulvinar pellentesque habitant morbi tristique. Euismod
    lacinia at quis risus sed vulputate odio ut enim. Orci porta non pulvinar
    neque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Lorem
    sed risus ultricies tristique nulla aliquet. In aliquam sem fringilla ut
    morbi tincidunt. Aliquam sem fringilla ut morbi tincidunt augue interdum
    velit euismod. Arcu bibendum at varius vel pharetra vel turpis nunc eget.
    Diam vulputate ut pharetra sit amet aliquam id. Lectus vestibulum mattis
    ullamcorper velit sed ullamcorper morbi tincidunt. Non tellus orci ac
    auctor.
  </SidepanelBase>
</template>

<script>
import SidepanelBase from "@/components/conference/bars/top/SideBase.vue";

export default {
  components: {
    SidepanelBase,
  },
  props: {
    isToggled: Boolean,
  },
};
</script>

<style lang="scss" scoped></style>
