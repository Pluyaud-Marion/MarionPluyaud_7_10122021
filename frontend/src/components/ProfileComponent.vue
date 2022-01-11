<template>
  <section>
    <h1>Votre Profil - {{ user }}</h1>
    <!-- Si admin = false -->
    <div v-if="admin.length == 5">
      Tes informations
      <!-- <button v-if="admin.length == 4">{{ admin }}</button> -->
      <p>Prénom : {{ infos.firstname }}</p>

      <input
        v-show="show"
        type="text"
        placeholder="Modifier prénom"
        v-model="newFirstname"
      />
      <p>Nom : {{ infos.lastname }}</p>
      <input
        v-show="show"
        type="text"
        placeholder="Modifier nom"
        v-model="newLastname"
      />
      <p>Email : {{ infos.email }}</p>
      <input
        v-show="show"
        type="text"
        placeholder="Modifier email"
        v-model="newEmail"
      />
      <p>Mot de passe : ********</p>
      <input
        v-show="show"
        type="text"
        placeholder="Modifier mot de passe"
        v-model="newPassword"
      />
      <p>Fonction dans l'entreprise : {{ infos.job }}</p>
      <input
        v-show="show"
        type="text"
        placeholder="Modifier fonction"
        v-model="newJob"
      />
      <p>Date de création du compte : {{ infos.createdAt }}</p>
      <button v-show="show" @click="update()">Valider les modifications</button>

      <button v-show="!show" @click="show = !show">Modifier ton profil</button>
      <button @click="deleteProfile()">Supprimer ton profil</button>
    </div>
    <div v-else>
      Vous êtes administrateur du site
      <button @click="showAllProfiles()">
        Voir tous les profils d'utilisateurs
      </button>

      <article
        class="bloc-profil"
        v-for="profile in profiles"
        v-bind:key="profile.id"
      >
        <button v-show="!show" @click="show = !show">
          Modifier le profil de cet utilisateur
        </button>
        <div>
          Prénom : {{ profile.firstname }}
          <input
            v-show="show"
            type="text"
            placeholder="Modifier prénom"
            v-model.lazy="newFirstname"
          />
        </div>
        <div>
          Nom : {{ profile.lastname }}
          <input
            v-show="show"
            type="text"
            placeholder="Modifier nom"
            v-model.lazy="newLastname"
          />
        </div>
        <div>
          Job : {{ profile.job }}
          <input
            v-show="show"
            type="text"
            placeholder="Modifier fonction"
            v-model.lazy="newJob"
          />
        </div>
        <div>
          Email : {{ profile.email }}
          <input
            v-show="show"
            type="text"
            placeholder="Modifier email"
            v-model.lazy="newEmail"
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
import axios from "axios";
export default {
  name: "ProfileComponent",
  data() {
    return {
      show: false,
      user: null,
      userId: null,
      infos: "",
      admin: "",
      profiles: "",
      // firstname: "",
      // lastname: "",
      // email: "",
      // job: "",
      newFirstname: "",
      newLastname: "",
      newEmail: "",
      newPassword: "",
      newJob: "",
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
      })
      .catch((error) => console.log(error));
  },
  methods: {
    //modification d'un profil
    update() {
      localStorage.removeItem("name"); //retire du LS le champ name à l'appel de la fonction update

      let userToken = localStorage.getItem("token");
      let userId = localStorage.getItem("userId");
      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      axios
        .put(
          `http://localhost:3000/api/user/${userId}`,
          {
            firstname: this.newFirstname,
            lastname: this.newLastname,
            email: this.newEmail,
            password: this.newPassword,
            job: this.newJob,
          },
          configHeaders
        )
        .then(() => {
          const name = this.newFirstname + " " + this.newLastname;
          this.infos.firstname = this.newFirstname;
          this.infos.lastname = this.newLastname;
          this.infos.email = this.newEmail;
          this.infos.job = this.newJob;
          localStorage.setItem("name", name); // mets le nouveau nom dans LS
          window.location.reload(); // recharge la page
        })
        .catch((error) => console.log(error));
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
          console.log(response);
        })
        .catch((error) => console.log(error));
    },
    updateByAdmin(id) {
      let userToken = localStorage.getItem("token");

      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      axios
        .put(
          `http://localhost:3000/api/user/admin/${id}`,
          {
            firstname: this.newFirstname,
            lastname: this.newLastname,
            email: this.newEmail,
            job: this.newJob,
          },
          configHeaders
        )
        .then(() => {
          this.infos.firstname = this.newFirstname;
          this.infos.lastname = this.newLastname;
          this.infos.email = this.newEmail;
          this.infos.job = this.newJob;

          window.location.reload(); // recharge la page
        })
        .catch((error) => console.log(error));
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