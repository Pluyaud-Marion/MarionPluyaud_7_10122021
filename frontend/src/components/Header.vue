<template>
    <section>
        <img src="../assets/chat.jpeg" alt="photo-chat">
        <h2>Titre de la page</h2>
   
        <button class="button-inscription">S'inscrire</button>
        <button class="button-connexion">Se connecter</button>
    </section>
    
 
    
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>

.button-inscription, .button-connexion
{
    width: 20%;
    height: 50px;
    border-radius: 20px;
    background-color:coral;
    color: black;
}
.button-connexion {
    margin-left: 10%;
}
</style>