<template>
  <section>
    <div id="logo-button">
      <img
        id="logo-left"
        src="../assets/icon-left-font.png"
        alt="logo groupomania"
      />
      <div class="button-container">
        <span class="actus">
          <router-link to="/posts">Actus</router-link>
        </span>
        <span class="profile">
          <router-link to="/profile">Profil</router-link>
        </span>

        <router-link to="/">
          <span class="deconnexion">Déconnexion</span>
        </router-link>
      </div>
    </div>
    <h2 class="name">Bienvenue {{ name }}</h2>
    <h1>Groupomania : Votre réseau social d'entreprise</h1>
  </section>
</template>

<script>
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
};
</script>

<style scoped lang="scss">
#logo-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 110px;

  #logo-left {
    width: 25%;
  }
  .button-container {
    display: flex;
    width: 50%;
    align-items: center;

    .deconnexion,
    .profile {
      width: 100%;

      opacity: 80%;
      color: black;
      font-weight: bold;
      font-size: large;
      cursor: pointer;
    }

    .deconnexion {
      margin-left: 10%;
    }
  }
}
.name {
  font-size: medium;
}
h1 {
  color: red;
  opacity: 80%;
}
</style>