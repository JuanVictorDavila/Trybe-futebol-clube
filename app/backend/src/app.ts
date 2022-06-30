import * as express from 'express';
import LoginRouter from './routers/loginRouter';
import TeamsRouter from './routers/teamsRouter';
import MatchesRouter from './routers/matchesRouter';
import LeaderBoardRouter from './routers/leaderBoardRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT);
    this.app.use(LoginRouter);
    this.app.use(TeamsRouter);
    this.app.use(MatchesRouter);
    this.app.use(LeaderBoardRouter);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
