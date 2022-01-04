

<template>
  <section>
    <button @click="updatePost()">Mettre à jour</button>
    <button @click="createPost()">Créer un post</button>
    <article class="vignette" v-for="post in posts" v-bind:key="post.id">
      <!--
      <div>
        {{ post.User.firstname + " " + post.User.lastname }}
      </div>
      -->
      <img v-bind:src="post.attachment" alt="" />
      <img src="../assets/chat.jpeg" />
      <div class="content">{{ post.id }}</div>
      <span class="createdat">Post créé le : {{ post.createdAt }}</span>
      <button @click="showComments()">Afficher les commentaires</button>
      <div v-for="comment in comments" v-bind:key="comment.id">
        <div class="comment">Commentaires : {{ comment.contentCom }}</div>
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
      posts: [],
      comments: [],
    };
  },
  //created() {
  // fetch("http://localhost:3000/api/post/")
  //  .then((response) => response.json())
  //  .then((response) => {
  //    this.posts = response;
  //   console.log("posts", this.posts);
  // });
  //fetch(`http://localhost:3000/api/post/comment/${this.posts.id}`)
  // fetch("http://localhost:3000/api/post/comment/1")
  //   .then((response) => response.json())
  //   .then((response) => {
  //     this.comments = response;
  //console.log("comments", this.comments);
  //console.log(this.comments);
  //});
  //},
  methods: {
    updatePost() {
      axios
        .get("http://localhost:3000/api/post/")
        .then((response) => {
          this.posts = response.data; //n'affiche que les datas
          console.log(this.posts);
        })
        .catch((error) => console.log(error));
    },
    showComments() {
      axios
        //.get(`http://localhost:3000/api/post/comment/${this.posts.id}`)
        .get("http://localhost:3000/api/post/comment/2")
        .then((response) => (this.comments = response.data))
        .catch((error) => console.log(error));
    },
    createPost() {
      axios
        .post("http://localhost:3000/api/post/", {
          UserId: 1,
          content: "c'est le contenu du post créé avec axios",
        })
        .then((response) => (this.posts = response.data))
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
.vignette {
  border: gray solid;
  width: 60%;
  margin-left: 20%;
}

.content {
  font-size: medium;
  font-weight: bold;
  border: red solid;
}
</style>