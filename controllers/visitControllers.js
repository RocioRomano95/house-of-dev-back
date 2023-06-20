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

/* exports.add_visit = async (req, res) => {
  console.log("REQUIRE userId", req.body.date);
  console.log("REQUIRE BODY", req.body);
  const { userId, date, propertyId, hour } = req.body;

  try {
    const searchVisit = await Visit.findOne({
      where: {
        userId,
        date, //si tengo la fecha me la crea muchas veces, implemente DATAONLY y asi cuando la busco si me toma la fecha.
        hour,
        //is_booked, me llo toma coomo un valor invalido undefinded
        propertyId,
      },
    });
    //Hay dos maneras para que el usuario no pueda crear la cita:
    //1: Que el usuario con su userId(searchVisit.userId) exista en la base de datos por lo tanto no va poder crear mas citas
    //2: Que el usuario pueda crear varias citas en diferentes horarios y dias y que el admin administre cuales aceptar.

    console.log("SEARCHVISIT", searchVisit);
    if (searchVisit) {
      return res
        .status(403)
        .send("Ya hay una cita agendada para este dia y hora");
    }

    const createVisit = await Visit.create(req.body);
    console.log("CREATE VISIT", createVisit);
    res.status(200).send(createVisit);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
 */
exports.accept_visit = async (req, res) => {
  // const { propertyId, userId, is_booked } = req.body;
  const { id } = req.params;
  console.log("ACCEPT VISIT", req.body);

  try {
    const selectVisit = await Visit.findOne({
      where: {
        id, //este es el id de la cita lo cambie en la ruta
        // propertyId,
        // userId,
        //is_booked,se lo saco por q desde el postman no envio este valor y me tira un undefined
      },
    });
    console.log("select VISIT", selectVisit);
    /*    if (selectVisit) {
      return res.status(404).send("ya hay una cita agendada");
    } */
    selectVisit.is_booked = true;
    selectVisit.save();

    res.status(201).send(selectVisit);
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
