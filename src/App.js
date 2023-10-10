import React, { useEffect } from 'react';
import { Amplify, Hub, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {

  useEffect(()=> {
    Auth.currentAuthenticatedUser().then((user) => {
      console.log('first user', user);
    });
    console.log('setup hub event listener in useeffect')

    setInterval(() => {
      Auth.currentAuthenticatedUser().then((user) => {
        console.log('refreshed user', user);
      });
      console.log('refresh token');
    }, 5000);

    Hub.listen('auth', (data) => {
      console.log('auth event listener', data);
      if(data.payload.event === 'tokenRefresh') {
        console.log('token refreshed', data);
      }
    });
  }, [])
  return (
    <div>
      <h1>Hello {user.username}</h1>
      <h1>Hello {user.signInUserSession.idToken.jwtToken}</h1>
      <button onClick={signOut}>Sign out</button>
      </div>
  );
}

export default withAuthenticator(App);