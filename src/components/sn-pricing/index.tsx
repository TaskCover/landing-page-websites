"use client";

import React, { memo } from 'react';
import { Stack, Container } from '@mui/material';
import AvailablePackage from './components/available-package';
import {Partner} from 'components/sn-products/components/Partner';
import TaskAi from './components/task-ai';
import MoreInfo from './components/info-more';
import HeadLayout from './components/head-layout';
import ListProduct from './components/list-product';

type PricingPageProps = {}

const PricingPage = (props: PricingPageProps) => {
    return (
        <Stack>
            <HeadLayout />
            <Container>
                <AvailablePackage />
            </Container>
            <Container>
                <Partner />
            </Container>
            <TaskAi />
            <ListProduct />
            <MoreInfo />
        </Stack>
    )
}

export default memo(PricingPage);
