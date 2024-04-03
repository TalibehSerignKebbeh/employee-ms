import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {TooltipComponent} from '@syncfusion/ej2-react-popups'
import { Settings } from '@mui/icons-material';
import {Sidebar,Navbar, SparkLine,Button, ChartsHeader, Chat, LineChart, Cart} from '../../../components/other'
import {Ecommerce, Editor, Area, Bar, ColorMapping, ColorPicker, Pie, Pyramid, Calendar, Employees, Financial, Kanban, Customers, Line, Orders, Stacked,} from '../../../pages'
const AnApp = () => {
    const activeMenu = true;
    return (
        <div>
            <BrowserRouter>
                <div className='flex relative dark:bg-main-dark-bg'>
                    <div className='fixed right-4 bottom-4' style={{ zIndex: '1000' }}>
                        <TooltipComponent content={'Settings'} position="Top">
                            <button type='button' className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white'
                            style={{background: 'blue', borderRadius: '50%'}}>
                                <Settings />
                            </button>
                        </TooltipComponent>

                    </div>
                    {activeMenu ? (
                        <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                            <Sidebar />
                        </div>
                    ): (
                        <div className='w-0 dark:bg-secondar-dark-bg'>
                            SideBar W-100
                        </div>    
                    )}
                    <div className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu? 'md:ml-72': 'flex-2'}`}>
                        <div className='fixed md-static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                            <Navbar />
                         </div>
                    </div>
                    <Routes>
                        <Route path='/' element={<Ecommerce />} />
                        <Route path='/ecommerce' element={<Ecommerce />} />
                        <Route path='/orders' element={<Orders />} />
                        <Route path='/customers' element={<Customers />} />

                        <Route path='/kanban' element={<Kanban />} />
                        <Route path='/editor' element={<Editor />} />
                        <Route path='/calender' element={<Calendar />} />
                        <Route path='/color-picker' element={<ColorPicker />} />

                        <Route path='/line' element={<Line />} />
                        <Route path='/area' element={<Area />} />
                        <Route path='/area' element={<Area />} />
                        <Route path='/bar' element={<Bar />} />
                        <Route path='/pie' element={<Pie />} />
                        <Route path='/stacked-chart' element={<Stacked />} />


                    </Routes>
                </div>
            </BrowserRouter>
            
        </div>
    );
}

export default AnApp;
