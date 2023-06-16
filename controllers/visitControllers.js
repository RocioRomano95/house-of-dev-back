const { Visit } = require("../models");

exports.add_visit = async (req, res) => {
  const { userId, date, propertyId } = req.body;
  try {
    const searchVisit = await Visit.findOne({
      where: {
        userId,
        date,
        propertyId,
      },
    });
    console.log("SEARCHVISIT", searchVisit);
    if (searchVisit) {
      return res
        .status(403)
        .send("Ya hay una cita agendada para ese dia y hora");
    }
    const createVisit = await Visit.create(req.body);
    console.log("CREATE VISIT", createVisit);
    res.status(200).send(createVisit);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.accept_visit = async (req, res) => {
  const { propertyId, userId, is_booked } = req.body;
  console.log(req.body);

  try {
    const selectVisit = await Visit.findOne({
      where: {
        userId,
        propertyId,
        is_booked,
      },
    });
    console.log("search VISIT", searchVisit);
    if (!selectVisit) {
      return res.status(404).send("No se encontró la cita");
    }
    searchVisit.is_booked = true;
    searchVisit.save();

    res.status(201).send(selectVisit);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

/* exports.delete_visit = async (req, res) => {
  const visit = req.params;
  console - log("VISIT", visit);
  try {
    const deleteVisit = await Visit.destroy({
      where: { id: visit.id },
    });
    res.sendStatus(202);
  } catch (error) {
    console.log("La cita ha sido elimimada", error);
  }
}; */
