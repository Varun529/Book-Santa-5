import React,{Component} from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import AppTabNavigator from './TabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';

export const AppDrawerNavigator=createDrawerNavigator({
    Home:{
        screen:AppTabNavigator
    },

},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:'Home'
}
)