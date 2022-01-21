<template>
  <div class="signup">
    <HeaderLoginSignup />
    <SignupHome />
  </div>
</template>

<script>
import HeaderLoginSignup from "@/components/HeaderLoginSignup.vue";
import SignupHome from "@/components/SignupHome.vue";

export default {
  name: "Signup",
  components: {
    HeaderLoginSignup,
    SignupHome,
  },
};
</script>