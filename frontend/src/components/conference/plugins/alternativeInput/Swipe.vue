<script lang="ts">
import AltInput from "@/store/modules/conference/alternativeInput";

import { Vue, Component } from "vue-property-decorator";

@Component
export default class ConferenceSwipeInput extends Vue {
  mounted() {
    this.$mb.addSwipedListener(AltInput.toggleSide);
  }
  beforeDestroy() {
    this.$mb.removeSwipedListener(AltInput.toggleSide);
  }
}
</script>
