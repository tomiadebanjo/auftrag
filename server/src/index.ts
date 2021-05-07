import app from './app';
import logger from './utils/logger';

const PORT = app.get('port');

const server = app.listen(PORT, () => logger.info(`Running on ${PORT}`));

export default server;
