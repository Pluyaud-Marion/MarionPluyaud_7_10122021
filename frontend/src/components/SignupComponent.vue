<template>
  <section>
    <div class="container">
      <h2>Inscription</h2>

      <div class="input">
        <label for="firstname" class="display">Prénom : </label>
        <input
          v-model="firstname"
          type="text"
          id="firstname"
          placeholder="Prénom"
          aria-required="true"
        />
      </div>
      <div class="input">
        <label for="lastname" class="display">Nom : </label>
        <input v-model="lastname" type="text" id="lastname" placeholder="Nom" />
      </div>
      <div class="input">
        <label for="email" class="display">Email : </label>
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="Adresse mail"
          aria-required="true"
        />
      </div>
      <div class="input">
        <label for="password" class="display">Mot de passe : </label>
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Mot de passe"
          aria-required="true"
        />
      </div>
      <div class="input">
        <label for="passwordVerify" class="display"
          >Confirmez le mot de passe :
        </label>
        <input
          v-model="passwordVerify"
          type="password"
          id="passwordVerify"
          placeholder="Rappel Mot de passe"
          aria-required="true"
        />
      </div>
      <div class="input">
        <label for="job" class="display">Fonction : </label>
        <input
          v-model="job"
          type="text"
          id="job"
          placeholder="Fonction dans l'entreprise"
          aria-required="true"
        />
      </div>

      <div class="button-container">
        <button
          class="button"
          type="submit"
          v-show="validatedFields()"
          @click="signup()"
        >
          Créer mon compte
        </button>
        <p v-text="errors"></p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import router from "@/router/index";
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
    /*
    Méthode permettant de return true si les champs ne sont pas vides
    */
    validatedFields() {
      return (
        this.email != "" &&
        this.firstname != "" &&
        this.lastname != "" &&
        this.password != "" &&
        this.passwordVerify != "" &&
        this.job != ""
      );
    },

    /*
    Méthode permettant la création du compte si les champs firstname / lastname / job sont conformes à la regex + si les 2 mots de passe renseignés sont identiques - vérification des champs complétés dans le template avec apparition du bouton
    */
    signup() {
      const regexNameJob = /^[a-zA-ZÀ-ÿ\s_-]{2,60}$/;
      if (
        regexNameJob.test(this.firstname) &&
        regexNameJob.test(this.lastname) &&
        regexNameJob.test(this.job)
      ) {
        if (this.password === this.passwordVerify) {
          axios
            .post(`${process.env.VUE_APP_LOCALHOST}user/signup`, {
              firstname: this.firstname,
              lastname: this.lastname,
              email: this.email,
              password: this.password,
              job: this.job,
            })
            .then(() => {
              alert(
                "Votre compte a bien été créé, vous pouvez désormais vous connecter à partir de la page de connexion"
              );
              router.push("/");
            })
            .catch((error) => {
              this.errors = error.response.data.message;
            });
        } else {
          this.errors =
            "Les deux champs de mot de passe doivent être identiques";
        }
      } else {
        this.errors =
          "Votre nom, prénom et fonction ne peut ni contenir moins de 2 lettres, ni des chiffres ";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.display {
  display: inline;
}
h2 {
  font-size: x-large;
  text-align: center;
}
.container {
  text-align: initial;
  border-radius: 20px;
  width: 70%;
  height: auto;
  margin: 0 auto;
  margin-top: 5%;
  background-color: white;
  padding-top: 2%;
  padding-bottom: 2%;
  box-shadow: 0px 0px 11px 1px;
  .button-container {
    text-align: center;
  }

  .input {
    display: flex;
    flex-direction: column;
    margin: 5%;
    label {
      font-size: 18px;
    }
    input {
      font-size: 18px;
    }
  }
  .button {
    width: 55%;
    height: 30px;
    border-radius: 10px;
    background-color: #ff9830cc;
    border: none;

    font-weight: bold;
    font-size: small;
    cursor: pointer;
  }
}
@media screen and (max-width: 480px) {
  .container {
    width: 100%;
    h2 {
      font-size: large;
    }
    .input {
      label {
        font-size: 15px;
      }
      input {
        font-size: 15px;
      }
    }
  }
}
@media screen and (min-width: 1440px) {
  .container {
    width: 60%;
    h2 {
      font-size: 30px;
    }
    .button {
      height: 35px;
      font-size: 20px;
      margin-top: 5%;
    }
    .input {
      height: 30px;
      margin: 7%;
    }
  }

  label {
    font-size: 20px;
  }
  #job,
  #email,
  #firstname,
  #password,
  #passwordVerify,
  #lastname {
    font-size: 20px;
  }
}
</style>