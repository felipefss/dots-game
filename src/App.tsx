import { Canvas } from './Canvas';

export default function App() {
  return (
    <main className="bg-slate-300 flex flex-col h-dvh items-center p-10 gap-8">
      <h1 className="text-4xl">Dots Game</h1>

      <Canvas />
    </main>
  );
}
