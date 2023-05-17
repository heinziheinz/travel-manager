import express from "express";
const router = express.Router();




router.get('/location', (req, res) => {
    res.json({ message: "gespeichert" });
});

router.post('/location', (req, res) => {
    res.json({
        message: "gespeichert",
        body: req.body,
    });
});

router.put('/location/:id', (req, res) => {
    res.json({
        message: "gespeichert",
        id: req.params.id
    });
});

router.delete('/location/:id', (req, res) => {
    res.json({
        message: "gelöscht",
        id: req.params.id
    });
});



export default router;