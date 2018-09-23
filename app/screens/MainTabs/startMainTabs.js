import { Navigation } from 'react-native-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Platform } from 'react-native'

const tabIcons = Platform.OS === 'android' ? {
    map : 'md-map',
    share : 'md-share',
    menu : 'md-menu'
} : {
    map : 'md-map',
    share : 'ios-share',
    menu : 'ios-menu'
}

const startTabs = () => {
    Promise.all([
        Ionicons.getImageSource(tabIcons.map, 30),
        Ionicons.getImageSource(tabIcons.share, 30),
        Ionicons.getImageSource(tabIcons.menu, 30)
    ]).then((sources) => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "awesome-places.FindPlaceScreen",
                    label: 'Find Place',
                    title: 'Find Place',
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [{
                            icon: sources[2],
                            title: 'Menu',
                            id: 'sideDrawerToggle'
                        }]
                    }
                },
                {
                    screen:  "awesome-places.SharePlaceScreen",
                    label: 'Share Place',
                    title: 'Share Place',
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [{
                            icon: sources[2],
                            title: 'Menu',
                            id: 'sideDrawerToggle'
                        }]
                    }
                }
            ],
            tabsStyle: {
                tabBarSelectedButtonColor: 'orange',
            },
            appStyle: { // tabsStyle for Android
                tabBarSelectedButtonColor: 'orange',
            },
            drawer: {
                left: {
                    screen: "awesome-places.SideDrawerScreen"
                }
            }
        })
    })
}

export default startTabs