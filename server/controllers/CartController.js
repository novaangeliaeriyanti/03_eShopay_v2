const create = async (req, res, next) => {
  try {
    const result = await req.context.models.products.findOne({
      where: { prod_id: req.params.id },
    });

    const { prod_id, prod_price, prod_user_id } = result.dataValues;

    const result1 = await req.context.models.carts.create({
      cart_createdon: new Date(),
      cart_status: "OFF",
      cart_user_id: prod_user_id,
    });

    const { cart_id, cart_status } = result1.dataValues;

    req.prod_id = prod_id;
    req.cart_id = cart_id;
    req.prod_price = prod_price;
    req.cart_status = cart_status;
    next();
  } catch (error) {
    return res.status(404).send("no data found product");
  }
};

const deleteRow = async (req, res, next) => {
  try {
    const result = await req.context.models.carts.destroy({
      where: { cart_id: req.params.id },
    });
    req.cart_id = req.params.id;
    next();
  } catch (error) {
    return res.status(404).send("no data found");
  }
};

const findAll = async (req, res) => {
  try {
    const result = await req.context.models.carts.findAll();
    return res.send(result);
  } catch (error) {
    return res.status(404).send(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const result = await req.context.models.carts.findAll({
      where: { cart_user_id: req.params.id },
    });
   
    //const lite_cart_id = [];
    const hasil = [];
    const hasil1 = [];
    for (let j = 0; j < result.length; j++) {
        //const lt_cart_id = result[j].cart_id;
        const cart_id = result[j].cart_id;
        const cart_createdon = result[j].cart_createdon;
        const hasil2 = {cart_id,cart_createdon};
        hasil.push(result[j].cart_id);
        hasil1.push(hasil2);
    }

    req.hasil = hasil;
    req.hasil1 = hasil1;
    next();
    //return res.send(hasil);

  } catch (error) {
    return res.status(404).send(error);
  }
};

const updateStatus = async (req, res,next) => {
  const lite_cart_id = req.cart_id
  try {
    const result = await req.context.models.carts.update(
      {
        cart_status: "ON",
      },
      {
        returning: true,
        where: { cart_id: lite_cart_id },
      }
    );

    req.lite_cart_id = lite_cart_id ;
    next();
    //return res.send(result);
  } catch (error) {
    return res.status(404).send("no data update cart status");
  }
};

export default {
  create,
  deleteRow,
  findOne,
  findAll,
  updateStatus
};
