import { Request, Response } from 'express';
import * as service from './product.service';
import { HISReponse } from '../../types/response.type';
import { generateUniqueCode } from '../../helpers/unique-code.helper';
import Logger from '../../helpers/winston.helper';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const getAllProduct = async (req: Request, res: Response) => {
  // generate unique code
  const uniqueCode: string = generateUniqueCode();
  let response: HISReponse;

  try {
    // create log
    Logger.info(`${uniqueCode} REQUEST GET ALL PRODUCT`);

    // get semua product
    let product = await service.getAllProduct();

    return res.status(200).json({
      code: '00',
      message: 'request has been successfully executed',
      data: product,
    });
  } catch (error) {
    // bind response
    response = {
      code: '500',
      message:
        process.env.NODE_ENV?.toLocaleLowerCase() != 'production'
          ? `500 internal server error: ${(error as Error).message}`
          : `500 internal server error - backend server`,
      data: {},
    };

    // create log
    Logger.error(`${uniqueCode} RESPONSE GET ALL PRODUCT -`, response);

    return res.status(500).json(response);
  }
};

const getProductById = async (req: Request, res: Response) => {
  // generate unique code
  const uniqueCode: string = generateUniqueCode();
  let response: HISReponse;

  try {
    let { id } = req.params;

    // create log
    Logger.info(`${uniqueCode} REQUEST GET PRODUCT BY ID`, {
      product_id: id,
    });

    let product = await service.getProductById(Number(id));

    if (!product) {
      // bind response
      response = {
        code: '406',
        message: 'data not found. product is not register',
        data: {},
      };

      // create log
      Logger.warn(`${uniqueCode} RESPONSE GET PRODUCT BY ID -`, response);

      return res.status(400).json(response);
    }

    return res.status(200).json({
      code: '00',
      message: 'request has been successfully executed',
      data: product,
    });
  } catch (error) {
    // bind response
    response = {
      code: '500',
      message:
        process.env.NODE_ENV?.toLocaleLowerCase() != 'production'
          ? `500 internal server error: ${(error as Error).message}`
          : `500 internal server error - backend server`,
      data: {},
    };

    // create log
    Logger.error(`${uniqueCode} RESPONSE GET PRODUCT BY ID -`, response);

    return res.status(500).json(response);
  }
};

const createProduct = async (req: Request, res: Response) => {
  // generate unique code
  const uniqueCode: string = generateUniqueCode();
  let response: HISReponse;

  try {
    let { name, price, stock } = req.body;

    if(name == '') {
      // bind response
      response = {
        code: '406',
        message: 'name cannot be empty.',
        data: {},
      };
      return res.status(400).json(response);
    }

    if(name == '') {
      response = {
        code: '406',
        message: 'name cannot be empty.',
        data: {},
      };
      return res.status(400).json(response);
    }

    if(price == '' || Number(price) < 1) {
      response = {
        code: '406',
        message: 'price cannot be empty and must positive integer value.',
        data: {},
      };
      return res.status(400).json(response);
    }
    if(stock == '' || Number(stock) < 1) {
      response = {
        code: '406',
        message: 'stock cannot be empty and must positive integer value.',
        data: {},
      };
      return res.status(400).json(response);
    }

    // create log
    Logger.info(`${uniqueCode} REQUEST CREATE PRODUCT`, {
      name: name,
      price: price,
      stock: stock
    });

    const data = {
      name: name,
      price: price,
      stock: stock
    };

    // create log
    Logger.debug(
      `${uniqueCode} PROCESS CREATE PRODUCT - inserting product to database`
    );
    // insert data ke database
    await service.createProduct(data);

    // bind response
    response = {
      code: '00',
      message: 'request has been successfully executed. created product successfully',
      data: {},
    };

    // create log
    Logger.info(`${uniqueCode} RESPONSE CREATE PRODUCT -`, response);

    return res.status(200).json(response);
  } catch (error) {
    // bind response
    response = {
      code: '500',
      message:
        process.env.NODE_ENV?.toLocaleLowerCase() != 'production'
          ? `500 internal server error: ${(error as Error).message}`
          : `500 internal server error - backend server`,
      data: {},
    };

    // create log
    Logger.error(`${uniqueCode} RESPONSE CREATE PRODUCT -`, response);

    return res.status(500).json(response);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  // generate unique code
  const uniqueCode: string = generateUniqueCode();
  let response: HISReponse;

  try {
    let { id } = req.params;
    let { name, price, stock } = req.body;

    // create log
    Logger.info(`${uniqueCode} REQUEST UPDATE PRODUCT`, req.body);

    let getProductId = await service.getProductById(Number(id));
    if (!getProductId) {
      // bind response
      response = {
        code: '406',
        message: 'data not found. product not found',
        data: {},
      };

      // create log
      Logger.warn(`${uniqueCode} RESPONSE UPDATE PRODUCT -`, response);
      return res.status(400).json(response);
    }

    const data = {
      name: name,
      price: price,
      stock: stock
    };

    // create log
    Logger.debug(
      `${uniqueCode} PROCESS UPDATE PRODUCT - updating product to database`
    );
    // update data ke database
    await service.updateProduct(Number(id), data);

    // bind response
    response = {
      code: '00',
      message:
        'request has been successfully executed. updated product successfully',
      data: {},
    };

    // create log
    Logger.info(`${uniqueCode} RESPONSE UPDATE PRODUCT -`, response);

    return res.status(200).json(response);
  } catch (error) {
    // bind response
    response = {
      code: '500',
      message:
        process.env.NODE_ENV?.toLocaleLowerCase() != 'production'
          ? `500 internal server error: ${(error as Error).message}`
          : `500 internal server error - backend server`,
      data: {},
    };

    // create log
    Logger.error(`${uniqueCode} RESPONSE UPDATE PRODUCT -`, response);

    return res.status(500).json(response);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  // generate unique code
  const uniqueCode: string = generateUniqueCode();
  let response: HISReponse;

  try {
    let { id } = req.params;

    // create log
    Logger.info(`${uniqueCode} REQUEST DELETE PRODUCT`, req.body);

    // create log
    Logger.debug(`${uniqueCode} PROCESS DELETE PRODUCT - getting product by id`);

    let getProductId = await service.getProductById(Number(id));

    if (!getProductId) {
      response = {
        code: '406',
        message: 'data not found.',
        data: {},
      };

      // create log
      Logger.warn(`${uniqueCode} RESPONSE DELETE PRODUCT -`, response);
      return res.status(400).json(response);
    }

    let param = {
      status: 2,
      last_update: new Date(moment().format('YYYY-MM-DD HH:mm:ss')),
      updated_by: id
    };

    let deleteProduct = await service.deleteProduct(Number(id));
    console.log('delete product', deleteProduct)

    // bind response
    response = {
      code: '00',
      message:
        'request has been successfully executed. delete product successfully',
      data: {},
    };

    // create log
    Logger.info(`${uniqueCode} RESPONSE DELETE PRODUCT -`, response);

    return res.status(200).json(response);
  } catch (error) {
    // bind response
    response = {
      code: '500',
      message:
        process.env.NODE_ENV?.toLocaleLowerCase() != 'production'
          ? `500 internal server error: ${(error as Error).message}`
          : `500 internal server error - backend server`,
      data: {},
    };

    // create log
    Logger.error(`${uniqueCode} RESPONSE DELETE PRODUCT -`, response);

    return res.status(500).json(response);
  }
};


export {
  getAllProduct,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct
};