// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Post, Comment } = initSchema(schema);

export {
  User,
  Post,
  Comment
};