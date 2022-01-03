<template>
  <section>
    <div class="container">
      <h2>Inscription</h2>
      <form class="formulaire" action="" method="post">
        <div class="firstname">
          <label for="firstname">Prénom : </label>
          <input type="text" id="firstname" placeholder="Votre prénom" />
        </div>
        <div class="lastname">
          <label for="lastname">Nom : </label>
          <input type="text" id="lastname" placeholder="Votre nom" />
        </div>
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
        <div class="job">
          <label for="job">Fonction : </label>
          <input
            type="text"
            id="job"
            placeholder="Votre fonction dans l'entreprise"
          />
        </div>
        <div>
          <button class="button" type="submit">Créer mon compte</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "SignupHome",
};
</script>

<style lang="scss" scoped>
section {
  padding-top: 5%;
  background-image: url("../assets/icon.png");
  background-attachment: fixed;
  padding-bottom: 15%;
}
h2 {
  font-size: x-large;
  text-align: center;
}
.container {
  border: red ridge 4mm;
  opacity: 80%;
  border-radius: 20px;
  width: 60%;
  height: 480px;
  margin-top: 5%;
  margin-left: 25%;
  background-color: white;

  .email,
  .password,
  .firstname,
  .lastname,
  .job {
    font-size: large;
    font-weight: bold;
    margin-bottom: 8%;
    text-align: left;
    margin-left: 10%;
  }

  .email,
  .job {
    input {
      width: 250px;
    }
  }
  .button {
    width: 50%;
    height: 30px;
    border-radius: 10px;
    background-color: red;
    opacity: 80%;
    color: white;
    font-weight: bold;
    font-size: medium;
    cursor: pointer;
  }
}
</style>