const router = require('express').Router();
const LogModel = require('../db').import('../models/Log');

router.get( '', (req, res) => {
    LogModel.findAll({
        where: { user_id: req.user.id }
    }).then(logs => {
        res.json(logs);
    }).catch(err => {
        res.send(400, err.message);
    })
});

router.get( '/:id', (req, res) => {
    LogModel.findAll({
        where: { user_id: req.user.id, id: req.params.id }
    }).then(log => {
        res.json(log);
    }).catch(err => {
        res.send(400, err.message);
    })
});

router.post( '', (req, res) => {
    let { description, definition, results } = req.body.log;

    LogModel.create({
        user_id: req.user.id,
        description,
        definition,
        results
    }).then(log => {
        res.json(log);
    }).catch(err => {
        res.send(400, err.message);
    })
});

router.put( '/:id', (req, res) => {
    LogModel.update(req.body.log, { 
        where: { id: req.params.id }
    }).then(updatedLog => {
        res.json(updatedLog);
    }).catch(err => {
        res.send(400, err.message);
    });
});

router.delete( '/:id', async (req, res) => {
    let log = await LogModel.findOne({ 
        where: { user_id: req.user.id, id: req.params.id }
    });

    if(!log) {
        res.send(400, 'the log you\'re trying to delete doesn\'t exist');
    } else {
        LogModel.destroy({
            where: { user_id: req.user.id, id: req.params.id }
        }).then(() => {
            res.json({ log, deleted: true });
        }).catch(err => {
            res.send(400, err.message);
        });
    }
});

module.exports = router;