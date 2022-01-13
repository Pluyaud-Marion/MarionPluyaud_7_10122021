
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
      </div>
    </div>
    <div v-if="posts.length < 1">Désolé il n'y a pas de post...</div>
    <!-- 1ère boucle = pour chaque post sur le tableau posts -->
    <article class="vignette" v-for="post in posts" v-bind:key="post.id">
      <div class="authorPost">
        {{ post.User.firstname + " " + post.User.lastname }}
      </div>
      <p class="created-at">Post créé le : {{ post.createdAt }}</p>
      <p class="updated-at" v-if="post.updatedAt > post.createdAt">
        Post modifié le : {{ post.updatedAt }}
      </p>

      <div>
        <div class="content">{{ post.content }}</div>

        <!-- si pas de fichier avec le post = pas de balise img  -->
        <img
          v-if="post.attachment"
          v-bind:src="post.attachment"
          alt="image de la publication"
        />
      </div>
      <!-- Partie modifier apparait que si admin ou user auteur du post -->
      <div v-if="admin.length == 4 || userId == post.UserId">
        <!-- 
          La fonction qui affiche les posts boucle sur chaque post et passe tous les showUpdate à false
          Dans la boucle (dans chaque post) elle boucle sur les commentaires et passe tous les showDoCom à false. 
          Le bouton modifier est a show = true
          Le champ de modif du post est à show = false
          Au clic sur bouton Modifier = appel de la méthode "showInputUpdatePost qui prend en paramètre l'id du post qu'on veut modifier et qui passe pour cet id v-show à true (le fait apparaitre)"
           -->
        <button
          class="button"
          v-show="!showUpdate[post.id]"
          @click="showInputUpdatePost(post.id)"
        >
          Modifier
        </button>
        <textarea
          v-show="showUpdate[post.id]"
          name="update-post"
          id="update-post"
          cols="60"
          rows="3"
          placeholder="Modifiez votre post..."
          v-model="updateTextPost"
        ></textarea>
        <input name="file" type="file" v-on:change="fileChangePost" />
        <button
          class="button"
          v-show="showUpdate[post.id]"
          @click="updatePost(post.id)"
        >
          Valider la modification
        </button>
        <!-- <input
          type="text"
          v-model.lazy="updateTextPost"
          placeholder="Modifiez votre post"
        /> -->
      </div>

      <button
        class="button"
        v-if="admin.length == 4 || userId == post.UserId"
        @click="deletePost(post.id)"
      >
        Supprimer
      </button>
      <div class="comments">
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
        </div>

        <!-- 2ème boucle = Boucle sur chaque commentaire dans le tableau des commentaires du post = post.Comments -->
        <div
          class="container-comment"
          v-for="comment in post.Comments"
          v-bind:key="comment.id"
        >
          <div class="comment">
            <div class="comment-text">
              {{ comment.User.firstname + " " + comment.User.lastname }} a
              commenté : {{ comment.contentCom }}
            </div>

            <!-- si pas d'url d'image = pas de div -->
            <div v-if="comment.attachmentCom" class="comment-file">
              <img
                v-bind:src="comment.attachmentCom"
                alt="image du commentaire"
              />
            </div>
          </div>
          <div v-if="admin.length == 4 || userId == comment.UserId">
            <button
              class="button"
              id="button-delete"
              @click="deleteComment(comment.id)"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import axios from "axios";

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
    fileChangePost(e) {
      this.attachment = e.target.files[0] || e.dataTransfer.files;
    },
    createPost() {
      //rajouter UserId en paramètre
      let userTokenStorage = localStorage.getItem("token");
      let userIdStorage = localStorage.getItem("userId");

      let infos = JSON.stringify({
        content: this.contentPost,
      });
      const formData = new FormData();
      formData.append("post", infos);
      formData.append("image", this.attachment);

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
    },

    updatePost(postId) {
      let userTokenStorage = localStorage.getItem("token");

      let infos = JSON.stringify({
        content: this.updateTextPost,
      });

      const formData = new FormData();
      formData.append("post", infos);
      formData.append("image", this.attachment);

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
        .catch((error) => console.log(error));
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
img {
  width: 20%;
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
  .authorPost {
    margin-top: 2%;
    font-weight: bold;
    font-size: large;
    text-align: initial;
    margin-left: 2%;
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
  .comments {
    border-top: black dashed;
    padding-top: 2%;
    border-width: 1px;
    .comment {
      display: flex;
    }
    .comment-text,
    .comment-file {
      border: solid;
      border-width: 2px;
      border-radius: 10px;
      width: fit-content;
      padding: 1%;
      margin-left: 5%;
      margin-bottom: 2%;
    }

    .container-comment {
      display: flex;
      flex-direction: column;
    }
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
</style>