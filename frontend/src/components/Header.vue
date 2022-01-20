<template>
  <section>
    <div id="logo-button">
      <img
        id="logo-left"
        src="../assets/icon-left-font-monochrome-black.png"
        alt="logo groupomania"
      />
      <nav class="button-container">
        <div
          class="news"
          aria-label="lien pour se rendre sur la page actualités du site"
        >
          <router-link to="/posts">Actualités</router-link>
        </div>
        <div
          class="profile"
          aria-label="lien pour se rendre sur la page profil du site"
        >
          <router-link to="/profile">Profil</router-link>
        </div>
        <div
          class="logout"
          @click="logout()"
          aria-label="lien pour se déconnecter du site"
        >
          Deconnexion
          <!-- <router-link to="/">Deconnexion</router-link> -->
        </div>
      </nav>
    </div>
    <h1>Groupomania : Votre réseau social d'entreprise</h1>
    <h2 class="name">Bienvenue {{ name }}</h2>
  </section>
</template>

<script>
import router from "@/router";
export default {
  name: "Header",
  data() {
    return {
      name: "",
    };
  },
  created() {
    let name = localStorage.getItem("name");
    this.name = name;
  },

  methods: {
    logout() {
      localStorage.clear();
      router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
#logo-button {
  display: flex;
  align-items: center;
  height: 110px;
  justify-content: space-between;

  #logo-left {
    width: 25%;
  }
  .button-container {
    display: flex;
    width: 45%;
    justify-content: space-between;
    .news,
    .logout,
    .profile {
      font-weight: bold;
      font-size: large;
      cursor: pointer;
    }
  }
}

h1 {
  color: black;
  font-size: 20px;
}
h2 {
  font-size: 25px;
  margin-bottom: 10%;
}
.name {
  margin-top: 0;
}
</style>