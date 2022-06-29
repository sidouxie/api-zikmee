const router = require("express").Router();
const musicController = require("../controller/musicController");
const artistController = require("../controller/artistController");

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

module.exports = router;
