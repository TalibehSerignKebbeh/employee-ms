import { useEffect, useState, lazy, Suspense } from 'react';
import { io } from 'socket.io-client'
import './App.css';
import AddEmployeeForm from './components/Forms/AddEmployeeForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LeavesList from './pages/dashboard/Leave/LeavesList';
import Employees from './pages/dashboard/Employee/Employees';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { roles } from './config/Roles';
import TodosList from './pages/dashboard/Todo/TodosList';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import MySideBar from './scenes/global/MySideBar';
import MyTopBar from './scenes/global/MyTopBar';
import Dashboard from './pages/dashboard/Dashboard';
import UserProfile from './pages/profile/UserProfile';
import Chat from './pages/dashboard/Todo/Chat/Chat';
import UseAuth from './hooks/UseAuth';
import Loaddder from './components/Loaddder';

const Login = lazy(() => import('./features/auth/Login'));



function App() {
  const [theme, colorMode] = useMode()
  const { token } = UseAuth()
  const [selected, setSelected] = useState("dashboard");
  const [activeMenu, setactiveMenu] = useState(false);
  const socket = io('http://localhost:4000',
    {
      // host: 'http://localhost:4000',
      withCredentials: true,
      autoConnect: false,
      auth: { token: token },
      reconnectionAttempts: 4,
      reconnectionDelay: 2000,
      retries: 3,
    })
  // const [isSidebar, setIsSidebar] = useState(true);
  // /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i    email regex
  //  npx update-browserslist-db@latest
  //pids = 11272, 11272 11272
  useEffect(() => {
    if (token) {
      socket.connect()
      socket.on('Connect_failed ', (args) => {
        console.log('error');
        console.log(args);
      })
      socket.on('error', (args) => {
        console.log(args);
        console.log('error endpoint');
      })
    }
    // socket.io.emit()
    return () => {
      socket.disconnect()
    };
  }, [socket, token]);


  return (
    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <BreakThings /> */}
        <div className="app">
          <Router>
            <div className='main-wrapper' >
              <MySideBar selected={selected} setSelected={setSelected}
                activeMenu={activeMenu} setactiveMenu={setactiveMenu}
              />
              <div className='content'>
                <MyTopBar
                  activeMenu={activeMenu}
                  setactiveMenu={setactiveMenu}
                />
                <Routes>

                  <Route index path='/'
                    element={<Suspense fallback={<div><Loaddder loadingText={'loading page\'s html '} /> </div>}>
                      <Login /> </Suspense>}
                  />

                  <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth allowedRoles={[...Object.values(roles), "doctor"]} />}>
                      <Route path='dashboard' >
                        <Route index element={
                          <Suspense
                            fallback={<div><Loaddder loadingText={'loading dashboard\'s html '} /> </div>}>
                            <Dashboard
                              selected={selected} setSelected={setSelected} />
                          </Suspense>
                        } />

                        <Route path='profile' element={<UserProfile
                          selected={selected} setSelected={setSelected} />} />
                        <Route element={<RequireAuth allowedRoles={['admin', 'ceo']} />}>

                          <Route path='employees'  >
                            <Route index element={<Employees
                              selected={selected} setSelected={setSelected} />} />
                            {/* <Route path=':employeeId' element={<EditEmployee
                              selected={selected} setSelected={setSelected} />} /> */}
                            <Route path='new' element={<AddEmployeeForm
                              selected={selected} setSelected={setSelected} />} />
                          </Route>
                        </Route>

                        <Route path='leaves'>
                          <Route index element={<LeavesList
                            selected={selected} setSelected={setSelected} />} />
                        </Route>
                        <Route path='todo' >
                          <Route index element={<TodosList
                            selected={selected} setSelected={setSelected} />} />
                          <Route path=':id/chat'
                            element={<Chat socket={socket} />} />
                        </Route>

                      </Route>

                    </Route>

                  </Route>
                </Routes>
              </div>
            </div>
            <div>

            </div>
          </Router>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}



export default App;
