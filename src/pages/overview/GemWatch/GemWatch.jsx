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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

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

const GemWatch = () => {
  const [data, setData] = useState([]);
  const [tokenSearch, setTokenSearch] = useState("");
  const [tokenAddressSearch, setTokenAddressSearch] = useState("");
  const [followersSearch, setFollowersSearch] = useState(0);
  const [chain, setChain] = React.useState("");
  const [hasBscCall, setHasBscCall] = React.useState("");
  const [hasShillSealsCall, setHasShillSealsCall] = React.useState("");
  const [launchPadSearch, setLaunchPadSearch] = useState("");
  const [dateListFrom, setDateListFrom] = useState(null);
  const [dateListTo, setDateListTo] = useState(null);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const [openInsert, setOpenInsert] = useState(false);

  const fetchPinkgems = (params) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/gemwatching`, {
      params,
    });
  };

  const fetchPinkgemsAll = (params) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/gemwatching/all`, {
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
          const analysisTwitter = `${obj.twitter}`.split("/").pop();

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
      dateListFrom:
        dateListFrom === null
          ? ""
          : moment(dateListFrom.toString()).format("YYYY-MM-DD"),
      dateListTo:
      dateListTo === null
          ? ""
          : moment(dateListTo.toString()).format("YYYY-MM-DD"),
      chain: chain,
      hasBscCall: hasBscCall,
      hasShillSealsCall: hasShillSealsCall,
      launchPad: launchPadSearch,
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

  const handleHasBscCallChange = (event) => {
    setHasBscCall(event.target.value);
  };
  const handleHasShillSealsCallChange = (event) => {
    setHasShillSealsCall(event.target.value);
  };
  const handleChainChange = (event) => {
    setChain(event.target.value);
  };

  const handleAdd = () => {
    setOpenInsert(true);
  };

  const handleTokenSearch = (e) => {
    setTokenSearch(e.target.value);
  };

  const handleLaunchPadSearch = (e) => {
    setLaunchPadSearch(e.target.value);
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
    { field: "id", headerName: "ID", width: 30 },
    { field: "token", headerName: "Token", width: 200 },
    {
      field: "tokenAddress",
      headerName: "Token Address",
      width: 450,
      renderCell: cellPooLink,
    },
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
    { field: "followers", headerName: "Followers", width: 80 },
    { field: "telegram", headerName: "Telegram", width: 80 },
    { field: "website", headerName: "Website", width: 200 },
    { field: "dateList", headerName: "Date List", width: 100 },
    { field: "chain", headerName: "Chain", width: 60 },
    { field: "hasBscCall", headerName: "Bsc Call", width: 80 },
    { field: "hasShillSealsCall", headerName: "Shill Seals Call", width: 120 },
    { field: "launchPad", headerName: "Launch Pad", width: 100 },
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ marginLeft: 9, height: 30 }}>
              <DatePicker
                label="Date List From"
                disableFuture
                value={dateListFrom}
                onChange={(newValue) => setDateListFrom(newValue)}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    sx={{
                      alignSelf: "center",
                      "& .MuiInputBase-root": {
                        height: 37,
                        width: 150,
                        background: "white",
                      },
                      "& .MuiFormLabel-root": {
                        fontSize: "15px",
                      },
                    }}
                    {...params}
                  />
                )}
                inputFormat="DD-MM-YYYY"
              />
              <DatePicker
                label="Date List To"
                disableFuture
                value={dateListTo}
                onChange={(newValue) => setDateListTo(newValue)}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    sx={{
                      alignSelf: "center",
                      "& .MuiInputBase-root": {
                        height: 37,
                        width: 150,
                        background: "white",
                      },
                      "& .MuiFormLabel-root": {
                        fontSize: "15px",
                      },
                    }}
                    {...params}
                  />
                )}
                inputFormat="DD-MM-YYYY"
              />
            </div>
          </LocalizationProvider>
        </Box>
        <Box sx={{ display: "flex", marginTop: 1 }}>
          <TextField
            label="Launch Pad"
            id="launchPadSearch"
            size="small"
            sx={{
              marginLeft: 1,
              alignSelf: "center",
              "& .MuiInputBase-root": {
                height: 37,
                width: 150,
                background: "white",
              },
              "& .MuiFormLabel-root": {
                fontSize: "15px",
              },
            }}
            onChange={handleLaunchPadSearch}
          />
          <TextField
            value={chain}
            id="chain"
            select
            label="Chain"
            defaultValue="all"
            style={{ width: 150, height: 38 }}
            onChange={handleChainChange}
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
              <em>All</em>
            </MenuItem>
            <MenuItem value={"BSC"}>BSC</MenuItem>
            <MenuItem value={"ETH"}>ETH</MenuItem>
          </TextField>
          <TextField
            value={hasBscCall}
            id="chain"
            select
            label="BSC Call"
            defaultValue="all"
            style={{ width: 150, height: 38 }}
            onChange={handleHasBscCallChange}
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
              <em>All</em>
            </MenuItem>
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </TextField>
          <TextField
            value={hasShillSealsCall}
            id="chain"
            select
            label="Shill Seals Call"
            defaultValue="all"
            style={{ width: 150, height: 38 }}
            onChange={handleHasShillSealsCallChange}
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
              <em>All</em>
            </MenuItem>
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
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
        <Button variant="contained" sx={{ marginRight: 1, height: 30 }}>
          DELETE
        </Button>
      </Box>

      <DataGrid
        sx={{
          mt: 1,
          width: "100%",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(192, 192, 192, 0.7)",
          },
          "& .MuiDataGrid-virtualScrollerRenderZone": {
            "& .MuiDataGrid-row": {
              "&:nth-of-type(2n)": {
                backgroundColor: "rgba(235, 235, 235, 0.65)",
              },
              "& .MuiDataGrid-cell": {
                "&:nth-of-type(n)": {
                  borderRight: "groove 1px rgba(235, 235, 235, 0.45)",
                },
              },
            },
          },
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
    </div>
  );
};

export default GemWatch;
