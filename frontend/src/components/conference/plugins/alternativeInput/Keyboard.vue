<script lang="ts">
import AltInput from "@/store/modules/conference/alternativeInput";
import { Direction } from "@/types";

import { Vue, Component } from "vue-property-decorator";

@Component
export default class ConferenceKeyboardInput extends Vue {
  mounted(): void {
    addEventListener("keydown", this.onKeyDown);
  }
  beforeDestroy(): void {
    removeEventListener("keydown", this.onKeyDown);
  }

  private onKeyDown(e: KeyboardEvent): void {
    const direction: Direction | null = this.getDirection(e);

    if (direction === null) return;

    AltInput.toggleSide(direction);
  }

  private getDirection(e: KeyboardEvent): Direction | null {
    if (e.key.substring(0, 5) !== "Arrow") return null;

    const directions = ["right", "left", "up", "down"];
    const dir: string = e.key.substring(5, e.key.length).toLowerCase();

    return directions.includes(dir) ? (dir as Direction) : null;
  }
}
</script>
