import Feed from '../model';
import { filteredImageURL, deleteLocalFiles } from '../../../../util/util';
import { Router, Request, Response, NextFunction as Next } from 'express';

const router: Router = Router();

router
  .get('/', async (req: Request, res: Response, next: Next): Promise<void> => {
    res.send('try GET /filteredimage?url={{}}');
  })
  .get('/filteredimage', async (req, res, next: Next): Promise<any> => {
    const url: string | any = req.query.url;

    if (!url) return res.status(404).send('The image url is not provided in the query');
    const file = await filteredImageURL(url);

    if (file) {
      var others = (await Feed.findAll()).map(({ caption }) => caption);
      const current = await Feed.create({ url, caption: file });
      try {
        await current.save();
        deleteLocalFiles(others);
      } catch (error) { console.error(error); throw error; }
      return res.sendFile(file);
    }
    else return res.status(400).send('There was an error getting file');
  });

export default router;
