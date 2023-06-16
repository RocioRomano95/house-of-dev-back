const { Property, Category } = require("../models");
const { sequelize } = require("../models/Users");
const Sequelize = require("sequelize");

exports.get_all_properties = async (req, res) => {
  const property = await Property.findAll({
    include: { model: Category, as: "category" },
  });
  console.log("PRopertiiiiessss", property);
  try {
    if (!property) res.status(400).send("no hay propiedades");
    res.status(200).send(property);
  } catch (error) {
    console.log("ERROR", error);
  }
};

exports.property_detail = async (req, res) => {
  const { id } = req.params;
  try {
    const oneProperty = await Property.findOne({
      where: { id: id },
    });
    console.log("ONEPROP=>", oneProperty);
    res.status(200).send(oneProperty);
  } catch (error) {
    console.log("ERROR", error);
  }
};

exports.add_property = async (req, res) => {
  const propertyData = req.body;
  console.log(propertyData, "propertyData");
  try {
    const newProperty = await Property.create(propertyData);
    console.log("BODY", req.body.name);

    const findCategory = await Category.findOne({
      where: { name: req.body.name },
    });
    console.log("Find CAtegory", findCategory);

    if (!findCategory) {
      const newCategory = await Category.create({ name: req.body.name });
      newProperty.categoryId = newCategory.id;
      newProperty.save();
      return res.send(newProperty);
    }

    newProperty.categoryId = findCategory.id;
    newProperty.save();

    res.status(201).send(newProperty);
  } catch (error) {
    console.log();
    res.status(400).send(error);
  }
};

exports.edit_property = async (req, res) => {
  try {
    const editProperty = req.body;
    console.log("EDIT PROPERTY=>", editProperty);
    const updateProperty = await Property.update(editProperty, {
      where: { id: editProperty.id },
      returning: true,
    });

    console.log("UPDATE PROPERTY=>", updateProperty[1][0]);
    res.status(201).send(updateProperty[1][0]);
  } catch (error) {
    console.log("ERROOR EDIT=>", error);
    res.status(400).send(error);
  }
};

exports.delete_property = async (req, res) => {
  try {
    const property = req.params.id;

    const deleteProperty = await Property.destroy({
      where: { id: property },
    });
    res.sendStatus(202);
  } catch (error) {
    console.log("ERROR", error);
  }
};

exports.search_locality = async (req, res) => {
  const { locality, state } = req.params;
  try {
    //traeme todas las propiedades
    const oneProperty = await Property.findAll({
      where: {
        locality: { [Sequelize.Op.like]: `%${locality}%` },
        state: { [Sequelize.Op.like]: `%${state}%` },
      },
    });
    if (!oneProperty)
      return res.send("no se encontraron propiedades en esta localidad");

    res.status(200).send(oneProperty);
  } catch (error) {
    console.log("ERROR", error.message);
  }
};

exports.search_state = async (req, res) => {
  const { state } = req.params;
  try {
    const property = await Property.findAll({
      where: { state },
    });

    res.status(200).send(property);
  } catch (error) {
    console.log("ERROR", error.message);
  }
};

exports.search_category = async (req, res) => {
  const { categorysearch } = req.params;
  try {
    const property = await Property.findAll({
      where: {
        "$category.name$": categorysearch,
      },
      include: { model: Category, as: "category" },
    });
    console.log("PROPERTY=>", property);
    res.status(200).send(property);
  } catch (error) {
    console.log("ERROR", error.message);
  }
};
