<template>
  <section class="container-profile">
    <h1>Votre Profil - {{ user }}</h1>
    <!-- Si admin = false -->
    <div v-if="admin.length == 5">
      <h2>Mes informations</h2>
      <div class="container-inputs">
        <div class="input">
          <label for="firstname" class="display"
            >Prénom : {{ infos.firstname }}</label
          >
          <input
            id="firstname"
            v-show="showUser"
            type="text"
            v-model="infos.firstname"
          />
        </div>
        <div class="input">
          <label for="lastname" class="display"
            >Nom : {{ infos.lastname }}</label
          >
          <input
            id="lastname"
            v-show="showUser"
            type="text"
            v-model="infos.lastname"
          />
        </div>
        <div class="input">
          <label for="email" class="display">Email : {{ infos.email }}</label>
          <input
            id="email"
            v-show="showUser"
            type="text"
            v-model="infos.email"
          />
        </div>
        <div class="input">
          <label for="password" class="display"
            >Mot de passe : {{ "*********" }}
          </label>
          <input
            id="password"
            v-show="showUser"
            type="password"
            placeholder="Sécurité - Renseignez votre mot de passe"
            v-model="newPassword"
          />
        </div>
        <div class="input">
          <label v-show="showUser" for="passwordConfirm" class="display"
            >Pour des raisons de sécurité, vous devez confirmer le mot de
            passe</label
          >
          <input
            id="passwordConfirm"
            v-show="showUser"
            type="password"
            placeholder="Sécurité - confirmez votre mot de passe"
            v-model="newPasswordVerify"
          />
        </div>
        <div class="input">
          <label for="job" class="display"
            >Fonction dans l'entreprise : {{ infos.job }}</label
          >
          <input id="job" v-show="showUser" type="text" v-model="infos.job" />
        </div>
        <p class="date">
          Date de création du compte : {{ formatDate(infos.createdAt) }}
        </p>
      </div>
      <button class="button-update" v-show="showUser" @click="update()">
        Valider les modifications
      </button>

      <p class="error" v-text="errors"></p>
      <div class="button-update-delete">
        <button
          class="button-update"
          v-show="!showUser"
          @click="showUser = !showUser"
        >
          Modifier ton profil
        </button>
        <button class="button-delete" @click="deleteProfile()">
          Supprimer ton profil
        </button>
        <button class="button-update" v-show="showUser" @click="returnBack()">
          Retour
        </button>
      </div>
    </div>

    <div v-else>
      <div class="home-admin">
        Vous êtes administrateur du site
        <button class="button-all-profiles-admin" @click="showAllProfiles()">
          Voir tous les profils d'utilisateurs
        </button>
      </div>
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
        <div class="container-inputs">
          <div class="input">
            <label :for="'firstname-by-admin' + profile.id" class="display"
              >Prénom : {{ profile.firstname }}</label
            >
            <input
              :id="'firstname-by-admin' + profile.id"
              v-show="show[profile.id]"
              type="text"
              v-model="profile.firstname"
            />
          </div>
          <div class="input">
            <label :for="'lastname-by-admin' + profile.id" class="display"
              >Nom : {{ profile.lastname }}</label
            >
            <input
              :id="'lastname-by-admin' + profile.id"
              v-show="show[profile.id]"
              type="text"
              v-model="profile.lastname"
            />
          </div>
          <div class="input">
            <label :for="'job-by-admin' + profile.id" class="display"
              >Job : {{ profile.job }}</label
            >

            <input
              :id="'job-by-admin' + profile.id"
              v-show="show[profile.id]"
              type="text"
              v-model="profile.job"
            />
          </div>
          <div class="input">
            <label :for="'email-by-admin' + profile.id" class="display"
              >Email : {{ profile.email }}</label
            >

            <input
              :id="'email-by-admin' + profile.id"
              v-show="show[profile.id]"
              type="text"
              v-model="profile.email"
            />
          </div>
        </div>
        <button
          class="button-update-profile"
          v-show="!show[profile.id]"
          @click="showInput(profile.id)"
        >
          Modifier le profil de cet utilisateur
        </button>
        <button
          class="button-update-validate-profile"
          v-show="show[profile.id]"
          @click="updateByAdmin(profile.id)"
        >
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
import router from "@/router";

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

  /*
    Permet l'affichage des informations du profil pour l'utilisateur non admin
    */
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
      .get(`${process.env.VUE_APP_LOCALHOST}user/full/${userId}`, configHeaders)
      .then((response) => {
        this.infos = response.data;
      })
      .catch((error) => console.log(error));
  },

  methods: {
    /*
    Méthode permettant d'afficher les informations du profil
    */
    displayProfileUser() {
      let user = localStorage.getItem("name");
      let userToken = localStorage.getItem("token");
      let userId = localStorage.getItem("userId");

      this.user = user;
      this.userId = userId;

      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      axios
        .get(
          `${process.env.VUE_APP_LOCALHOST}user/full/${userId}`,
          configHeaders
        )
        .then((response) => {
          this.infos = response.data;
        })
        .catch((error) => console.log(error));
    },

    returnBack() {
      router.push("/posts");
    },

    /*
    Méthode permettant de return true si les champs ne sont pas vides
    */
    validateFields() {
      return (
        this.infos.email != "" &&
        this.infos.firstname != "" &&
        this.infos.lastname != "" &&
        this.newPassword != "" &&
        this.newPasswordVerify != "" &&
        this.infos.job != ""
      );
    },

    /*
    Méthode permettant de formater la date
    */
    formatDate() {
      return format(new Date(), "dd-MM-yyyy", { locale: fr });
    },

    /*
    Méthode permettant à un utilisateur de modifier son profil
    */
    update() {
      //localStorage.removeItem("name"); //retire du LS le champ name à l'appel de la fonction update
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
        this.validateFields()
      ) {
        if (this.newPassword === this.newPasswordVerify) {
          axios
            .put(
              `${process.env.VUE_APP_LOCALHOST}user/${userId}`,
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
              localStorage.removeItem("name"); //retire du LS le champ name à l'appel de la fonction update
              //met dans le LS le nouveau nom
              const name = this.infos.firstname + " " + this.infos.lastname;
              localStorage.setItem("name", name);
              document.querySelector(".error").innerHTML = ``;

              // (response.data.firstname = this.infos.firstname),
              //   (response.data.lastname = this.infos.lastname),
              //   (response.data.email = this.infos.email),
              //   (response.data.password = this.newPassword),
              //   (response.data.job = this.infos.job);

              //passe showUser à true pour que les inputs de modification disparaissent
              this.showUser = !this.showUser;
              this.displayProfileUser();
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
          "Votre nom, prénom et fonction ne doit contenir que des lettres et tous les champs doivent être complêtés ";
      }
    },

    /*
    Méthode permettant à un utilisateur de supprimer son profil 
    Supprime aussi les posts et commentaires qu'il avait publié
    */
    deleteProfile() {
      let userToken = localStorage.getItem("token");
      let userId = localStorage.getItem("userId");
      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      if (confirm("Voulez vous vraiment supprimer votre profil?")) {
        axios
          .delete(
            `${process.env.VUE_APP_LOCALHOST}user/${userId}`,
            configHeaders
          )
          .then(() => {
            router.push("/");
          })
          .catch((error) => console.log(error));
      }
    },

    /*
    Méthode permettant d'afficher tous les profils utilisateurs (sauf le sien)
    uniquement accessible à l'admin
    */
    showAllProfiles() {
      let userToken = localStorage.getItem("token");

      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      axios
        .get(`${process.env.VUE_APP_LOCALHOST}user`, configHeaders)
        .then((response) => {
          this.profiles = response.data;

          //La fonction qui affiche les profils boucle sur chaque profil et passe tous les show à false
          for (const profile of this.profiles) {
            this.show[profile.id] = false;
          }
        })
        .catch((error) => console.log(error));
    },

    /*
    Méthode permettant à l'admin de modifier le profil d'un utilisateur
    */
    updateByAdmin(userId) {
      let userToken = localStorage.getItem("token");

      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      for (const profile of this.profiles) {
        if (profile.id === userId) {
          console.log("profile", profile);
          axios
            .put(
              `${process.env.VUE_APP_LOCALHOST}user/admin/${userId}`,
              {
                firstname: profile.firstname,
                lastname: profile.lastname,
                email: profile.email,
                job: profile.job,
              },
              configHeaders
            )
            .then(() => {
              this.showAllProfiles();
            })
            .catch((error) => console.log(error));
        }
      }
    },

    /*
    (Dans data les balises show sont un []
    A l'appel de la méthode showAllProfiles() -> toutes ces balises passent à false)
    Fonction =
    passe toutes les balises show de l'userId à true -> les balises pour modifier le profil de l'userId n'apparaissent plus
    */
    showInput(userId) {
      this.show[userId] = !this.show[userId];
    },
  },
};
</script>

