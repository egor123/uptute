<template>
  <BarBase :isTopBar="true">
    <SettingsBtn />
    <v-spacer />
    <ChatBtn />
  </BarBase>
</template>

<script>
import BarBase from "@/components/conference/bars/BarBase.vue";
import SettingsBtn from "@/components/conference/bars/top/settings/Btn.vue";
import ChatBtn from "@/components/conference/bars/top/chat/Btn.vue";

export default {
  components: { BarBase, SettingsBtn, ChatBtn },
};
</script>
