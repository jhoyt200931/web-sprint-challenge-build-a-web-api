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
});

router.get('/', (req, res) => {
    projectDB.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'There was an error getting projects from database'});
        })
})

router.get('/:id', (req,res) => {
    const { id } = req.params;
    projectDB.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'There was an error getting projects from database'});
        })
})

router.get('/:id/actions', (req,res) => {
    const { id } = req.params;
    projectDB.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'There was an error getting the actions for this project'});
        })
})

router.put('/:id', (req,res) => {
    const { id } = req.params;
    const changes = req.body;
    projectDB.update(id, changes)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'There was an error updating this project'});
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    projectDB.remove(id)
        .then(response => {
            res.status(200).json({message: 'This project was deleted'});
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'This project could not be deleted'});
        })
})

module.exports = router;