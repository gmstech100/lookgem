import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import PinkGemInsert from "./PinkGemsListedInsert";
import { LocalizationProvider } from "@mui/x-date-pickers";

const cellPooLink = (params) => {
  const poocoinUrl = "https://poocoin.app/tokens/" + params.value;
  return (
    <>
      <a
        style={{
          textDecoration: "underline",
          color: "#0a53bf",
          cursor: "pointer",
        }}
        onClick={() => window.open(poocoinUrl, "_blank")}
      >
        {params.value}
      </a>
    </>
  );
};

const cellTwitterLink = (params) => {
  return (
    <>
      <a
        style={{
          textDecoration: "underline",
          color: "#0a53bf",
          cursor: "pointer",
        }}
        onClick={() => window.open(params.value, "_blank")}
      >
        {params.value}
      </a>
    </>
  );
};

const cellAnalysisTwitterLink = (params) => {
  const url = "https://socialblade.com/twitter/user/" + params.value;
  return (
    <>
      <a
        style={{
          textDecoration: "underline",
          color: "#0a53bf",
          cursor: "pointer",
        }}
        onClick={() => window.open(url, "_blank")}
      >
        {params.value}
      </a>
    </>
  );
};

const PinkGemsListed = () => {
  const [data, setData] = useState([]);
  const [tokenSearch, setTokenSearch] = useState("");
  const [tokenAddressSearch, setTokenAddressSearch] = useState("");
  const [followersSearch, setFollowersSearch] = useState(0);
  const [statusChart, setStatusChart] = React.useState("");
  const [statusKyc, setStatusKyc] = React.useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const [openInsert, setOpenInsert] = useState(false);

  const handleStatusChartChange = (event) => {
    setStatusChart(event.target.value);
  };
  const handleStatusKycChange = (event) => {
    setStatusKyc(event.target.value);
  };

  const handleAdd = () => {
    setOpenInsert(true);
  };

  const fetchPinkgems = (params) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/pinkgems`, {
      params,
    });
  };

  const fetchPinkgemsAll = (params) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/pinkgems/all`, {
      params,
    });
  };

  useEffect(() => {
    fetchPinkgemsAll()
      .then((res) => {
        const pinkgems = res.data;
        // iterate over each object in the data array and add the analysisTwitter field
        const newData = pinkgems.map((obj) => {
          // do whatever analysis you need on the twitter field to get the analysisTwitter value
          const analysisTwitter = `${obj.twitter}`.split('/').pop();

          // return a new object with the analysisTwitter field added
          return { ...obj, analysisTwitter };
        });
        setData(newData);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          // handle 404 error
        } else {
          // handle other errors
        }
      });
  }, []);

  const handleSearch = async (e) => {
    const params = {
      token: tokenSearch,
      tokenAddress: tokenAddressSearch,
      followers: followersSearch,
      hasKyc: statusKyc,
      hasPump: statusChart,
    };
    fetchPinkgems(params)
      .then((res) => {
        const pinkgems = res.data;
        const newData = pinkgems.map((obj) => {
          // do whatever analysis you need on the twitter field to get the analysisTwitter value
          const analysisTwitter = `Analysis of ${obj.twitter}`;

          // return a new object with the analysisTwitter field added
          return { ...obj, analysisTwitter };
        });
        setData(newData);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          // handle 404 error
        } else {
          // handle other errors
        }
      });
  };

  const handleTokenSearch = (e) => {
    setTokenSearch(e.target.value);
  };

  const handleTokenAddressSearch = (e) => {
    setTokenAddressSearch(e.target.value);
  };

  const handleFollowersSearch = (e) => {
    setFollowersSearch(e.target.value);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "token", headerName: "Token", width: 200 },
    {
      field: "tokenAddress",
      headerName: "Token Address",
      width: 450,
      renderCell: cellPooLink,
    },
    { field: "followers", headerName: "Followers", width: 80 },
    { field: "hasKyc", headerName: "KYC", width: 30 },
    { field: "hasPump", headerName: "Chart", width: 30 },
    {
      field: "twitter",
      headerName: "Twitter",
      width: 200,
      renderCell: cellTwitterLink,
    },
    {
      field: "analysisTwitter",
      headerName: "Twitter Analysis",
      width: 200,
      renderCell: cellAnalysisTwitterLink,
    },
  ];

  return (
    <div className="users" style={{ display: "flex", flexDirection: "column" }}>
      <Box
        component="form"
        sx={{
          p: 0.5,
          border: 1,
          borderColor: "rgba(192,192,192,0.2)",
          backgroundColor: "rgb(241,241,241)",
          justifyContent: "stretch",
          height: 95,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          marginTop: 0.5,
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ display: "flex" }}>
          <TextField
            label="Token"
            id="tokenSearch"
            size="small"
            sx={{
              marginLeft: 1,
              width: 100,
              alignSelf: "center",
              "& .MuiInputBase-root": {
                height: 37,
                background: "white",
              },
              "& .MuiFormLabel-root": {
                fontSize: "15px",
              },
            }}
            onChange={handleTokenSearch}
          />
          <TextField
            sx={{
              marginLeft: 1,
              width: 500,
              alignSelf: "center",
              "& .MuiInputBase-root": {
                height: 37,
                background: "white",
              },
              "& .MuiFormLabel-root": {
                fontSize: "15px",
              },
            }}
            label="Token Address"
            id="tokenAddressSearch"
            size="small"
            onChange={handleTokenAddressSearch}
          />
          <TextField
            sx={{
              marginLeft: 1,
              width: 100,
              alignSelf: "center",
              "& .MuiInputBase-root": {
                height: 37,
                background: "white",
              },
              "& .MuiFormLabel-root": {
                fontSize: "15px",
              },
            }}
            label="Followers"
            id="followersSearch"
            size="small"
            onChange={handleFollowersSearch}
          />
        </Box>
        <Box sx={{ display: "flex", marginTop: 1 }}>
          <TextField
            value={statusKyc}
            id="Kyc"
            select
            label="Kyc"
            defaultValue="all"
            style={{ width: 150, height: 38 }}
            onChange={handleStatusKycChange}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                marginLeft: 1,
              },
            }}
            SelectProps={{
              style: {
                height: 37,
              },
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </TextField>
          <TextField
            value={statusChart}
            id="chain"
            select
            label="Status"
            defaultValue="all"
            style={{ width: 150, height: 38 }}
            onChange={handleStatusChartChange}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                marginLeft: 1,
              },
            }}
            SelectProps={{
              style: {
                height: 37,
              },
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Pump</MenuItem>
            <MenuItem value={0}>Dump</MenuItem>
          </TextField>
        </Box>
      </Box>
      <Box
        component="form"
        sx={{
          p: 1,
          border: 1,
          borderColor: "grey.300",
          backgroundColor: "rgb(241,241,241)",
          width: "100%",
          display: "flex",
          marginTop: 0.5,
        }}
        noValidate
        autoComplete="off"
      >
        <Button
          variant="contained"
          sx={{ marginRight: 1, height: 30 }}
          onClick={handleSearch}
        >
          SEARCH
        </Button>
        <Button
          variant="contained"
          sx={{ marginRight: 1, height: 30 }}
          onClick={handleAdd}
        >
          ADD
        </Button>
        <Button
          variant="contained"
          sx={{ marginRight: 1, height: 30 }}
        >
          DELETE
        </Button>
      </Box>

      <DataGrid
        sx={{
          mt: 1,
          width: "100%",
        }}
        rows={data}
        columns={columns}
        pagination
        rowsPerPageOptions={[15, 30, 75, 100]}
        rowHeight={30}
        headerHeight={40}
        getRowId={(r) => r.id}
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        onPageChange={handleChangePage}
        onPageSizeChange={handleChangeRowsPerPage}
        checkboxSelection
      />
      {openInsert && <PinkGemInsert openInsert setOpenInsert={setOpenInsert} />}
    </div>
  );
};

export default PinkGemsListed;
