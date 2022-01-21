<template>
  <div class="login">
    <HeaderLoginSignup />
    <LoginHome />
  </div>
</template>

<script>
import HeaderLoginSignup from "@/components/HeaderLoginSignup.vue";
import LoginHome from "@/components/LoginHome.vue";

export default {
  name: "Login",
  components: {
    HeaderLoginSignup,
    LoginHome,
  },
};
</script>