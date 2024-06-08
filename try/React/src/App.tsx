import { useEffect, useState } from 'react';
import './App.css';
import '../../../dist/themes/oneDarkPro.css';
// import '../../src/themes/monokai.css';
// import aurora from '../../src/index.ts';
// import tokenizer from '../../src/tokenizer.ts';
// import nodeGenerator from '../../src/node_generator.ts';

import aurora from '../../../dist/index';

async function loadCode() {
  // const res = await fetch('https://codeabinash.github.io/beyond-javascript/learning/c/dsa/linked_list/main.c');
  const res = await fetch('https://codeabinash.github.io/leetcode-solutions/leetcode/problems/c/remove-duplicates-from-sorted-list.c');
  // const res = await fetch('/test.c');
  let code = await res.text();
  code = code.replace(/\r/g, '');
  return code;
}

function App() {
  const [code, setCode] = useState('');
  async function load() {
    const code = await loadCode();
    setCode(code);
  }

  useEffect(() => {
    load();
  }, []);

  // useEffect(() => {
  //   console.time('aurora');
  //   const h = aurora(code);
  //   console.timeEnd('aurora');
  // }, [code]);

  return (
    <>
      {/* <p
        style={{
          textAlign: 'center',
          paddingBlock: '1rem',
        }}
      >
        Aurora: The C code highlighting engine by codeAbinash
      </p> */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <pre
          dangerouslySetInnerHTML={{
            __html: aurora(code, { mode: 'inline' }),
          }}
          style={{
            textAlign: 'left',
            fontFamily: 'cascadia code',
            fontSize: '1.2rem',
            padding: '1.5rem',
            width: '50vw',
            lineHeight: 1.5,
            fontWeight: 450,
            // letterSpacing: '0.5px',
          }}
        />
        <textarea
          style={{
            height: '100vh',
            width: '50vw',
            outline: 'none',
            border: 'none',
            padding: '1.5rem',
            backgroundColor: '#101010',
            color: '#a0a0a0',
            fontSize: '1.2rem',
            fontFamily: 'cascadia code',
            lineHeight: 1.5,
            fontWeight: 450,
            // letterSpacing: '0.5px',
          }}
          spellCheck={false}
          value={code}
          onInput={(e) => {
            setCode(e.currentTarget.value);
          }}
        ></textarea>
      </div>
      {/* <Highlighter code={code} className='text-red' /> */}
    </>
  );
}

// function Highlighter({ code, className = '' }: { code: string; className?: string }) {
//   const tokens = tokenizer(code);
//   const nodes = nodeGenerator(tokens);

//   return (
//     <pre className={className}>
//       {nodes.map((node, index) => {
//         return (
//           <span key={index} className={'aurora-' + node.type}>
//             {node.value}
//           </span>
//         );
//       })}
//     </pre>
//   );
// }

export default App;
