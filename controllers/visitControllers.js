const { Visit, Users, Property } = require("../models");
const User = require("../models/Users");

exports.add_visit = async (req, res) => {
  const { id } = req.params;
  const { userId, date, hour } = req.body;

  try {
    const visits = await Visit.findOne({
      where: { is_booked: false, propertyId: id, userId },
      /* where: { hour, date }, */ //con este me deja cerar muchas citas al usuario en la misma propiedad siempre y cuando sea en diferente hora y fecha.
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
  const acceptVisit = req.params;
  console.log("ACCEPT VISIT", req.params);

  try {
    const selectVisit = await Visit.update(acceptVisit, {
      where: {
        id: acceptVisit.id, //este es el id de la cita lo cambie en la ruta
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

exports.user_visits = async (req, res) => {
  const { userId } = req.params;
  try {
    const visits = await Visit.findAll({
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
      where: { "$user.id$": userId },
    });
    console.log("VISITAS", visits);

    if (visits == false) {
      //Visits de no tener visitas agendadas ni pendientes me trae un array vacio [].
      console.log("Hola soy visitas");
      return res.status(400).send("No tiene visitas agendadas");
    }
    res.status(200).send(visits);
  } catch (error) {
    console.log("ERROR", error.message);
  }
};
