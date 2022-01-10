<template>
  <section>
    <h1>Votre Profil {{ user }}</h1>
    <button @click="updateProfile()">Modifier ton profil</button>
    <button @click="deleteProfile()">Supprimer ton profil</button>
    <div>
      Tes informations
      <p>Prénom : {{ infos.firstname }}</p>
      <p>Nom : {{ infos.lastname }}</p>
      <p>Email : {{ infos.email }}</p>
      <p>Fonction dans l'entreprise : {{ infos.job }}</p>
      <p>Date de création du compte : {{ infos.createdAt }}</p>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "ProfileComponent",
  data() {
    return {
      user: null,
      userId: null,
      infos: "",
    };
  },
  created() {
    let user = localStorage.getItem("name");
    let userId = localStorage.getItem("userId");
    let userToken = localStorage.getItem("token");
    this.user = user;
    this.userId = userId;

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
    updateProfile() {
      let userToken = localStorage.getItem("token");
      let userId = localStorage.getItem("userId");
      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      axios
        .put(`http://localhost:3000/api/user/${userId}`, configHeaders)
        .then((response) => {
          this.infos = response.data;
        })
        .catch((error) => console.log(error));
    },
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
</style>