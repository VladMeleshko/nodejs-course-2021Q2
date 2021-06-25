import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import loginRouter from './login/login.router'; //
import autoriseUser from './login/validate-session';
import middleware from './logger_and_error_handlers/middleware';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(middleware.logging);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter); //
app.use(autoriseUser);

app.use('/users', userRouter);
app.use('/boards', taskRouter);
app.use('/boards', boardRouter);

app.use(middleware.errorHandler);

process.on('uncaughtException', middleware.exceptionLogger);
// throw Error('Oops!');

process.on('unhandledRejection', middleware.rejectionLogger);
// Promise.reject('Oops!');

export default app;
