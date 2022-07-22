<script lang="ts">
import LayoutHandler from "@/store/modules/conference/layoutHandler";

import { Vue, Component } from "vue-property-decorator";

@Component
export default class ConferenceonRotate extends Vue {
  mounted() {
    addEventListener("orientationchange", this.onOrientationChange);
  }
  beforeDestroy() {
    removeEventListener("orientationchange", this.onOrientationChange);
  }

  private onOrientationChange(): void {
    LayoutHandler.setLayout();
  }
}
</script>
