const { Property } = require("../models");

exports.get_all_propieties = async (req, res) => {
  const property = await Property.findAll();
  try {
    console.log("PROPERTY", property);
    if (!property) res.status(400).send("no hay propiedades");
    res.status(200).send(property);
  } catch (error) {
    console.log("ERROR", error);
  }
};

exports.add_property = async (req, res) => {
  const propertyData = req.body;
  console.log(propertyData, "propertyData");
  try {
    const newProperty = await Property.create(propertyData);
    res.status(201).send(newProperty);
    console.log("NEWProperty", newProperty);
  } catch (error) {
    console.log(error, "ERROR");
    res.send(error);
  }
};

exports.property_detail = async (req, res) => {
  const { id } = req.params;
  console.log("ID=>", id);
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
