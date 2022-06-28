const { Artist } = require("../model/albumModel");

const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getArtists = (req, res) => {
  Artist.find((err, docs) => {
    if (!err) res.status(200).json(docs);
    else res.status(400).send(err);
  });
};

module.exports.getArtistById = async (req, res) => {
  const query = req.params.id;

  if (!ObjectID.isValid(query)) {
    return res.status(500).send("Uknown artist id : " + query);
  }

  Artist.findById(query, (err, artist) => {
    if (!err) res.status(200).json(artist);
    else res.status(400).send(err);
  });
};

module.exports.postArtist = async (req, res) => {
  const { name, albums, photo_artist } = req.body;

  const newArtist = new Artist({
    name: name,
    albums: albums,
    photo_artist: photo_artist,
  });

  try {
    const artist = await newArtist.save();
    res.status(201).send(artist);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.updateArtist = async (req, res, next) => {
  const query = req.params.id;
  const { albums, photo_artist } = req.body;

  if (!ObjectID.isValid(query) || !ObjectID.isValid(req.body.albums)) {
    return res.status(400).send("id is not valid : " + query);
  }

  try {
    await Artist.findOneAndUpdate(
      { _id: query },
      {
        $set: {
          photo_artist: photo_artist,
        },
        $addToSet: {
          albums: albums,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
      (err, docs) => {
        if (!err) res.status(200).send(docs);
        else res.status(500).send(err);
      }
    );
  } catch (error) {
    return res.status(400).json({ message: error, type: "catch error" });
  }
};
