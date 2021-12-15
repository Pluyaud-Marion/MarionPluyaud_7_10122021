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