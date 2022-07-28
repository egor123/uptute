<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class EmitClass<T> extends Vue {
  emit = (input: T) => this.$emit("input", input);
}
</script>