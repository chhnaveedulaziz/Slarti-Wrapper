/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import OnBoardStepper from './pages/onBoardStepper';
import './App.global.css';
import Welcome from './pages/Welcome';
import { GlobalProvider } from './context/GlobalContext';

export default function App() {
  const [screen, setScreen] = useState<string>('home');

  if (screen === 'home') return <Welcome setScreen={setScreen} />;
  if (screen === 'onBoard')
    return (
      <GlobalProvider>
        <OnBoardStepper setScreen={setScreen} />
      </GlobalProvider>
    );

  return <>Nothing Found</>;
}
