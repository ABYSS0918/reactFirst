import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { ProjectList } from 'screens/ProjectList';
// import { Login } from 'screens/Login';
import { AuthenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';
import { UnauthenticatedApp } from 'unautthenticated-app';
// import { Login } from 'unautthenticated-app/login';
function App() {
  const { user } = useAuth()
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <div className="App">
      {/* <ProjectListScreen></ProjectListScreen> */}
      {/* <Login></Login> */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>

  );
}

export default App;
