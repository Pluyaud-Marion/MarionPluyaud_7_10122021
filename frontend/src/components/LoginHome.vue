const axios = require("axios").default
<template>
  <section>
    <div class="container">
      <h2>Connexion à votre compte</h2>
      <form class="formulaire" action="" method="post">
        <div class="email">
          <label for="email">Email : </label>
          <input
            type="email"
            id="email"
            placeholder="votreadressemail@gmail.com"
          />
        </div>
        <div class="password">
          <label for="password">Mot de passe : </label>
          <input type="text" id="password" placeholder="********" />
        </div>
        <div>
          <button class="button" type="submit">Envoyer</button>
        </div>
      </form>
    </div>
    <div>{{ firstname }}</div>
    <div>{{ posts }}</div>
  </section>
</template>

<script>
export default {
  name: "LoginHome",
  data() {
    return {
      firstname: "Marion",
      posts: [],
    };
  },
  created() {
    fetch("http://localhost:3000/api/post/")
      .then((response) => response.json())
      .then((response) => {
        this.posts = response;
      });
  },
};
</script>

<style lang="scss" scoped>
section {
  padding-top: 5%;
  background-image: url("../assets/icon.png");
  background-attachment: fixed;
  padding-bottom: 15%;
}

.container {
  border: red ridge 4mm;
  opacity: 80%;
  border-radius: 20px;
  width: 50%;
  height: 250px;
  margin-top: 5%;
  margin-left: 25%;
  background-color: white;
}
.email,
.password {
  font-size: large;
  font-weight: bold;
}
.email {
  margin-bottom: 8%;
  input {
    width: 250px;
  }
}
.password {
  margin-bottom: 8%;
  input {
    width: 180px;
  }
}
.button {
  width: 25%;
  height: 30px;
  border-radius: 10px;
  background-color: red;
  opacity: 80%;
  color: white;
  font-weight: bold;
  font-size: medium;
}
</style>