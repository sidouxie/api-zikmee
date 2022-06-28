const { Album } = require("../model/albumModel");

module.exports.getMusic = (req, res) => {
  Album.find((err, docs) => {
    if (!err) res.status(200).json(docs);
    else res.status(400).send(err);
  });
};

module.exports.postAlbum = async (req, res) => {
  const { title, artist, year, tracklists } = req.body;

  const newAlbum = new Album({
    title,
    year,
    artist: {
      _id_artist: artist._id_artist,
    },
    trackslist: [...tracklists],
  });

  try {
    const album = await newAlbum.save();
    return res.status(201).json(album);
  } catch (error) {
    return res.status(400).send(err);
  }
};
