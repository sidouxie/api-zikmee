const router = require("express").Router();
const musicController = require("../controller/musicController");
const artistController = require("../controller/artistController");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const { checkAuth, checkIsAdmin } = require("../middleware/checkAuth");

//ALBUM
router.get("/music", musicController.getMusic);
router.get("/music/:id", musicController.getMusicById);
router.post("/music", checkIsAdmin, musicController.postAlbum);
router.patch("/music/:id", checkIsAdmin, musicController.updateAlbum);

//ARTIST
router.get("/artist", artistController.getArtists);
router.get("/artist/:id", artistController.getArtistById);
router.post("/artist", checkIsAdmin, artistController.postArtist);
router.patch("/artist/:id", checkIsAdmin, artistController.updateArtist);

//USER AUTH
// inscription
router.post("/auth/signup", authController.signUp);
// Login
router.post("/auth/login", authController.login);

//USER DATABASE
router.get("/user", checkAuth, userController.getUser);

module.exports = router;
