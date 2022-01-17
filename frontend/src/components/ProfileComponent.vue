<template>
  <section>
    <h1>Votre Profil - {{ user }}</h1>
    <!-- Si admin = false -->
    <div v-if="admin.length == 5">
      Mes informations
      <p>Prénom : {{ infos.firstname }}</p>

      <input v-show="showUser" type="text" v-model="infos.firstname" />
      <p>Nom : {{ infos.lastname }}</p>

      <input v-show="showUser" type="text" v-model="infos.lastname" />
      <p>Email : {{ infos.email }}</p>

      <input v-show="showUser" type="text" v-model="infos.email" />
      <p>Mot de passe : {{ "*********" }}</p>
      <input
        v-show="showUser"
        type="password"
        placeholder="Mot de passe"
        v-model="newPassword"
      />
      <p v-show="showUser">Confirmez le mot de passe</p>
      <input
        v-show="showUser"
        type="password"
        placeholder="Mot de passe"
        v-model="newPasswordVerify"
      />
      <p>Fonction dans l'entreprise : {{ infos.job }}</p>

      <input v-show="showUser" type="text" v-model="infos.job" />
      <p>Date de création du compte : {{ formatDate(infos.createdAt) }}</p>
      <button v-show="showUser" @click="update()">
        Valider les modifications
      </button>
      <p v-text="errors"></p>
      <button v-show="!showUser" @click="showUser = !showUser">
        Modifier ton profil
      </button>
      <button @click="deleteProfile()">Supprimer ton profil</button>
    </div>

    <div v-else>
      Vous êtes administrateur du site
      <button @click="showAllProfiles()">
        Voir tous les profils d'utilisateurs
      </button>
      <!-- 
          La fonction qui affiche les profils boucle sur chaque profil et passe tous les show à false
           
          Le bouton modifier le profil est a show = true
          Les champs de modif sont à show = false
          Au clic sur bouton Modifier le profil = appel de la méthode "showInput" qui prend en paramètre l'id du profil qu'on veut modifier et qui passe pour cet id v-show à true (le fait apparaitre)"
           -->
      <article
        class="bloc-profil"
        v-for="profile in profiles"
        v-bind:key="profile.id"
      >
        <button v-show="!show[profile.id]" @click="showInput(profile.id)">
          Modifier le profil de cet utilisateur
        </button>
        <div>
          Prénom : {{ profile.firstname }}

          <input
            v-show="show[profile.id]"
            type="text"
            v-model="profile.firstname"
          />
        </div>
        <div>
          Nom : {{ profile.lastname }}
          <input
            v-show="show[profile.id]"
            type="text"
            v-model="profile.lastname"
          />
        </div>
        <div>
          Job : {{ profile.job }}
          <input v-show="show[profile.id]" type="text" v-model="profile.job" />
        </div>
        <div>
          Email : {{ profile.email }}
          <input
            v-show="show[profile.id]"
            type="text"
            v-model="profile.email"
          />
        </div>

        <button @click="updateByAdmin(profile.id)">
          Valider les modifications
        </button>
      </article>
    </div>
  </section>
</template>

<script>
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import axios from "axios";

export default {
  name: "ProfileComponent",

  data() {
    return {
      show: [],
      showUser: false,
      user: null,
      userId: null,
      infos: "",
      admin: "",
      profiles: "",
      newPassword: "",
      newPasswordVerify: "",
      errors: "",
    };
  },
  created() {
    let user = localStorage.getItem("name");
    let userId = localStorage.getItem("userId");
    let userToken = localStorage.getItem("token");
    let admin = localStorage.getItem("isadmin");

    this.user = user;
    this.userId = userId;
    this.admin = admin;

    let configHeaders = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    axios
      .get(`http://localhost:3000/api/user/full/${userId}`, configHeaders)
      .then((response) => {
        this.infos = response.data;
        console.log("infos", this.infos);
      })
      .catch((error) => console.log(error));
  },

  methods: {
    validateFields() {
      if (
        this.infos.email != "" &&
        this.infos.firstname != "" &&
        this.infos.lastname != "" &&
        this.newPassword != "" &&
        this.infos.job != ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    formatDate() {
      return format(new Date(), "dd-MM-yyyy", { locale: fr });
    },
    //modification d'un profil
    update() {
      localStorage.removeItem("name"); //retire du LS le champ name à l'appel de la fonction update
      const regexNameJob = /^[a-zA-ZÀ-ÿ_-]{2,60}$/;

      let userToken = localStorage.getItem("token");
      let userId = localStorage.getItem("userId");
      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      if (
        regexNameJob.test(this.infos.firstname) &&
        regexNameJob.test(this.infos.lastname) &&
        regexNameJob.test(this.infos.job) &&
        this.validateFields() &&
        this.newPassword === this.newPasswordVerify
      ) {
        axios
          .put(
            `http://localhost:3000/api/user/${userId}`,
            {
              firstname: this.infos.firstname,
              lastname: this.infos.lastname,
              email: this.infos.email,
              password: this.newPassword,
              job: this.infos.job,
            },
            configHeaders
          )
          .then(() => {
            const name = this.infos.firstname + " " + this.infos.lastname;

            // this.infos.firstname;
            // this.infos.lastname;
            // this.infos.email;
            // this.newpPassword;
            // this.infos.job;
            localStorage.setItem("name", name); // mets le nouveau nom dans LS
            window.location.reload(); // recharge la page
          })
          .catch((error) => {
            this.errors = error.response.data.message;
          });
      } else {
        this.errors =
          "Votre nom, prénom et fonction ne doit contenir que des lettres et tous les champs doivent être complêtés ";
      }
    },
    //suppression du profil
    deleteProfile() {
      let userToken = localStorage.getItem("token");
      let userId = localStorage.getItem("userId");
      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      axios
        .delete(`http://localhost:3000/api/user/${userId}`, configHeaders)
        .then(() => {
          alert("Attention cet utilisateur va être supprimé");
          location.replace(location.origin);
        })
        .catch((error) => console.log(error));
    },
    //affichage de tous les profils pour l'admin
    showAllProfiles() {
      let userToken = localStorage.getItem("token");

      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      axios
        .get("http://localhost:3000/api/user", configHeaders)
        .then((response) => {
          this.profiles = response.data;
          //La fonction qui affiche les profils boucle sur chaque profil et passe tous les show à false
          for (const profile of this.profiles) {
            this.show[profile.id] = false;
          }
          console.log(response);
        })
        .catch((error) => console.log(error));
    },
    updateByAdmin(userId) {
      // en paramètres l'id du user à modifier
      let userToken = localStorage.getItem("token");

      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      for (const profile of this.profiles) {
        axios
          .put(
            `http://localhost:3000/api/user/admin/${userId}`,
            {
              firstname: profile.firstname,
              lastname: profile.lastname,
              email: profile.email,
              job: profile.job,
            },
            configHeaders
          )
          .then((response) => {
            console.log("response", response);
            // for (const profile of this.profiles) {
            //   profile.firstname;
            //   profile.lastname;
            //   profile.email;
            //   profile.job;
            // }

            // for (this.profile of this.profiles) {
            //   this.profile.firstname;
            //   this.profile.lastname;
            //   this.profile.email;
            //   this.profile.job;
            // }

            window.location.reload(); // recharge la page
          })
          .catch((error) => console.log(error));
      }
    },
    showInput(userId) {
      console.log(userId);
      this.show[userId] = !this.show[userId];
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
.bloc-profil {
  border: red solid;
  margin-bottom: 5%;
  button {
    margin-top: 2%;
  }
}
</style>