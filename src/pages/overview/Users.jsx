import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField } from "@mui/material";

const Users = () => {

  const [data, setData] = useState([])
  const [nameSearch, setNameSearch] = useState('')
  const [colorSearch, setColorSearch] = useState('')


  useEffect(() => {
    axios.create({
      headers: {
          'Content-Type': "application/json",
          'Access-Control-Allow-Origin': '*',
      }
  }).get(`http://localhost:3000/products`)
      .then(res => {
        const persons = res.data;
        setData(persons);
      })
  }, [])

  const handleNameSearch = (e) => {
    setNameSearch(e.target.value);
  }

  const handleColorSearch = (e) => {
    setColorSearch(e.target.value);
  }

  const handleSearch = (e) => {
    axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).get('http://localhost:3000/products/search', {
      params: {
        color: colorSearch,
        name: nameSearch,
      }
    }).then(res => {
      const persons = res.data;
      setData(persons);
    }).catch(err => {
      console.error(err);
    });
    
  }

  const columns = [
    { field: 'no', headerName: 'No.', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'color', headerName: 'Color', width: 130 },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 90,
    },
  ];

  return (
    <div className="users" style={{ display: "flex", flexDirection: "column" }}>
  <Box
    component="form"
    sx={{
      p: 4,
      border: 1,
      borderColor: "grey.300",
      backgroundColor: "rgb(241,241,241)",
      width: "100%",
    }}
    noValidate
    autoComplete="off"
  >
    <TextField
          label="Name"
          id="nameSearch"
          size="small"
          onChange={handleNameSearch}
        />
    <TextField
          label="Color"
          id="colorSearch"
          size="small"
          onChange={handleColorSearch}
        />
    <Button onClick={handleSearch}>SEARCH</Button>
    <Button>ADD</Button>
    <Button>DELETE</Button>
  </Box>
  <DataGrid
    sx={{
      mt: 1,
      width: "100%",
    }}
    rows={data}
    columns={columns}
    pageSize={100}
    rowsPerPageOptions={[10]}
    checkboxSelection
  />
</div>

  );
};

export default Users;