<style lang="scss" scoped>
.display {
  display: inline;
}
.container-inputs {
  text-align: initial;
  padding-top: 3%;
  .date {
    margin-left: 5%;
  }
}
.bloc-profil {
  margin: 0 auto;
  margin-bottom: 5%;
  padding-bottom: 3%;
  background-color: #fff3e7;
  border-radius: 10px;
  width: 90%;
  button {
    margin-top: 2%;
  }
  .input {
    display: flex;
    flex-direction: column;
    margin: 2% 5%;
  }
}

.button-update-delete {
  width: 100%;

  display: flex;
  justify-content: space-around;
}
.button-update,
.button-delete {
  margin-top: 5%;
  border-radius: 10px;
  background-color: #ff9830cc;
  border: none;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  margin-bottom: 5%;
  box-shadow: 0px 0px 4px;
  width: 30%;
}

.container-profile {
  margin-top: 5%;
  width: 80%;
  margin: 0 auto;
  box-shadow: 0px 0px 11px 1px;
  border-radius: 20px;
  margin-bottom: 2%;
  background-color: white;
  padding-top: 2%;
  padding-bottom: 5%;
  .home-admin {
    display: flex;
    flex-direction: column;
    .button-all-profiles-admin {
      margin-top: 5%;
      border-radius: 10px;
      background-color: #ff9830cc;
      border: none;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
      padding-right: 5%;
      padding-left: 5%;
      padding-top: 1%;
      padding-bottom: 1%;
      margin-bottom: 5%;
      box-shadow: 0px 0px 4px;
      width: 50%;
      margin: 2% auto;
    }
  }
  .button-update-profile {
    margin-top: 5%;
    border-radius: 10px;
    background-color: #ff9830cc;
    border: none;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    padding-right: 5%;
    padding-left: 5%;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-bottom: 5%;
    box-shadow: 0px 0px 4px;
    width: 50%;
    margin: 2% auto;
  }
  .button-update-validate-profile {
    margin-top: 5%;
    border-radius: 10px;
    background-color: #ff9830cc;
    border: none;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;

    box-shadow: 0px 0px 4px;
    width: 50%;
    margin: 2% auto;
  }
}
.input {
  display: flex;
  flex-direction: column;
  margin: 3% 5%;
}
h2 {
  font-size: 15px;
}
@media screen and (max-width: 480px) {
  h1 {
    font-size: medium;
  }
  h2,
  .home-admin {
    font-size: small;
  }
  .container-inputs {
    font-size: small;
  }
  .button-update,
  .button-delete {
    font-size: 12px;
    width: 40%;
  }
  .input {
    margin-bottom: 7%;
  }
  .error {
    font-size: 10px;
  }
  .container-profile .home-admin .button-all-profiles-admin,
  .container-profile .button-update-profile,
  .container-profile .button-update-validate-profile {
    width: 90%;
    font-size: 10px;
    margin-top: 5%;
    margin-bottom: 5%;
  }
  .input input {
    font-size: 10px;
    margin-bottom: 3%;
  }
  .input label {
    font-size: 10px;
    margin-bottom: 1%;
  }
  .container-profile {
    width: 100%;
  }
  .date {
    font-size: 10px;
  }
}
@media screen and (min-width: 1440px) {
  .container-profile {
    width: 80%;
    margin: 0 auto;
  }
  h1 {
    font-size: 35px;
  }
  h2 {
    font-size: 25px;
  }
  .container-inputs {
    font-size: 20px;
  }
  .button-update,
  .button-delete {
    font-size: 25px;
  }
  .input,
  .date,
  .home-admin {
    font-size: 25px;
  }
  .container-profile .home-admin .button-all-profiles-admin,
  .container-profile .button-update-profile,
  .container-profile .button-update-validate-profile {
    font-size: 23px;
  }
  #firstname,
  #lastname,
  #email,
  #password,
  #passwordConfirm,
  #job {
    font-size: 20px;
  }
  .error {
    font-size: 20px;
  }
  .input input {
    font-size: 25px;
  }
  .input label {
    margin-bottom: 1%;
  }
}
</style>