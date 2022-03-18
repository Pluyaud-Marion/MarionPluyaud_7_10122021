
<template>
  <section>
    <div class="container-create-post">
      <div class="create-post">
        <div class="input-post-file">
          <label for="input-post" title="nouveau post">Nouveau post</label>
          <textarea
            aria-label="input rédaction du contenu du post"
            title="rédaction du contenu du post ici"
            name="post"
            id="input-post"
            cols="60"
            rows="3"
            placeholder="Rédigez votre post..."
            v-model="contentPost"
          ></textarea>
          <label for="file-post">Choisissez votre fichier</label>
          <input
            class="file"
            id="file-post"
            name="file-post"
            type="file"
            v-on:change="fileChangePost"
          />
        </div>
        <button class="button" @click="createPost()" role="button">
          Publier mon post
        </button>
        <p class="error-create-post"></p>
      </div>
    </div>
    <div v-if="posts.length < 1">Désolé il n'y a pas de post...</div>
    <!-- 1ère boucle = pour chaque post sur le tableau posts -->
    <article class="vignette" v-for="post in posts" v-bind:key="post.id">
      <div class="post">
        <div class="author">
          {{ post.User.firstname + " " + post.User.lastname }}
        </div>
        <p class="created-at">{{ formatDate(post.createdAt) }}</p>
        <p class="updated-at" v-if="post.updatedAt > post.createdAt">
          Post modifié le : {{ formatDate(post.updatedAt) }}
        </p>
        <div class="container-post">
          <div class="content">{{ post.content }}</div>
          <!-- si pas de fichier avec le post = pas de balise img  -->
          <img
            class="img-post"
            v-if="post.attachment"
            v-bind:src="post.attachment"
            :alt="'image du post : ' + post.id"
          />
        </div>
        <!-- Partie modifier apparait que si admin ou user auteur du post -->
        <div class="update" v-if="admin.length == 4 || userId == post.UserId">
          <!-- 
          La fonction qui affiche les posts boucle sur chaque post et passe tous les showUpdate à false
          Dans la boucle (dans chaque post) elle boucle sur les commentaires et passe tous les showDoCom à false. 
          Le bouton modifier est a show = true
          Le champ de modif du post est à show = false
          Au clic sur bouton Modifier = appel de la méthode "showInputUpdatePost qui prend en paramètre l'id du post qu'on veut modifier et qui passe pour cet id v-show à true (le fait apparaitre)"
           -->
          <div class="button-update-delete">
            <button
              class="button-update"
              v-show="!showUpdate[post.id]"
              @click="showInputUpdatePost(post.id)"
              role="button"
            >
              Modifier
            </button>
            <button
              v-show="!showUpdate[post.id]"
              class="button-delete"
              v-if="admin.length == 4 || userId == post.UserId"
              @click="deletePost(post.id)"
              role="button"
            >
              Supprimer
            </button>
          </div>

          <div class="update-container">
            <label v-bind:for="'postUpdate' + post.id"
              >Modifiez votre post</label
            >
            <textarea
              v-bind:id="'postUpdate' + post.id"
              v-show="showUpdate[post.id]"
              class="update-post"
              cols="60"
              rows="3"
              placeholder="Modifiez votre post..."
              v-model="updateTextPost"
            ></textarea>
            <label v-bind:for="'fileUpdatePost' + post.id"
              >Choisissez votre fichier pour modifier votre post</label
            >
            <input
              class="file"
              v-show="showUpdate[post.id]"
              v-bind:id="'fileUpdatePost' + post.id"
              type="file"
              v-on:change="fileChangePost"
            />
          </div>
          <div class="update-return-button">
            <button
              v-show="showUpdate[post.id]"
              @click="returnUpdate(post.id)"
              role="button"
            >
              Annuler
            </button>
            <button
              v-show="showUpdate[post.id]"
              @click="updatePost(post.id)"
              role="button"
            >
              Valider
            </button>
          </div>
          <p :id="'error-update-post' + post.id"></p>
        </div>
      </div>

      <!-- 
          La fonction qui affiche les posts boucle sur chaque post et passe tous les showUpdate à false
          Dans la boucle (dans chaque post) elle boucle sur les commentaires et passe tous les showDoCom à false. 
          Le bouton commenter est a show = true
          Le champ du commentaire est à show = false
          Au clic sur bouton commenter = appel de la méthode "showInputDoCom qui prend en paramètre l'id du post sur lequel est le commentaire et qui passe pour cet id v-show à true (le fait apparaitre)"
           -->
      <!-- <CreateComment :postId="post.id" /> -->

      <button
        class="button"
        v-show="!showDoCom[post.id]"
        @click="showInputDoCom(post.id)"
        role="button"
      >
        Commenter
      </button>

      <div class="new-comment" v-show="showDoCom[post.id]">
        <div class="create-com-container">
          <label v-bind:for="'createComment' + post.id">Commentez</label>
          <textarea
            v-bind:id="'createComment' + post.id"
            class="create-com"
            name="comment"
            cols="50"
            rows="2"
            placeholder="Commentez..."
            v-model="commentaire"
          ></textarea>
          <label v-bind:for="'fileCreateComment' + post.id"
            >Choisissez votre fichier pour ajouter au commentaire</label
          >
          <input
            class="file"
            v-bind:id="'fileCreateComment' + post.id"
            type="file"
            v-on:change="fileChangeComment"
          />
        </div>

        <div class="create-return-button">
          <button
            v-show="!showUpdate[post.id]"
            @click="returnComment(post.id)"
            role="button"
          >
            Annuler
          </button>
          <button
            class="button-validate-com"
            @click="createComment(post.id)"
            role="button"
          >
            Commenter
          </button>
        </div>
        <p :id="'error-create-com' + post.id"></p>
      </div>

      <div class="comments">
        <!-- 2ème boucle = Boucle sur chaque commentaire dans le tableau des commentaires du post = post.Comments -->
        <div
          class="container-comment"
          v-for="comment in post.Comments"
          v-bind:key="comment.id"
        >
          <!-- v-if="comment.length > 2 -->
          <div class="comment">
            <p class="author-com">
              {{ comment.User.firstname + " " + comment.User.lastname }}
            </p>
            <span class="created-at"> {{ formatDate(comment.createdAt) }}</span>
            <div class="comment-container">
              <p class="content">{{ comment.contentCom }}</p>

              <div class="comment-file" v-if="comment.attachmentCom">
                <img
                  class="img-com"
                  v-bind:src="comment.attachmentCom"
                  alt="image du commentaire"
                />
              </div>
              <div
                class="button-delete-com"
                v-if="admin.length == 4 || userId == comment.UserId"
              >
                <button
                  @click="deleteComment(comment.id)"
                  role="button"
                  aria-label="bouton pour supprimer"
                >
                  <label :for="'delete' + post.id">Boutton suppression</label>
                  <i
                    :id="'delete' + post.id"
                    class="far fa-trash-alt"
                    alt="icone pour suppression"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import axios from "axios";
