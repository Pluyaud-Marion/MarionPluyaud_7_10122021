//importation du package fs
const fs = require('fs');

//importation des modèles
const model = require("../models");

//version avec userId dans les paramètres de la requête
exports.createPost = (req,res,next) => {
    const contentText = req.body.post;
    const userIdToken = Number (res.locals.token.userId)
    const paramUserId = Number(req.params.userId)

    if(userIdToken !== paramUserId) {
        return res.status(404).json({message : "Vous n'êtes pas autorisé à faire ça"})
    } else {

        //trouve l'auteur du post grâce à son id
        model.User.findOne({
            attributes: ['firstname', 'lastname', 'id'],
            where : {id : userIdToken}
        })
        //auteur contenue dans la promesse -> authorPost
        .then(authorPost => {
            //si le post contient un fichier + du texte
            if(req.file && contentText){

                const postObject = JSON.parse(req.body.post)
                    model.Post.create({
                        UserId : userIdToken,
                        content: postObject.content.trim(),
                        attachment : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    })
                    //contient le post créé -> affiche le message de réussite + l'auteur du post
                    .then(() => res.status(201).json({
                        authorPost,
                        message : "Publication enregistrée avec texte et fichier",
                    }))
                    
                    .catch(error => res.status(500).json({error}))
                
            //si le post contient uniquement un fichier
            } else if (req.file) {

                model.Post.create({
                    UserId : userIdToken,
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

                    model.Post.create({
                        UserId : userIdToken,
                        content: postObject.content.trim()
                    })
                    .then(()=> res.status(201).json({
                        authorPost,
                        message : "Publication enregistrée sans fichier"
                    }))
                    .catch(error => res.status(500).json({error}))
            }
        })
        .catch(error => res.status(400).json({error}))
    }
};

exports.getAllPost = (req,res,next) => {
    model.Post.findAll({
        // relie au Post, l'utilisateur qui l'a fait + les commentaires
        include : [model.Comment, {
            model : model.User,
            attributes : ['firstname', 'lastname']
        }],
        //trie dans l'ordre du + récent
        order : [['createdAt', 'DESC']] 
    })
    .then((allPost)=> res.status(200).json(allPost))
    .catch(error => res.status(400).json({error}))
};

//affiche tous les posts d'une personne
exports.getUserPost = (req, res, next) => {
    model.Post.findAll({
        where : {userId : req.params.userId },
        include : [model.Comment],
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

exports.deletePost = (req, res, next) => {
  
    const idParams = req.params.postId;
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

// NON ACTIF
// exports.modifyPost = (req, res, next) => {
//     //on trouve l'user qui envoie la requête
//     model.User.findOne({
//         where : {id : res.locals.token.userId}
//     })
//     .then(userRequest => {
//         //cible le post à modifier par son id
//         model.Post.findOne({
//             where : { id: req.params.postId } 
//         })
//         .then(post => { // post = le post actuel
//             console.log(post);
     
//             if(!post) {
//                 return res.status(401).json({error : "Ce post n'existe pas"})
//             } else {
//                 if (userRequest.isadmin === true || post.UserId === res.locals.token.userId) {
                    
                       
//                         //const postObject = JSON.parse(req.body.post)
//                         //console.log(postObject)
//                         post.update({
//                             content : req.post.content,
//                             attachment : `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
//                         })
//                         .then(() => res.status(200).json({message: "Post modifié"}))
//                         .catch(error => res.status(400).json({error}))
                    
//                 } else {
//                     return res.status(404).json({error : "Vous n'avez pas le droit de faire ça"})
//                 }
//             }
//         })
//         .catch(error => res.status(400).json({error}))
//     })
//     .catch(error => res.status(400).json({error}))
// }
