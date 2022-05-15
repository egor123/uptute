<template>
  <BarBase :isTopBar="true">
    <SettingsBtn
      @click="$emit('toggleSettings')"
      :isToggled="isToggled.settings"
    />
    <v-spacer />
    <ChatBtn @click="$emit('toggleChat')" :isToggled="isToggled.chat" />
  </BarBase>
</template>

<script>
import BarBase from "@/components/conference/bars/BarBase.vue";
import SettingsBtn from "@/components/conference/bars/top/settings/Btn.vue";
import ChatBtn from "@/components/conference/bars/top/chat/Btn.vue";

export default {
  components: { BarBase, SettingsBtn, ChatBtn },
  props: {
    isToggled: Object,
  },
};
</script>
