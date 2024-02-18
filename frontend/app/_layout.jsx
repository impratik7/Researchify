import { Tabs } from 'expo-router/tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function AppLayout() {
    const getIconName = (name, isFocused) => {
        switch (name) {
            case 'index':
                return isFocused
                    ? 'home'
                    : 'home-outline';
            case 'discover':
                return isFocused
                    ? 'search'
                    : 'search-outline';
        }
        return 'alert-circle';
    }
    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    const { name } = route;
                    return <Ionicons name={getIconName(name, focused)} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#4741B4",
                // tabBarInactiveTintColor: ,
                tabBarStyle: {
                    backgroundColor: 'black',
                    opacity: 0.8,
                    borderTopWidth: 0,
                    elevation: 5,
                },
            })}>
            <Tabs.Screen
                name='index'
                options={{
                    title: "Explore",
                    href: "/"
                }}
            />
            <Tabs.Screen
                name='discover'
                options={{
                    title: "Discover",
                    href: "discover"
                }}
            />
        </Tabs>
    );
}