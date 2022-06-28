const router = require("express").Router();
const musicController = require("../controller/musicController");
const artistController = require("../controller/artistController");

//ALBUM
router.get("/music", musicController.getMusic);
router.post("/music", musicController.postAlbum);

//ARTIST
router.get("/artist", artistController.getArtists);
router.get("/artist/:id", artistController.getArtistById);
router.post("/artist", artistController.postArtist);
router.patch("/artist/:id", artistController.updateArtist);

module.exports = router;
