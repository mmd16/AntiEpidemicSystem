import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import MasksIcon from '@mui/icons-material/Masks';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import InfoIcon from '@mui/icons-material/Info';

export const formscolumns = [
  { field: 'id', headerName: 'Id', width: 130 },
  { field: 'submittedByUsername', headerName: 'Submitted By', width: 300 },
  // { field: 'sid', headerName: 'SID', width: 260 },
  { field: 'formName', headerName: 'Form Title', width: 400 },
  {
    field: 'formStatus', headerName: 'Status', width: 280,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.formStatus}`}>{params.row.formStatus}</div>
      )
    }
  },
  { field: 'approvedByUsername', headerName: 'Approved By', width: 260 },
  { field: 'rejectedByUsername', headerName: 'Rejected By', width: 260 },
]

export const userscolumns = [
  { field: 'id', headerName: 'Id', width: 130 },
  {
    field: 'firstname', headerName: 'Username', width: 480,
    renderCell: (params) => {
      return (
        <div >{`${params.row.firstname} ${params.row.lastname}`}</div>
      )
    }
  },
  { field: 'className', headerName: 'Class', width: 300 },
  { field: 'classRole', headerName: 'Role', width: 300 },
  { field: 'role', headerName: 'Authority', width: 260 },
]

export const infectedDataColumns = [
  { field: 'id', headerName: 'Id', width: 130 },
  {
    field: 'firstname', headerName: 'Username', width: 480,
    renderCell: (params) => {
      return (
        <div >{`${params.row.firstname} ${params.row.lastname}`}</div>
      )
    }
  },
  { field: 'className', headerName: 'Class', width: 220 },
  { field: 'classRole', headerName: 'Role', width: 220 },
  { field: 'role', headerName: 'Authority', width: 220 },
  { field: 'isPositive', headerName: 'Infected', width: 220 },
  { field: 'isSickLeave', headerName: 'Absent', width: 220 },
]

export const memberscolumns = [
  { field: 'id', headerName: 'Id', width: 130 },
  {
    field: 'firstname', headerName: 'Username', width: 280,
    renderCell: (params) => {
      return (
        <div >{`${params.row.firstname} ${params.row.lastname}`}</div>
      )
    }
  },
  { field: 'className', headerName: 'Class', width: 200 },
  { field: 'classRole', headerName: 'Role', width: 200 },
  { field: 'role', headerName: 'Authority', width: 200 },
  { field: 'isPositive', headerName: 'Infected', width: 180 },
  { field: 'isSickLeave', headerName: 'Absent', width: 180 },
]

export const membersSimplifycolumns = [
  { field: 'id', headerName: 'Id', width: 130 },
  {
    field: 'firstname', headerName: 'Username', width: 480,
    renderCell: (params) => {
      return (
        <div >{`${params.row.firstname} ${params.row.lastname}`}</div>
      )
    }
  },
  { field: 'className', headerName: 'Class', width: 350 },
  { field: 'classRole', headerName: 'Role', width: 350 },
]

export const collectPointColumns = [
  { field: 'id', headerName: 'Id', width: 100 },
  { field: 'Region', headerName: 'Region', width: 200 },
  {
    field: 'Clinic', headerName: 'Clinic', width: 430,
  },
  { field: 'Address', headerName: 'Address', width: 790 },
]

export const groupColumns = [
  { field: 'id', headerName: 'Id', width: 250 },
  { field: 'name', headerName: 'Group Name', width: 400 },
  {
    field: 'memberNumber', headerName: 'Member Number', width: 200,
  },
  {
    field: 'infectionNumber', headerName: 'Infection Number', width: 200,
  },
  {
    field: 'absentNumber', headerName: 'Absent Number', width: 200,
  },
]
export const adminSidebarData = [
  {
    title: 'MAIN',
    links: [
      {
        name: 'Dashboard',
        routlink: '/dashboard',
        icon: <DashboardIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
      {
        name: 'Infected Data',
        routlink: '/infectedData',
        icon: <GroupsIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
    ],
  },

  {
    title: 'FORMS',
    links: [
      {
        name: 'RAT Form',
        routlink: '/forms/rat',
        icon: <FormatAlignJustifyIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
      {
        name: 'Positive/Close Contact Case Report Form',
        routlink: '/forms/pocl',
        icon: <FormatAlignJustifyIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
      {
        name: 'Sick Leave Application Form',
        routlink: '/forms/sl',
        icon: <FormatAlignJustifyIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
    ],
  },

  {
    title: 'TOOLS',
    links: [
      {
        name: 'Calendar',
        routlink: '/tools/calendar',
        icon: <CalendarMonthIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
      {
        name: 'Face Mask Detection',
        routlink: '/tools/faceMask',
        icon: <MasksIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
    ],
  },

  {
    title: 'ACCOUNT MANAGEMENT',
    links: [
      {
        name: 'Users',
        routlink: '/admin/userList',
        icon: <PersonIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
    ],
  },

  {
    title: 'GROUPS MANAGEMENT',
    links: [
      {
        name: 'Groups',
        routlink: '/group/groupList',
        icon: <GroupsIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
    ],
  },
  {
    title: 'INFORMATION',
    links: [
      {
        name: 'Information About COVID-19',
        routlink: '/info/general',
        icon: <InfoIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
    ],
  },
];

export const sidebarData = [
  {
    title: 'MAIN',
    links: [
      {
        name: 'Dashboard',
        routlink: '/dashboard',
        icon: <DashboardIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
    ],
  },

  {
    title: 'FORMS',
    links: [
      {
        name: 'RAT Form',
        routlink: '/forms/rat',
        icon: <FormatAlignJustifyIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
      {
        name: 'Positive/Close Contact Case Form',
        routlink: '/forms/pocl',
        icon: <FormatAlignJustifyIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
      {
        name: 'Sick Leave Application Form',
        routlink: '/forms/sl',
        icon: <FormatAlignJustifyIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
    ],
  },
  {
    title: 'INFORMATION',
    links: [
      {
        name: 'Information About COVID-19',
        routlink: '/info/general',
        icon: <InfoIcon style={{ color: "#7451f8", fontSize: "25px" }} />,
      },
    ],
  },
];

export const classRoleOption = [
  { value: 'STUDENT', label: 'Student' },
  { value: 'TEACHER', label: 'Teacher' },
]

export const roleOption = [
  { value: 'ADMIN', label: 'Administrator' },
  { value: 'USER', label: 'User' },
]

export const classlevel = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
]

export const className = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
]

export const doseNum = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
]