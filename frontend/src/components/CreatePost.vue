<template>
  <div class="container-create-post">
    <div class="create-post">
      <div class="input-post-file">
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
</template>

<script>
import axios from "axios";
export default {
  name: "CreatePost",
  data() {
    return {
      attachment: null,
      contentPost: null,
    };
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
#input-post {
  border-radius: 10px;
  margin-bottom: 2%;
}
.container-create-post {
  width: 100%;
  .create-post {
    display: flex;
    flex-direction: column;
    width: 90%;
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
      font-size: small;
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
</style>