import { formatRelative } from "date-fns";
import { fr } from "date-fns/locale";

export default {
  name: "News",

  data() {
    return {
      showDoCom: [],
      admin: "",
      userId: "",
      userToken: "",
      showUpdate: [],
      posts: [],
      commentaire: null,
      attachmentCom: null,
      contentPost: null,
      attachment: null,
      updateTextPost: null,
    };
  },

  created() {
    let admin = localStorage.getItem("isadmin");
    let userToken = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    this.admin = admin;
    this.userId = userId;

    let configHeaders = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    //affiche les posts et leurs commentaires
    axios
      .get(`${process.env.VUE_APP_LOCALHOST}post/`, configHeaders)
      // fonction qui affiche les posts boucle sur chaque post et passe tous les showUpdate à false + les showDoCom à false
      .then((response) => {
        this.posts = response.data;
        for (const post of this.posts) {
          this.showUpdate[post.id] = false;
          this.showDoCom[post.id] = false;
        }
      })
      .catch((error) => console.log(error));
  },

  methods: {
    /*
    Méthode permettant l'affichage de tous les posts
    */
    displayPosts() {
      let userToken = localStorage.getItem("token");
      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      axios
        .get(`${process.env.VUE_APP_LOCALHOST}post/`, configHeaders)
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => console.log(error));
    },

    /*
    Méthode permettant de formater la date
    */
    formatDate(date) {
      return formatRelative(new Date(date), new Date(), { locale: fr });
    },

    /*
    Méthode permettant la gestion des fichiers pour la création des posts
    */
    fileChangePost(e) {
      this.attachment = e.target.files[0] || e.dataTransfer.files;
    },

    /*
    Méthode permettant la création d'un post / 
    avec fichier + texte /
    avec fichier uniquement /
    avec texte uniquement /
    */
    createPost() {
      let userTokenStorage = localStorage.getItem("token");
      let userIdStorage = localStorage.getItem("userId");

      let infos = JSON.stringify({
        content: this.contentPost,
      });
      const formData = new FormData();
      formData.append("post", infos);
      formData.append("image", this.attachment);

      if (this.contentPost === null && this.attachment === null) {
        document.querySelector(
          ".error-create-post"
        ).innerHTML = `Rien à poster`;
      } else {
        document.querySelector(".error-create-post").innerHTML = ``;
        axios({
          method: "post",
          url: `${process.env.VUE_APP_LOCALHOST}post/${userIdStorage}`,
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${userTokenStorage}`,
          },
        })
          .then(() => {
            // passe les inputs contentPost et attachment à null
            this.contentPost = null;
            this.attachment = null;
            document.querySelector("#file-post").value = null;
            this.displayPosts();
          })
          .catch((error) => console.log(error));
      }
    },

    /*
    Méthode permettant la modification d'un post
    Accessible pour l'admin
    Accessible pour l'utilisateur créateur du post
    Vérification Backend
    */
    updatePost(postId) {
      let userTokenStorage = localStorage.getItem("token");

      let infos = JSON.stringify({
        content: this.updateTextPost,
      });

      const formData = new FormData();

      if (this.updateTextPost === null && this.attachment === null) {
        document.querySelector(
          `#error-update-post${postId}`
        ).innerHTML = `Pour modifier ce post, vous devez modifier le fichier ou le texte`;
      } else {
        document.querySelector(`#error-update-post${postId}`).innerHTML = ``;
        if (!this.updateTextPost) {
          formData.append("image", this.attachment);
        } else if (!this.attachment) {
          formData.append("post", infos);
        } else {
          formData.append("image", this.attachment);
          formData.append("post", infos);
        }
        axios({
          method: "put",
          url: `${process.env.VUE_APP_LOCALHOST}post/${postId}`,
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${userTokenStorage}`,
          },
        })
          .then(() => {
            // passe les inputs updateTextPost et attachment à null
            this.updateTextPost = null;
            this.attachment = null;
            document.querySelector(`#fileUpdatePost${postId}`).value = null;
            this.displayPosts();
            // appelle la fonction pour passer les balises de modification à false (non visibles)
            this.showInputUpdatePost(postId);
          })
          .catch((error) => console.log("il n'y a pas de texte", error));
      }
    },

    /*
    Méthode permettant la suppression d'un post
    Accessible pour l'admin
    Accessible pour l'utilisateur créateur du post
    Vérification Backend
    */
    deletePost(postId) {
      let userTokenStorage = localStorage.getItem("token");

      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userTokenStorage}`,
        },
      };
      if (confirm("Voulez vous vraiment supprimer ce post?")) {
        axios
          .delete(
            `${process.env.VUE_APP_LOCALHOST}post/${postId}`,
            configHeaders
          )
          .then(() => {
            this.displayPosts();
          })
          .catch((error) => console.log(error));
      }
    },

    /*
    Méthode permettant la création d'un commentaire / 
    avec fichier + texte /
    avec fichier uniquement /
    avec texte uniquement /
    */
    createComment(postId) {
      let userTokenStorage = localStorage.getItem("token");
      let userIdStorage = localStorage.getItem("userId");

      let infos = JSON.stringify({
        UserId: userIdStorage,
        contentCom: this.commentaire,
      });

      const formData = new FormData();
      formData.append("comment", infos);
      formData.append("image", this.attachmentCom);

      if (this.attachmentCom === null && this.commentaire === null) {
        document.querySelector(
          `#error-create-com${postId}`
        ).innerHTML = `Le commentaire est vide`;
      } else {
        document.querySelector(`#error-create-com${postId}`).innerHTML = ``;
        axios({
          method: "post",
          url: `${process.env.VUE_APP_LOCALHOST}post/comment/${postId}`,
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${userTokenStorage}`,
          },
        })
          .then(() => {
            // passe les inputs commentaire et attachmentCom à null
            this.commentaire = null;
            this.attachmentCom = null;
            document.querySelector(`#fileCreateComment${postId}`).value = null;
            this.displayPosts();
            //appelle fonction pour passer les balises pour commenter à false (non visibles)
            this.showInputDoCom(postId);
          })
          .catch((error) => console.log(error));
      }
    },

    /*
    Méthode permettant la gestion des fichiers d'un commentaire
    */
    fileChangeComment(e) {
      this.attachmentCom = e.target.files[0] || e.dataTransfer.files;
    },

    /*
    Méthode permettant la suppression d'un post
    Accessible pour l'admin
    Accessible pour l'utilisateur créateur du post
    Vérification Backend
    */
    deleteComment(commentId) {
      let userTokenStorage = localStorage.getItem("token");

      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userTokenStorage}`,
        },
      };
      if (confirm("Voulez vous vraiment supprimer ce commentaire?")) {
        axios
          .delete(
            `${process.env.VUE_APP_LOCALHOST}post/comment/${commentId}`,
            configHeaders
          )
          .then(() => {
            this.displayPosts();
          })
          .catch((error) => console.log(error));
      }
    },

    /*
    passe le contenu des inputs commentaire et attachementCom à null
    + retire le message d'erreur
    + appelle la fonction showInputDoCom pour passer toutes les balises de commentaire à false (n'apparaissent plus)
    */
    returnComment(postId) {
      this.commentaire = null;
      this.attachmentCom = null;
      document.querySelector(`#fileCreateComment${postId}`).value = null;
      document.querySelector(`#error-create-com${postId}`).innerHTML = ``;
      this.showInputDoCom(postId);
    },

    /*
    passe le contenu des inputs updateTextPost et attachement à null
    + retire le message d'erreur
    + appelle la fonction showInputUpdatePost pour passer toutes les balises de modification à false (n'apparaissent plus)
    */
    returnUpdate(postId) {
      this.updateTextPost = null;
      this.attachment = null;
      document.querySelector(`#fileUpdatePost${postId}`).value = null;
      document.querySelector(`#error-update-post${postId}`).innerHTML = ``;
      this.showInputUpdatePost(postId);
    },

    /*
    (Dans data les balises showUpdate sont un []
    A l'affichage des posts -> toutes ces balises passent à false)
    Fonction = 
    passe toutes les balises showUpdate du post à false -> les balises pour modifier n'apparaissent plus
    */
    showInputUpdatePost(postId) {
      this.showUpdate[postId] = !this.showUpdate[postId];
    },

    /*
    (Dans data les balises showDoCom sont un []
    A l'affichage des posts -> toutes ces balises passent à false)
    Fonction =
    passe toutes les balises showDoCom du post à false -> les balises pour commenter n'apparaissent plus
    */
    showInputDoCom(postId) {
      this.showDoCom[postId] = !this.showDoCom[postId];
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  margin: 0 auto;
}
#input-post {
  border-radius: 10px;
  margin-bottom: 2%;
  width: 100%;
  font-size: 15px;
}
.container-create-post {
  width: 80%;
  margin: 0 auto;
  .create-post {
    display: flex;
    flex-direction: column;
    width: 100%;
    .error-create-post {
      font-style: italic;
    }
    .input-post-file {
      display: flex;
      flex-direction: column;
    }
    .button {
      border-radius: 10px;
      background-color: #df7512;
      border: none;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      color: black;
      box-shadow: 0px 0px 4px;
      padding-right: 5%;
      padding-left: 5%;
      padding-top: 1%;
      padding-bottom: 1%;
      width: 30%;
      margin-top: 3%;
    }
  }
}
.img-post {
  width: 100%;
  border-radius: 10px;
}
.img-com {
  width: 100%;
  border-radius: 10px;
}
.name {
  font-size: large;
  color: red;
}
.vignette {
  margin-top: 5%;
  width: 80%;
  margin: 0 auto;
  box-shadow: 0px 0px 11px 1px;
  border-radius: 20px;
  margin-bottom: 2%;
  background-color: white;
  padding-top: 2%;
  .post {
    background-color: #fff3e7;
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
  }
  .author {
    margin-top: 2%;
    font-weight: bold;
    font-size: 16px;
    text-align: initial;
    margin-left: 2%;
  }
  .author-com {
    font-weight: bold;
    font-size: medium;
    text-align: initial;
    margin-left: 2%;
    margin-bottom: 0;
  }
  .created-at {
    margin-left: 2%;
    text-align: initial;
    margin-top: 0;
    margin-bottom: 0;
    font-style: italic;
    font-size: 12px;
  }

  .updated-at {
    margin-left: 2%;
    text-align: initial;
    margin-top: 0;
    margin-bottom: 0;
    font-style: italic;
    font-size: 12px;
  }
  .content {
    font-size: medium;
    font-weight: bold;
    overflow: auto;
    margin-top: 2%;
    text-overflow: ellipsis;
    margin-bottom: 2%;
    font-size: 18px;
    text-align: left;
  }
  .container-post {
    width: 70%;
    margin: 0 auto;
    margin-top: 7%;
  }
  .update {
    padding-bottom: 2%;
    .button-update-delete {
      display: flex;
      justify-content: space-between;
      width: 25%;
      margin: 0 auto;
      margin-top: 3%;
    }
    .button-update,
    .button-delete {
      border: none;
      background: none;

      border-radius: 10px;
      background-color: #ff9830cc;
      border: none;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
      box-shadow: 0px 0px 4px;
    }
    .update-post {
      border-radius: 10px;
      margin-bottom: 2%;
    }
    .update-container {
      display: flex;
      flex-direction: column;
      width: 90%;
      margin: 0 auto;
    }
    .update-return-button {
      display: flex;
      width: 30%;
      justify-content: space-between;
      margin: 0 auto;
      margin-top: 3%;
      margin-bottom: 3%;
      button {
        border-radius: 10px;
        background-color: #ff9830cc;
        border: none;
        font-weight: bold;
        font-size: 15px;
        cursor: pointer;
        box-shadow: 0px 0px 4px;
      }
    }
  }
  .button {
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
  }
  .comments {
    background-color: #fff3e7;
    border-radius: 0 0 20px 20px;
    .container-comment {
      display: flex;
      flex-direction: column;
      margin-top: 5%;
    }

    .comment {
      display: flex;
      flex-direction: column;
      border-width: 2px;
      border-radius: 10px;
      padding: 1%;
      width: 60%;
      margin: 2%;
      background-color: #faa24fb3;

      .new-comment {
        display: flex;
        flex-direction: column;
        width: 50%;
        align-items: center;
      }
      .button-validate-com {
        height: 30px;
        width: 50%;
        background-color: red;
        opacity: 75%;
        border-radius: 20rem;
        cursor: pointer;
        margin-left: 5%;
        margin-bottom: 3%;
        margin-top: 3%;
        font-weight: bold;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
  .create-com-container {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    margin-top: 3%;
    .create-com {
      border-radius: 10px;
      margin-bottom: 2%;
    }
  }
  .create-return-button {
    display: flex;
    width: 30%;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 3%;
    padding-bottom: 3%;
    button {
      border-radius: 10px;
      background-color: #ff9830cc;
      border: none;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
      box-shadow: 0px 0px 4px;
    }
  }
  .comment-container {
    width: 80%;
    margin: 0 auto;
    margin-top: 5%;
  }
}
@media screen and (max-width: 480px) {
  #input-post {
    font-size: 10px;
  }
  .container-create-post {
    .create-post {
      width: 100%;
      .button {
        width: 100%;
      }
    }
  }
  .vignette .update .button-update-delete,
  .vignette .create-return-button,
  .vignette .update .update-return-button {
    width: 80%;
    button {
      font-size: 10px;
    }
  }
  .vignette {
    width: 100%;
    margin-top: 5%;
    .button {
      font-size: 10px;
    }
    .content {
      font-size: 13px;
    }
    .author,
    .author-com {
      font-size: 12px;
    }
    .created-at,
    .updated-at {
      font-size: 10px;
    }
    .comments .comment {
      width: 80%;
    }
    .container-post {
      width: 100%;
    }
  }
  .file {
    font-size: 10px;
  }
}
@media screen and (min-width: 1440px) {
  #input-post,
  #file-post,
  .update-post,
  .create-com,
  .file {
    font-size: 20px;
  }
  .container-create-post .create-post .button {
    font-size: 20px;
  }
  .vignette .update .button-update-delete,
  .vignette .create-return-button,
  .vignette .update .update-return-button {
    button {
      font-size: 20px;
    }
  }

  .vignette {
    width: 80%;
    margin: 3% auto;
    .author,
    .author-com {
      font-size: 20px;
    }
    .created-at,
    .updated-at {
      font-size: 15px;
    }
    .content {
      font-size: 25px;
    }
    .button {
      font-size: 20px;
    }
  }
  .far {
    font-size: x-large;
  }
}
</style>