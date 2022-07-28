<script lang="ts">
import { IsError } from "@/types";
import { Component, Prop } from "vue-property-decorator";
import EmitClass from "./Emit.vue";

@Component
export default class FieldClass<T> extends EmitClass<T> {
  @Prop() readonly value!: T;
  @Prop(Object) readonly isError!: IsError;
}
</script>
