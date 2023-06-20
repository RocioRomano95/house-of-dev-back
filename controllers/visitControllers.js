const { Visit, Users, Property } = require("../models");

exports.add_visit = async (req, res) => {
  const { id } = req.params;
  const { userId, date, hour } = req.body;

  try {
    const visits = await Visit.findOne({
      where: { is_booked: false, propertyId: id, userId },
    });

    if (!visits) {
      const createVisit = await Visit.create({
        userId,
        date,
        hour,
        propertyId: id,
      });

      return res.status(200).send(createVisit);
    }
    res.status(409).send("Ya existe una cita");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.accept_visit = async (req, res) => {
  // const { propertyId, userId, is_booked } = req.body;
  // const { id } = req.params;
  const acceptVisit = req.body;
  console.log("ACCEPT VISIT", req.body);

  try {
    const selectVisit = await Visit.update(acceptVisit, {
      where: {
        id: acceptVisit.id, //este es el id de la cita lo cambie en la ruta
        // propertyId,
        // userId,
        //is_booked,se lo saco por q desde el postman no envio este valor y me tira un undefined
      },
      returning: true,
    });
    console.log("select VISIT", selectVisit[1][0]);
    if (selectVisit[1][0].is_booked) {
      return res.status(404).send("ya hay una cita agendada");
    }
    selectVisit[1][0].is_booked = true;
    selectVisit[1][0].save();
    res.status(201).send(selectVisit[1][0]);

    console.log("save visit", selectVisit[1][0]);
    //res.status(201).send(selectVisit);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.delete_visit = async (req, res) => {
  const { id } = req.params;
  console.log("DELETE VISIT", id);
  try {
    const deleteVisit = await Visit.destroy({
      where: { id },
    });
    res.sendStatus(200).send(deleteVisit);
  } catch (error) {
    console.log(error);
  }
};

exports.all_visits = async (req, res) => {
  try {
    const visit = await Visit.findAll({
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

    console.log("VISIT", visit);

    if (visit) return res.status(200).send(visit);
    res.status(400).send("no tienes visitas agendadas");
  } catch (error) {
    console.log(error);
  }
};
