import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, MenuItem, MenuList, Stack } from "@mui/material";
import { Text } from "components/shared";
import BarsIcon from "icons/BarsIcon";
import CloseIcon from "icons/CloseIcon";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import { DATA_MEMU } from "./Menu";
import { MenuItemProps } from "./helpers";

const MenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Stack sx={{ display: { md: "none", xs: "flex" } }}>
      <BarsIcon sx={{ fontSize: 24 }} onClick={handleOpen} />
      <Stack
        sx={{
          position: "fixed",
          top: 0,
          bottom: 0,
          right: 0,
          width: "70%",
          backgroundColor: "rgba(255, 255, 255)",
          zIndex: 99,
          transform: `translateX(${isOpen ? 0 : "100%"})`,
          transition: "all .3s",
          overflow: "auto", height: "100%"
        }}
      >
        <Stack
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            px: 1,
            py: 1,
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center"
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </Stack>
        <MenuList sx={{ width: "100%", height: "100%", mt: 5 }}>
          {DATA_MEMU.map((item, index) => (
            <MenuItem key={index}>
              {item.child ?
                <Stack>
                  <Accordion sx={{
                    backgroundColor: "#fff",
                    boxShadow: "none",
                    p: 0,
                    border: "none",
                    width: "220px"
                  }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        backgroundColor: "#fff",
                        boxShadow: "none",
                        p: 0,
                        border: "none",
                        borderColor: "red",
                        width: "100%"
                      }}
                    >
                      <Text variant="inherit">{item.label}</Text>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                      background: "rgba(255, 255,255,.5)",
                      p: "0px 12px"
                    }} >
                      <Stack
                        sx={{
                          width: "100%",
                          transition: ".3s",
                        }} >
                        {
                          item.child.map((e, i) => (
                            <Link href={e.link ?? "#"} key={i}>
                              <Stack direction="row" alignItems="center" gap="8px"
                                sx={{
                                  p: "12px 8px",
                                  minWidth: { xs: "auto", md: "200px" },
                                  width: "100%",
                                }}
                              >
                                <Image src={e.icon} alt="icon" width={20} height={20} />
                                <Text variant="inherit">{e.label}</Text>
                              </Stack>
                            </Link>

                          ))
                        }
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                </Stack> :
                <Link href={item.href ?? "/"}>
                  <Text variant="inherit">{item.label}</Text>
                </Link>
              }
            </MenuItem>
          ))}
        </MenuList>
      </Stack>
    </Stack>
  );
};

export default memo(MenuMobile);
