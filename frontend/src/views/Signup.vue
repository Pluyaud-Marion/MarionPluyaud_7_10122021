<template>
  <div class="signup">
    <HeaderHome />
    <SignupHome />
  </div>
</template>

<script>
import HeaderHome from "@/components/HeaderHome.vue";
import SignupHome from "@/components/SignupHome.vue";

export default {
  name: "Signup",
  components: {
    HeaderHome,
    SignupHome,
  },
};
</script>