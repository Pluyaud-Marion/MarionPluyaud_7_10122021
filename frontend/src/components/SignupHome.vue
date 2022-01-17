<template>
  <section>
    <div class="container">
      <h2>Inscription</h2>

      <div class="firstname">
        <label for="firstname">Prénom : </label>
        <input
          v-model="firstname"
          type="text"
          id="firstname"
          placeholder="Votre prénom"
        />
      </div>
      <div class="lastname">
        <label for="lastname">Nom : </label>
        <input
          v-model="lastname"
          type="text"
          id="lastname"
          placeholder="Votre nom"
        />
      </div>
      <div class="email">
        <label for="email">Email : </label>
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="votreadressemail@gmail.com"
        />
      </div>
      <div class="password">
        <label for="password">Mot de passe : </label>
        <input
          v-model="password"
          type="text"
          id="password"
          placeholder="********"
        />
      </div>
      <div class="password">
        <label for="password">Retapez le même mot de passe : </label>
        <input
          v-model="passwordVerify"
          type="text"
          id="password"
          placeholder="********"
        />
      </div>
      <div class="job">
        <label for="job">Fonction : </label>
        <input
          v-model="job"
          type="text"
          id="job"
          placeholder="Votre fonction dans l'entreprise"
        />
      </div>

      <div>
        <button
          class="button"
          type="submit"
          v-show="validatedFields()"
          @click="signup()"
        >
          Créer mon compte
          <!-- <router-link to="/">Créer mon compte</router-link> -->
        </button>
        <p v-text="errors"></p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "SignupHome",
  data: function () {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordVerify: "",
      job: "",
      errors: "",
    };
  },
  methods: {
    validatedFields: function () {
      if (
        this.email != "" &&
        this.firstname != "" &&
        this.lastname != "" &&
        this.password != "" &&
        this.passwordVerify != "" &&
        this.job != ""
      ) {
        return true;
      } else {
        return false;
      }
    },

    signup() {
      const regexNameJob = /^[a-zA-ZÀ-ÿ_-]{2,60}$/;
      if (
        regexNameJob.test(this.firstname) &&
        regexNameJob.test(this.lastname) &&
        regexNameJob.test(this.job) &&
        this.password === this.passwordVerify
      ) {
        axios
          .post("http://localhost:3000/api/user/signup", {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            job: this.job,
          })
          .then(() => {
            window.location = "/";
          })
          .catch((error) => {
            this.errors = error.response.data.message;
          });
      } else {
        this.errors =
          "Votre nom, prénom et fonction ne doit contenir que des lettres et les deux mots de passe doivent être identiques ";
      }
    },
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
    //cursor: pointer;
  }
}
</style>