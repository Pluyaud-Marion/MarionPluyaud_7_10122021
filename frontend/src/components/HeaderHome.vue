<template>
  <section>
    <div id="logo-button">
      <img
        id="logo-left"
        src="../assets/icon-left-font-monochrome-black.png"
        alt="logo groupomania"
      />
      <nav class="button-container">
        <button
          class="button-signup"
          aria-label="bouton pour se rendre sur la page inscription du site"
        >
          <router-link to="/signup">Inscription</router-link>
        </button>
        <button
          class="button-login"
          aria-label="bouton pour se rendre sur la page connexion du site"
        >
          <router-link to="/">Connexion</router-link>
        </button>
      </nav>
    </div>
    <h1>Groupomania : Votre réseau social d'entreprise</h1>
  </section>
</template>

<script>
export default {
  name: "HeaderHome",
  // data() {
  //   return {
  //     buttonActiveSignup: false,
  //     buttonActiveLogin: true,
  //   };
  // },
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

    .button-signup,
    .button-login {
      width: 100%;
      height: 50px;
      border-radius: 10px;
      border: none;
      color: white;
      font-weight: bold;
      font-size: medium;
      cursor: pointer;
    }

    .button-login {
      margin-left: 10%;
    }

    .router-link-exact-active {
      border-bottom: black solid;
    }
  }
}
h1 {
  color: black;
  font-weight: bold;
}
</style>