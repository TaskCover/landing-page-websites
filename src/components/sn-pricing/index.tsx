"use client";

import React, { memo } from 'react';
import { Stack } from '@mui/material';
import AvailablePackage from './components/available-package';
import Partner from './components/partner';
import TaskAi from './components/task-ai';
import MoreInfo from './components/info-more';
import HeadLayout from './components/head-layout';
import ListProduct from './components/list-product';

type PricingPageProps = {}

const PricingPage = (props: PricingPageProps) => {
    return (
        <Stack>
            <HeadLayout />
            <AvailablePackage />
            <Partner />
            <TaskAi />
            <ListProduct />
            <MoreInfo />
        </Stack>
    )
}

export default memo(PricingPage);
