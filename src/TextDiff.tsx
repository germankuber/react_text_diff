import React, { useState } from 'react';

interface DiffSentence {
  text: string;
  isDifferent: boolean;
  isLineBreak?: boolean;
}

function diffTexts(text1: string, text2: string): DiffSentence[] {
  const result: DiffSentence[] = [];
  
  // Dividir el texto en segmentos preservando saltos de línea y oraciones
  const segments2 = text2.split(/(\n|[.!?](?=\s|$))/);
  const segments1 = text1.split(/(\n|[.!?](?=\s|$))/);
  
  let sentence1 = '';
  let sentence2 = '';
  
  for (let i = 0; i < segments2.length; i++) {
    const segment2 = segments2[i];
    const segment1 = segments1[i] || '';
    
    if (segment2 === '\n') {
      // Es un salto de línea
      if (sentence2.trim()) {
        // Agregar la oración acumulada antes del salto de línea
        const isDifferent = sentence1.trim() !== sentence2.trim();
        result.push({
          text: sentence2,
          isDifferent
        });
        sentence1 = '';
        sentence2 = '';
      }
      // Agregar el salto de línea
      result.push({
        text: '\n',
        isDifferent: false,
        isLineBreak: true
      });
    } else if (/[.!?]/.test(segment2)) {
      // Es un signo de puntuación
      sentence2 += segment2;
      sentence1 += segment1;
      
      // Completar la oración
      const isDifferent = sentence1.trim() !== sentence2.trim();
      result.push({
        text: sentence2,
        isDifferent
      });
      sentence1 = '';
      sentence2 = '';
    } else {
      // Es parte del texto
      sentence2 += segment2;
      sentence1 += segment1;
    }
  }
  
  // Agregar cualquier texto restante
  if (sentence2.trim()) {
    const isDifferent = sentence1.trim() !== sentence2.trim();
    result.push({
      text: sentence2,
      isDifferent
    });
  }

  return result;
}


const TextDiff: React.FC = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffResult, setDiffResult] = useState<DiffSentence[]>([]);

  const handleCompare = () => {
    const diff = diffTexts(text1, text2);
    setDiffResult(diff);
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <h2>Comparar textos</h2>
      <textarea
        rows={10}
        placeholder="Texto original"
        value={text1}
        onChange={(e) => setText1(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <textarea
        rows={10}
        placeholder="Texto modificado"
        value={text2}
        onChange={(e) => setText2(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={handleCompare} style={{ marginBottom: 20 }}>
        Comparar
      </button>
      <h3>Texto con diferencias resaltadas:</h3>
      <div
        style={{
          backgroundColor: '#f0f0f0',
          padding: 10,
          minHeight: 100,
          whiteSpace: 'pre-wrap',
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.5',
        }}
      >
        {diffResult.length === 0 ? (
          'No hay texto para comparar aún.'
        ) : (
          diffResult.map((sentence, index) => {
            if (sentence.isLineBreak) {
              return <br key={index} />;
            }
            
            return (
              <span
                key={index}
                style={{
                  backgroundColor: sentence.isDifferent ? '#ffff99' : 'transparent',
                  padding: sentence.isDifferent ? '2px 4px' : '0',
                  borderRadius: sentence.isDifferent ? '3px' : '0',
                }}
              >
                {sentence.text}
              </span>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TextDiff;
