import React, { useState } from 'react';

interface DiffSentence {
  text: string;
  isDifferent: boolean;
  isLineBreak?: boolean;
}

function diffTexts(text1: string, text2: string): DiffSentence[] {
  const result: DiffSentence[] = [];
  
  // Split text into segments preserving line breaks and sentences
  const segments2 = text2.split(/(\n|[.!?](?=\s|$))/);
  const segments1 = text1.split(/(\n|[.!?](?=\s|$))/);
  
  let sentence1 = '';
  let sentence2 = '';
  
  for (let i = 0; i < segments2.length; i++) {
    const segment2 = segments2[i];
    const segment1 = segments1[i] || '';
    
    if (segment2 === '\n') {
      // It's a line break
      if (sentence2.trim()) {
        // Add the accumulated sentence before the line break
        const isDifferent = sentence1.trim() !== sentence2.trim();
        result.push({
          text: sentence2,
          isDifferent
        });
        sentence1 = '';
        sentence2 = '';
      }
      // Add the line break
      result.push({
        text: '\n',
        isDifferent: false,
        isLineBreak: true
      });
    } else if (/[.!?]/.test(segment2)) {
      // It's a punctuation mark
      sentence2 += segment2;
      sentence1 += segment1;
      
      // Complete the sentence
      const isDifferent = sentence1.trim() !== sentence2.trim();
      result.push({
        text: sentence2,
        isDifferent
      });
      sentence1 = '';
      sentence2 = '';
    } else {
      // It's part of the text
      sentence2 += segment2;
      sentence1 += segment1;
    }
  }
  
  // Add any remaining text
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
      <h2>Text Comparison Tool</h2>
      <textarea
        rows={10}
        placeholder="Original text"
        value={text1}
        onChange={(e) => setText1(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <textarea
        rows={10}
        placeholder="Modified text"
        value={text2}
        onChange={(e) => setText2(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={handleCompare} style={{ marginBottom: 20 }}>
        Compare
      </button>
      <h3>Text with highlighted differences:</h3>
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
          'No text to compare yet.'
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
