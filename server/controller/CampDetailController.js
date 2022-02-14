const findAllRows = async (req, res, next) => {
  try {
    const result = await req.context.models.curriculum.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findRow = async (req, res) => {

  try {
    const curriculum = await req.context.models.curriculum.findOne({
      where: {curr_name: req.params.id },
    });

    const materi = await req.context.models.curriculum_materi.findAll().filter(id => id.cuma_curr_id == curriculum.dataValues.curr_id)

    const instructor = await req.context.models.instructor.findOne({
      where: { inst_bootcamp: curriculum.dataValues.curr_name },
    });

    const batch = await req.context.models.batch.findOne({
      where: { batch_technology: curriculum.dataValues.curr_name },
    });

    const hasil = { curriculum, materi, instructor,batch };

    res.send(hasil);
  } catch (error) {
    return res.sendStatus(404).json("no data found");
  }
};

export default {
  findAllRows,
  findRow,
};
