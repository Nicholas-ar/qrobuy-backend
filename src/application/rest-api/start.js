import app from './app';
import { MongoHelper } from '../helpers/mongoHelper';
import env from '../config/environment';

const PORT = env.PORT;

if (!env.AWS_TOKEN) {
  throw new Error('TOKEN environment variable must be defined');
}
if (!env.AWS_SECRET_KEY) {
  throw new Error('AMAZON_SECRET_KEY environment variable must be defined');
}
if (!env.AWS_BUCKET) {
  throw new Error('BUCKET environment variable must be defined');
}
if (!env.AWS_REGION) {
  throw new Error('REGION environment variable must be defined');
}

MongoHelper.connect(env.MONGOURL)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  })
  .catch(console.error);
