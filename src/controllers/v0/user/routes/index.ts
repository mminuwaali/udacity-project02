import User from '../model';
import { validate } from 'email-validator';
import { Router, Request, Response, NextFunction as Next } from 'express';
import { requireAuth, comparePaswords, generateJWT, generatePassword } from '../../../../config/auth';

const router: Router = Router();

router
  
  // index router
  .get('/', async (req: Request, res: Response, next: Next): Promise<any> => {
    res.send('auth')
  })

  // verify user credentials
  .get('/veryfy', requireAuth, async (req: Request, res: Response, next: Next): Promise<any> => {
    return res.status(200).send({ auth: true, message: 'Authenticated.' });
  })

  // get user by email params
  .get('/:email', requireAuth, async (req: Request, res: Response, next: Next): Promise<any> => {
    const { email } = req.params;
    if (!validate(email)) return res.status(400).send({ message: "the email is not valid" });

    const user = await User.findByPk(email);
    if (user) return res.send({ user: user.short() });
    else return res.status(404).send({ message: 'user with this email is not found' });
  })

  // register a new user
  .post('/register', async (req: Request, res: Response, next: Next): Promise<any> => {
    const email: string | undefined = req.body?.email;
    const plainPassword: string | undefined = req.body?.password;


    // check if email and password are valid
    if (!email || !validate(email)) return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    if (!plainPassword) return res.status(400).send({ auth: false, message: 'Password is required' });

    const user = await User.findByPk(email);

    if (user) return res.status(422).send({ auth: false, message: 'User already exist' });

    const password: string = await generatePassword(plainPassword);


    let savedUser;
    const newUser: User = await User.create({ email, password });

    try { savedUser = await newUser.save(); } catch (error) {
      console.error(error);
      throw error;
    };

    const jwt = generateJWT(savedUser);
    res.status(201).send({ token: jwt, user: savedUser.short() });
  })

  // login a user
  .post('/login', async (req: Request, res: Response, next: Next): Promise<any> => {
    const { email, password } = req.body;
    console.log(email);



    if (!email || !validate(email)) return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    if (!password) return res.status(400).send({ auth: false, message: 'Password is required' });

    const user = await User.findByPk(email);
    if (!user) return res.status(401).send({ auth: false, message: 'Unauthorized' });

    const authValid = await comparePaswords(password, user.password);
    if (!authValid) return res.status(401).send({ auth: false, message: 'Unauthorized' });

    const jwt = generateJWT(user);
    res.status(200).send({ auth: true, token: jwt, user: user.short() });
  });

export default router;
