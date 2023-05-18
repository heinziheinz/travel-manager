import express from "express";
const router = express.Router();
import verifyJWT from "./../middleware/authentification-middle.js";
import Location from "./../model/Location.js";



router.get('/location', (req, res) => {
    res.json({ message: "show all" });
});

router.post('/location', verifyJWT, (req, res) => {
    console.log("req.body POST SPEICHERN")
    // console.log(req.body)
    console.log(req.user.id)

    const name = req.body.name;
    const adresse = req.body.adresse;
    const imgArray = req.body.img;
    const foreignKey = req.user.id;
    const captionArray = req.body.caption;
    const trickUsersArray = req.body.trickUser;
    const createdAt = Date.now();
    const updatedAt = Date.now();



    const images = JSON.stringify(imgArray);
    const capion = JSON.stringify(captionArray);
    const trickUser = JSON.stringify(trickUsersArray);
    const location = new Location({
        name,
        adresse,
        images,
        capion,
        trickUser,
        foreignKey,
        createdAt,
        updatedAt
    });
    location.save()
        .then(location => res.json(location))
        .catch(err => res.status(400).json({ success: false, message: err }));

});

router.put('/location/:id', (req, res) => {
    res.json({
        message: "updadated",
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