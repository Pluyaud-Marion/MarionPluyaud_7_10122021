<template>
  <section>
    <div id="logo-button">
      <img
        id="logo-left"
        src="../assets/icon-left-font.png"
        alt="logo groupomania"
      />
      <div class="button-container">
        <div class="news">
          <router-link to="/posts">Actualités</router-link>
        </div>
        <div class="profile">
          <router-link to="/profile">Profil</router-link>
        </div>
        <div class="logout">
          <router-link to="/">Deconnexion</router-link>
        </div>
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
  align-items: center;
  height: 110px;

  #logo-left {
    width: 25%;
  }
  .button-container {
    display: flex;
    align-items: center;
    margin-left: 40%;
    .news,
    .logout,
    .profile {
      width: 100%;
      opacity: 80%;
      color: black;
      font-weight: bold;
      font-size: large;
      cursor: pointer;
      margin-left: 10%;
    }
  }
}

h1 {
  color: red;
  opacity: 80%;
}
.name {
  margin-top: 0;
}
</style>