<template>
  <section>
    <div id="logo-button">
      <img
        id="logo-left"
        src="../assets/icon-left-font.png"
        alt="logo groupomania"
      />
      <div class="button-container">
        <button class="button-signup">
          <router-link to="/signup">Inscription</router-link>
        </button>

        <button class="button-login">
          <router-link to="/">Connexion</router-link>
        </button>
      </div>
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
      border-radius: 20px;
      border: none;
      background-color: red;
      opacity: 70%;
      color: white;
      font-weight: bold;
      font-size: medium;
      cursor: pointer;
    }

    .button-login {
      margin-left: 10%;
    }

    .router-link-exact-active {
      text-decoration: underline;
      color: white;
    }
    // .active {
    //   background-color: red;
    //   opacity: 70%;
    //   border: black thick double;
    // }
  }
}
h1 {
  color: red;
  opacity: 80%;
}
</style>