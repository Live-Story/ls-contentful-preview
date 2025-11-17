import { useEffect } from "react";

interface Props {
    entry: any;
    locale: string;
}

declare global {
    var LiveStory: new (a: string, b: any) => void;
  }

export default function LiveStory({ entry, locale }: Props) {

    useEffect(() => {
        if (!entry) return;

        console.log('entry LS', entry);

        new window.LiveStory(`ls-${entry?.fields?.id}`, { type: entry?.fields?.type });
    }, [entry])

    return (
        <div id={`ls-${entry?.fields?.id}`} data-id={entry?.fields?.id} data-store="STORE_ID" data-lang={locale?.replace('-','_')} // dynamic passing of data-lang attribute, e.g. "it", "en", "en_US", "it_IT"
        >
        </div>
    );
}
