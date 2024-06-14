import registerRootComponent from 'expo/build/launch/registerRootComponent';

import App from './app/index';

// Hide yellow box
console.disableYellowBox = true;

registerRootComponent(App);
