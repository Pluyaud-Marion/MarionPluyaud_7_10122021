// importation bcrypt
const bcrypt = require('bcrypt');
const { mode } = require('crypto-js');
//importation crypto-js
const cryptojs = require('crypto-js');

//importation jwt
const jwt = require('jsonwebtoken');

//importation des modèles
const model = require("../models");

exports.signUp = (req, res, next) => {
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    bcrypt.hash(req.body.password, 10)
   .then(hash => {
        model.User.create({
            firstname: req.body.firstname,
            lastname : req.body.lastname,
            email : emailCryptoJs,
            password : hash,
            job : req.body.job,
            isadmin : req.body.isadmin
        })
        .then(() => res.status(201).json({message : 'Utilisateur créé et enregistré dans la base de données'}))
        .catch(error => res.status(400).json({error}));
   })
   .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    
    //cherche l'email dans la db
    model.User.findOne({ 
        where : {email : emailCryptoJs}
    })
    .then(user => {
        if(!user){
            return res.status(400).json({error : "User inexistant"})
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(verifyPassword => {
                if(!verifyPassword) { 
                    return res.status(400).json({error : "Mot de passe incorrect"})
                } else {
                    res.status(200).json({
                        isadmin : user.isadmin,
                        userId : user.id,
                        token : jwt.sign(
                            {userId : user.id},
                            `${process.env.KEY_TOKEN}`,
                            {expiresIn : "12h"}
                        )
                    });
                }
            })
            .catch(error => res.status(500).json({error}))
        }
    })
    .catch(error => res.status(500).json({error}))
};


// visualiser un profil - retourne firstame, lastname et job
exports.getOneProfile = (req, res, next) => {
    model.User.findOne({
        where : {id : req.params.id},
        attributes : ["firstname", "lastname", "job"] 
    })
    
    .then(user=> {
        if (!user) {
            return res.status(401).json({error : "Cet utilisateur n'existe pas"})
        } else {
            res.status(200).json(user);
        }
    })
    .catch(error => res.status(400).json({error}))
};

//visualiser tous les profils
exports.getAllProfile = (req, res, next) => {
    model.User.findAll({
        order : [['createdAt', 'DESC']] 
    })
    .then(allUsers => res.status(200).json(allUsers))
    .catch(error => res.status(400).json({error}))
};

//supprime de la db l'utilisateur
exports.deleteProfile = (req, res, next) => {
    model.User.findOne({
        where : { id : req.params.id }
    })
    .then(user => {
        if(user.id === res.locals.token.userId){
            model.User.destroy({
                where : { id : req.params.id}
            })
            .then(()=> res.status(200).json({message : 'Utilisateur supprimé'}))
            .catch(error => res.status(403).json({error}))
        } else {
            res.status(404).json({message: "Vous n'avez pas l'autorisation de supprimer un autre utilisateur"})
        }
    })
    .catch(error => res.status(400).json({error : "Cet utilisateur n'existe pas"}))
};

