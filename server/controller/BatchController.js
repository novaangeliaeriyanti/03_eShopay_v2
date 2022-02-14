const findAllRows = async (req, res, next) => {
  try {
    const talent = await req.context.models.talent.findAll();
    const instructor = await req.context.models.instructor.findAll();
    const result = { talent, instructor };

    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findTalentBatch = async (req, res, next) => {
  try {
    const talent = await req.context.models.talent_batch.findAll();
    return res.send(talent);
  } catch (error) {
    return res.send(error);
  }
};

const findBatch = async (req, res, next) => {
  try {
    const talent = await req.context.models.batch.findAll();
    return res.send(talent);
  } catch (error) {
    return res.send(error);
  }
};

const createBatch = async (req, res, next) => {
  const { batch_name, batch_technology, batch_inst_id,batch_start_date, batch_end_date } = req.body;
  try {
    const result = await req.context.models.batch.create({
      batch_name: batch_name,
      batch_technology: batch_technology,
      batch_start_date: batch_start_date,
      batch_end_date: batch_end_date,
      batch_inst_id: parseInt(batch_inst_id),
    });
    req.batch_id = result.dataValues;
    next();
  } catch (error) {
    return res.status(404).json({
      messagecreateBatch: error.message,
    });
  }
};

const createTalentBatch = async (req, res, next) => {
  const { batch_id } = req.batch_id;
  const { batch_name, batch_technology, batch_inst_id,batch_start_date, batch_end_date,talentCheck } = req.body;
  const result = {batch_name,batch_technology, batch_inst_id,batch_start_date, batch_end_date,talentCheck}

  try {
    for (let j = 0; j < talentCheck.length; j++) {
       await req.context.models.talent_batch.create({
        taba_tale_id: parseInt(talentCheck[j].tale_id),
        taba_batch_id: parseInt(batch_id),
      });
    }
    return res.send(result);
  } catch (error) {
    return res.status(404).json({
      messagecreateTalentBatch: error.message,
    });
  }
};

export default {
  findAllRows,
  createBatch,
  createTalentBatch,
  findTalentBatch,
  findBatch,
};
