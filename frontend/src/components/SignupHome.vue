<template>
  <section>
    <!-- 
    <div class="container">
      <h2>Inscription</h2>
      <form class="formulaire" action="" method="post">
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
            @click="createAccount()"
            class="button"
            :class="{ 'button--inactif': !validatedFields() }"
          >
            Créer mon compte
          </button>
        </div>
      </form>
      
    </div>
    -->
    <div class="container">
      <h2>Inscription</h2>
      <div class="firstname">
        <input
          v-model="firstname"
          type="text"
          id="firstname"
          placeholder="Prénom"
        />
      </div>
      <div class="lastname">
        <input v-model="lastname" type="text" id="lastname" placeholder="Nom" />
      </div>
      <div class="email">
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="Adresse email"
        />
      </div>
      <div class="password">
        <input
          v-model="password"
          type="text"
          id="password"
          placeholder="Mot de passe"
        />
      </div>
      <div class="job">
        <input
          v-model="job"
          type="text"
          id="job"
          placeholder="Votre fonction dans l'entreprise"
        />
      </div>
      <div>
        <button
          @click="createAccount()"
          class="button"
          :class="{ 'button--inactif': !validatedFields() }"
        >
          <span v-if="status == 'loading'">Création en cours...</span>
          <span v-else>Créer mon compte</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SignupHome",
  data: function () {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      job: "",
    };
  },
  computed: {
    ...mapState(["status"]), //on récupère le state status
  },
  methods: {
    validatedFields: function () {
      if (
        this.email != "" &&
        this.firstname != "" &&
        this.lastname != "" &&
        this.password != ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    createAccount: function () {
      const self = this;
      this.$store
        .dispatch("createAccount", {
          email: this.email,
          firstname: this.firstname,
          lastname: this.lastname,
          password: this.password,
          job: this.job,
        })
        .then(
          function () {
            self.$router.push("/posts");
          },
          function (error) {
            console.log(error);
          }
        );
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
  .button--inactif {
    width: 50%;
    height: 30px;
    border-radius: 10px;
    background-color: grey;
    opacity: 80%;
    color: white;
    font-weight: bold;
    font-size: medium;
  }
}
</style>