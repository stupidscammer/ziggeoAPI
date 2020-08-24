import React, { useState, useEffect } from 'react';
import {ziggeoApplicationEvents, ziggeoRecorderApplicationOptions} from "../constants";
import { string } from "prop-types";

const withZiggeoApplication = WrappedComponent => {
  return ({apiKey, flashUrl, locale, mediaLocales, ...restProps}) => {

    const [app, setApp] = useState(null);

    useEffect(() => {
      try {
        if (!app) initApplication();
      } catch (e) {
        console.error(e);
      }

      return () => {
        // NOTE: DON'T DESTROY APPLICATION ITSELF
        // Will receive error 'Cannot read property 'urls' of undefined'
        // if (app) app.destroy();
      }
    }, [app]);

    const initApplication = () => {
      // Set locale
      if (typeof locale !== "undefined")
        ZiggeoApi.V2.Locale.setLocale(locale);

      if (mediaLocales) {
        if (Array.isArray(mediaLocales))
          mediaLocales.map((config) => {
            const {register, languages, priority} = config;
            if (register) {
              if (Array.isArray(languages)) {
                const language_args = [];
                languages.map((l, i) => {
                  language_args.push(`language:${l}`);
                  if (i === (languages.length - 1)) {
                    return ZiggeoApi.V2.Locale.mediaLocale.register(register, language_args, priority || 10);
                  }
                });
              } else {
                return ZiggeoApi.V2.Locale.mediaLocale.register(register, priority || 10);
              }
            }
          });
        else console.warn('mediaLocales has to be an Array, please read documentation for more details.');
      }

      // Set external flash player
      if (typeof flashUrl !== "undefined")
        ZiggeoApi.V2.Config.set("flash", flashUrl);

      setApp(ZiggeoApi.V2.Application.instanceByToken(apiKey, applicationOptions()));
    };

    const applicationOptions = () => {
      return Object.keys(restProps)
        .filter(k => ziggeoRecorderApplicationOptions[k]).reduce((attr, k) => {
          attr[k] = restProps[k];
          return attr;
        }, {});
    };

    return (<WrappedComponent {...restProps} app={app} />);
  };
};

withZiggeoApplication.prototype = {
  apiKey: string.isRequired,
};

export default withZiggeoApplication;
