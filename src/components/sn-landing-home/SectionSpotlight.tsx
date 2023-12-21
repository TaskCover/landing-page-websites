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
import Picture2 from "public/images/landing-spotlight-pt-2.png";
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

export default function SectionSpotlight() {
    const theme = useTheme();
    const [value, setValue] = React.useState(1);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Box sx={{ marginTop: 4, marginBottom: 5, width: '100%', maxWidth: '1200px' }}>
            <AppBar position="static" className={styles.tabs}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    TabIndicatorProps={{
                        style: { display: 'none' }
                    }}
                >
                    <Tab icon={<Image src={Icon1} alt='icon' />} className={`${styles.tab_btn} ${styles.tab_btn_1}`} label={isSmallScreen ? '' : "TaskCover AI"} {...a11yProps(0)} />
                    <Tab icon={<Image src={Icon2} alt='icon' />} className={`${styles.tab_btn} ${styles.tab_btn_2}`} label={isSmallScreen ? '' : "Task Project"} {...a11yProps(1)} />
                    <Tab icon={<Image src={Icon3} alt='icon' />} className={`${styles.tab_btn} ${styles.tab_btn_3}`} label={isSmallScreen ? '' : "Note & Docs"} {...a11yProps(2)} />
                    <Tab icon={<Image src={Icon4} alt='icon' />} className={`${styles.tab_btn} ${styles.tab_btn_4}`} label={isSmallScreen ? '' : "Mind maps"} {...a11yProps(3)} />
                    <Tab icon={<Image src={Icon5} alt='icon' />} className={`${styles.tab_btn} ${styles.tab_btn_5}`} label={isSmallScreen ? '' : "AI chat"} {...a11yProps(4)} />
                    <Tab icon={<Image src={Icon6} alt='icon' />} className={`${styles.tab_btn} ${styles.tab_btn_6}`} label={isSmallScreen ? '' : "AI meeting"} {...a11yProps(5)} />
                </Tabs>
            </AppBar>
            <Box sx={{ bgcolor: '#e7f5fb', borderRadius: '24px', marginTop: 4 }}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Box sx={{ margin: "auto", width: { xs: '100%', md: '80%' } }}>
                        <Grid container spacing={'80px'}>
                            <Grid item xs={12} sm={7}>
                                <Image width={64} height={64} src={Icon1} alt='icon' />
                                <Typography className={styles.tab_btn_1} variant="h2" gutterBottom>TaskCover AI</Typography>
                                <Typography variant="body2" gutterBottom>
                                    Listing and organizing the sub-tasks and deadlines from a simple provided outline.
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Listing and organizing the sub-tasks and deadlines from a simple provided outline.
                                </Typography>
                                <Button variant='contained' className={`${styles.cs_button_contained}`} sx={{ marginTop: '16px', width: { xs: 120, sm: 169 } }}>Explore more</Button>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Box sx={{ width: { xs: '90%' } }}>
                                    <Image layout='responsive' src={Picture2} alt='picture' />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Box sx={{ margin: "auto", width: { xs: '100%', md: '80%' } }}>
                        <Grid container spacing={'80px'}>
                            <Grid item xs={12} sm={7}>
                                <Image width={64} height={64} src={Icon2} alt='icon' />
                                <Typography className={styles.tab_btn_2} variant="h2" gutterBottom>Task & Project</Typography>
                                <Typography variant="body2" gutterBottom>
                                    Listing and organizing the sub-tasks and deadlines from a simple provided outline.
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Listing and organizing the sub-tasks and deadlines from a simple provided outline.
                                </Typography>
                                <Button variant='contained' className={`${styles.cs_button_contained}`} sx={{ marginTop: '16px', width: { xs: 120, sm: 169 } }}>Explore more</Button>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Box sx={{ width: { xs: '90%' } }}>
                                    <Image layout='responsive' src={Picture2} alt='picture' />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Box sx={{ margin: "auto", width: { xs: '100%', md: '80%' } }}>
                        <Grid container spacing={'80px'}>
                            <Grid item xs={12} sm={7}>
                                <Image width={64} height={64} src={Icon3} alt='icon' />
                                <Typography className={styles.tab_btn_3} variant="h2" gutterBottom>Note & Docs</Typography>
                                <Typography variant="body2" gutterBottom>
                                    Listing and organizing the sub-tasks and deadlines from a simple provided outline.
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Listing and organizing the sub-tasks and deadlines from a simple provided outline.
                                </Typography>
                                <Button variant='contained' className={`${styles.cs_button_contained}`} sx={{ marginTop: '16px', width: { xs: 120, sm: 169 } }}>Explore more</Button>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Box sx={{ width: { xs: '90%' } }}>
                                    <Image layout='responsive' src={Picture2} alt='picture' />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <Box sx={{ margin: "auto", width: { xs: '100%', md: '80%' } }}>
                        <Grid container spacing={'80px'}>
                            <Grid item xs={12} sm={7}>
                                <Image width={64} height={64} src={Icon4} alt='icon' />
                                <Typography className={styles.tab_btn_4} variant="h2" gutterBottom>Mind maps</Typography>
                                <Typography variant="body2" gutterBottom>
                                    Listing and organizing the sub-tasks and deadlines from a simple provided outline.
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Listing and organizing the sub-tasks and deadlines from a simple provided outline.
                                </Typography>
                                <Button variant='contained' className={`${styles.cs_button_contained}`} sx={{ marginTop: '16px', width: { xs: 120, sm: 169 } }}>Explore more</Button>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Box sx={{ width: { xs: '90%' } }}>
                                    <Image layout='responsive' src={Picture2} alt='picture' />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                    <Box sx={{ margin: "auto", width: { xs: '100%', md: '80%' } }}>
                        <Grid container spacing={'80px'}>
                            <Grid item xs={12} sm={7}>
                                <Image width={64} height={64} src={Icon5} alt='icon' />
                                <Typography className={styles.tab_btn_5} variant="h2" gutterBottom>AI chat</Typography>
                                <Typography variant="body2" gutterBottom>
                                    Listing and organizing the sub-tasks and deadlines from a simple provided outline.
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Listing and organizing the sub-tasks and deadlines from a simple provided outline.
                                </Typography>
                                <Button variant='contained' className={`${styles.cs_button_contained}`} sx={{ marginTop: '16px', width: { xs: 120, sm: 169 } }}>Explore more</Button>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Box sx={{ width: { xs: '90%' } }}>
                                    <Image layout='responsive' src={Picture2} alt='picture' />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={5} dir={theme.direction}>
                    <Box sx={{ margin: "auto", width: { xs: '100%', md: '80%' } }}>
                        <Grid container spacing={'80px'}>
                            <Grid item xs={12} sm={7}>
                                <Image width={64} height={64} src={Icon6} alt='icon' />
                                <Typography className={styles.tab_btn_6} variant="h2" gutterBottom>AI meeting</Typography>
                                <Typography variant="body2" gutterBottom>
                                    Listing and organizing the sub-tasks and deadlines from a simple provided outline.
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Listing and organizing the sub-tasks and deadlines from a simple provided outline.
                                </Typography>
                                <Button variant='contained' className={`${styles.cs_button_contained}`} sx={{ marginTop: '16px', width: { xs: 120, sm: 169 } }}>Explore more</Button>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Box sx={{ width: { xs: '90%' } }}>
                                    <Image layout='responsive' src={Picture2} alt='picture' />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </TabPanel>
            </Box>
        </Box>
    );
}