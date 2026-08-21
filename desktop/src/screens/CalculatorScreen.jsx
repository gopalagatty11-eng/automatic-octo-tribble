import React, { useState } from 'react';
import { useEffects } from '../hooks/useEffects.js';

function calc(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷': return b !== 0 ? a / b : 0;
    default: return b;
  }
}

function fmt(n) {
  if (Number.isInteger(n)) return n.toLocaleString();
  return parseFloat(n.toFixed(8)).toLocaleString();
}

export default function CalculatorScreen({ onNavigate, onSave }) {
  const { trigger, haptic, spawnParticles } = useEffects();
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [reset, setReset] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleNum = (n) => {
    if (reset) { setDisplay(n); setReset(false); }
    else { setDisplay(display === '0' ? n : display + n); }
  };

  const handleOp = (newOp) => {
    const cur = parseFloat(display);
    if (prev !== null && op && !reset) {
      const result = calc(prev, cur, op);
      setDisplay(fmt(result));
      setPrev(result);
    } else {
      setPrev(cur);
    }
    setOp(newOp);
    setReset(true);
  };

  const handleEquals = (e) => {
    if (prev === null || !op) return;
    const cur = parseFloat(display);
    const result = calc(prev, cur, op);
    setDisplay(fmt(result));
    setPrev(null);
    setOp(null);
    setReset(true);
    // Celebration effect on equals
    trigger(e, { haptic: 'success', particles: 'celebration', particleCount: 30 });
  };

  const handleClear = () => { setDisplay('0'); setPrev(null); setOp(null); setReset(false); };
  const handleNegate = () => setDisplay(fmt(-parseFloat(display)));
  const handlePercent = () => setDisplay(fmt(parseFloat(display) / 100));

  const handleButton = (btn, e) => {
    // Light haptic on every button press
    haptic('calc');

    // Small sparkle from the button position
    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, {
        type: 'sparkle',
        count: 4,
      });
    }

    switch (btn) {
      case 'AC': handleClear(); break;
      case '±': handleNegate(); break;
      case '%': handlePercent(); break;
      case '=': handleEquals(e); break;
      case '+': case '−': case '×': case '÷': handleOp(btn); break;
      default: handleNum(btn); break;
    }
  };

  const handleSave = async (e) => {
    trigger(e, { haptic: 'save', particles: 'celebration', particleCount: 40 });
    setSaved(true);
    setTimeout(() => setSaved(false), 600);
    await onSave({
      title: `Calculator Result: ${display}`,
      content: `Calculation result: ${prev !== null ? `${fmt(prev)} ${op} ${display} = ${display}` : display}`,
      date: new Date().toLocaleString(),
      tags: ['Finance'],
      hasPhoto: false,
      hasCalc: true,
    });
    setTimeout(() => onNavigate('notes'), 300);
  };

  const buttons = [
    ['AC', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <div>
      <div className="screen-header">
        <h2>Calculator</h2>
      </div>

      <div className="calc-layout">
        <div className="calc-display">
          {prev !== null && op && (
            <div className="op-line">{fmt(prev)} {op}</div>
          )}
          <div className="result">{display}</div>
        </div>

        <div className="calc-grid">
          {buttons.map((row, ri) => (
            <div key={ri} className="calc-row">
              {row.map((btn) => {
                const isOp = ['÷', '×', '−', '+', '='].includes(btn);
                const isFn = ['AC', '±', '%'].includes(btn);
                const isWide = btn === '0' && ri === 4;
                return (
                  <button
                    key={btn}
                    className={`calc-btn ${isOp ? 'op' : ''} ${isFn ? 'fn' : ''} ${isWide ? 'wide' : ''}`}
                    onClick={(e) => handleButton(btn, e)}
                  >
                    {btn}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <button
          className={`btn btn-secondary ${saved ? 'save-success-glow' : ''}`}
          style={{ width: '100%', marginTop: 20 }}
          onClick={handleSave}
        >
          Save Result to Note
        </button>
      </div>
    </div>
  );
}
