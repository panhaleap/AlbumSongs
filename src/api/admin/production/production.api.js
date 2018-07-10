import { Productions } from '../../../models/production';
import { failed, succeed } from '../../../common/response';
import {getLimit, getOffset, getTotal} from '../../../common/query_condition'

export const createProduction = async (req, res) => {
  try {
    const { name, logo } = req.body;
    const production = new Productions({ name, logo });
    const result = await production.save();
    if (result) succeed(res, result, 200);
    else failed(res, "Couldn't create production", 500);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const getProductionList = async (req, res) => {
  try {
    let { limit = 10, offset = 0, status, name } = req.query;
    limit = getLimit(limit);
    offset = getOffset(offset);
    const filterByStatus = status ? { status } : { status: 'active' };
    const filterByName = name ? { name } : {};
    const condition = { ...filterByStatus, ...filterByName };
    const [productions] = await Promise.all([
        Productions.findAndCountAll({ where: condition, offset: offset, limit: limit})
    ]);
    const total = getTotal(productions);
    if (productions) succeed(res, { message: 'Success', Data: productions, options: { limit, offset, total } }, 200);
    else failed(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};
