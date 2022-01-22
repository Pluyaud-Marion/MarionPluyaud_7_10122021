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
        </div>
      </nav>
    </div>
    <h1>Groupomania : Votre réseau social d'entreprise</h1>
  </section>
</template>

<script>
import router from "@/router";
export default {
  name: "HeaderProfile",

  methods: {
    /*
    Méthode permettant la déconnexion
    */
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
@media screen and (max-width: 480px) {
  #logo-button {
    flex-direction: column;
    margin-bottom: 7%;
    .button-container {
      width: 100%;
      .news,
      .profile,
      .logout {
        font-size: small;
      }
    }
  }
  h1 {
    font-size: medium;
    margin-bottom: 10%;
  }
}
@media screen and (min-width: 1440px) {
  #logo-button {
    .button-container {
      .news,
      .profile,
      .logout {
        font-size: 25px;
      }
    }
  }
  h1 {
    font-size: 35px;
  }
}
</style>