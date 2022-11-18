import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'

import Dashboard from './pages/Dashboard/Dashboard'
import CreatePerson from './pages/CreatePerson/CreatePerson'

import { AuthProvider, AuthContext } from './context/AuthContext'
import { PersonProvider } from './context/PersonContext'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';

import Address from './pages/Address/Address'
import Contacts from './pages/Contacts/Contacts'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import UpdatePerson from './pages/UpdatePerson/UpdatePerson'
import CreateAddress from './pages/CreateAddress/CreateAddress'
import UpdateAddress from './pages/UpdateAddress/UpdateAddress'
import CreateContacts from './pages/CreateContacts/CreateContacts'
import UpdateContacts from './pages/UpdateContacts/UpdateContacts'
import { AddressProvider } from './context/AddressContext'

export const PrivateRoute = () => {
  const { token } = useContext(AuthContext);
  return token ? <Outlet /> : <Navigate to="/" />;
}

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <AuthProvider>
          <PersonProvider>
          <AddressProvider>
            <Routes>
              <Route index element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route element={<PrivateRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/person/create' element={<CreatePerson />} />
                <Route path='/person/update' element={<UpdatePerson />} />

                <Route path='/address' element={<Address />} />
                <Route path='/address/create' element={<CreateAddress />} />
                <Route path='/address/update' element={<UpdateAddress />} />

                <Route path='/contacts' element={<Contacts />} />
                <Route path='/contact/create' element={<CreateContacts />} />
                <Route path='/contact/update' element={<UpdateContacts />} />
              </Route>
            </Routes>
          </AddressProvider>
          </PersonProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}
