import { useEffect, useRef } from 'react';

import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css';

interface JsonViewerProps {
  data: string;
}

export default function JsonViewer({ data }: Readonly<JsonViewerProps>) {
  const codeRef = useRef<HTMLElement>(null);
  const shouldScroll = data.split('\n').length > 4;
  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = Prism.highlight(
        data,
        Prism.languages.json,
        'json',
      );
    }
  }, [data]);

  return (
    <div className="overflow-x-auto w-full my-4">
      <div
        style={{
          maxHeight: shouldScroll ? '420px' : 'none',
          overflowY: shouldScroll ? 'auto' : 'visible',
        }}
      >
        <pre className="bg-main">
          <code ref={codeRef} className="language-json" />
        </pre>
      </div>
    </div>
  );
}
