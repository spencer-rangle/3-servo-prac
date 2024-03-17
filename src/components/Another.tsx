import React, { useState, useEffect } from 'react';
// import {
//   LanguageClient,
//   LanguageClientOptions,
//   ServerOptions,
//   TransportKind 
// } from 'vscode-languageclient';

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient/node';

// import * as ts from 'typescript';

const Another = () => {
  const [variableName, setVariableName] = useState('');
  const [occurrencesCount, setOccurrencesCount] = useState(0);
  const [client, setClient] = useState<LanguageClient | null>(null);

  useEffect(() => {
    // Set up Language Client
    const serverOptions: ServerOptions = {
      run: { command: 'path/to/your/language-server' },
      debug: { command: 'path/to/your/language-server', args: ['--debug'] }
    };

    const clientOptions: LanguageClientOptions = {
      documentSelector: [{ scheme: 'file', language: 'typescript' }],
    };

    const languageClient = new LanguageClient(
      'languageServerExample',
      'Language Server Example',
      serverOptions,
      clientOptions
    );

    // Start the Language Client
    const disposable = languageClient.start();
    setClient(languageClient);

    // return () => {
    //   if (client) {
    //     disposable.then(client.dispose);
    //   }
    // };
  }, []);

  const findVariableOccurrences = (variable: string): number => {
    // Ensure the client is initialized
    if (!client) {
      console.error('Language client is not initialized.');
      return 0;
    }

    // Send request to the language server to find occurrences of the variable
    const response = client.sendRequest('textDocument/occurrences', {
      textDocument: {
        uri: 'file:///path/to/your/file.ts', // Replace with the URI of your TypeScript file
      },
      position: { line: 0, character: 0 }, // Adjust the position if needed
      context: { includeDeclaration: true },
    });

    // Count occurrences of the variable
    let count = 0;
    // response.then((occurrences: ts.DocumentHighlights[] | null) => {
    response.then((occurrences: any) => {
      if (occurrences) {
        occurrences.forEach((highlight) => {
          highlight.highlightSpans.forEach((span) => {
            if (span.text === variable) {
              count++;
            }
          });
        });
      }
    });

    return count;
  };

  const handleSubmit = () => {
    // Call a function to find occurrences of the variable
    const occurrencesCount = findVariableOccurrences(variableName);
    setOccurrencesCount(occurrencesCount);
  };

  return (
    <div>
      <input type="text" value={variableName} onChange={(e) => setVariableName(e.target.value)} />
      <button onClick={handleSubmit}>Find Occurrences</button>
      <div>Occurrences Count: {occurrencesCount}</div>
    </div>
  );
};

export default Another;
