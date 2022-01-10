<template>
  <div class="posts">
    <Header />
    <News />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import News from "@/components/News.vue";

export default {
  name: "Posts",
  components: {
    Header,
    News,
  },
  /*ESSAI Avec Vuex
  mounted: function () {
    //moment où la vue est affichée
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/login");
      return;
    }
    this.$store.dispatch("getUserInfos");
  },
  */
};
</script>