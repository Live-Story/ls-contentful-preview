import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import { ContentfulLivePreview } from '@contentful/live-preview';
import { useLocation } from "react-router-dom";
import { createClient, Entry } from 'contentful';
import LiveStory from './LiveStory';

const CONFIG: any = { subscriptions: [] };

function App() {

  const initilized = useRef(false);
  const ready = useRef(false);
  const prev = useRef<Entry | null>(null);
  const [entry, setEntry] = useState(null);
  const [locale, setLocale] = useState('en-US');

  const location = useLocation();

  let LOCALE: string = '';

  const initialize = () => {

    initilized.current = true;

    console.log('Initialization started')
   
    const search = location.search;

    LOCALE = new URLSearchParams(search).get("locale") || 'en-US';
    setLocale(LOCALE);

    const entryId: string = new URLSearchParams(search).get("entry")!;
    const space: string = new URLSearchParams(search).get("space")!;

    const client = createClient({
      space: space,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN!,
      host: 'preview.contentful.com',
    });

    ContentfulLivePreview.init({ locale: LOCALE });

    client
      .getEntry(entryId)
      .then((entry: Entry) => {

        console.log('initial entry', entry);

        prev.current = entry;

        if (entry && entry.fields && entry.fields.id) {
          setupLivePreview(entry, '');
        }
      })
      .catch((err) => console.error(err));
  }

  function setupLivePreview(entry: any, fieldId: string) {
    const callback = (updatedData: any) => {

      console.log('updated entry', updatedData);

      if (!updatedData.fields.id) return;

      const prevId = prev.current!.fields.id;

      if (!prevId) return;

      const divClone = document.getElementById(`ls-${prevId}`)!.cloneNode(true) as HTMLElement;
      divClone.setAttribute("data-id", `${updatedData.fields.id}`);
      divClone.setAttribute("id", `ls-${updatedData.fields.id}`);

      Array.from(document.getElementsByClassName('App')[0].children).forEach(c => c.remove());

      const prevDiv = document.getElementById(`ls-${prevId}`);
      if (prevDiv) {
        prevDiv.remove();
      }

      divClone.classList.remove('fpls');
      divClone.innerHTML = '';

      document.getElementsByClassName('App')[0].appendChild(divClone);
      
      setEntry(updatedData);

      prev.current = updatedData;
      
    };
  
    const unsubscribe = ContentfulLivePreview.subscribe({
      data: entry,
      locale: LOCALE,
      callback: callback
    });

    setEntry(entry);

    ready.current = true;
  
    CONFIG.subscriptions.push(unsubscribe);
  }
  
  useEffect(() => {
    if (initilized.current) return;
    initialize();
  });

  return (
    <div className="App">
      <LiveStory entry={entry} locale={locale}/>
    </div>
  );
}

export default App;
