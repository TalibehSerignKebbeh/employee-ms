// {/* <aside className="sidebar">
//         <header></header>
//         <ul>
//           <li><a href="/">Dashboard</a></li>
//           <li><a href="/">Employees</a></li>
//           <li><a href="/">Leave</a></li>
//           <li><a href="/">Dashboard</a></li>
//           <li><a href="/">Dashboard</a></li>
//         </ul>
//         aside
//       </aside> */}


// const colums = useMemo(() => [
    //     // {
    //     //     field: 'profile', headerName: 'Avatar', width: 100, renderCells: (params) => <Avatar src={params.row} />,
    //     //     sortable: false, filterable: false
    //     // },
    //     { field: 'firstName', headerName: 'Firstname', width: 100 },
    //     { field: 'middleName', headerName: 'Middlename', width: 100 },
    //     { field: 'lastName', headerName: 'Lastname', width: 100 },
    //     { field: 'address', headerName: 'Address', width: 100 },
    //     { field: 'email', headerName: 'Email', width: 130, editable: true },
    //     { field: 'jobTitle', headerName: 'JobTitle', width: 150 },
    //     {
    //         type: 'number', field: 'salary', headerName: 'Salary', width: 110,
    //         valueFormatter: (params) => {
    //             if (params.value == null) {
    //                 return '';
    //             }

    //             const valueFormatted = Number(params.value).toLocaleString();
    //             return `GMD ${valueFormatted}`;
    //         },
    //     },
    //     { field: 'username', headerName: 'Username', width: 120 },
    //     { field: 'roles', headerName: 'Roles', width: 120, type: 'select', valueOptions: ['admin', 'design', 'engineer', 'employee'], editable: true },
    //     { type: 'boolean', field: 'onLeave', headerName: 'Onleave', width: 70, },
    //     { type: 'boolean', field: 'active', headerName: 'Active', width: 60, },
    //     { field: '_id', headerName: 'id', width: 180 },
    //     // {field: 'UserActions', headerName: 'UserActions', width: 180, renderCells: (params)=> <UserActions {...{params, rowId, setrowId}} />},
    //     { field: 'Edit', headerName: 'Edit', width: 60, renderCells: (params) => <Edit {...{ params, rowId, setrowId }} /> },
    //     { field: 'Delete', headerName: 'Delete', width: 60, renderCells: (params) => <Delete className='delete-icon' onClick={() => DeleteEmp(params.rowId)} /> },
    // ], [rowId])