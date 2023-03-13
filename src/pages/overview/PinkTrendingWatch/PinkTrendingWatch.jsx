import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { cellWebsiteLink } from "../../../utils/RenderCellLink";
import { Alert, Box, Button, Tooltip } from "@mui/material";

const cellPinkSaleLink = (params) => {
  const poocoinUrl =
    "https://www.pinksale.finance/launchpad/" +
    params.value +
    "?chain=" +
    params.row.chain;
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
        Pinksale Link
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
const TwitterLink = (params) => {
  const url = params.value;
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
        Twitter Link
      </a>
    </>
  );
};

const PinkTrendingWatch = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [sortModel, setSortModel] = React.useState([
    {
      field: "endTime",
      sort: "asc",
    },
  ]);
  const [pinkTrendingWatchIds, setPinkTrendingWatchIds] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const fetchGemWatchingAll = (params) => {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/pinktrendingwatchs`,
      {
        params,
      }
    );
  };

  const handleSearch = async (e) => {
    fetchGemWatchingAll()
      .then((res) => {
        const gemwatchings = res.data;
        // iterate over each object in the data array and add the analysisTwitter field
        const newData = gemwatchings.map((obj) => {
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
  } 

  useEffect(() => {
    handleSearch()
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const handleDelete = (e) => {
    const params = {
      id: pinkTrendingWatchIds.join(","),
    };
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/pinktrendingwatchs`, {
        params: params,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (200 === response.status) {
          handleSearch();
          setShowSuccessAlert(true);
        }
      })
      .catch((error) => {
        // handle the error here
      });
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 30,
      headerAlign: "center",
      sticky: "left",
      hide: true,
    },
    {
      field: "token",
      headerName: "Token",
      width: 130,
      headerAlign: "center",
      sticky: "left",
    },
    {
      field: "symbol",
      headerName: "Symbol",
      width: 130,
      headerAlign: "center",
      sticky: "left",
    },
    {
      field: "pinksaleAddress",
      headerName: "Pinksale",
      width: 100,
      headerAlign: "center",
      renderCell: cellPinkSaleLink,
    },
    {
      field: "twitter",
      headerName: "Twitter",
      width: 100,
      headerAlign: "center",
      renderCell: TwitterLink,
    },
    {
      field: "analysisTwitter",
      headerName: "Twitter Analysis",
      width: 130,
      headerAlign: "center",
      renderCell: cellAnalysisTwitterLink,
    },
    {
      field: "followers",
      headerName: "Followers",
      width: 80,
      type: "number",
      headerAlign: "center",
    },

    {
      field: "website",
      headerName: "Website",
      width: 200,
      headerAlign: "center",
      renderCell: cellWebsiteLink,
    },
    {
      field: "typeLaunch",
      headerName: "Type Launch",
      width: 100,
      headerAlign: "center",
      valueFormatter: (params) => {
        const cellValue = params.value;
        if (cellValue === "33") {
          return "Fair Launch";
        } else if (cellValue === "11") {
          return "Presale";
        } else if (cellValue === "133") {
          return "Subscription";
        } else {
          return cellValue;
        }
      },
    },
    {
      field: "hasAudit",
      headerName: "Audit",
      width: 40,
      headerAlign: "center",
    },
    {
      field: "hasKyc",
      headerName: "Kyc",
      width: 40,
      headerAlign: "center",
    },

    {
      field: "hasSafu",
      headerName: "Safu",
      width: 40,
      headerAlign: "center",
    },
    { field: "chain", headerName: "Chain", width: 60, headerAlign: "center" },
    {
      field: "startTime",
      headerName: "Presale Start Time",
      width: 180,
      headerAlign: "center",
      valueFormatter: (params) => {
        const date = new Date(params.value * 1000);
        const options = { timeZone: "Asia/Bangkok" };
        return date.toLocaleString("en-US", options);
      },
    },
    {
      field: "endTime",
      headerName: "Presale End Time",
      width: 180,
      headerAlign: "center",
      valueFormatter: (params) => {
        const date = new Date(params.value * 1000);
        const options = { timeZone: "Asia/Bangkok" };
        return date.toLocaleString("en-US", options);
      },
    },
    {
      field: "softCap",
      headerName: "Soft Cap",
      width: 80,
      headerAlign: "center",
    },
    {
      field: "hardCap",
      headerName: "Hard Cap",
      width: 80,
      headerAlign: "center",
    },
    {
      field: "liquidityPercentage",
      headerName: "Liquidity Percent",
      width: 120,
      headerAlign: "center",
    },
    {
      field: "liquidityLockDuration",
      headerName: "Liquidity Lockup Time",
      width: 160,
      headerAlign: "center",
      valueFormatter: (params) => {
        const days = params.value / (60 * 60 * 24); // convert seconds to days
        return `${days.toFixed(2)} days`;
      },
    },

    {
      field: "poolDetails",
      headerName: "poolDetails",
      width: 200,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        if (params.value != null) {
          return (
            <Tooltip
              title={<span style={{ fontSize: "14px" }}>{params.value}</span>}
              arrow
              placement="left-start"
            >
              <span>
                {params.value.length > 30
                  ? params.value.substring(0, 30) + "..."
                  : params.value}
              </span>
            </Tooltip>
          );
        } else {
          return null;
        }
      },
    },
    {
      field: "kycDetails",
      headerName: "kycDetails",
      width: 200,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        if (params.value != null) {
          return (
            <Tooltip
              title={<span style={{ fontSize: "14px" }}>{params.value}</span>}
              arrow
              placement="left-start"
            >
              <span>
                {params.value.length > 30
                  ? params.value.substring(0, 30) + "..."
                  : params.value}
              </span>
            </Tooltip>
          );
        } else {
          return null;
        }
      },
    },
    {
      field: "min",
      headerName: "Min",
      width: 50,
      headerAlign: "center",
    },
    {
      field: "max",
      headerName: "Max",
      width: 50,
      headerAlign: "center",
    },
  ];

  return (
    <div className="users" style={{ display: "flex", flexDirection: "column" }}>
      {showSuccessAlert && (
        <Box
          display="flex"
          justifyContent="center"
          style={{ marginTop: '20px' }}
        >
          <Alert severity="success" onClose={handleCloseAlert}>
            Item deleted successfully!
          </Alert>
        </Box>
      )}
      <Box
        component="form"
        sx={{
          p: 0.5,
          border: 1,
          borderColor: "rgba(192,192,192,0.2)",
          backgroundColor: "rgb(241,241,241)",
          justifyContent: "stretch",
          height: 40,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          marginTop: 0.5,
        }}
        noValidate
        autoComplete="off"
      >
        <Button
          variant="contained"
          sx={{ marginRight: 1, height: 30, width: 60 }}
          onClick={handleDelete}
        >
          Delete
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
        components={{
          Toolbar: GridToolbar,
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
        paginationMode="client"
        onPageChange={handleChangePage}
        onPageSizeChange={handleChangeRowsPerPage}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          setPinkTrendingWatchIds(ids);
        }}
        initialState={{
          pinnedColumns: { left: ['token'] },
      }}
      ></DataGrid>
    </div>
  );
};

export default PinkTrendingWatch;
