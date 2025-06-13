import React, { useEffect, useState } from "react";
import { Box, Button, Card, Modal, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { fetchArticles, createArticle, updateArticle, deleteArticle } from "../services/ArticleService";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 4,
};

function DashArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', title: '', content: '' });

  const loadArticles = async () => {
    setLoading(true);
    try {
      const { data } = await fetchArticles();
      setArticles(data);
    } catch (error) {
      console.error("Error loading articles", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setFormData({ name: '', title: '', content: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (row) => {
    setIsEditing(true);
    setEditId(row._id);
    setFormData({
      name: row.name,
      title: row.title,
      content: row.content.join('\n'),
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      loadArticles();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleSave = async () => {
    const payload = {
      ...formData,
      content: formData.content.split('\n').map(line => line.trim()).filter(Boolean),
    };

    try {
      if (isEditing) {
        await updateArticle(editId, payload);
      } else {
        await createArticle(payload);
      }
      handleClose();
      loadArticles();
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 2 },
    {
      field: 'content',
        headerName: 'Content Preview',
        flex: 2,
        renderCell: (params) => {
            const content = params.row?.content;
            if (Array.isArray(content) && content.length > 0) {
            return content[0];
            }
            return '(No content)';
        }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 2,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" size="small" onClick={() => handleEdit(params.row)}>Edit</Button>
          <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(params.row._id)}>Delete</Button>
        </Box>
      ),
    },
  ];

  return (
    <div className="articles-datagrid-container">
      <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4, mb: 5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Manage Articles</Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={handleOpen}
          >
            Add Article
          </Button>
        </Stack>

        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Typography variant="h6" mb={2}>{isEditing ? "Edit Article" : "Add Article"}</Typography>
            <Stack spacing={2}>
              <TextField
                label="Name"
                variant="outlined"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
              />
              <TextField
                label="Title"
                variant="outlined"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                fullWidth
              />
              <TextField
                label="Content"
                variant="outlined"
                multiline
                minRows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                fullWidth
              />
              <Stack direction="row" spacing={2} mt={2}>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>{isEditing ? "Update" : "Add"}</Button>
              </Stack>
            </Stack>
          </Box>
        </Modal>

        <Box sx={{ height: 700, width: 1000 }}>
          <DataGrid
            rows={articles}
            columns={columns}
            getRowId={(row) => row._id}
            loading={loading}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            disableSelectionOnClick
          />
        </Box>
      </Card>
    </div>
  );
}

export default DashArticleListPage;
