const express = require('express');
const projectDB = require('./data/helpers/projectModel');


const router = express.Router();

router.post('/', (req, res) => {
    const body = req.body;
    if(!body.name) {
        res.status(400).json({message: 'Please include a project name'})
    } else if(!body.description) {
        res.status(400).json({message: 'Please include a project description'})
    } else {
        projectDB.insert(body)
            .then(project => {
                res.status(201).json(project);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({message: 'There was an issue saving project to server.'})
            })
    }
})

module.exports = router;