/* globals ZiggeoApi */
import React, { useState, useEffect, useRef } from 'react';
import {
  reactCustomOptions,
  ziggeoAudioRecorderAttributesPropTypes,
  ziggeoRecorderEmbeddingEventsPropTypes,
  ziggeoCommonEmbeddingEventsPropTypes,
  ziggeoRecorderApplicationOptions,
  ziggeoPlayerApplicationOptions
} from '../constants';

import withZiggeoApplication from "./withZiggeoApplication";

const ZiggeoAudioRecorder = ({ app, ...props }) => {

  let { updateInstance } = props;
  const [recorder, setRecorder] = useState(null);
  const [attributes, setAttributes] = useState(null);
  const [elementProps, setElementProps] = useState(null);
  let recorderElement = useRef(null);

  useEffect(() => {
    if (attributes && recorder && updateInstance) {
      setAttributes(null);
    }
  }, [updateInstance]);

  useEffect(() => {
    if (!attributes) {
      setAttributes(ziggeoAttributes());
      setElementProps(ziggeoElementProps());
    }
    if (recorderElement && attributes) {
      setRecorder(new ZiggeoApi.V2.AudioRecorder({
        element: recorderElement.current,
        attrs: attributes
      }));
    }
  }, [attributes, recorderElement]);

  useEffect(() => {
    if (recorder) {
      recorder.activate();

      Object.entries(ziggeoEvents).forEach(([event, func]) => {
        recorder.on(event, func.bind(ZiggeoAudioRecorder, recorder.get()));
      });

      props.onRef(recorder);
    }

    return () => {
      if (recorder) {
        props.onRef(null);
        recorder.destroy();
      }
    }

  }, [recorder]);

  /**
   * Set all props defined by user
   * @returns {{}}
   */
  const ziggeoAttributes = () => {
    return Object.keys(props).filter(k => Object.assign(
        ziggeoAudioRecorderAttributesPropTypes, ziggeoPlayerApplicationOptions
    )[k]).reduce((attr, k) => {
      attr[k.replace(/^_/g, '')] = props[k];
      return attr;
    }, {});
  };

  /**
   * Include props which are not related to Ziggeo
   * @returns {{}}
   */
  const ziggeoElementProps = () => {
    return Object.keys(props).filter(k => !ZiggeoAudioRecorder.propTypes[k]).reduce((attr, k) => {
      attr[k] = props[k];
      return attr;
    }, {});
  };

  /**
   * Add Related Events
   * @type {{}}
   */
  const ziggeoEvents = Object.keys(Object.assign(
      ziggeoRecorderEmbeddingEventsPropTypes, ziggeoCommonEmbeddingEventsPropTypes
  ))
    .reduce((memo, propName) => {
      const eventName = propName.replace(/([A-Z])/g, '_$1').toLowerCase().slice(3)
        .replace(/(recorder_|player_)/g, '');
      memo[eventName] = (...args) => {
        props[propName](...args)
      };
      return memo;
    }, {});

  /**
   *
   * @returns AudioPlayer Instance
   */
  const recorderInstance = () => recorder;

  return (<div ref={recorderElement} app={app} {...elementProps} />);
};

ZiggeoAudioRecorder.propTypes = {
  ...ziggeoAudioRecorderAttributesPropTypes,
  ...ziggeoRecorderEmbeddingEventsPropTypes,
  ...ziggeoCommonEmbeddingEventsPropTypes,
  ...ziggeoRecorderApplicationOptions,
  ...reactCustomOptions
};

ZiggeoAudioRecorder.defaultProps = {
  // Presentational parameters
  'width': 640,
  'height': 480,
  'countdown': 3,
  'theme': 'default',
  'themecolor': 'default',
  'primaryrecord': true,

  // Video management parameters
  'audiobitrate': 'auto',
  'microphone-volume': 1,

  // Operational parameters
  'allowupload': true,
  'allowrecord':	true,
  'force-overwrite':	true,
  'allowcustomupload': true,
  'recordermode': true,

  // only react related options
  'preventReRenderOnUpdate': true,

  'display-timer': true,
  'rtmpmicrophonecodec': 'speex',
  'transcript-language': 'en-US',


  // application settings
  webrtc_streaming: false,
  webrtc_streaming_if_necessary: false,
  webrtc_on_mobile: false,
  auth: false,
  debug: false,
  testing_application: false,

  // Default events to no-op
  ...Object.keys(Object.assign(ziggeoRecorderEmbeddingEventsPropTypes, ziggeoCommonEmbeddingEventsPropTypes)).reduce((defaults, event) => {
    defaults[event] = () => {};
    return defaults;
  }, {})
};

export default withZiggeoApplication(ZiggeoAudioRecorder);
