<template>
  <section>
    <div id="logo-button">
      <img
        id="logo-left"
        src="../assets/icon-left-font.png"
        alt="logo groupomania"
      />
      <div class="button-container">
        <span class="profile">
          <router-link to="/profile">Profil</router-link>
        </span>
        <span class="deconnexion">Déconnexion</span>

        <router-link to="/">
          <i class="fas fa-home"></i>
        </router-link>
      </div>
    </div>
    <h1>Groupomania : Votre réseau social d'entreprise</h1>
  </section>
</template>

<script>
export default {
  name: "Header",
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
    width: 30%;

    .deconnexion,
    .profile .fa-home {
      width: 100%;
      height: 50px;
      opacity: 80%;
      color: red;
      font-weight: bold;
      font-size: large;
      cursor: pointer;
    }

    .deconnexion {
      margin-left: 10%;
    }
    .fa-home {
      color: red;
      margin-left: 10%;
    }
  }
}
h1 {
  color: red;
  opacity: 80%;
}
</style>