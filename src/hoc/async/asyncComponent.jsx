import React, { Suspense } from 'react';
import Spinner from '../../components/UI/spinner/spinner';

const asyncComponent = (SyncComponent, props) => (
  <Suspense fallback={<Spinner />} >
    <SyncComponent {...props} />
  </Suspense>
);

export default asyncComponent;