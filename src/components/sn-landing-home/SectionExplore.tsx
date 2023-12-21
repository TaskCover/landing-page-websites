import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Image, { ImageProps } from "next/image";
import useMediaQuery from '@mui/material/useMediaQuery';
import Icon1 from "public/images/landing-spotlight-ic-1.svg";
import Icon2 from "public/images/landing-spotlight-ic-2.svg";
import Icon3 from "public/images/landing-spotlight-ic-3.svg";
import Icon4 from "public/images/landing-spotlight-ic-4.svg";
import Icon5 from "public/images/landing-spotlight-ic-5.svg";
import Icon6 from "public/images/landing-spotlight-ic-6.svg";
import Picture1 from "public/images/landing-explore-pt-1.png";
import styles from "./index.module.scss";


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function SectionExplore() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Box sx={{ marginTop: { xs: 6, sm: 8 }, marginBottom: 5, width: '100%', maxWidth: '1200px' }}>
            <AppBar position="static" className={styles.tabs_explore}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    // variant="scrollable"
                    // scrollButtons="auto"
                    aria-label="full width tabs example"
                    TabIndicatorProps={{
                        style: { display: 'none' }
                    }}
                >
                    <Tab className={`${styles.tab_btn_explore}`} label={"MARKETING AGENCY"} {...a11yProps(0)} />
                    <Tab className={`${styles.tab_btn_explore}`} label={"LAW AGENCY"} {...a11yProps(0)} />
                    <Tab className={`${styles.tab_btn_explore}`} label={"REMOTE TEAM"} {...a11yProps(0)} />
                    <Tab className={`${styles.tab_btn_explore}`} label={"PRODUCTION TEAM"} {...a11yProps(0)} />
                    <Tab className={`${styles.tab_btn_explore}`} label={"EVENT AGENCY"} {...a11yProps(0)} />
                    <Tab className={`${styles.tab_btn_explore}`} label={"SOFTWARE AGENCY"} {...a11yProps(0)} />
                </Tabs>
            </AppBar>

            <Box sx={{ position: 'relative', bgcolor: '#EFF5FE', boxShadow: '0px 0px 7px 0px #AAC6F5D1', border: '2px solid #FFFFFF', borderRadius: '40px', marginTop: 4 }}>
                <TabPanel value={0} index={0} dir={theme.direction}>
                    <Box sx={{ margin: "auto", width: { xs: '100%' } }}>
                        <Grid container justifyContent="space-between" spacing={{xs: '32px', sm: '64px'}}>
                            <Grid item xs={12} sm={4}>
                                <Box sx={{marginTop: {xs: '8px', sm: '24px'}}}>
                                    <Typography className={styles.tab_btn_explore_1} variant="h5" gutterBottom>MARKETING AGENCY</Typography>
                                    <Typography sx={{ marginTop: 2, marginBottom: 5 }} variant="h2" gutterBottom>Effectively achieve project’s goals</Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Enhance team coordination and workflow.
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Time and resource optimization through task automation.
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Ensure your progress’s quality with clients
                                    </Typography>
                                    <Button variant='contained' className={`${styles.cs_button_contained}`} sx={{ marginTop: '24px', width: { xs: 169 } }}>Explore more</Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Box sx={{ width: { xs: '100%' } }}>
                                    <Image layout='responsive' src={Picture1} alt='picture' />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                </TabPanel>

                <TabPanel value={value} index={2} dir={theme.direction}>
                </TabPanel>

                <TabPanel value={value} index={3} dir={theme.direction}>
                </TabPanel>

                <TabPanel value={value} index={4} dir={theme.direction}>
                </TabPanel>

                <TabPanel value={value} index={5} dir={theme.direction}>
                </TabPanel>
            </Box>
        </Box>
    );
}