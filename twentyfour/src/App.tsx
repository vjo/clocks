import type { Component } from 'solid-js';
import { Clock } from './Clock';
import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>twenty four hour clock experiment</h1>
      </header>
      <main class={styles.main}>
        <Clock />
      </main>
    </div>
  );
};

export default App;
