"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
const config_1 = __importDefault(require("./config/config"));
const aws_sdk_1 = require("aws-sdk");
const { dev: { aws_profile: profile, aws_media_bucket: Bucket, aws_region: region } } = config_1.default;
if (profile !== 'DEPLOYED')
    aws_sdk_1.config.credentials = new aws_sdk_1.SharedIniFileCredentials({ profile });
exports.s3 = new aws_sdk_1.S3({ region, signatureVersion: 'v4', params: { Bucket } });
const getGetSignedUrl = (Key) => exports.s3.getSignedUrl('getObject', { Key, Bucket, Expires: 60 * 5 });
const getPutSignedUrl = (Key) => exports.s3.getSignedUrl('PutObject', { Key, Bucket, Expires: 60 * 5 });
//# sourceMappingURL=aws.js.map