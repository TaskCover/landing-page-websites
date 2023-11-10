"use client"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Paper, Stack, Typography }
    from '@mui/material';
import { Text } from 'components/shared';
import CommentEditor from 'components/sn-blog-detail/components/CommentEditor';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';
import Comments from './components/Comments';
import { NS_BLOG } from 'constant/index';
import { useBlogs } from 'store/blog/selectors';
import { useParams } from 'next/navigation';
import { useHeaderConfig } from 'store/app/selectors';
import { useMemo } from 'react';
import StatusServer from 'components/StatusServer';
const classes = {
    root: {
        flexGrow: 1
    },
    paper: {
        padding: 20,
        textAlign: "center",
        color: "blue",
        fontFamily: "Roboto"
    }
};
const BlogDetailSection = () => {
    const blogT = useTranslations(NS_BLOG);
    const { id } = useParams();
    const { item,onGetBlogBySlug } = useBlogs();
 
    onGetBlogBySlug(id as string);
    // const {
    //     item: detailItem,
    //     error: detailItemError,
    //     isFetching: detailItemIsFetching,
    // } = useBlogs();


    // let item, error, isFetching;

    // if (id) {
    //     item = detailItem;
    //     error = detailItemError;
    //     isFetching = detailItemIsFetching;
    // }


    return (
        <>
            {/* <StatusServer isFetching={isFetching} error={error} noData={!item}> */}
                <Stack width="100%"
                    flex={1}
                    overflow="hidden"
                    bgcolor={{ md: "background.default" }}>
                    <Stack
                        maxWidth={1360}
                        mx="auto"
                        width="100%"
                        bgcolor={{ md: "background.paper" }}
                        overflow="hidden"
                        padding={3}
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8} borderRight={1} padding={5}>
                                <Paper
                                    sx={{
                                        maxHeight: 300,
                                        minHeight: 250,
                                        position: 'relative',
                                        backgroundColor: 'grey.800',
                                        color: '#fff',
                                        mb: 4,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        backgroundImage: `url("https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg")`,
                                    }}
                                >
                                    {<img style={{ display: 'none' }} src="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg" alt="ten anh" />}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            bottom: 0,
                                            right: 0,
                                            left: 0,
                                            backgroundColor: 'rgba(0,0,0,.3)',
                                        }}
                                    />
                                    <Grid container>
                                        <Grid item md={7}>
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    p: { xs: 3, md: 6 },
                                                    pr: { md: 0 },
                                                }}
                                            >
                                                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                                    title
                                                </Typography>
                                                <Typography variant="h5" color="inherit" paragraph>
                                                    ngay tao
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Grid container spacing={5} sx={{ mt: 3 }}>
                                    <Grid item xs={12} md={8} sx={{ '& .markdown': { py: 3, }, }}>
                                        <Typography variant="h6" gutterBottom>
                                            Ten bài
                                        </Typography>
                                        <Divider />
                                        {/* {posts.map((post) => (
        <Markdown className="markdown" key={post.substring(0, 40)}>
          {post}
        </Markdown>
      ))} */}
                                    </Grid>
                                </Grid>
                                <Stack direction={'row'} spacing={1}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            height="140"
                                            image="https://unsplash.com/fr/photos/femme-avec-appareil-photo-reflex-numerique-e616t35Vbeg"
                                            src='https://unsplash.com/fr/photos/femme-avec-appareil-photo-reflex-numerique-e616t35Vbeg'
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Share</Button>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            height="140"
                                            image="https://unsplash.com/fr/photos/femme-avec-appareil-photo-reflex-numerique-e616t35Vbeg"
                                            src='https://unsplash.com/fr/photos/femme-avec-appareil-photo-reflex-numerique-e616t35Vbeg'
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Share</Button>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            height="140"
                                            image="https://unsplash.com/fr/photos/femme-avec-appareil-photo-reflex-numerique-e616t35Vbeg"
                                            src='https://unsplash.com/fr/photos/femme-avec-appareil-photo-reflex-numerique-e616t35Vbeg'
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Share</Button>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Stack>
                                    <Text color="text.main" mb={3} variant="h4" textTransform="uppercase">
                                        {blogT("detail.comment.title")}
                                    </Text>
                                    {/* <CommentEditor />
                                <Comments /> */}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
            {/* </StatusServer> */}
        </>
    )
};

export default BlogDetailSection;
