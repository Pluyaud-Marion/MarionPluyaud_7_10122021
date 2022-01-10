<template>
  <div class="home">
    <HeaderHome />
    <LoginHome />
  </div>
</template>

<script>
import HeaderHome from "@/components/HeaderHome.vue";
import LoginHome from "@/components/LoginHome.vue";

export default {
  name: "Home",
  components: {
    HeaderHome,
    LoginHome,
  },
};
</script>