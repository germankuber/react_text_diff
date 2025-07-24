# Text Diff Tool

A React-based text comparison tool that highlights differences between two texts at the sentence level.

## Features

- 📝 **Sentence-level comparison**: Compares texts sentence by sentence (split by periods, question marks, and exclamation marks)
- 🎯 **Precise highlighting**: Only highlights the specific sentences that differ between the two texts
- 📄 **Format preservation**: Maintains original line breaks and text structure
- 🎨 **Visual feedback**: Different sentences are highlighted in yellow for easy identification
- ⚡ **Real-time comparison**: Compare texts instantly with the click of a button

## How it Works

1. **Input**: Enter your original text in the first textarea
2. **Input**: Enter your modified text in the second textarea  
3. **Compare**: Click the "Compare" button to analyze differences
4. **Review**: The tool displays the modified text with differences highlighted in yellow

The tool splits text by sentence boundaries (`.`, `!`, `?`) and compares each sentence individually. Only sentences that differ between the original and modified text will be highlighted.

## Example

**Original Text:**
```
Hello, how are you?
I am testing something different. But I want to know if it works or not.
What do you think?
```

**Modified Text:**
```
Hello, how are you?
I am testing something else. But I want to know if it works or not.
What do you think?
```

**Result:** Only "I am testing something else." will be highlighted in yellow.

## Technology Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd diff-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── App.tsx          # Main application component
├── TextDiff.tsx     # Text comparison component
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## Component API

### TextDiff Component

The main component that handles text comparison functionality.

**State:**
- `text1: string` - Original text input
- `text2: string` - Modified text input  
- `diffResult: DiffSentence[]` - Array of sentence objects with difference information

**Types:**
```typescript
interface DiffSentence {
  text: string;        // The sentence text
  isDifferent: boolean; // Whether this sentence differs from the original
  isLineBreak?: boolean; // Whether this represents a line break
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] Word-level highlighting within sentences
- [ ] Export comparison results
- [ ] Support for different file formats
- [ ] Customizable highlighting colors
- [ ] Side-by-side comparison view
- [ ] Undo/redo functionality
