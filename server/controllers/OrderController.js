const create = async (req, res,next) => {
    try {
      const result = await req.context.models.line_items.findOne({
        where: { lite_cart_id: req.params.id },
      });

      const result2 = await req.context.models.carts.findOne({
        where: { cart_id: req.params.id },
      });
      
      const { lite_qty,lite_price } = result.dataValues;
      const { cart_user_id } = result2.dataValues;

      const result3 = await req.context.models.orders.create({
        order_name : (Math.random() + 1).toString(36).substring(7),
        order_createdon : new Date(),
        order_total_qty : lite_qty,
        order_subtotal : lite_qty * lite_price,
        order_discount : req.body.order_discount,
        order_tax : req.body.order_tax,
        order_total_due : (lite_qty * lite_price) - (lite_qty * lite_price * (req.body.order_discount/100)) - req.body.order_tax,
        order_address : req.body.order_address,
        order_phone : req.body.order_phone,
        order_city : req.body.order_city,
        order_status : "PENDING",
        order_user_id : cart_user_id
      });
    
     const { order_name } = result3.dataValues; 
     req.cart_id = req.params.id;
     req.order_name = order_name;
      next();
      return  res.send(result3);

    } catch (error) {
      return res.status(404).send(error);
    }
  };

const findAll = async (req, res) => {
    try {
      const result = await req.context.models.orders.findAll();
      return res.send(result);
    } catch (error) {
      return res.status(404).send("no data found");
    }
  };

  const deleteRow = async (req, res) => {
    try {
      const result = await req.context.models.orders.destroy({
        where: { order_name: req.params.id },
      });
      res.send("delete" + result + "rows");
    } catch (error) {
      return res.status(404).send("no data found");
    }
  };

  const update = async (req, res) => {
    try {
      const result = await req.context.models.orders.update(
        {
          order_status: "OFF",
        },
        {
          returning: true,
          where: { order_name: req.params.id },
        }
      );
      return res.send(result);
    } catch (error) {
      return res.status(404).send("no data update");
    }
  };
  
  export default {
    findAll,
    create,
    deleteRow,
    update
  };