import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputWrapper from '../../profile/InputWrapper';
import RolesSelect from '../../../components/Select/RolesSelect';
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme';

const UserFom = ({ employee, setemployee }) => {

    const theme = useTheme()
    const colors = tokens(theme?.palette?.mode)
    const isDark = theme?.palette?.mode === 'dark'

    return (
        <Row >
            <Col className="mb-3" lg={5} md={5} sm={9} xs={10}>
                <InputWrapper >
                    <label htmlFor='fisrtname'>First Name</label>
                    <input className={` h-12 px-2 font-semibold 
                                      text-gray-600 rounded border border-slate-700`}
                        type={'text'} value={employee?.firstName || ' '}
                        onChange={(e) => setemployee({ ...employee, firstName: e.target.value })}
                    />
                </InputWrapper>
            </Col>

            <Col lg={5} md={5} sm={9}>
                <InputWrapper >
                    <label htmlFor='middleName'>Middle Name</label>
                    <input className={` h-12 px-2 font-semibold 
                    text-gray-600 rounded border border-slate-700`}
                        type={'text'} value={employee?.middleName || ' '}
                        onChange={(e) => setemployee({ ...employee, middleName: e.target.value })}
                    />
                </InputWrapper>
            </Col>
            <Col className="mb-3" lg={5} md={5} sm={9}>
                <InputWrapper >

                    <label htmlFor='lastName'>Last Name</label>
                    <input className={` h-12 px-2 font-semibold 
                    text-gray-600 rounded border border-slate-700`}
                        type={'text'} value={employee?.lastName}
                        onChange={(e) => setemployee({ ...employee, lastName: e.target.value })}
                    />
                </InputWrapper>

            </Col>

            <Col className="mb-3" lg={5} md={5} sm={9}>
                <InputWrapper >
                    <label htmlFor='username'>Username</label>
                    <input className={` h-12 px-2 font-semibold 
                    text-gray-600 rounded border border-slate-700`}
                        type={'text'} value={employee?.username || ' '}
                        onChange={(e) => setemployee({ ...employee, username: e.target.value })}
                    />
                </InputWrapper>
            </Col>
            <Col className="mb-3" lg={5} md={5} sm={9}>
                <InputWrapper >
                    <label htmlFor='public_name'>Public name</label>
                    <input className={` h-12 px-2 font-semibold 
                    text-gray-600 rounded border border-slate-700`}
                        type={'text'} value={employee?.public_name || ' '}
                        onChange={(e) => setemployee({ ...employee, public_name: e.target.value })}
                    />
                </InputWrapper>
            </Col>
            <Col className="mb-3" lg={5} md={5} sm={9}>
                <InputWrapper >
                    <label htmlFor='dob'>Dob</label>
                    <input className={` h-12 px-2 font-semibold 
                    text-gray-600 rounded border border-slate-700`}
                        type={'date'} value={employee?.dob?.slice(0, 10) || ''}
                        onChange={(e) => setemployee({ ...employee, dob: e.target.value })}
                    />
                </InputWrapper>
            </Col>
            <Col className="mb-3" lg={5} md={5} sm={9}>
                <InputWrapper >
                    <label htmlFor='telephone'>Telephone</label>
                    <input className={` h-12 px-2 font-semibold 
                    text-gray-600 rounded border border-slate-700`}
                        type={'text'} value={employee?.telephone || ' '}
                        onChange={(e) => setemployee({ ...employee, telephone: e.target.value })}
                    />
                </InputWrapper>
            </Col>
            <Col className="mb-3" lg={5} md={5} sm={9}>
                <InputWrapper >
                    <label htmlFor='email'>Email</label>
                    <input className={` h-12 px-2 font-semibold 
                    text-gray-600 rounded border border-slate-700`}
                        type={'text'} value={employee?.email || ' '}
                        onChange={(e) => setemployee({ ...employee, email: e.target.value })}
                    />
                </InputWrapper>
            </Col>
            <Col className="mb-3" lg={5} md={5} sm={9}>
                <InputWrapper >
                    <label htmlFor='jobTitle'>JobTitle</label>
                    <input className={` h-12 px-2 font-semibold 
                    text-gray-600 rounded border border-slate-700`}
                        type={'text'} value={employee?.jobTitle || ' '}
                        onChange={(e) => setemployee({ ...employee, jobTitle: e.target.value })}
                    />
                </InputWrapper>
            </Col>
            <Col color={colors.grey[600]} className="mb-3" lg={5} md={5} sm={9}>
                <InputWrapper >
                    <label htmlFor='salary'>Salary</label>
                    <input className={` h-12 px-2 font-semibold 
                    text-gray-600 rounded border border-slate-700`}
                        type={'text'} value={employee?.salary || ' '}
                        onChange={(e) => setemployee({ ...employee, salary: e.target.value })}
                    />
                </InputWrapper>
            </Col>
            <Col className="mb-3" lg={5} md={5} sm={9}>
                <InputWrapper >
                    <label htmlFor='address'>Address</label>
                    <input className={` h-12 px-2 font-semibold 
                    text-gray-600 rounded border border-slate-700`}
                        type={'text'} value={employee?.address || ' '}
                        onChange={(e) => setemployee({ ...employee, address: e.target.value })}
                    />
                </InputWrapper>
            </Col>
            <Col className="mb-3" lg={5} md={5} sm={9} >
                <InputWrapper >
                    <RolesSelect employee={employee}
                        setEmployee={setemployee}
                    />

                </InputWrapper>
            </Col>
            <Col className="mb-3" lg={5} md={5} sm={9}>
                <Box color={colors.grey[600]} className='sub-wrapper'>
                    <Box className='sub-input-container'>
                        <label className={`${isDark ? 'text-white' : 'text-slate-700'}`}
                            htmlFor='active'>Active</label>
                        <input className={` h-12 px-2 font-semibold 
                                                        text-gray-600 rounded border border-slate-700`}
                            type={'checkbox'} value={employee?.active || false}
                            defaultChecked={employee?.active}
                            onChange={(e) => setemployee({ ...employee, active: !employee.active })}
                            id='active'
                        />
                    </Box>
                    <Box className='sub-input-container'>
                        <label className={`${isDark ? 'text-white' : 'text-slate-700'}`}
                            htmlFor='retired'>Retired</label>
                        <input type={'checkbox'} value={employee?.retired || false}
                            defaultChecked={employee?.retired}
                            onChange={(e) => setemployee({ ...employee, retired: !employee.retired })} id='retired'
                        />
                    </Box>
                    <Box className='sub-input-container'>
                        <label className={`${isDark ? 'text-white' : 'text-slate-700'}`}
                            htmlFor='leave'>OnLeave</label>
                        <input type={'checkbox'}
                            // value={employee?.OnLeave || false}
                            defaultChecked={employee?.current_leave ? true : false}
                        // onChange={(e) => setemployee({ ...employee, OnLeave: !employee?.OnLeave })} id='laeve'
                        />
                    </Box>
                </Box>
            </Col>
        </Row>
    );
}

export default UserFom;
