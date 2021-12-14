//importation du package fs
const fs = require('fs');

//importation des modèles
const model = require("../models");

exports.createPost = (req,res,next) => {
    model.Post.create({
        UserId : req.body.userId,
        title : req.body.title,
        content : req.body.content,
        attachment : req.body.attachment
        //attachment : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    .then(()=> res.status(201).json({message : "Publication enregistrée"}))
    .catch(error => res.status(500).json({error}))
};

exports.getAllPost = (req,res,next) => {
    model.Post.findAll()
    .then((allPost)=> res.status(200).json(allPost))
    .catch(error => res.status(400).json({error}))
};