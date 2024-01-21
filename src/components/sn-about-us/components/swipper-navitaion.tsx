import { Button } from '@mui/material';
import ArrowRightIcon from 'icons/ArrowRightIcon';
import React from 'react';
import { useSwiper } from 'swiper/react';

type SwiperNavButtonsProps = {
    handlerNext: () => void,
    handlerPrevious: () => void,
}

export const SwiperNavButtons = (props: SwiperNavButtonsProps) => {
  const {handlerNext, handlerPrevious} = props;

  return (
    <div className="swiper-nav-btns">
      <Button onClick={handlerPrevious} sx={{...sxConfig.root, left: -16}}>
            <ArrowRightIcon sx={{color: "#5c98f6", transform: "rotate(180deg)", fontSize: 30}} />
      </Button>
      <Button onClick={handlerNext} sx={{...sxConfig.root, right: -16}}>
        <ArrowRightIcon sx={{color: "#5c98f6", fontSize: 30}} />
      </Button>
    </div>
  );
};

const sxConfig = {
    root: {
        width: 32,
        height: 32,
        backgroundColor: "#fff",
        borderRadius: "50%",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        minWidth: "unset",
        zIndex: 10,
        boxShadow: "0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
        "&:hover": {
           backgroundColor: "#fff",
        }
    },
  };