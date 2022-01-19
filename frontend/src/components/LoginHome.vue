
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
          type="text"
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
          <!-- Envoyer -->
          <router-link to="/posts">Envoyer</router-link>
        </button>
        <p v-text="error"></p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
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
    validatedFields() {
      if (this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
    login() {
      if (this.validatedFields()) {
        // si les champs sont complétés
        axios
          .post("http://localhost:3000/api/user/login", {
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
              // window.location = "/posts";
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
  width: 55%;
  height: 30px;
  border-radius: 10px;
  background-color: #ff9830cc;
  border: none;

  font-weight: bold;
  font-size: small;
}
</style>