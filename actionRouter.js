const express = require('express');
const projectDB = require('./data/helpers/projectModel.js');
const actionDB = require('./data/helpers/actionModel.js');

const router = express.Router();

router.post('/', (req, res) => {
    const body = req.body;
    const projectId = req.body.project_id;
    projectDB.get(projectId)
        .then(project => {
            if(project) {
                if(!body.description) {
                    res.status(400).json({message: 'Please include an action description.'})
                } else if(!body.project_id) {
                    res.status(400).json({message: 'Please include a project id.'})
                } else if(!body.notes) {
                    res.status(400).json({message: 'Please include an action note.'})
                } else {
                    actionDB.insert(body)
                        .then(action => {
                            res.status(201).json(action)
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).json({message: 'There was an error adding the action to the project'})
                        })
                }
            } else {
                res.status(400).json({message: 'The project with this id does not exist'});
            }
        })
        .catch(error => {
            res.status(500).json({message: 'There was an error verifying project id'});
        })
})

router.get('/', (req, res) => {
    actionDB.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'There was an error getting the actions'})
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    actionDB.get(id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'There was an error getting the action'})
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    actionDB.update(id, changes)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'There was an error updating this action'});
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    actionDB.remove(id)
        .then(response => {
            res.status(200).json({message: 'This action was deleted'});
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'This action could not be deleted'});
        })
})



module.exports = router;