import * as express from 'express';
import UserController from './controllers/UserController';
import TeamController from './controllers/TeamController';
import MatchController from './controllers/MatchController';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.post('/login', (req, res) => UserController.login(req, res));
    this.app.get('/login/validate', (req, res) => UserController.loginValidation(req, res));
    this.app.get('/teams', (req, res) => TeamController.getAll(req, res));
    this.app.get('/teams/:id', (req, res) => TeamController.getById(req, res));
    this.app.get('/matches', (req, res) => MatchController.getAll(req, res));
    this.app.post('/matches', (req, res) => MatchController.create(req, res));
    this.app.patch('/matches/:id/finish', (req, res) => MatchController.finishMatch(req, res));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
