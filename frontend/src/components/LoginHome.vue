
<template>
  <section>
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
        <div v-if="status == 'error_login'">
          Echec de la connexion, vérifiez vos identifiants
        </div>
        <button @click="login()" class="button">
          <span v-if="status == 'loading'">Connexion en cours...</span>
          <span v-else>Connexion</span>

          <!-- <router-link to="/posts">Envoyer</router-link> 
          -->
        </button>
      </div>
    </div>
    <!-- AVEC FORMULAIRE
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
          <button class="button" type="submit">
            <router-link to="/posts">Envoyer</router-link>
          </button>
        </div>
      </form>
    </div>
    -->
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
import { mapState } from "vuex";

export default {
  name: "LoginHome",
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
  // data() {
  //   return {
  //     firstname: "Marion",
  //     posts: [],
  //     //show: false,
  //   };
  // },
  // created() {
  //   fetch("http://localhost:3000/api/post/")
  //     .then((response) => response.json())
  //     .then((response) => {
  //       this.posts = response; //on rempli le tableau posts avec les response(les posts récupérés dans la db) -> this pour accéder aux données de l'application vue
  //       console.log(this.posts);
  //     });
  // },
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