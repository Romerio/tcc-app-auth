import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import Page3 from './Pages/Page3';
import { createDrawerNavigator } from 'react-navigation';

export default createDrawerNavigator({
  Page1: {
    screen: Page1
  },
  Page2: {
    screen: Page2
  },
  Page3: {
    screen: Page3
  }
}, {
  drawerWidth: 300
})