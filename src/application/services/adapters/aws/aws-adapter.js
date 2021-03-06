import { makeAwsSignedUrlPromise, s3Config } from '../../image-uploader/aws';

/**
 * Controller for the AWS routes.
 * @method execute Method used to fetch a presigned URL.
 */
export class AWSPresignedAdapter {
  /**
   * @param {function} [makeAwsParams=makeAwsSignedUrlPromise] - Promise with AWS signed URL parameters
   * @param {String} imageName - Name of the file that will be added into the S3.
   *                            It will also be the name of the retrieval URL.
   *                            ex.: https://qrobuy.s3-sa-east-1.amazonaws.com/${imageName}.jpg
   */
  async execute(imageName, makeAwsParams = makeAwsSignedUrlPromise) {
    const awsPresignedParameters = makeAwsParams(imageName);
    const result = await s3Config.getSignedUrlPromise(
      'putObject',
      awsPresignedParameters
    );
    return result;
  }
}
