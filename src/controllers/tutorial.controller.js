const db = require("../models");
const Tutorial = db.tutorial;
const Op = db.Sequelize.Op;
var qs = require('querystring');

// Create and Save a new Tutorial
exports.create = (req, res) => {
    
    if(!req.body.title){
        res.status(400).send({
            message: "cannot desplay not be empty"
        })
        return
    }

    //create tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false 
    }

    // save tutorial in the database
    Tutorial.create(tutorial).then((result) => {
        res.status(200).send({
            code: 200, 
            status: true, 
            data: result, 
            message: "Successfully Tutorial created!" 
        })
    }).catch((err) => {
        res.status(400).send({
            code: 400, 
            status: true, 
            message: err.message || "Some error occured while creating the tutorial!"     
        })
    })

}

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

  const title = req.query.title
  const condition = title ? { title: { [Op.like]: `%${title}` } } : null

  Tutorial.findAll({ where: condition })
    .then(data => { 
        res.status(200).send({
            code: 200, 
            status: true, 
            data: data, 
            message: "Successfully Tutorial retrieved!" 
        })
    }).catch(err => {
        res.status(500).send({
            code: 500, 
            status: true, 
            message: err.message || "Some error occurred while retrieving tutorials."
        })
    })

}

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id =  req.params.id
    Tutorial.findByPk(id)
        .then(data => { 
            if( data != null){
                res.status(200).send({
                    code: 200, 
                    status: true, 
                    data: data, 
                    message: "Successfully Tutorial retrieved!" 
                 })
            }else{
                res.status(404).send({
                    code: 404 , 
                    status: false, 
                    message: `ID ${id} was not found!`
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

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

    const id = req.params.id

    console.log(id)
    Tutorial.update(req.body, {
        where: { id: id }
    }).then(num => {
        if(num > 0){
            res.send({
                code: true, 
                status: 200, 
                data: req.body,
                message: `Tutorial Id ${id} was updated  successfully. `
              })
        } else {
            res.send({
                code: true,
                status: 200,
                message: `ID=${id} was not found to update!`
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

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    Tutorial.destory({
        where: { id: id} 
    }).then(num => {
        if(num == 1){
            res.status(200).send({
                code: 200,
                status: true,
                message: "Tutorial was deleted successfully!"
            })
        }else{
            res.status(404).send({
                code: 404,
                status: true,
                message:`Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
            })
        }
    }).catch(err => {
        res.status(500).send({
            code: 500, 
            status: true, 
            message: err.message || "Could not delete Tutorial with id=" + id
        })
    })
}

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

    Tutorial.destory({
        where: {},
        truncate: false
    }).then(nums =>{
        res.status(200).send({
            code: 200,
            status: true,
            message: `${nums} Tutorials were deleted successfully!`  
        })
    }).catch(err => {
        res.status(500).send({
            code: 500, 
            status: true, 
            message: err.message || "Some error occurred while removing all tutorials."
        })
    })
}

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

    Tutorial.findAll({
        where: { published: true } 
    }).then(data => {
        res.status(200).send({
            code: 200,
            status: true,
            data: data,
            message: "Successfully retrieve the tutorial publisher!" 
        })
    }).catch(err => {
        res.status(500).send({
            code: 500, 
            status: true, 
            message: err.message ||  "Some error occurred while retrieving tutorials."    
        })
    })
}