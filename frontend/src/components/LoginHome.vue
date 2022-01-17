
<template>
  <section>
    <!--
    <div class="container">
      <h2>Connexion à votre compte</h2>
      <div class="email">
        <input v-model="email" type="email" id="email" placeholder="Email" />
      </div>
      <div class="password">
        <input
          v-model="password"
          type="text"
          id="password"
          placeholder="Mot de passe"
        />
      </div>
      <div>
        <div v-if="status === 'error_login'">
          Echec de la connexion, vérifiez vos identifiants
        </div>
        <button @click="login()" class="button">
          <span v-if="status === 'loading'">Connexion en cours...</span>
          <span v-else>Connexion</span>

          <router-link to="/posts">Envoyer</router-link> 
         
        </button>
      </div>
    </div>
    -->

    <div class="container">
      <h2>Connexion à votre compte</h2>

      <div class="email">
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="adresse email"
        />
      </div>
      <div class="password">
        <input
          v-model="password"
          type="text"
          id="password"
          placeholder="********"
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

    <!-- 
      TESTS
    <div>{{ firstname }}</div>
    <div>{{ posts }}</div>
    <span v-if="posts.length < 1">Désolé il n'y a pas de post</span>
    <span v-else>Il y a des posts</span>
    <button @click="show = !show">Cliquez moi</button>
    <div v-show="show">Je suis affiché</div>
    <figure v-for="post in posts" v-bind:key="post.id">
      <img v-bind:src="post.attachment" v-bind:alt="post.content" />
      <figcaption>{{ post.content }}</figcaption>
    </figure>
     -->
  </section>
</template>

<script>
//import { mapState } from "vuex";
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
              window.location = "/posts";
            }
          })
          .catch((error) => {
            console.log(error.response.data);
            this.error = error.response.data.error;
          });
      }
    },
  },
  /* ESSAI avec vuex
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState(["status"]), //on récupère le state status
  },
  methods: {
    login: function () {
      const self = this;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
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
  */
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
  width: 55%;
  height: 30px;
  border-radius: 10px;
  background-color: red;
  opacity: 80%;
  color: white;
  font-weight: bold;
  font-size: small;
}
</style>