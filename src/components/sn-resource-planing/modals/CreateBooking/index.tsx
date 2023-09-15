import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DialogContent,
  Grid,
  Stack,
  Tab,
  Box,
  Typography,
  Collapse,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import ProjectTab from "./ProjectTab";
import DialogLayout from "components/DialogLayout";

interface IProps {
  open: boolean;
  onClose(): void;
}

// interface DateRange {
//   startDate?: Date;
//   endDate?: Date;
// }

// interface DefinedRange {
//   label: string;
//   startDate: Date;
//   endDate: Date;
// }

const CreateBooking: React.FC<IProps> = ({ open, onClose }) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isFocusAllocation, setIsFocusAllocation] = useState(false);
  const [activeTabs, setActiveTabs] = useState("1");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTabs(newValue);
    // if (newValue === "1") resetTimeOff();
    // if (newValue === "2") resetProject();
  };

  return (
    <DialogLayout
      renderHeader={
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "18px",
              lineHeight: "21px",
              fontWeight: 600,
              mr: "auto",
            }}
          >
            Create Booking
          </Typography>
        </Box>
      }
      open={open}
      onClose={onClose}
      sx={{ width: 600, minHeight: 600 }}
    >
      <DialogContent>
        <TabContext value={activeTabs}>
          <TabList
            onChange={handleTabChange}
            sx={{
              "& .MuiTabs-flexContainer": {
                gap: "16px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
              },
              "& .MuiTab-root": {
                textTransform: "unset",
                fontSize: "16px",
                lineHeight: "20px",
                fontWeight: 600,
                color: "rgba(153, 153, 153, 1)",
                "&.active": {
                  color: "#3699FF",
                },
              },
            }}
          >
            <Tab
              label="All People"
              value="1"
              sx={{
                fontSize: "14px",
                lineHeight: "16px",
                fontWeight: 600,
                px: "32px",
                py: "14px",
              }}
            />
            <Tab
              label="My Schedule"
              value="2"
              sx={{
                fontSize: "14px",
                lineHeight: "16px",
                fontWeight: 600,
              }}
            />
          </TabList>
          <TabPanel value="1" sx={{ p: 0 }}>
            <ProjectTab onClose={onClose} open={open} />
          </TabPanel>
          {/* <TabPanel value="2" sx={{ p: 0 }}>
            {_renderTimeOff()}
        </TabPanel> */}
        </TabContext>
      </DialogContent>
    </DialogLayout>
  );
};

export default CreateBooking;
