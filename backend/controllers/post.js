//importation du package fs
const { mode } = require('crypto-js');
const fs = require('fs');
const { title } = require('process');

//const { json } = require('sequelize/dist');

//importation des modèles
const model = require("../models");


exports.createPost = (req,res,next) => {
    const contentText = req.body.post

    //trouve l'auteur du post grâce à son id
    model.User.findOne({
        attributes: ['firstname', 'lastname', 'id'],
        where : {id : res.locals.token.userId}
    })
    //auteur contenue dans la promesse -> authorPost
    .then(authorPost => {
        //si le post contient un fichier + du texte
        if(req.file && contentText){

            const postObject = JSON.parse(req.body.post)

            /* 
            -Condition pour vérifier sécurité avec le middleware auth / mais UserId doit être rajouté dans le body de la requête 
            -Si condition retirée -> l'UserId pour créer le post peut être celui contenu dans le token
            */
           
           // if(postObject.UserId === res.locals.token.userId) {
                
                model.Post.create({
                    //UserId : postObject.UserId,
                    UserId : res.locals.token.userId,
                    title : postObject.title,
                    content: postObject.content,
                    attachment : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                })
                
                //contient le post créé -> affiche le message de réussite + l'auteur du post
                .then(() => res.status(201).json({
                    authorPost,
                    message : "Publication enregistrée avec texte et fichier",
                }))
                
                .catch(error => res.status(500).json({error}))
           // } else {
           //     res.status(404).json({message : "Vous n'êtes pas autorisé à faire ça"})
           // }

        //si le post contient uniquement un fichier
        } else if (req.file) {
  
            model.Post.create({
                UserId : res.locals.token.userId,
                attachment : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            })
            .then(()=> res.status(201).json({
                authorPost,
                message : "Publication enregistrée sans texte, uniquement avec fichier"
            }))
            .catch(error => res.status(500).json({error}))
            

        //si le post contient uniquement du texte
        } else if (contentText){
            const postObject = JSON.parse(req.body.post)

            if(postObject.UserId === res.locals.token.userId) {
                model.Post.create({
                    UserId : postObject.UserId,
                    title : postObject.title,
                    content: postObject.content
                })
                .then(()=> res.status(201).json({
                    authorPost,
                    message : "Publication enregistrée sans fichier"
                }))
                .catch(error => res.status(500).json({error}))
            } else {
                res.status(404).json({message : "Vous n'êtes pas autorisé à faire ça"})
            }
            
        }
    })
    .catch(error => res.status(400).json({error}))
    
};

exports.getAllPost = (req,res,next) => {
    model.Post.findAll({
        //trie dans l'ordre du + récent
       order : [['createdAt', 'DESC']] 
    })
    .then((allPost)=> res.status(200).json(allPost))
    .catch(error => res.status(400).json({error}))
};

//affiche tous les posts d'une personne
exports.getUserPost = (req, res, next) => {
    model.Post.findAll({
        where : {userId : req.params.id },
        order : [['createdAt', 'DESC']]
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

////VERSION OPTIMISEE/////
exports.deletePost = (req, res, next) => {
    const idParams = req.params.id;
    const idToken = res.locals.token.userId
    // renvoie l'attribut isadmin, firstname et id + cible l'utilisateur qui veut faire la requête
    model.User.findOne({
        attributes : ["isadmin", "firstname", "id"], 
        where : { id : idToken} //id de l'utilisateur
    })
    .then((userRequest) => { // userAdmin : le résultat de la promesse -> l'utilisateur qui veut faire la requête
        //cible le post à supprimer par son id
        model.Post.findOne({
            where : { id: idParams } //id du post
        })
        .then(post => { // post : le résultat de la promesse -> le post à supprimer

            // Si le user qui fait la requête supprimer est le user qui a créé le poste -> suppression OK
            if(post.UserId === idToken || userRequest.isadmin === true){
                if(req.file) {
                    const filename = post.attachment.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        model.Post.destroy({
                            where : { id : idParams}
                        }) 
                        .then(() => res.status(200).json({message : 'Le post a été supprimé'}))
                        .catch(error => res.status(400).json({error}));
                    });
                } else {
                    model.Post.destroy({
                        where : { id : idParams}
                    }) 
                    .then(() => res.status(200).json({message : 'Le post a été supprimé'}))
                    .catch(error => res.status(400).json({error}));
                }
                
            // Si le user qui fait la requête n'est ni admin, ni celui qui a créé le post -> suppression KO
            } else {
                res.status(404).json({ error : "Vous n'avez pas l'autorisation de supprimer un post qui ne vous appartient pas"})
            } 
        })
        .catch(error => res.status(500).json({error : "Ce post n'existe plus"}));
    })
    .catch(error => res.status(400).json({error}))
};

// exports.deletePost = (req, res, next) => {
//     // renvoie l'attribut isadmin, firstname et id + cible l'utilisateur qui veut faire la requête
//     model.User.findOne({
//         attributes : ["isadmin", "firstname", "id"], 
//         where : { id : res.locals.token.userId} //id de l'utilisateur
//     })
//     .then((userRequest) => { // userAdmin : le résultat de la promesse -> l'utilisateur qui veut faire la requête
//         //cible le post à supprimer par son id
//         model.Post.findOne({
//             where : { id: req.params.id } //id du post
//         })
//         .then(post => { // post : le résultat de la promesse -> le post à supprimer

//             // Si le user qui fait la requête supprimer est le user qui a créé le poste -> suppression OK
//             if(post.UserId === res.locals.token.userId){
//                 console.log(post);
//                 console.log("je suis l'utilisateur qui a créé le post, pas un admin");
//                 if (req.file) {
//                     const filename = post.attachment.split('/images/')[1];
//                     fs.unlink(`images/${filename}`, () => {
//                         model.Post.destroy({
//                             where : { id : req.params.id}
//                         }) 
//                         .then(() => res.status(200).json({message : 'Le post a été supprimé'}))
//                         .catch(error => res.status(400).json({error}));
//                     });
//                 } else {
//                     model.Post.destroy({
//                         where : { id : req.params.id}
//                     }) 
//                     .then(() => res.status(200).json({message : 'Le post a été supprimé'}))
//                     .catch(error => res.status(400).json({error}));
//                 }
                
//             // Si le user qui fait la requête est un admin -> suppression OK
//             } else if (userRequest.isadmin === true) {
//                 if (req.file){
//                     const filename = post.attachment.split('/images/')[1];
                
//                     //fs.unlink supprime l'image de la base de données
//                     fs.unlink(`images/${filename}`, () => {
//                         model.Post.destroy({
//                             where : { id : req.params.id} //supprime post par son id de la base de données
//                         }) 
//                         .then(() => res.status(200).json({message : 'Le post a été supprimé par un admin'}))
//                         .catch(error => res.status(400).json({error}))
//                     });
//                 } else {
//                     model.Post.destroy({
//                         where : { id : req.params.id} //supprime post par son id de la base de données
//                     }) 
//                     .then(() => res.status(200).json({message : 'Le post a été supprimé par un admin'}))
//                     .catch(error => res.status(400).json({error}))
//                 }
                
//             // Si le user qui fait la requête n'est ni admin, ni celui qui a créé le post -> suppression KO
//             } else {
//                 res.status(404).json({ error : "Vous n'avez pas l'autorisation de supprimer un post qui ne vous appartient pas"})
//             } 
//         })
//         .catch(error => res.status(500).json({error : "Ce post n'existe plus"}));
//     })
//     .catch(error => res.status(400).json({error}))
// };