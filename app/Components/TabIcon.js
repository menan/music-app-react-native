import React, {
  PropTypes,
} from 'react';
import {
  Text,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Strings from '../Utilities/Strings';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => {
    
      let prefix =  (Platform.OS == 'android') ? 'md' : 'ios'
      var icon = 'heart'

      switch(props.title) {
          case Strings.ta.albumsTitle:
              icon = 'albums'
              break;
          case Strings.ta.settingsTitle:
              icon = 'cog'
              break;
          case 'Player':
              icon = 'disc'
              break;
          default:
              icon = 'heart'
      }

      
      return (
          <Icon name={`${prefix}-${icon}`} size={30} color={props.selected ? Strings.tintColor : '#000'} />
      );
};

TabIcon.propTypes = propTypes;

export default TabIcon;
