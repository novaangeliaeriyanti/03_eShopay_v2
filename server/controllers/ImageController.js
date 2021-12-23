const create = async (req, res) => {
  const { files: { file }, fields,} = req.fileAttrb;
  try {
    const nama = file.newFilename;
    const filetype = nama.split(".")
      const result = await req.context.models.product_images.create({
      prom_filename: nama,
      prim_filesize: parseInt(file.size / 1024),
      prom_filetype: filetype[1],
      prim_url: fields[0].value,
      prim_primary: Boolean(fields[1].value),
      prim_prod_id: parseInt(fields[2].value),
    });
    return res.send(result);
  } catch (error) {
    return res.status(404).send("no data input");
  }
};

const create1 = async (req, res) => {
  const { files: { file }, fields,} = req.fileAttrb;
  try {
    const nama = file.newFilename;
    const filetype = nama.split(".")
    const result = await req.context.models.product_images.create({
      prom_filename: nama,
      prim_filesize: parseInt(file.size / 1024),
      prom_filetype: filetype[1],
      prim_url: fields[3].value,
      prim_primary: Boolean(Number(fields[8].value)),
      prim_prod_id: req.prod_id,
    });
    return res.send(result);
  } catch (error) {
    return res.status(404).send("no data input");
  }
};

const findAll = async (req, res) => {
  try {
    const result = await req.context.models.product_images.findAll();
    return res.send(result);
  } catch (error) {
    return res.status(404).send("no data found");
  }
};

const findOne = async (req, res) => {
  try {
    const result = await req.context.models.product_images.findOne({
      where: { prim_id: req.params.id },
    });
    return res.send(result);
  } catch (error) {
    return res.status(404).send("no data found");
  }
};

const deleteRow = async (req, res) => {
  try {
    const result = await req.context.models.product_images.destroy({
      where: { prim_id: req.params.id },
    });
    res.send("delete" + result + "rows");
  } catch (error) {
    return res.status(404).send("no data found");
  }
};

const update = async (req, res) => {
  const { files: { file }, fields,} = req.fileAttrb;
  try {
    const nama = file.newFilename;
    const filetype = nama.split(".")
    const result = await req.context.models.product_images.update(
      {
        prom_filename: nama,
        prim_filesize: parseInt(file.size / 1024),
        prom_filetype: filetype[1],
        prim_url: fields[0].value,
        prim_primary: Boolean(Number(fields[1].value)),
      },
      {
        returning: true,
        where: { prim_id: req.params.id },
      }
    );
    return res.send(result);
  } catch (error) {
    return res.status(404).send("no data update");
  }
};

export default {
  create,
  findOne,
  findAll,
  deleteRow,
  create1,
  update,
};
