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
};
</script>