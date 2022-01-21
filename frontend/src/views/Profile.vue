<template>
  <div class="posts">
    <HeaderProfile />
    <ProfileComponent />
  </div>
</template>

<script>
import HeaderProfile from "@/components/HeaderProfile.vue";
import ProfileComponent from "@/components/ProfileComponent.vue";

export default {
  name: "Profile",
  components: {
    HeaderProfile,
    ProfileComponent,
  },
};
</script>

<style lang="scss" scoped>
</style>