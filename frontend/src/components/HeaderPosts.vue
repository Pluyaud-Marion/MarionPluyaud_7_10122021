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
    <div class="container-name-admin">
      <h2 class="name">Bienvenue {{ name }}</h2>
      <h3 class="admin" v-if="isadmin.length == 4">Vous êtes administrateur</h3>
    </div>
  </section>
</template>

<script>
import router from "@/router";
export default {
  name: "HeaderProfile",
  data() {
    return {
      name: "",
      isadmin: false,
    };
  },

  /*
    Récupération du nom et de la qualité admin ou non dans le localstorage pour injection dans les datas
    */
  created() {
    let name = localStorage.getItem("name");
    let isadmin = localStorage.getItem("isadmin");
    this.name = name;
    this.isadmin = isadmin;
  },

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
h2 {
  font-size: 25px;
}
h3 {
  font-size: 20px;
}
.container-name-admin {
  margin-bottom: 10%;
}
.name {
  margin-top: 0;
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
  h2 {
    font-size: medium;
  }
  h3 {
    font-size: small;
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
  h2 {
    font-size: 30px;
  }
  h3 {
    font-size: 25px;
  }
}
</style>