const create = async (req, res) => {
  //let order_name = (Math.random() + 1).toString(36).substring(7);
  try {
    const result = await req.context.models.line_items.create({
      lite_prod_id: req.prod_id,
      lite_cart_id: req.cart_id,
      lite_qty: req.body.lite_qty,
      lite_price: req.prod_price,
      lite_total_price: req.body.lite_qty * req.prod_price,
      lite_status: req.cart_status,
      //lite_order_name: order_name,
    });
    res.send(result);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const update = async (req, res) => {
  const result = await req.context.models.line_items.findOne({
    where: { lite_cart_id: req.params.id },
  });

  const { lite_price } = result.dataValues;
  try {
    const result1 = await req.context.models.line_items.update(
      {
        lite_qty: req.body.lite_qty,
        lite_total_price: req.body.lite_qty * lite_price,
      },
      {
        returning: true,
        where: { lite_cart_id: req.params.id },
      }
    );
    return res.send(result1);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const findOne = async (req, res) => {
  const cart_id = req.hasil;
  const hasil1 = req.hasil1;

  const hasil = [];
  try {
    for (let j = 0; j < cart_id.length; j++) {
      let gabung = {};
      const result = await req.context.models.line_items.findOne({
        where: { lite_cart_id: cart_id[j] },
      });
      const cart_createdon = hasil1[j].cart_createdon;
      gabung = { cart_createdon, result };
      hasil.push(gabung);
    }
    return res.send(hasil);
  } catch (error) {
    return res.status(404).send("not found lineItems");
  }
};

const deleteRow = async (req, res) => {
  try {
    const result = await req.context.models.line_items.destroy({
      where: { lite_cart_id: req.cart_id },
    });
    res.send("delete" + result + "rows");
  } catch (error) {
    return res.status(404).send(error);
  }
};

const updateStatus = async (req, res) => {
  try {
    const result = await req.context.models.line_items.update(
      {
        lite_status: "ON",
        lite_order_name:req.order_name
      },
      {
        returning: true,
        where: { lite_cart_id: req.lite_cart_id },
      }
    );
    //return res.send(result);
  } catch (error) {
    return res.status(404).send("no data update cart status");
  }
};

export default {
  create,
  deleteRow,
  update,
  findOne,
  updateStatus
};
