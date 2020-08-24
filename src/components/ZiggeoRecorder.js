/* globals ZiggeoApi */
import React, { useState, useEffect, useRef } from 'react';
import {
  reactCustomOptions,
  ziggeoRecorderAttributesPropTypes,
  ziggeoRecorderEmbeddingEventsPropTypes,
  ziggeoCommonEmbeddingEventsPropTypes,
  ziggeoRecorderApplicationOptions,
  ziggeoPlayerApplicationOptions
} from '../constants';

import withZiggeoApplication from "./withZiggeoApplication";

const ZiggeoRecorder = ({ app, ...props }) =>  {

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
      setRecorder(new ZiggeoApi.V2.Recorder({
        element: recorderElement.current,
        attrs: attributes
      }));
    }
  }, [attributes, recorderElement]);

  useEffect(() => {
    if (recorder) {
      recorder.activate();

      Object.entries(ziggeoEvents).forEach(([event, func]) => {
        recorder.on(event, func.bind(ZiggeoRecorder, recorder.get()));
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
    return Object.keys(props).filter(k => Object.assign(ziggeoRecorderAttributesPropTypes, ziggeoPlayerApplicationOptions)[k]).reduce((attr, k) => {
      attr[k.replace(/^_/g, '')] = props[k];
      return attr;
    }, {});
  };

  /**
   * Include props which are not related to Ziggeo
   * @returns {{}}
   */
  const ziggeoElementProps = () => {
    return Object.keys(props).filter(k => !ZiggeoRecorder.propTypes[k]).reduce((attr, k) => {
      attr[k] = props[k];
      return attr;
    }, {});
  };

  /**
   * Add Related Events
   * @type {{}}
   */
  const ziggeoEvents = Object.keys(Object.assign(ziggeoRecorderEmbeddingEventsPropTypes, ziggeoCommonEmbeddingEventsPropTypes))
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
   * @returns Player Instance
   */
  const recorderInstance = () => recorder;

  return (<div ref={recorderElement} app={app} {...elementProps} />);
};

ZiggeoRecorder.propTypes = {
  ...ziggeoRecorderAttributesPropTypes,
  ...ziggeoRecorderEmbeddingEventsPropTypes,
  ...ziggeoCommonEmbeddingEventsPropTypes,
  ...ziggeoRecorderApplicationOptions,
  ...reactCustomOptions
};

ZiggeoRecorder.defaultProps = {
  // Presentational parameters
  'width': 640,
  'height': 480,
  'picksnapshots': true,
  'countdown': 3,
  'snapshotmax': 15,
  'gallerysnapshots': 3,
  'theme': 'default',
  'themecolor': 'default',
  'primaryrecord': true,

  // Video management parameters
  'recordingwidth': 640,
  'recordingheight': 480,
  'framerate': 25,
  'videobitrate': 'auto',
  'audiobitrate': 'auto',
  'microphone-volume': 1,

  // Operational parameters
  'allowupload': true,
  'allowrecord': true,
  'force-overwrite': true,
  'allowcustomupload': true,
  'recordermode': true,
  'cpu-friendly': false,
  'trimoverlay': true,
  'pauseonclick': true,

  // only react related options
  'preventReRenderOnUpdate': true,

  'display-timer': true,
  'rtmpstreamtype': 'mp4',
  'rtmpmicrophonecodec': 'speex',
  'transcript-language': 'en-US',

  'multistreamreversable': true,
  'multistreamdraggable': true,
  'addstreamproportional': true,
  'addstreampositionx': 5,
  'addstreampositiony': 5,
  'addstreampositionwidth': 120,
  'addstreampositionheight': 95,
  'addstreamminwidth': 120,
  'addstreamminheight': 95,

  // application settings
  webrtc_streaming: false,
  webrtc_streaming_if_necessary: false,
  webrtc_on_mobile: false,
  auth: false,
  debug: false,
  testing_application: false,

  // screen configuration for Ziggeo extension
  "allowscreen": false,
  chrome_extension_id: "meoefjkcilgjlkibnjjlfdgphacbeglk",
  chrome_extension_install_link: "https://chrome.google.com/webstore/detail/meoefjkcilgjlkibnjjlfdgphacbeglk",
  opera_extension_id: "dnnolmnenehhgplebjhbcmfdbaabkepm",
  opera_extension_install_link: "https://addons.opera.com/en/extensions/details/3d46d4c36fefe97e76622c54b2eb6ea1d5406767",

  // Default events to no-op
  ...Object.keys(Object.assign(ziggeoRecorderEmbeddingEventsPropTypes, ziggeoCommonEmbeddingEventsPropTypes)).reduce((defaults, event) => {
    defaults[event] = () => {};
    return defaults;
  }, {})
};

export default withZiggeoApplication(ZiggeoRecorder);

// const doesUpdateRequire = (prevProps, nextProps) => {
//   // const oldApiKey = prevProps['apiKey'];
//   // const { apiKey } = nextProps;
//   const { preventReRenderOnUpdate } = nextProps || true;
//   return !preventReRenderOnUpdate;
// };

// export default withZiggeoApplication(React.memo(ZiggeoRecorder, doesUpdateRequire));
