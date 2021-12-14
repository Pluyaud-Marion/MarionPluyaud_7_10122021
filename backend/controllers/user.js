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
            isAdmin : req.body.isAdmin
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