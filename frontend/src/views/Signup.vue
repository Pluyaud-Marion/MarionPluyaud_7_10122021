<template>
  <div class="signup">
    <HeaderLoginSignup />
    <SignupComponent />
  </div>
</template>

<script>
import HeaderLoginSignup from "@/components/HeaderLoginSignup.vue";
import SignupComponent from "@/components/SignupComponent.vue";

export default {
  name: "Signup",
  components: {
    HeaderLoginSignup,
    SignupComponent,
  },
};
</script>