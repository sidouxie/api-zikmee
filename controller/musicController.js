const { Album } = require("../model/albumModel");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getMusic = (req, res) => {
  Album.find((err, docs) => {
    if (!err) res.status(200).json(docs);
    else res.status(400).send(err);
  });
};

module.exports.getMusicById = (req, res) => {
  const query = req.params.id;

  if (!ObjectID.isValid(query)) {
    return res.status(500).send("Id album is Uknown : " + query);
  }

  Album.findById(query, (err, docs) => {
    if (!err) res.status(200).json(docs);
    else res.status(400).send(err);
  });
};

module.exports.postAlbum = async (req, res) => {
  const { title, artist, year, tracklists, photo_album } = req.body;

  const newAlbum = new Album({
    title,
    year,
    artist: {
      _id_artist: artist._id_artist,
    },
    trackslist: [...tracklists],
    photo_album: photo_album,
  });

  try {
    const album = await newAlbum.save();
    return res.status(201).json(album);
  } catch (error) {
    return res.status(400).send(err);
  }
};

module.exports.updateAlbum = async (req, res) => {
  const query = req.params.id;
  const { photo_album } = req.body;

  if (!ObjectID.isValid(query)) {
    return res.status(500).send("id album is Uknown : " + query);
  }
  try {
    await Album.findByIdAndUpdate(
      query,
      {
        $set: {
          photo_album: photo_album,
        },
      },
      {
        upsert: true,
        new: true,
      }
    )
      .then((docs) => res.status(200).send(docs))
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(400).json(err);
  }
};
