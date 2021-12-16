const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;



exports.create = (req, res) =>{

    if(!req.body.username){
        res.status(400).send({
            message: "Required user name"
        })
        return
    }

    //create tutorial
    const user = {
        username: req.body.username,
        password: req.body.password,
        IsActive: req.body.IsActive ? req.body.IsActive : true 
    }

    // save tutorial in the database
    User.create(user).then((result) => {
        res.status(200).send({
            code: 200, 
            status: true, 
            data: result, 
            message: "Successfully User created!" 
        })
    }).catch((err) => {
        res.status(400).send({
            code: 400, 
            status: true, 
            message: err.message || "Some error occured while creating the User!"     
        })
    })

}



// Find a single Tutorial with an id
exports.findOne = (req, res) => {

 
    const username =  req.params.username
    const condition =   { username: { [Op.like]: `%${username}` } }  
  
    User.findAll({ where: condition })
      .then(data => { 
        if( data != null){
            res.status(200).send({
                code: 200, 
                status: true, 
                data: data, 
                message: "Successfully user retrieved!" 
                })
        }else{
            res.status(404).send({
                code: 404 , 
                status: false, 
                message: `user ${username} was not found!`
                })
        }

      }).catch(err => {
          res.status(500).send({
              code: 500, 
              status: true, 
              message: err.message || "Some error occurred while retrieving user."
          })
      })
}


exports.findAll = (req, res) =>{
    const username = req.query.username
    const condition = username ? { username: { [Op.like]: `%${username}` } } : null
  
    User.findAll({ where: condition })
      .then(data => { 
        if (data == null){
            res.status(200).send({
                code: 200,
                status: true,
                data: data,
                message: "successfully retrieved user"
            })
        }else{
            res.status(404).send({
                code: 404,
                status: false,
                message: "No record found"
            })
        }
      }).catch(err => {
        res.status(500).send({
            code: 500, 
            status: true, 
            message: err.message || "Some error occurred while retrieving tutorials."
        })
    })


}