import React from 'react';

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Zakaz.kz!</h1>
      <p style={styles.text}>This is your new React frontend.</p>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '50px',
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
    height: '100vh',
  },
  heading: {
    fontSize: '3em',
    color: '#333',
  },
  text: {
    fontSize: '1.5em',
    color: '#666',
  },
};

export default App;
