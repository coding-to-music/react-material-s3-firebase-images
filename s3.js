import aws from "aws-sdk";
import crypto from "crypto";
import dotenv from 'dotenv'
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);

dotenv.config()

const region = "us-east-1";
const bucketName = "lasco-dev";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

// removes artwork img from s3 bucket, takes in key to artwork (file path in s3 bucket)
export async function delArt(artKey) {
  // sets params for s3 function call
  const params = { Bucket: 'lasco-dev', Key: artKey}
  // deletes art and logs any errors (one-line if statement is neat)
  await s3.deleteObject(params).promise()
}

export async function generateUploadURL(folder) {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");
  var params = {};
  if (folder) {
    params = {
      Bucket: bucketName,
      Key: folder + imageName,
      Expires: 60,
    };
  }
  else {
    params = {
      Bucket: bucketName,
      Key: imageName,
      Expires: 60,
    };
  }
 
  

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}
