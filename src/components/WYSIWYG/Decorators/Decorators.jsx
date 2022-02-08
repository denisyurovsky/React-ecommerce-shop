import { CompositeDecorator } from 'draft-js';

import { TYPES } from '../constants';

import Email from './EmailDecorator';
import Link from './LinkDecorator';

const createDecorator = () =>
  new CompositeDecorator([
    { strategy: findEmailEntities, component: Email },
    { strategy: findLinkEntities, component: Link },
  ]);

const findEmailEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();

    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === TYPES.EMAIL
    );
  }, callback);
};

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();

    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === TYPES.LINK
    );
  }, callback);
};

export default createDecorator;
