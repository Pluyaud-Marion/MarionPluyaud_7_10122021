//importation du package fs
const fs = require('fs');

//importation des modèles
const model = require("../models");


exports.createPost = (req,res,next) => {
    const postObject = JSON.parse(req.body.post)
    const post = new model.Post({
        ...postObject,
        attachment : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    post.save()
    .then(()=> res.status(201).json({message : "Publication enregistrée"}))
    .catch(error => res.status(500).json({error}))
};

exports.getAllPost = (req,res,next) => {
    model.Post.findAll()
    .then((allPost)=> res.status(200).json(allPost))
    .catch(error => res.status(400).json({error}))
};

//affiche tous les posts d'une personne
exports.getUserPost = (req, res, next) => {
    model.Post.findAll({
        where : {userId : req.params.id }
    })
    .then(allPostUser => {
        if(allPostUser.length <= 0){ //si le tableau des posts de cet utilisateur est vide
            return res.status(400).json({message : "Cet utilisateur n'a rien publié"})
        } else {
            res.status(200).json(allPostUser)
        }
    })
    .catch(error => res.status(400).json({error}))
};

exports.deletePost = (req, res, next) => {
    model.Post.findOne({
        where : { id: req.params.id }
    })
    .then(post => {
        
            //récupération du nom du fichier à supprimer et split retourne tableau avec avant / après image -> on prend le chemin après
            const filename = post.attachment.split('/images/')[1];
            
            //fs.unlink supprime l'image de la base de données
            fs.unlink(`images/${filename}`, () => {
                model.Post.destroy({
                    where : { id : req.params.id}
                    }) //supprime post par son id de la base de données
                .then(() => res.status(200).json({message : 'La sauce a été supprimée'}))
                .catch(error => res.status(400).json({error}));
            });
    })
    .catch(error => res.status(400).json({error}));
};