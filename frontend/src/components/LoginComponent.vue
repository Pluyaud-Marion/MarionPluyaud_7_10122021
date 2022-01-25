
<template>
  <section>
    <div class="container">
      <h2>Connexion à votre compte</h2>

      <div class="email">
        <label for="email">Adresse email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="Adresse email"
          aria-required="true"
        />
      </div>
      <div class="password">
        <label for="password">Mot de passe</label>
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Mot de passe"
          aria-required="true"
        />
      </div>
      <div>
        <button
          class="button"
          type="submit"
          @click="login()"
          v-show="validatedFields()"
        >
          Envoyer
          <!-- <router-link to="/posts">Envoyer</router-link> -->
        </button>
        <p v-text="error"></p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import router from "@/router/index";
export default {
  name: "LoginHome",
  data: function () {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    /*
    Méthode permettant de return true si les champs ne sont pas vides
    */
    validatedFields() {
      return this.email != "" && this.password != "";
    },

    /*
    Méthode permettant le login de l'utilisateur 
    Si login ok = envoi dans localstorage du nom / token / userId / qualité admin
    */
    login() {
      //appel de la fonction validateFields pour vérifier complétude des champs
      if (this.validatedFields()) {
        axios
          .post(`${process.env.VUE_APP_LOCALHOST}user/login`, {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response) {
              const name =
                response.data.firstname + " " + response.data.lastname;
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userId", response.data.userId);
              localStorage.setItem("name", name);
              localStorage.setItem("isadmin", response.data.isadmin);
              router.push("/posts");
            }
          })
          .catch((error) => {
            console.log(error.response.data);
            this.error = error.response.data.error;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  border-radius: 20px;
  width: 50%;
  height: auto;
  background-color: white;
  margin: 0 auto;
  box-shadow: 0px 0px 11px 1px;
  margin-top: 10%;
  padding-top: 2%;
  padding-bottom: 2%;
}
.email,
.password {
  font-size: 18px;
  font-weight: bold;
}
.email {
  margin-bottom: 8%;
  input {
    width: 250px;
    font-size: 18px;
  }
}
.password {
  margin-bottom: 8%;
  input {
    width: 180px;
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
  font-size: 16px;
}
@media screen and (max-width: 480px) {
  .container {
    width: 100%;
    h2 {
      font-size: large;
    }
  }
  .password,
  .email {
    input {
      font-size: 15px;
    }
  }
}
@media screen and (min-width: 1440px) {
  h2 {
    font-size: 30px;
  }
  .email input,
  .password input {
    width: 450px;
    height: 30px;
  }
  .button {
    height: 35px;
    font-size: 20px;
  }
  #email,
  #password {
    font-size: 20px;
  }
}
</style>