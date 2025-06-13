import * as React from 'react';
import '../styles/UsersPage.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import {
  Stack,
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Switch
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../services/UserService";





const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [editUserId, setEditUserId] = useState(null); // Track the user being edited
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const color = "primary";
  const [newUser, setNewUser] = useState({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      contactNumber: '',
      email: '',
      username: '',
      password: '',
      address: '',
      type: '',
      isActive: true,
  });

  
  const loadUsers = async () => {
      try {
          setLoading(true);
          const { data } = await fetchUsers();
          setUsers(data.users);
      } catch (error) {
          console.error('Error fetching users:', error);
      } finally {
          setLoading(false);
      }
  };

   const navigate = useNavigate(); 

  useEffect(() => {
    const userType = localStorage.getItem("type");
    if (userType === "admin" || userType === "viewer") {
      loadUsers();
    }else{
       alert("Access denied: Editors are not allowed to access this page.");
       navigate("/dashboard"); 
    }
  }, [navigate]);


  const handleOpen = () => {
      setIsEditing(false); 
      setNewUser({
          firstName: '',
          lastName: '',
          age: '',
          gender: '',
          contactNumber: '',
          email: '',
          username: '',
          password: '',
          address: '',
          type: '',
          isActive: true,
      });
      setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
  };
  
  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user._id === id);
    if (userToEdit) {
        setNewUser({ ...userToEdit, password: '' }); 
        setEditUserId(id); 
        setIsEditing(true); 
        setOpen(true);
    }
  };
  
  const handleSaveUser = async () => {
    try {
        if (isEditing) {
            // Update user
            const updatedUser = { ...newUser };
            if (!updatedUser.password) {
                delete updatedUser.password; 
            }
            await updateUser(editUserId, updatedUser);
        } else {
           
            await createUser(newUser);
        }
        loadUsers(); 
        handleClose(); 
    } catch (error) {
        console.error('Error saving user:', error);
    }
  };
  
  const handleToggleActive = async (id, isActive) => {
    try {
        await updateUser(id, { isActive: !isActive });
        loadUsers(); 
    } catch (error) {
        console.error('Error toggling user status:', error);
    }
  };
  
  const columns1 = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        valueGetter: (value, params) => `${params.firstName || ''} ${params.lastName || ''}`,
    },
    { field: 'age', headerName: 'Age', flex: 1, sortable: true },
    { field: 'gender', headerName: 'Gender', flex: 1, sortable: true },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1, sortable: true },
    { field: 'contactNumber', headerName: 'Contact', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params) => (
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleEdit(params.row._id)}
                >
                    Edit
                </Button>
                <Switch
                    checked={params.row.isActive}
                    onChange={() => handleToggleActive(params.row._id, params.row.isActive)}
                    color="primary"
                />
            </Box>
        ),
    },
  ];
  
    return (
       <>
              <Stack direction="row" sx={{ marginBottom: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h2" classname="title" fontWeight="bold">
                      Users
                  </Typography>
                  <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddCircleIcon />}
                      onClick={handleOpen}
                      sx={{
                          position: 'fixed',
                          right: '20px',
                          top: '100px',
                          zIndex: 1000,
                      }}
                  >
                      Add User
                  </Button>
              </Stack>
      
              {/* Modal for Add/Edit User */}
              <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="add-user-modal"
        aria-describedby="add-user-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="keep-mounted-modal-title" variant="h4" component="h2">
            {isEditing ? "Edit User" : "Add User"}
          </Typography>
          <Stack
            id="transition-modal-description"
            direction="column"
            spacing={3}
            sx={{ mt: 2 }}
          />
           <Stack spacing={2}>
  <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
    <TextField
      fullWidth
      label="Enter first name"
      variant="outlined"
      value={newUser.firstName}
      onChange={(e) =>
        setNewUser({ ...newUser, firstName: e.target.value })
      }
      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
    />
  </FormControl>

  <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
    <TextField
      fullWidth
      label="Enter last name"
      variant="outlined"
      value={newUser.lastName}
      onChange={(e) =>
        setNewUser({ ...newUser, lastName: e.target.value })
      }
      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
    />
  </FormControl>

  <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
    <TextField
      fullWidth
      label="Enter age"
      variant="outlined"
      value={newUser.age}
      onChange={(e) =>
        setNewUser({ ...newUser, age: e.target.value })
      }
      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
    />
  </FormControl>

  <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
    <InputLabel id="gender-label">Gender</InputLabel>
    <Select
      labelId="gender-label"
      value={newUser.gender}
      onChange={(e) =>
        setNewUser({ ...newUser, gender: e.target.value })
      }
      label="Gender"
      IconComponent={ExpandMoreIcon}
      sx={{ borderRadius: 2 }}
    >
      <MenuItem value="Male">Male</MenuItem>
      <MenuItem value="Female">Female</MenuItem>
    </Select>
  </FormControl>

  <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
    <TextField
      fullWidth
      label="Enter mobile"
      variant="outlined"
      value={newUser.contactNumber}
      onChange={(e) =>
        setNewUser({ ...newUser, contactNumber: e.target.value })
      }
      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
    />
  </FormControl>

  <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
    <TextField
      fullWidth
      label="Enter address"
      variant="outlined"
      value={newUser.address}
      onChange={(e) =>
        setNewUser({ ...newUser, address: e.target.value })
      }
      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
    />
  </FormControl>

  <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
    <TextField
      fullWidth
      label="Enter email"
      variant="outlined"
      value={newUser.email}
      onChange={(e) =>
        setNewUser({ ...newUser, email: e.target.value })
      }
      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
    />
  </FormControl>

  <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
    <InputLabel id="type-label">Type</InputLabel>
    <Select
      labelId="type-label"
      value={newUser.type || "viewer"}
      onChange={(e) =>
        setNewUser({ ...newUser, type: e.target.value })
      }
      label="Type"
      sx={{ borderRadius: 2 }}
    >
      <MenuItem value="admin">Admin</MenuItem>
      <MenuItem value="editor">Editor</MenuItem>
      <MenuItem value="viewer">Viewer</MenuItem>
    </Select>
  </FormControl>

  <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
    <TextField
      fullWidth
      label="Enter username"
      variant="outlined"
      value={newUser.username}
      onChange={(e) =>
        setNewUser({ ...newUser, username: e.target.value })
      }
      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
    />
  </FormControl>

  <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
    <TextField
      fullWidth
      label="Enter password"
      type="password"
      variant="outlined"
      value={newUser.password}
      onChange={(e) =>
        setNewUser({ ...newUser, password: e.target.value })
      }
      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
    />
  </FormControl>

  <div className="button-group">
    <Button variant="outlined" onClick={handleClose}>
      Cancel
    </Button>
    <Button
      variant="contained"
      onClick={handleSaveUser}
      className="add-button-black"
    >
      {isEditing ? "Save Changes" : "Add"}
    </Button>
  </div>
</Stack>


        </Box>
      </Modal>
      <Box sx={{ height: 700, width: 1300, mb: 5 }}>
        <DataGrid
          rows={users}
          columns={columns1}
          getRowId={(row) => row._id}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
        />
      </Box>

      
          </>
    );
};

export default UsersPage;
        