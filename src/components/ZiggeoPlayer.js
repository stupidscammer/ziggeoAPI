import React, { useState, useEffect, useRef } from 'react';
import withZiggeoApplication from "./withZiggeoApplication";
import {
    ziggeoPlayerAttributesPropTypes,
    ziggeoPlayerEmbeddingEventsPropTypes,
    ziggeoCommonEmbeddingEventsPropTypes,
    ziggeoPlayerApplicationOptions,
    reactCustomOptions
} from '../constants';

const ZiggeoPlayer = ({ app, ...props }) => {

    let { updateInstance } = props;
    const [player, setPlayer] = useState(null);
    const [attributes, setAttributes] = useState(null);
    const [elementProps, setElementProps] = useState(null);
    let playerElement = useRef(null);

    useEffect(() => {
        if (attributes && player && updateInstance) {
            setAttributes(null);
        }
    }, [updateInstance]);

    useEffect(() => {
        if (!attributes) {
            setAttributes(ziggeoAttributes());
            setElementProps(ziggeoElementProps());
        }
        if (playerElement && attributes) {
            setPlayer(new ZiggeoApi.V2.Player({
                element: playerElement.current,
                attrs: attributes
            }));
        }
    }, [attributes]);


    useEffect(() => {
        if (player) {
            player.activate();

            Object.entries(ziggeoEvents).forEach(([event, func]) => {
                player.on(event, func.bind(ZiggeoPlayer, player.get()));
            });

            props.onRef(player);
        }

        return () => {
            if (player) {
                props.onRef(null);
                player.destroy();
            }
        }

    }, [player]);

    /**
     * Set all props defined by user
     * @returns {{}}
     */
    const ziggeoAttributes = () => {
        return Object.keys(props).filter(k => ziggeoPlayerAttributesPropTypes[k]).reduce((attr, k) => {
            attr[k.replace(/^_/g, '')] = props[k];
            return attr;
        }, {});
    };

    /**
     * Include props which are not related to Ziggeo
     * @returns {{}}
     */
    const ziggeoElementProps = () => {
        return Object.keys(props).filter(k => !ZiggeoPlayer.propTypes[k]).reduce((attr, k) => {
            attr[k] = props[k];
            return attr;
        }, {});
    };

    /**
     * Add Related Events
     * @type {{}}
     */
    const ziggeoEvents = Object.keys(Object.assign(ziggeoPlayerEmbeddingEventsPropTypes, ziggeoCommonEmbeddingEventsPropTypes))
      .reduce((memo, propName) => {
          const eventName = propName.replace(/([A-Z])/g, '_$1').toLowerCase().slice(3)
            .replace(/(recorder_|player_)/g, '');
          memo[eventName] = (...args) => {
              props[propName](...args)
          };
          return memo;
      }, {});

    // Delegate ziggeo attrs to the player
    const playerInstance = () => player;

    return (<div ref={playerElement} app={app} {...elementProps}/>);
};

ZiggeoPlayer.propTypes = {
    ...ziggeoPlayerAttributesPropTypes,
    ...ziggeoPlayerEmbeddingEventsPropTypes,
    ...ziggeoCommonEmbeddingEventsPropTypes,
    ...ziggeoPlayerApplicationOptions,
    ...reactCustomOptions
};

ZiggeoPlayer.defaultProps = {
    // Presentational parameters
    'width': 640,
    'height': 480,
    'picksnapshots': true,
    'theme': 'default',
    'themecolor': 'default',
    'hidebarafter': 5000, // in milliseconds
    'skipseconds': 5, // in seconds
    'videofitstrategy': 'pad',
    'posterfitstrategy': 'crop',

    // only react related options
    'preventReRenderOnUpdate': true,

    // Default events to no-op
    ...Object.keys(Object.assign(ziggeoPlayerEmbeddingEventsPropTypes, ziggeoCommonEmbeddingEventsPropTypes)).reduce((defaults, event) => {
        defaults[event] = () => {};
        return defaults;
    }, {})
};

export default withZiggeoApplication(ZiggeoPlayer);
