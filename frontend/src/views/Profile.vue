<template>
  <div class="posts">
    <Header />
    <ProfileComponent />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import ProfileComponent from "@/components/ProfileComponent.vue";

export default {
  name: "Profile",
  components: {
    Header,
    ProfileComponent,
  },
};
</script>