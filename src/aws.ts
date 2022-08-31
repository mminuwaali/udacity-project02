import configure from './config/config';
import { S3, SharedIniFileCredentials, config } from 'aws-sdk';

const { dev: { aws_profile: profile, aws_media_bucket: Bucket, aws_region: region } } = configure;

if (profile !== 'DEPLOYED') config.credentials = new SharedIniFileCredentials({ profile });

export const s3 = new S3({ region, signatureVersion: 'v4', params: { Bucket } });

const getGetSignedUrl = (Key: string): string => s3.getSignedUrl('getObject', { Key, Bucket, Expires: 60 * 5 });

const getPutSignedUrl = (Key: string): string => s3.getSignedUrl('PutObject', { Key, Bucket, Expires: 60 * 5 });

