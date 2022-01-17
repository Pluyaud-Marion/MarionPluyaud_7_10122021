
<template>
  <section>
    <div class="container-create-post">
      <div class="create-post">
        <div class="input-post-file">
          <!-- <input
            class="input-post"
            type="text"
            v-model.lazy="contentPost"
            placeholder="Rédigez votre post..."
          /> -->
          <textarea
            name="post"
            id="input-post"
            cols="60"
            rows="3"
            placeholder="Rédigez votre post..."
            v-model="contentPost"
          ></textarea>

          <input name="file" type="file" v-on:change="fileChangePost" />
        </div>
        <button class="button" @click="createPost()">Publier mon post</button>
        <p class="error-create-post"></p>
      </div>
    </div>
    <div v-if="posts.length < 1">Désolé il n'y a pas de post...</div>
    <!-- 1ère boucle = pour chaque post sur le tableau posts -->
    <article class="vignette" v-for="post in posts" v-bind:key="post.id">
      <div class="author">
        {{ post.User.firstname + " " + post.User.lastname }}
      </div>
      <p class="created-at">{{ formatDate(post.createdAt) }}</p>
      <p class="updated-at" v-if="post.updatedAt > post.createdAt">
        Post modifié le : {{ formatDate(post.updatedAt) }}
      </p>

      <div>
        <div class="content">{{ post.content }}</div>

        <!-- si pas de fichier avec le post = pas de balise img  -->
        <img
          class="img-post"
          v-if="post.attachment"
          v-bind:src="post.attachment"
          alt="image de la publication"
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
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            class="button-delete"
            v-if="admin.length == 4 || userId == post.UserId"
            @click="deletePost(post.id)"
          >
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
        <!-- retour en arriere -->
        <i
          v-show="showUpdate[post.id]"
          class="far fa-times-circle"
          @click="returnBack()"
        ></i>
        <textarea
          v-show="showUpdate[post.id]"
          name="update-post"
          id="update-post"
          cols="60"
          rows="3"
          placeholder="Modifiez votre post..."
          v-model="updateTextPost"
        ></textarea>
        <input
          v-show="showUpdate[post.id]"
          name="file"
          type="file"
          v-on:change="fileChangePost"
        />
        <button
          class="button"
          v-show="showUpdate[post.id]"
          @click="updatePost(post.id)"
        >
          Valider la modification
        </button>
        <p class="error-update-post"></p>
        <!-- <input
          type="text"
          v-model.lazy="updateTextPost"
          placeholder="Modifiez votre post"
        /> -->
      </div>

      <!-- 
          La fonction qui affiche les posts boucle sur chaque post et passe tous les showUpdate à false
          Dans la boucle (dans chaque post) elle boucle sur les commentaires et passe tous les showDoCom à false. 
          Le bouton commenter est a show = true
          Le champ du commentaire est à show = false
          Au clic sur bouton commenter = appel de la méthode "showInputDoCom qui prend en paramètre l'id du post sur lequel est le commentaire et qui passe pour cet id v-show à true (le fait apparaitre)"
           -->

      <button
        class="button"
        v-show="!showDoCom[post.id]"
        @click="showInputDoCom(post.id)"
      >
        Commenter
      </button>

      <div class="new-comment" v-show="showDoCom[post.id]">
        <!-- <input
            type="text"
            v-model.lazy="commentaire"
            placeholder="Votre commentaire ici..."
          /> -->

        <!-- retour en arriere -->
        <i class="far fa-times-circle" @click="returnBack()"></i>

        <textarea
          name="comment"
          cols="50"
          rows="2"
          placeholder="Commentez..."
          v-model="commentaire"
        ></textarea>
        <input type="file" v-on:change="fileChangeComment" />

        <button class="button-validate-com" @click="createComment(post.id)">
          Publier le commentaire
        </button>
        <p class="error-create-com"></p>
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
              <button @click="deleteComment(comment.id)">
                <i class="far fa-trash-alt"></i>
              </button>
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
      showUpdate: [],
      posts: [],

      commentaire: null,
      attachmentCom: null,
      contentPost: null,
      attachment: null,
      updateTextPost: null,

      //user: "",
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
      .get("http://localhost:3000/api/post/", configHeaders)
      // fonction qui affiche les posts boucle sur chaque post et passe tous les showUpdate à false
      // Dans la boucle (dans chaque post) elle boucle sur les commentaires et passe tous les showDoCom à false
      .then((response) => {
        this.posts = response.data;
        console.log("data posts", response.data);
        for (const post of this.posts) {
          this.showUpdate[post.id] = false;
          for (const comment of this.post.Comments) {
            this.showDoCom[comment.id] = false;
          }
        }
      })
      .catch((error) => console.log(error));
  },

  methods: {
    returnBack() {
      window.location = "/posts";
    },
    formatDate(date) {
      return formatRelative(new Date(date), new Date(), { locale: fr });
    },

    fileChangePost(e) {
      this.attachment = e.target.files[0] || e.dataTransfer.files;
    },
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
          url: `http://localhost:3000/api/post/${userIdStorage}`,
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${userTokenStorage}`,
          },
        })
          .then((response) => {
            console.log(response);
            window.location.reload();
          })
          .catch((error) => console.log(error));
      }
    },

    updatePost(postId) {
      let userTokenStorage = localStorage.getItem("token");

      let infos = JSON.stringify({
        content: this.updateTextPost,
      });

      const formData = new FormData();

      if (this.updateTextPost === null && this.attachment === null) {
        document.querySelector(
          ".error-update-post"
        ).innerHTML = `Pour modifier un post vous devez mettre soit du texte, soit un fichier`;
      } else {
        document.querySelector(".error-update-post").innerHTML = ``;
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
          url: `http://localhost:3000/api/post/${postId}`,
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${userTokenStorage}`,
          },
        })
          .then((response) => {
            console.log(response);
            window.location.reload();
          })
          .catch((error) => console.log("il n'y a pas de texte", error));
      }
    },

    deletePost(postId) {
      let userTokenStorage = localStorage.getItem("token");

      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userTokenStorage}`,
        },
      };
      axios
        .delete(`http://localhost:3000/api/post/${postId}`, configHeaders)

        .then((response) => {
          console.log(response);
          alert("Attention ce post va être supprimé");
          window.location.reload();

          // if(confirm("Voulez vous vraiment supprimer ce post?")) {

          // }
        })

        .catch((error) => console.log(error));
    },

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
          ".error-create-com"
        ).innerHTML = `Le commentaire est vide`;
      } else {
        document.querySelector(".error-create-com").innerHTML = ``;
        axios({
          method: "post",
          url: `http://localhost:3000/api/post/comment/${postId}`,
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${userTokenStorage}`,
          },
        })
          .then((response) => {
            console.log("response", response);
            console.log("infos", infos);

            window.location.reload();
          })
          .catch((error) => console.log(error));
      }
    },
    fileChangeComment(e) {
      this.attachmentCom = e.target.files[0] || e.dataTransfer.files;
    },

    deleteComment(commentId) {
      let userTokenStorage = localStorage.getItem("token");

      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userTokenStorage}`,
        },
      };

      axios
        .delete(
          `http://localhost:3000/api/post/comment/${commentId}`,

          configHeaders
        )
        .then((response) => {
          console.log(response);
          alert("Attention ce commentaire va être supprimé");
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
    showInputUpdatePost(postId) {
      this.showUpdate[postId] = !this.showUpdate[postId];
    },
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
section {
  padding-top: 5%;
  background-image: url("../assets/icon.png");
  background-attachment: fixed;
  padding-bottom: 15%;
}
.img-post {
  width: 40%;
}
.img-com {
  width: 50%;
}
.name {
  font-size: large;
  color: red;
}
.container-create-post {
  width: 100%;
  .create-post {
    display: flex;
    justify-content: center;
    align-items: center;
    .input-post-file {
      display: flex;
      flex-direction: column;
    }
  }
  .button {
    height: 30px;
    width: 20%;
    background-color: red;
    opacity: 70%;
    border-radius: 20rem;
    cursor: pointer;
    margin-left: 5%;
    margin-bottom: 3%;
    font-weight: bold;
    &:hover {
      transform: scale(1.2);
    }
  }
}

.vignette {
  margin-top: 5%;
  width: 100%;
  border: red ridge 3mm;
  opacity: 85%;
  border-radius: 20px;
  margin-bottom: 2%;
  background-color: white;
  .author {
    margin-top: 2%;
    font-weight: bold;
    font-size: large;
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
  }

  .updated-at {
    margin-left: 2%;
    text-align: initial;
    margin-top: 0;
    margin-bottom: 0;
  }
  .content {
    font-size: medium;
    font-weight: bold;
    overflow: auto;
    margin-top: 2%;
    text-overflow: ellipsis;
    margin-bottom: 2%;
    font-size: 18px;
  }
  .button {
    height: 30px;
    width: 20%;
    background-color: red;
    opacity: 75%;
    border-radius: 20rem;
    cursor: pointer;
    margin-left: 5%;
    margin-bottom: 3%;
    font-weight: bold;
    &:hover {
      transform: scale(1.2);
    }
  }
  .update {
    border: red solid;
    margin-bottom: 5%;
    .button-update,
    .button-delete {
      margin-right: 10%;
      font-size: x-large;
      border-radius: 20rem;
      padding: 1%;
      background-color: red;
      opacity: 75%;
      cursor: pointer;
    }
  }
  .comments {
    border-top: black dashed;
    .container-comment {
      display: flex;
      flex-direction: column;
    }

    .comment {
      display: flex;
      flex-direction: column;
      border-top: black dashed;
      // padding-top: 2%;
      // border-width: 1px;
      border: solid;
      border-width: 2px;
      border-radius: 10px;
      padding: 1%;
      width: 60%;
      margin: 2%;

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
}
</style>