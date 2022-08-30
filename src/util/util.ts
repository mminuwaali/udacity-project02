import { read } from 'jimp';
import { unlinkSync } from 'fs';

export const filteredImageURL = async (inputURL: any): Promise<string> => new Promise(async (res, rej) => {
  try {
    const photo = await read(inputURL);
    const outPath = `/tmp/filtered.${Math.floor(Math.random() * 2000)}.jpg`;
    photo
      .resize(256, 256)
      .quality(60)
      .grayscale()
      .write(__dirname + outPath, () => { res(__dirname + outPath) });
  } catch (error) { rej(error); }
});

export const deleteLocalFiles = (files: Array<string>): void => { for (let file of files) unlinkSync(file); };
