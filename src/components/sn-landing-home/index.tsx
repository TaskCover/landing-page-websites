"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from './index.module.scss';
import { Stack, Grid, Card, CardContent, CardActions } from '@mui/material';
import Link from "components/Link";
import Image, { ImageProps } from "next/image";
import DashboardImage from "public/images/landing-dashboard.png";
import { LANDING_HOME_PATH } from "constant/paths";
import Homepage from './LandingPage';
import SectionSpotlight from './SectionSpotlight';
import SectionExplore from './SectionExplore';
import { useTheme } from '@mui/material/styles';
// image
import LogoImage from "public/images/landing-logo.png";
import SloganImage from "public/images/landing-slogan.png";
import ImageOptimize from "public/images/landing-optimize-pt-1.png";
import IconOptimize1 from "public/images/landing-optimize-ic-1.svg";
import IconOptimize2 from "public/images/landing-optimize-ic-2.svg";
import IconOptimize3 from "public/images/landing-optimize-ic-3.svg";
import IconArrowRight from "public/images/landing-ic-arrow-right.svg";
import IconArrowRightShort from "public/images/landing-ic-arrow-right-short.svg";
import ImageManage from "public/images/landing-manage-pt-1.png";
import IconManage1 from "public/images/landing-manage-ic-1.svg";
import IconManage2 from "public/images/landing-manage-ic-2.svg";
import IconManage3 from "public/images/landing-manage-ic-3.svg";
import IconManage4 from "public/images/landing-manage-ic-4.svg";
import IconManage5 from "public/images/landing-manage-ic-5.svg";
import IconManage6 from "public/images/landing-manage-ic-6.svg";
import ImageAboutus from "public/images/landing-aboutus.png";
import ImageAboutusMobile from "public/images/landing-aboutus-mobile.png";
import useMediaQuery from '@mui/material/useMediaQuery';


interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Product', 'AI', 'Pricing', 'Use cases', 'Resources'];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Image src={LogoImage} alt="App Logo" />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Stack component={"main"} sx={{ paddingTop: { xs: '64px', md: '96px' } }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ height: { xs: '64px', md: '96px' } }} className={`${styles.nav}`}>
        <Toolbar sx={{ margin: 'auto 0px' }}>
          <Stack direction={'row'} spacing={{ md: 2, lg: 5 }} sx={{ flexGrow: 1 }}>
            <Link href={LANDING_HOME_PATH} underline="none">
              <Image src={LogoImage} alt="App Logo" />
            </Link>
            <Stack direction={'row'} spacing={1} sx={{ display: { xs: 'none', md: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item} variant='text' className={`${styles.cs_button}`}>
                  {item}
                </Button>
              ))}
            </Stack>
          </Stack>


          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Stack direction={'row'} spacing={{ md: 1, lg: 2 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button variant='outlined' className={`${styles.cs_button_outlined}`} sx={{ width: { xs: 130, lg: 169 } }}>Log in</Button>
            <Button variant='contained' className={`${styles.cs_button_contained}`} sx={{ width: { xs: 130, lg: 169 } }}>Free 14-day trial</Button>
            {/* {navItems.map((item) => (
              <Button key={item} sx={{ color: '#000' }}>
                {item}
              </Button>
            ))} */}
          </Stack>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Stack overflow='auto' style={{ background: '#fff' }}
        height={{ xs: 'calc(100vh - 64px)', md: 'calc(100vh - 96px)' }}
      >
        <Stack sx={{ p: { xs: 2, sm: 3 } }} className={`${styles.section_1}`}>
          <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Stack sx={{ width: { xs: '100%', sm: '468px' }, maxWidth: { xs: '300px', sm: '468px' } }}>
              <Image layout='responsive' src={SloganImage} alt="App Slogan" />
            </Stack>
            <Typography paddingTop={6} paddingBottom={6}>
              Tackle all your problems collaboratively and pave the way for success.
            </Typography>
            <Stack marginBottom={4} direction={'row'} spacing={{ xs: 1, lg: 2 }}>
              <Button variant='contained' className={`${styles.cs_button_contained}`} sx={{ width: { xs: 120, sm: 169 } }}>Get started</Button>
              <Button variant='outlined' className={`${styles.cs_button_outlined}`} sx={{ width: { xs: 120, sm: 169 } }}>Watch video</Button>
            </Stack>
            <Image layout='responsive' style={{ maxWidth: '1162px' }} src={DashboardImage} alt="App Dashboard" />
          </Stack>
        </Stack>

        <Stack sx={{ p: { xs: 1, sm: 3 } }} className={`${styles.section_2}`}>
          <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ paddingTop: 6, paddingBottom: 3, fontSize: { xs: '24px', sm: '40px' }, fontWeight: 500, lineHeight: '48px', color: '#fff' }}>
              AI - Powerful Agent
            </Typography>
            <Stack className={styles.divider} />
            <SectionSpotlight />
          </Stack>
        </Stack>

        <Stack sx={{ p: { xs: 1, sm: 3 } }} className={`${styles.section_3}`}>
          <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography gutterBottom sx={{ color: '#0575E6', paddingTop: 6, fontSize: { xs: '24px', sm: '40px' }, fontWeight: 500, lineHeight: '48px' }}>
              Fully optimize your financial process
            </Typography>
            <Typography sx={{ marginBottom: 5, fontSize: '16px', lineHeight: '32px' }} variant='subtitle1' gutterBottom>
              Drive your agency growth by simplifying all sales, budget and billing tasks
            </Typography>
            <Stack className={styles.divider} />
            <Button variant='contained' className={`${styles.cs_button_contained}`} sx={{ marginTop: 5, marginBottom: { xs: 3, sm: 10 }, width: 169 }}>
              Free 14-day trial
            </Button>

            <Box sx={{ margin: "auto", width: '100%', maxWidth: '1200px' }}>
              <Grid container justifyContent="center" alignItems="center" spacing={'16px'}>
                <Grid item xs={12} md={7}>
                  <Image layout='responsive' src={ImageOptimize} alt='example' />
                </Grid>
                <Grid item xs={12} md={5}>
                  <Stack gap={2}>
                    <Card sx={{ minWidth: 275 }} className={styles.card_optimize}>
                      <CardContent style={{ padding: '12px 16px 6px' }}>
                        <Typography variant="h4" component={'div'} sx={{ color: '#0E9F66', display: 'flex', gap: '3px', alignItems: 'center' }}>
                          <Image width={32} src={IconOptimize1} alt='icon' /> Budgeting
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '16px', lineHeight: '24px', margin: '6px' }}>
                          Discover specific tactics and expertise to empower your financial decisions with confidence and accuracy.
                        </Typography>
                        <Button sx={{ textTransform: 'none' }}>
                          Learn More <Image src={IconArrowRight} style={{ marginLeft: '8px' }} alt="icon" />
                        </Button>
                      </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275 }} className={styles.card_optimize}>
                      <CardContent style={{ padding: '12px 16px 6px' }}>
                        <Typography variant="h4" component={'div'} sx={{ color: '#FA557F', display: 'flex', gap: '3px', alignItems: 'center' }}>
                          <Image width={32} src={IconOptimize2} alt='icon' /> Sales
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '16px', lineHeight: '24px', margin: '6px' }}>
                          Discover specific tactics and expertise to empower your financial decisions with confidence and accuracy.
                        </Typography>
                        <Button sx={{ textTransform: 'none' }}>
                          Learn More <Image src={IconArrowRight} style={{ marginLeft: '8px' }} alt="icon" />
                        </Button>
                      </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275 }} className={styles.card_optimize}>
                      <CardContent style={{ padding: '12px 16px 6px' }}>
                        <Typography variant="h4" component={'div'} sx={{ color: '#5C98F6', display: 'flex', gap: '3px', alignItems: 'center' }}>
                          <Image width={32} src={IconOptimize3} alt='icon' /> Billing
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '16px', lineHeight: '24px', margin: '6px' }}>
                          Discover specific tactics and expertise to empower your financial decisions with confidence and accuracy.
                        </Typography>
                        <Button sx={{ textTransform: 'none' }}>
                          Learn More <Image src={IconArrowRight} style={{ marginLeft: '8px' }} alt="icon" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Stack>

        <Stack sx={{ p: { xs: 1, sm: 3 } }} className={`${styles.section_4}`}>
          <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography gutterBottom sx={{ color: '#000', paddingTop: 6, fontSize: { xs: '24px', sm: '40px' }, maxWidth: '600px', textAlign: 'center', fontWeight: 500, lineHeight: '48px' }}>
              Manage the project effectively to achieve the bottom line
            </Typography>
            <Typography sx={{ marginBottom: 5, fontSize: '16px', lineHeight: '32px' }} variant='subtitle1' gutterBottom>
              Help you to reach your goals through efficient project management
            </Typography>
            <Stack className={styles.divider} />
            <Button variant='contained' className={`${styles.cs_button_contained}`} sx={{ marginTop: 5, marginBottom: { xs: 3, sm: 6 }, width: 169 }}>
              Free 14-day trial
            </Button>

            <Box sx={{ margin: "auto", width: '100%', maxWidth: '1200px', position: 'relative' }}>
              <Box>
                <Image layout='responsive' src={ImageManage} alt='example' />
              </Box>

              <Box
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,1), rgba(255,255,255,1))',
                  marginTop: '', position: 'absolute', bottom: '150px', left: '30px', right: '30px',
                  height: { sm: '150px', md: '300px', lg: '350px' }, zIndex: 1
                }} />
              <Box sx={{ position: { xs: 'relative', md: 'absolute' }, bottom: { sm: '0px', md: '20px' }, right: 0, left: 0, zIndex: 2, }}>
                <Grid
                  container
                  flexWrap="wrap"
                  alignContent='stretch'
                  spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', minWidth: 275, maxWidth: { xs: '100%', sm: 384 } }} className={styles.card_manage}>
                      <CardContent style={{ padding: '16px 16px 10px 16px' }}>
                        <Typography variant="h5" component={'div'} sx={{ color: '#000', fontWeight: 700, display: 'flex', gap: '3px', alignItems: 'center' }}>
                          <Image width={24} src={IconManage1} alt='icon' /> Project
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '16px', lineHeight: '24px', margin: '6px' }}>
                          Ensure the efficient and effective attainment of project objectives.
                        </Typography>
                        <Button sx={{ textTransform: 'none' }}>
                          Learn More <Image src={IconArrowRight} style={{ marginLeft: '8px' }} alt="icon" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', minWidth: 275, maxWidth: { xs: '100%', sm: 384 } }} className={styles.card_manage}>
                      <CardContent style={{ padding: '16px 16px 10px 16px' }}>
                        <Typography variant="h5" component={'div'} sx={{ color: '#000', fontWeight: 700, display: 'flex', gap: '3px', alignItems: 'center' }}>
                          <Image width={24} src={IconManage2} alt='icon' /> Task Management
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '16px', lineHeight: '24px', margin: '6px' }}>
                          Elevate the organization, monitoring, and performance levels throughout the course of work and project execution
                        </Typography>
                        <Button sx={{ textTransform: 'none' }}>
                          Learn More <Image src={IconArrowRight} style={{ marginLeft: '8px' }} alt="icon" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', minWidth: 275, maxWidth: { xs: '100%', sm: 384 } }} className={styles.card_manage}>
                      <CardContent style={{ padding: '16px 16px 10px 16px' }}>
                        <Typography variant="h5" component={'div'} sx={{ color: '#000', fontWeight: 700, display: 'flex', gap: '3px', alignItems: 'center' }}>
                          <Image width={24} src={IconManage3} alt='icon' /> Time Tracking
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '16px', lineHeight: '24px', margin: '6px' }}>
                          Optimize your time management for insightful and effective results.
                        </Typography>
                        <Button sx={{ textTransform: 'none' }}>
                          Learn More <Image src={IconArrowRight} style={{ marginLeft: '8px' }} alt="icon" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', minWidth: 275, maxWidth: { xs: '100%', sm: 384 } }} className={styles.card_manage}>
                      <CardContent style={{ padding: '16px 16px 10px 16px' }}>
                        <Typography variant="h5" component={'div'} sx={{ color: '#000', fontWeight: 700, display: 'flex', gap: '3px', alignItems: 'center' }}>
                          <Image width={24} src={IconManage4} alt='icon' /> Docs
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '16px', lineHeight: '24px', margin: '6px' }}>
                          Generate and store documents in various formats based on all your needs and preferences
                        </Typography>
                        <Button sx={{ textTransform: 'none' }}>
                          Learn More <Image src={IconArrowRight} style={{ marginLeft: '8px' }} alt="icon" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', minWidth: 275, maxWidth: { xs: '100%', sm: 384 } }} className={styles.card_manage}>
                      <CardContent style={{ padding: '16px 16px 10px 16px' }}>
                        <Typography variant="h5" component={'div'} sx={{ color: '#000', fontWeight: 700, display: 'flex', gap: '3px', alignItems: 'center' }}>
                          <Image width={24} src={IconManage5} alt='icon' /> Chat
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '16px', lineHeight: '24px', margin: '6px' }}>
                          Deliver real-time communication, ensure timely notifications through the latest data security
                        </Typography>
                        <Button sx={{ textTransform: 'none' }}>
                          Learn More <Image src={IconArrowRight} style={{ marginLeft: '8px' }} alt="icon" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', minWidth: 275, maxWidth: { xs: '100%', sm: 384 } }} className={styles.card_manage}>
                      <CardContent style={{ padding: '16px 16px 10px 16px' }}>
                        <Typography variant="h5" component={'div'} sx={{ color: '#000', fontWeight: 700, display: 'flex', gap: '3px', alignItems: 'center' }}>
                          <Image width={24} src={IconManage6} alt='icon' /> Resource Planning
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '16px', lineHeight: '24px', margin: '6px' }}>
                          Ensure the success of the project or task through organizing and executing
                        </Typography>
                        <Button sx={{ textTransform: 'none' }}>
                          Learn More <Image src={IconArrowRight} style={{ marginLeft: '8px' }} alt="icon" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

            </Box>
          </Stack>
        </Stack>

        <Stack sx={{ p: { xs: 1, sm: 3 } }} className={`${styles.section_5}`}>
          <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ paddingTop: 10, paddingBottom: 3, fontSize: { xs: '24px', sm: '40px' }, fontWeight: 500, lineHeight: '48px', color: '#000' }}>
              Explore how we Cover your Tasks
            </Typography>
            <Stack className={styles.divider} />
            <SectionExplore />
          </Stack>
        </Stack>

        <Stack sx={{ p: { xs: 1, sm: 3 } }} className={`${styles.section_6}`}>
          <Stack sx={{ alignItems: 'center', justifyContent: 'center', paddingBottom: {xs: '32px', sm: '64px'} }}>
            <Box sx={{ maxWidth: '638px', textAlign: 'center' }}>
              <Typography gutterBottom sx={{ color: '#0575E6', paddingTop: 6, fontSize: { xs: '24px', sm: '40px' }, fontWeight: 500, lineHeight: '48px' }}>
                TaskCover - A platform to empower your agency success
              </Typography>
              <Typography sx={{ marginBottom: 5, fontSize: '16px', lineHeight: '32px' }} variant='subtitle1' gutterBottom>
                We commit to deliver real results for agencies
              </Typography>
            </Box>
            <Stack className={styles.divider} />
            <Button variant='contained' className={`${styles.cs_button_contained}`} sx={{ marginTop: 5, marginBottom: { xs: 5, sm: 10 }, width: 169 }}>
              Learn More About Us
            </Button>

            <Box sx={{textAlign: 'center', margin: "auto", width: '100%', maxWidth: '1200px' }}>
              {isSmallScreen
                ?
                <Image style={{ maxWidth: '400px' }} layout='responsive' src={ImageAboutusMobile} alt='example' />
                :
                <Image layout='responsive' src={ImageAboutus} alt='example' />
              }
            </Box>
          </Stack>
        </Stack>

      </Stack>
    </Stack>
  );
}