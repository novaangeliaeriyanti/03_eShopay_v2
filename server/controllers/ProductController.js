const findAll = async (req, res) => {
  try {
    const result = await req.context.models.products.findAll();
    return res.send(result);
  } catch (error) {
    return res.status(404).send("no data found");
  }
};

const findOne = async (req, res) => {
  try {
    const result = await req.context.models.products.findOne({
      where: { prod_id: req.params.id },
    });
    return res.send(result);
  } catch (error) {
    return res.status(404).send("no data found");
  }
};


// const create = async (req, res) => {
//   try {
//     const result = await req.context.models.products.create({
//       prod_name : req.body.prod_name,
//       prod_price : req.body.prod_price,
//       prod_desc : req.body.prod_desc,
//       prod_url_image : req.body.prod_url_image,
//       prod_rating : req.body.prod_rating,
//       prod_view_count : req.body.prod_view_count,
//       prod_user_id : req.body.prod_user_id,
//       prod_cate_id : req.body.prod_cate_id,
//     });
//     return res.send(result);
//   } catch (error) {
//     return res.status(404).send("no data input");
//   }
// };

const create = async (req, res,next) => {
  const {files: { file },fields,} = req.fileAttrb;
  try {
    const result = await req.context.models.products.create({
        prod_name : fields[0].value,
        prod_price : fields[1].value,
        prod_desc : fields[2].value,
        prod_url_image : fields[3].value,
        prod_rating : fields[4].value,
        prod_view_count : fields[5].value,
        prod_user_id : parseInt(fields[6].value),
        prod_cate_id : parseInt(fields[7].value),
    });
        req.prod_id = result.dataValues.prod_id;
        next();

    //return res.send(result);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const update = async (req, res) => {
    try {
      const result = await req.context.models.products.update(
        {
          prod_name : req.body.prod_name,
          prod_price : req.body.prod_price,
          prod_desc : req.body.prod_desc,
          prod_url_image : req.body.prod_url_image,
          prod_rating : req.body.prod_rating,
          prod_view_count : req.body.prod_view_count,
          prod_user_id : req.body.prod_user_id,
          prod_cate_id : req.body.prod_cate_id,
        },
        {
          returning: true,
          where: { prod_id: req.params.id },
        }
      );
      return res.send(result);
    } catch (error) {
      return res.status(404).send("no data update");
    }
  };

  const deleteRow = async (req, res) => {
    try {
      const result = await req.context.models.products.destroy({
        where: { prod_id: req.params.id },
      });
      res.send("delete" + result + "rows");
    } catch (error) {
      return res.status(404).send("no data found");
    }
  };

export default {
  findAll,
  findOne,
  create,
  update,
  deleteRow,
};
