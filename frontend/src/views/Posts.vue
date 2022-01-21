<template>
  <div class="posts">
    <HeaderPosts />
    <News />
  </div>
</template>

<script>
import HeaderPosts from "@/components/HeaderPosts.vue";
import News from "@/components/News.vue";

export default {
  name: "Posts",
  components: {
    HeaderPosts,
    News,
  },
};
</script>