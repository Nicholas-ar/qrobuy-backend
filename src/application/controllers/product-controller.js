import { qrCodeAdapter } from '../../../src/application/services/adapters/qrcode/qrcode-adapter';
import { ProductRepository } from '../../application/database/protocols';
import { HttpRequest } from './protocols/http.definition';
import {
  HTTP_CREATED_201,
  HTTP_SERVER_ERROR_500,
  HTTP_BAD_REQUEST_400,
  HTTP_OK_200,
  HTTP_NO_CONTENT_204,
} from '../helpers/http-helper';
import { ImageUploaderService } from '../../domain/services/protocols';

export class ProductController {
  /**
   * @param {ProductRepository} repository
   * @param {ImageUploaderService} imageUploaderService
   */
  constructor(repository, imageUploaderService) {
    this._repository = repository;
    this._imageUploaderService = imageUploaderService;
  }

  /**
   * Receives an HttpRequest containing a valid product field in the body
   * @param {HttpRequest} httpRequest
   * r@
   * - A 500 http response will be returned if an error is thrown during the process.
   * - A 201 http response will be returned otherwise, with the product on the body.
   *
   */
  async createProduct(httpRequest) {
    try {
      const qrAdapter = new qrCodeAdapter();
      const pressignedUrl = await this._imageUploaderService.execute(
        httpRequest.body.imageName
      );
      //TODO: refactor this
      httpRequest.body.product.imageUrl = `https://qrobuy.s3-sa-east-1.amazonaws.com/${httpRequest.body.imageName}.jpg`;

      const productNoQR = await this._repository.create(
        httpRequest.body.product
      );

      //TODO: make sure this is the correct productUrl
      const productUrl = `https://qrobuy.netlify.app/product/${productNoQR._id}`;
      const tempQRCodeString = await qrAdapter.generateQRCode(productUrl);
      await this._repository.update(
        { _id: productNoQR._id },
        { $set: { qrCodeString: tempQRCodeString } }
      );

      const product = await this._repository.getByQuery({
        _id: productNoQR._id,
      });

      return HTTP_CREATED_201({ product, pressignedUrl });
    } catch (error) {
      console.error(error)
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  /**
   * Receives an HttpRequest containing a valid product query field in the body
   * @param {HttpRequest} httpRequest
   * - A 400 http response will be returned if no matches are found in the database.
   * - A 500 http response will be returned if an error is thrown during the process.
   * - A 200 http response will be returned otherwise, containing the product info in the body.
   */
  async retrieveProduct(httpRequest) {
    try {
      const resProduct = await this._repository.getById(httpRequest.params._id);
      if (!resProduct)
        return HTTP_BAD_REQUEST_400({
          message: 'No products with this query found',
        });
      return HTTP_OK_200(resProduct);
    } catch (error) {
      console.error(error)
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  /**
   * Receives an HttpRequest containing a valid product id in the body
   * @param httpRequest
   * - A 400 http response will be returned if no matches are found in the database.
   * - A 500 http response will be returned if an error is thrown during the process.
   * - A 200 http response will be returned otherwise, containing the product info in the body.
   */
  async retrieveProductById(httpRequest) {
    try {
      const resProduct = await this._repository.getById(httpRequest.params._id);
      if (!resProduct)
        return HTTP_BAD_REQUEST_400({
          message: 'No products with this id found',
        });
      return HTTP_OK_200(resProduct);
    } catch (error) {
      console.error(error)
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  /**
   * Receives an empty HttpRequest
   * - A 500 http response will be returned if an error is thrown during the process.
   * - A 200 http response will be returned otherwise, containing an array with the products info in the body.
   */

  async retrieveAll() {
    try {
      const allProducts = await this._repository.getAll();
      return HTTP_OK_200(allProducts);
    } catch (error) {
      console.error(error)
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  /**
   * Receives an HttpRequest with an update query and the values to be updated in the format $set: {...}
   * @param {HttpRequest} httpRequest
   * - A 400 http response will be returned if no matches are found to be updated in the database.
   * - A 500 http response will be returned if an error is thrown during the process.
   * - A 200 http response will be returned otherwise, containing an binary value in the body, indicating if the update has been successful.
   */

  async updateProduct(httpRequest) {
    try {
      const updateFormat = { $set: httpRequest.body };
      const response = await this._repository.update(
        httpRequest.params,
        updateFormat
      );
      const updated = response.modifiedCount;

      if (updated === 0) {
        return HTTP_BAD_REQUEST_400({ message: 'No products found' });
      }
      return HTTP_OK_200(updated);
    } catch (error) {
      console.error(error)
      return HTTP_SERVER_ERROR_500(error);
    }
  }

  /**
   * Receives an HttpRequest with an delete query
   * @param {HttpRequest} httpRequest
   * - A 400 http response will be returned if no matches are found to be deleted in the database.
   * - A 500 http response will be returned if an error is thrown during the process.
   * - A 200 http response will be returned otherwise, containing an binary value in the body, indicating if the deletion has been successful.
   */
  async deleteProduct(httpRequest) {
    try {
      const response = await this._repository.delete(
        httpRequest.params.deleteQuery
      );
      const found = response.deletedCount;
      if (found === 0) {
        return HTTP_BAD_REQUEST_400({ message: 'No products found' });
      }
      return HTTP_NO_CONTENT_204(found);
    } catch (error) {
      console.error(error)
      return HTTP_SERVER_ERROR_500(error);
    }
  }
}
