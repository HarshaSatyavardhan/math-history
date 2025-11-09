import React, { useEffect, useRef, useState } from 'react';
import { useCanvas } from '../../../hooks/useCanvas';
import { calculateEntropy } from '../../../utils/mathUtils';
import {
  fillCanvas,
  drawText,
  createLinearGradient,
} from '../../../utils/canvasUtils';
import type { EntropyState } from '../../../types/visualizations';

interface EntropyVisualizationProps {
  width?: number;
  height?: number;
  numOutcomes?: number;
}

export const EntropyVisualization: React.FC<EntropyVisualizationProps> = ({
  width = 800,
  height = 400,
  numOutcomes = 8,
}) => {
  const { canvasRef, ctx } = useCanvas({ width, height });

  const [state, setState] = useState<EntropyState>(() => ({
    probabilities: new Array(numOutcomes).fill(1 / numOutcomes),
    entropy: Math.log2(numOutcomes),
    maxEntropy: Math.log2(numOutcomes),
    efficiency: 100,
  }));

  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState(-1);

  // Update entropy when probabilities change
  useEffect(() => {
    const entropy = calculateEntropy(state.probabilities);
    const maxEntropy = Math.log2(numOutcomes);
    const efficiency = (entropy / maxEntropy) * 100;

    setState((prev) => ({
      ...prev,
      entropy,
      maxEntropy,
      efficiency,
    }));
  }, [state.probabilities, numOutcomes]);

  // Drawing function
  const draw = () => {
    if (!ctx) return;

    fillCanvas(ctx, '#0f0f1e', width, height);

    const barWidth = width / numOutcomes;
    const maxHeight = height - 100;

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 10; i++) {
      const y = 50 + (maxHeight * i) / 10;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw bars
    state.probabilities.forEach((prob, i) => {
      const barHeight = prob * maxHeight;
      const x = i * barWidth;
      const y = 50 + maxHeight - barHeight;

      // Bar gradient
      const gradient = createLinearGradient(ctx, x, y, x, y + barHeight, [
        { offset: 0, color: '#ffd600' },
        { offset: 1, color: '#e53935' },
      ]);

      ctx.fillStyle = gradient;
      ctx.fillRect(x + 10, y, barWidth - 20, barHeight);

      // Probability value on top
      drawText(ctx, prob.toFixed(3), x + barWidth / 2, y - 5, {
        fillColor: '#ffd600',
        font: '14px monospace',
        align: 'center',
      });

      // Label at bottom
      drawText(ctx, `X${i + 1}`, x + barWidth / 2, height - 30, {
        fillColor: '#a8a8c0',
        font: '12px sans-serif',
        align: 'center',
      });
    });

    // Title
    drawText(ctx, 'Probability Distribution', 20, 30, {
      fillColor: '#e8e8f0',
      font: 'bold 16px sans-serif',
    });

    // Current entropy
    drawText(ctx, `H(X) = ${state.entropy.toFixed(3)} bits`, width - 20, 30, {
      fillColor: '#ffd600',
      font: 'bold 16px sans-serif',
      align: 'right',
    });
  };

  // Redraw when state changes
  useEffect(() => {
    draw();
  }, [ctx, state]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const barWidth = width / numOutcomes;
    const index = Math.floor(x / barWidth);

    if (index >= 0 && index < numOutcomes) {
      setIsDragging(true);
      setDragIndex(index);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || dragIndex === -1) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const y = e.clientY - rect.top;
    const maxHeight = height - 100;

    // Calculate new probability based on mouse position
    const newProb = Math.max(0.001, Math.min(0.999, 1 - (y - 50) / maxHeight));

    // Adjust probabilities to maintain sum = 1
    const oldProb = state.probabilities[dragIndex];
    const diff = newProb - oldProb;
    const otherIndices = state.probabilities
      .map((_, i) => i)
      .filter((i) => i !== dragIndex);

    const adjustment = -diff / otherIndices.length;

    const newProbabilities = state.probabilities.map((p, i) => {
      if (i === dragIndex) return newProb;
      return Math.max(0.001, p + adjustment);
    });

    // Normalize to ensure sum = 1
    const sum = newProbabilities.reduce((a, b) => a + b, 0);
    const normalizedProbabilities = newProbabilities.map((p) => p / sum);

    setState((prev) => ({
      ...prev,
      probabilities: normalizedProbabilities,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragIndex(-1);
  };

  // Preset distributions
  const setUniform = () => {
    setState((prev) => ({
      ...prev,
      probabilities: new Array(numOutcomes).fill(1 / numOutcomes),
    }));
  };

  const setBinomial = () => {
    const center = numOutcomes / 2;
    const probs = Array.from({ length: numOutcomes }, (_, i) => {
      const dist = Math.abs(i - center + 0.5);
      return Math.exp((-dist * dist) / 4);
    });

    const sum = probs.reduce((a, b) => a + b, 0);
    setState((prev) => ({
      ...prev,
      probabilities: probs.map((p) => p / sum),
    }));
  };

  const setSpiked = () => {
    const probs = new Array(numOutcomes).fill(0.05);
    probs[Math.floor(numOutcomes / 2)] = 0.65;

    const sum = probs.reduce((a, b) => a + b, 0);
    setState((prev) => ({
      ...prev,
      probabilities: probs.map((p) => p / sum),
    }));
  };

  const setRandom = () => {
    const probs = Array.from({ length: numOutcomes }, () => Math.random());
    const sum = probs.reduce((a, b) => a + b, 0);
    setState((prev) => ({
      ...prev,
      probabilities: probs.map((p) => p / sum),
    }));
  };

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="rounded-lg cursor-grab active:cursor-grabbing border border-gray-700"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-gray-400 text-sm mb-1">Entropy H(X)</div>
          <div className="text-2xl font-bold text-yellow-400">
            {state.entropy.toFixed(3)}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-gray-400 text-sm mb-1">Max Entropy</div>
          <div className="text-2xl font-bold text-yellow-400">
            {state.maxEntropy.toFixed(3)}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-gray-400 text-sm mb-1">Efficiency</div>
          <div className="text-2xl font-bold text-yellow-400">
            {state.efficiency.toFixed(1)}%
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-gray-400 text-sm mb-1">Outcomes</div>
          <div className="text-2xl font-bold text-yellow-400">
            {numOutcomes}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={setUniform}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition"
        >
          Uniform Distribution
        </button>
        <button
          onClick={setBinomial}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition"
        >
          Binomial-like
        </button>
        <button
          onClick={setSpiked}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition"
        >
          Spiked Distribution
        </button>
        <button
          onClick={setRandom}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition"
        >
          Random Distribution
        </button>
      </div>

      <p className="text-gray-400 text-sm">
        💡 <strong>Interactive:</strong> Click and drag the bars to adjust the
        probability distribution. Watch how entropy changes! Maximum entropy
        occurs when all outcomes are equally likely (maximum uncertainty).
      </p>
    </div>
  );
};
