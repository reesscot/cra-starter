import React, { useEffect } from 'react';
import { Amplify, Hub } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {

  useEffect(()=> {

    console.log('setup hub event listener')
    Hub.listen('auth', (data) => {
      console.log('auth event listener', data);
      if(data.payload.event === 'tokenRefresh') {
        console.log('token refreshed');
      }
    });
  }, [])
  return (
    <div>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
      </div>
  );
}

export default withAuthenticator(App);