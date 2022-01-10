
<template>
  <section>
    <input
      type="text"
      v-model.lazy="contentPost"
      placeholder="Rédigez votre post..."
    />
    <input name="file" type="file" v-on:change="fileChangePost" />

    <button @click="createPost()">Créer un post</button>
    <div v-if="posts.length < 1">Désolé il n'y a pas de post...</div>
    <!-- 1ère boucle = pour chaque post sur le tableau posts -->
    <article class="vignette" v-for="post in posts" v-bind:key="post.id">
      <div>Post de : {{ post.User.firstname + " " + post.User.lastname }}</div>
      <span class="createdat">Post créé le : {{ post.createdAt }}</span>
      <button @click="updatePost(post.id)">Modifier le Post</button>
      <img v-bind:src="post.attachment" alt="image de la publication" />
      <div class="content">{{ post.content }}</div>
      <div>
        <input
          type="text"
          v-model.lazy="commentaire"
          placeholder="Votre commentaire ici..."
        />
        <input type="file" v-on:change="fileChangeComment" />

        <button @click="createComment(post.id)">Commenter</button>
      </div>
      <!-- <button @click="showComments()">Afficher les commentaires</button> -->

      <!-- 2ème boucle = Boucle sur chaque commentaire dans le tableau des commentaires du post = post.Comments -->
      <div v-for="comment in post.Comments" v-bind:key="comment.id">
        <div class="comment">
          {{ user }} a commenté : {{ comment.contentCom }}

          <!-- si pas d'url d'image = pas de balise img -->
          <img
            v-if="comment.attachmentCom != null"
            v-bind:src="comment.attachmentCom"
            alt="image du commentaire"
          />
        </div>
      </div>

      <!--
      <div class="comment">
        Commentaires : {{ post.Comments.map((comment) => comment.contentCom) }}
      </div>
      -->
    </article>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "News",

  data() {
    return {
      posts: [],
      //comments: [],
      commentaire: null,
      attachmentCom: null,
      contentPost: null,
      attachment: null,
      //user: "",
    };
  },
  created() {
    let userToken = localStorage.getItem("token");

    let configHeaders = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    //affiche les posts et leurs commentaires
    axios
      .get("http://localhost:3000/api/post/", configHeaders)

      .then((response) => {
        this.posts = response.data;
        console.log("data posts", response.data);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    fileChangePost(e) {
      console.log(e);
      this.attachment = e.target.files || e.dataTransfer.files;
      console.log(this.attachment);
    },
    createPost() {
      //rajouter UserId en paramètre
      let userTokenStorage = localStorage.getItem("token");
      let userIdStorage = localStorage.getItem("userId");

      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userTokenStorage}`,
        },
      };
      let infos = JSON.stringify({
        content: this.contentPost,
      });
      const formData = new FormData();
      formData.append("post", infos);
      formData.append("file", this.attachment);

      axios
        .post(
          `http://localhost:3000/api/post/${userIdStorage}`,
          formData,
          configHeaders
        )
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },

    createComment(postId) {
      let userTokenStorage = localStorage.getItem("token");
      let userIdStorage = localStorage.getItem("userId");

      let configHeaders = {
        headers: {
          Authorization: `Bearer ${userTokenStorage}`,
        },
      };
      let infos = JSON.stringify({
        UserId: userIdStorage,
        contentCom: this.commentaire,
      });

      const formData = new FormData();
      formData.append("comment", infos);
      formData.append("image", this.attachmentCom);

      axios
        .post(
          `http://localhost:3000/api/post/comment/${postId}`,
          formData,
          configHeaders
        )
        .then((response) => {
          console.log(response);
          window.location.reload();

          //this.user = user;
        })
        .catch((error) => console.log(error));
    },
    fileChangeComment(e) {
      console.log(e);
      this.attachmentCom = e.target.files || e.dataTransfer.files;
      console.log(this.attachmentCom);
    },

    // updatePost(postId) {
    //   let userTokenStorage = localStorage.getItem("token");

    //   let configHeaders = {
    //     headers: {
    //       Authorization: `Bearer ${userTokenStorage}`,
    //     },
    //   };
    //   let infos = JSON.stringify({
    //     content: this.contentPost,
    //   });

    //   const formData = new FormData();
    //   formData.append("post", infos);
    //   formData.append("image", this.attachment);

    //   axios
    //     .put(
    //       `http://localhost:3000/api/post/${postId}`,
    //       formData,
    //       configHeaders
    //     )
    //     .then((response) => {
    //       console.log(response);
    //       window.location.reload();
    //     })
    //     .catch((error) => console.log(error));
    // },

    // showComments() {
    //   axios
    //     //.get(`http://localhost:3000/api/post/comment/${this.posts.id}`)
    //     .get("http://localhost:3000/api/post/comment/2")
    //     .then((response) => (this.comments = response.data))
    //     .catch((error) => console.log(error));
    // },
    /* FONCTIONNE QUAND CODE MODIFIE SUR BACK
  createPost() {
    axios
      .post("http://localhost:3000/api/post/", {
        UserId: 1,
        content:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis, doloremque, repudiandae dicta alias saepe magni et architecto in vitae praesentium labore minus rem mollitia quam nemo quibusdam voluptatibus ratione odio",
      })
      .then((response) => (this.posts = response.data))
      .catch((error) => console.log(error));
  }, */
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
img {
  width: 20%;
}
.vignette {
  border: gray solid;
  border-radius: 2rem;
  width: 60%;
  margin-left: 20%;
  margin-bottom: 2%;
}

.content {
  font-size: medium;
  font-weight: bold;
  border: red solid;
  border-radius: 2rem;
}

.comment {
  border: green solid;
  border-radius: 2rem;
}
</style>