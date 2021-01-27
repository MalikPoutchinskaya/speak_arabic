import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ArabicSound from './arabic-sound';
import ArabicSoundDetail from './arabic-sound-detail';
import ArabicSoundUpdate from './arabic-sound-update';
import ArabicSoundDeleteDialog from './arabic-sound-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ArabicSoundDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ArabicSoundUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ArabicSoundUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ArabicSoundDetail} />
      <ErrorBoundaryRoute path={match.url} component={ArabicSound} />
    </Switch>
  </>
);

export default Routes;
