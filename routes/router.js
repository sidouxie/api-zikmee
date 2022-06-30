const router = require("express").Router();
const musicController = require("../controller/musicController");
const artistController = require("../controller/artistController");
const authController = require("../controller/authController");
const userController = require("../controller/userController");

//ALBUM
router.get("/music", musicController.getMusic);
router.get("/music/:id", musicController.getMusicById);
router.post("/music", musicController.postAlbum);
router.patch("/music/:id", musicController.updateAlbum);

//ARTIST
router.get("/artist", artistController.getArtists);
router.get("/artist/:id", artistController.getArtistById);
router.post("/artist", artistController.postArtist);
router.patch("/artist/:id", artistController.updateArtist);

//USER AUTH
// inscription
router.post("/auth/signup", authController.signUp);
// Login
router.post("/auth/login", authController.login);

//USER DATABASE
router.get("/user", userController.getUser);

module.exports = router;
