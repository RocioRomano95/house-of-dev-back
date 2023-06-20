const { Users, Property, Favorites } = require("../models/");

exports.all_favorites = async (req, res) => {
  try {
    const favorite = await Favorites.findAll({
      include: [
        {
          model: Property,
          as: "property",
        },
        {
          model: Users,
          as: "user",
          attributes: { exclude: ["password", "salt"] },
        },
      ],
    });

    if (!favorite) res.status(400).send("no tienes favoritos");
    res.status(200).send(favorite);
  } catch (error) {
    console.log("error favoritos", error);
  }
};

exports.add_favorites = async (req, res) => {
  try {
    const { userId, propertyId } = req.body;

    const favorite = await Favorites.findOne({
      where: {
        userId,
        propertyId,
      },
    });
    console.log("FaVORITOO=>", favorite);

    if (favorite) {
      return res.status(200).send("El favorito ya existe");
    }

    const newFavorite = await Favorites.create({
      userId,
      propertyId,
    });
    console.log("new FaVORITOO=>", newFavorite);
    res.status(200).send(newFavorite);
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).send("Ha ocurrido un error");
  }
};
exports.delete_favorites = async (req, res) => {
  try {
    const favorite = req.params.id;
    console.log("FAVORITES DELETE", favorite);

    const deleteFavorite = await Favorites.destroy({
      where: { id: favorite },
    });

    res.status(202).send("favorito eliminado");
  } catch (error) {
    error.message;
  }
};
