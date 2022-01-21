<template>
  <section>
    <h1>404 - Page Not Found</h1>
    <router-link to="/posts" class="link"
      >Retour au fil d'actualité</router-link
    >
  </section>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>
<style lang="scss" scoped>
.link {
  border-bottom: black solid;
}
</style>