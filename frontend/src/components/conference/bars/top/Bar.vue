<template>
  <BarBase :isTopBar="true">
    <SettingsBtn @click="$emit('toggleSettings')" />
    <v-spacer />
    <ChatBtn @click="$emit('toggleChat')" />
  </BarBase>
</template>

<script lang="ts">
import BarBase from "@/components/conference/bars/BarBase.vue";
import SettingsBtn from "@/components/conference/bars/top/settings/Btn.vue";
import ChatBtn from "@/components/conference/bars/top/chat/Btn.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({
  components: { BarBase, SettingsBtn, ChatBtn },
})
export default class TopBar extends Vue {}
</script>
