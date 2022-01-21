<template>
  <div class="login">
    <HeaderLoginSignup />
    <LoginComponent />
  </div>
</template>

<script>
import HeaderLoginSignup from "@/components/HeaderLoginSignup.vue";
import LoginComponent from "@/components/LoginComponent.vue";

export default {
  name: "Login",
  components: {
    HeaderLoginSignup,
    LoginComponent,
  },
};
</script>