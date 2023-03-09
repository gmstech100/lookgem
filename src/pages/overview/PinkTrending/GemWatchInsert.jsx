import React, { useState } from "react";
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formatDateDDMMYYYY } from "../../../utils/DateUtils";

const GemWatchInsert = (props) => {
  const { openInsert, setOpenInsert, searchAgain } = props;

  const [open, setOpen] = useState(openInsert);
  const [dataInsert, setDataInsert] = useState({
    token: "",
    tokenAddress: "",
    website: "",
    twitter: "",
    telegram: "",
    followers: 0,
    dateList: null,
    chain: "",
    hasBscCall: 0,
    hasShillSealsCall: 0,
    launchPad: ""
  })

  const [dataInit, setDataInit] = useState({
    token: "",
    tokenAddress: "",
    website: "",
    twitter: "",
    telegram: "",
    followers: 0,
    dateList: null,
    chain: "",
    hasBscCall: 0,
    hasShillSealsCall: 0,
    launchPad: ""
  })

  const handleClose = () => {
    setOpenInsert(false);
  };

  const handleSubmit = () => {
    if (JSON.stringify(dataInit) === JSON.stringify(dataInsert)) {
      setOpenInsert(false);
      return;
    }
    const currentDate = new Date();
    const formattedDate = formatDateDDMMYYYY(currentDate);
    setDataInsert({
      ...dataInsert,
      dateList:
        (dataInsert.dateList != null && dataInsert.dateList != "")
          ? formatDateDDMMYYYY(dataInsert.dateList)
          : formattedDate,
    });
    const url = `${process.env.REACT_APP_BACKEND_URL}/gemwatching`;
    const dataAdd = {
      ...dataInsert,
      dateList:
        (dataInsert.dateList != null && dataInsert.dateList != "")
          ? formatDateDDMMYYYY(dataInsert.dateList)
          : formattedDate,
    }
    axios.post(url, dataAdd)
      .then(res => {
        console.log(res.data);
        setOpenInsert(false);
        searchAgain()
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      {openInsert && (
        <Dialog open={open} maxWidth="md">
          <DialogTitle
            sx={{
              backgroundColor: "rgba(235,235,235,0.7)",
            }}
          >
            Add New Pink Gem
          </DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "between",
                marginTop: -10,
              }}
            >
              <TextField
                sx={{
                  marginLeft: 2,
                  width: 300,
                }}
                margin="normal"
                id="token"
                label="Token"
                type="text"
                fullWidth
                variant="standard"
                value={dataInsert.token}
                onChange={(newValue) =>
                  setDataInsert({
                    ...dataInsert,
                    token: newValue.target.value,
                  })
                }
              />
              <TextField
                sx={{
                  marginLeft: 2,
                  width: 350,
                }}
                margin="normal"
                id="tokenAddress"
                label="Token Address"
                type="text"
                fullWidth
                variant="standard"
                value={dataInsert.tokenAddress}
                onChange={(newValue) =>
                  setDataInsert({
                    ...dataInsert,
                    tokenAddress: newValue.target.value,
                  })
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "between",
                marginTop: -10,
              }}
            >
              <TextField
                sx={{
                  marginLeft: 2,
                  width: 300,
                }}
                margin="normal"
                id="website"
                label="Website"
                type="text"
                fullWidth
                variant="standard"
                value={dataInsert.website}
                onChange={(newValue) =>
                  setDataInsert({
                    ...dataInsert,
                    website: newValue.target.value,
                  })
                }
              />
              <TextField
                sx={{
                  marginLeft: 2,
                  width: 350,
                }}
                margin="normal"
                id="twitter"
                label="Twitter"
                type="text"
                fullWidth
                variant="standard"
                value={dataInsert.twitter}
                onChange={(newValue) =>
                  setDataInsert({
                    ...dataInsert,
                    twitter: newValue.target.value,
                  })
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "between",
                marginTop: -10,
              }}
            >
              <TextField
                sx={{
                  marginLeft: 2,
                  width: 300,
                }}
                margin="normal"
                id="telegram"
                label="Telegram"
                type="text"
                fullWidth
                variant="standard"
                value={dataInsert.telegram}
                onChange={(newValue) =>
                  setDataInsert({
                    ...dataInsert,
                    telegram: newValue.target.value,
                  })
                }
              />
              <TextField
                sx={{
                  marginLeft: 2,
                  width: 350,
                }}
                margin="normal"
                id="followersTwitter"
                label="Followers"
                type="text"
                fullWidth
                variant="standard"
                value={dataInsert.followers}
                onChange={(newValue) =>
                  setDataInsert({
                    ...dataInsert,
                    followers: newValue.target.value,
                  })
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "between",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div spacing={3} style={{ display: "flex", marginLeft: 16 }}>
                  <div style={{ marginTop: "10px", height: 40 }}>
                    <DatePicker
                      label="Date List"
                      disableFuture
                      value={dataInsert.dateList}
                      onChange={(newValue) => {
                        setDataInsert({
                          ...dataInsert,
                          dateList: newValue,
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          sx={{
                            alignSelf: "center",
                            "& .MuiInputBase-root": {
                              height: 37,
                              width: 160,
                              background: "white",
                            },
                            "& .MuiFormLabel-root": {
                              fontSize: "15px",
                            },
                          }}
                          {...params}
                        />
                      )}
                      inputFormat="YYYY-MM-DD"
                    />
                  </div>
                </div>
              </LocalizationProvider>
              <TextField
                id="chain"
                select
                label="Chain"
                defaultValue="all"
                value={dataInsert.chain}
                onChange={(newValue) =>
                  setDataInsert({
                    ...dataInsert,
                    chain: newValue.target.value,
                  })
                }
                style={{ width: 90, height: 38, marginTop: 5 }}
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
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"BSC"}>BSC</MenuItem>
                <MenuItem value={"ETH"}>ETH</MenuItem>
              </TextField>
              <TextField
                select
                label="BSC Call"
                defaultValue="all"
                value={dataInsert.hasBscCall}
                onChange={(newValue) =>
                  setDataInsert({
                    ...dataInsert,
                    hasBscCall: newValue.target.value,
                  })
                }
                style={{ width: 150, height: 38, marginTop: 5 }}
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
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </TextField>
              <TextField
                select
                label="Shill Seals Call"
                defaultValue="all"
                value={dataInsert.hasShillSealsCall}
                onChange={(newValue) =>
                  setDataInsert({
                    ...dataInsert,
                    hasShillSealsCall: newValue.target.value,
                  })
                }
                style={{ width: 150, height: 38, marginTop: 5 }}
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
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </TextField>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "between",
              }}
            >
              <TextField
            label="Launch Pad"
            size="small"
            value={dataInsert.launchPad}
            onChange={(newValue) =>
              setDataInsert({
                ...dataInsert,
                launchPad: newValue.target.value,
              })
            }
            sx={{
              marginLeft: 2,
              marginTop: 1,
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
          />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default GemWatchInsert;
