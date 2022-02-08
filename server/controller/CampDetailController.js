const findAllRows = async (req, res, next) => {
  try {
    const result = await req.context.models.batch.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findRow = async (req, res) => {
  try {
    const bootcamp = await req.context.models.batch.findOne({
      where: { batch_technology: req.params.id },
    });

    const instructor = await req.context.models.instructor.findOne({
      where: { inst_id: bootcamp.dataValues.batch_inst_id },
    });

    const curriculum = await req.context.models.curriculum.findOne({
      where: { curr_inst_id: bootcamp.dataValues.batch_inst_id },
    });

    const hasil = { bootcamp, instructor, curriculum };

    res.send(hasil);
  } catch (error) {
    return res.sendStatus(404).json("no data found");
  }
};

export default {
  findAllRows,
  findRow,
};
