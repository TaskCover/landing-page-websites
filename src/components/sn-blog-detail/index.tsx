"use client"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, StackProps, Typography }
    from '@mui/material';
import { Text } from 'components/shared';
import CommentEditor from 'components/sn-blog-detail/components/CommentEditor';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';
import Comments from './components/Comments';
import { DATE_TIME_FORMAT_SLASH, NS_BLOG } from 'constant/index';
import { useBlogs } from 'store/blog/selectors';
import { useParams } from 'next/navigation';
import { memo, useEffect, useMemo } from 'react';
import StatusServer from 'components/StatusServer';
import { formatDate } from 'utils/index';
import React from 'react';
import Avatar from "components/Avatar";
import { AttachmentsBlogs } from 'store/blog/actions';
import Media from 'components/Media';
import FixedLayout from 'components/FixedLayout';

const BlogDetailSection = () => {
    const blogT = useTranslations(NS_BLOG);
    const { id } = useParams();
    const {
        item: detailItem,
        error: detailItemError,
        isFetching: detailItemIsFetching,
        relatedBlogs,
        onGetRelatedBlogs,
        onGetBlogBySlug
    } = useBlogs();

    useEffect(() => {
        onGetBlogBySlug(id as string);
        onGetRelatedBlogs(id as string);
    }, [id]);

    return (
        <>
            <StatusServer isFetching={detailItemIsFetching} error={detailItemError} noData={!detailItem}>
                <FixedLayout flex={1}>
                    <Stack width="100%"
                        flex={1}
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
                                <Grid item xs={12} sm={8} padding={6}>
                                    <Paper
                                        sx={{
                                            maxHeight: 250,
                                            minHeight: 200,
                                            position: 'relative',
                                            backgroundColor: 'grey.800',
                                            color: '#fff',
                                            mb: 4,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            backgroundImage: `url(${detailItem?.background_down?.link})`,
                                        }}>
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
                                                <Stack
                                                    sx={{
                                                        position: 'relative',
                                                        p: { xs: 3, md: 6 },
                                                        pr: { md: 0 },
                                                    }}>
                                                    {/* <Typography component="h1" variant="h3" color="inherit" gutterBottom alignItems={'end'}>
                                                    {detailItem?.title}
                                                </Typography> */}
                                                </Stack>

                                            </Grid>
                                        </Grid>

                                    </Paper>
                                    <Grid container spacing={5} >
                                        <Grid item xs={12} md={12} sx={{ '& .markdown': { py: 3, }, }}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Avatar src={detailItem?.created_by?.avatar?.link} size={40} alt='' />
                                                <Stack>
                                                    <Text variant="h4">{detailItem?.title}</Text>
                                                    <Text color="GrayText" fontSize={12}>
                                                        {formatDate(detailItem?.created_time, DATE_TIME_FORMAT_SLASH)}
                                                    </Text>
                                                </Stack>
                                            </Stack>
                                            <Stack marginTop={5}>
                                                {renderContentWithAttachments(detailItem?.content as string, detailItem?.attachments_down as AttachmentsBlogs[])}
                                            </Stack>
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid item xs={12} sm={4}>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {relatedBlogs.map((blog, index) => (
                                            <React.Fragment key={blog.id}>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemText
                                                        primary={blog.title}
                                                        secondary={
                                                            <Text color="GrayText" fontSize={12}>
                                                                - {formatDate(blog.created_time, DATE_TIME_FORMAT_SLASH)}
                                                            </Text>
                                                        }
                                                    />
                                                </ListItem>
                                                {index < relatedBlogs.length - 1 && (
                                                    <Divider component="li" />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                </FixedLayout>
            </StatusServer>
        </>
    )
};

const AttachmentComponent: React.FC<{ attachment: AttachmentsBlogs }> = ({ attachment }) => {
    return (
        <div className="attachment">
            <Media src={attachment.link} size={100} />
        </div>
    );
};

const renderContentWithAttachments = (content: string, attachments: AttachmentsBlogs[]) => {
    if (typeof content !== 'string') {
        return null;
    }

    const attachmentPlaceholders = content.split(/V&agrave;|\n/).filter((item) => item.trim() !== '');

    // If there's only one attachment placeholder, display all attachments
    if (attachmentPlaceholders.length === 1) {
        return (
            <div className="blog-post">
                <div className="content" dangerouslySetInnerHTML={{ __html: attachmentPlaceholders[0] }} />
                <div className="attachments">
                    {attachments.map((attachment, index) => (
                        <AttachmentComponent key={index} attachment={attachment} />
                    ))}
                </div>
            </div>
        );
    }

    // If attachmentPlaceholders is larger than attachments, display attachments in between
    if (attachmentPlaceholders.length > attachments.length) {
        return (
            <div className="blog-post">
                {attachmentPlaceholders.map((placeholder, index) => (
                    <React.Fragment key={index}>
                        <div className="content" dangerouslySetInnerHTML={{ __html: placeholder }} />
                        {index < attachmentPlaceholders.length - 1 && attachments[index] && (
                            <AttachmentComponent attachment={attachments[index]} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    }

    return (
        <div className="blog-post">
            {attachmentPlaceholders.slice(0, attachments.length - 1).map((placeholder, index) => (
                <React.Fragment key={index}>
                    <div className="content" dangerouslySetInnerHTML={{ __html: placeholder }} />
                    {attachments[index] && (
                        <AttachmentComponent attachment={attachments[index]} />
                    )}
                </React.Fragment>
            ))}
            <div className="attachments">
                {attachments.slice(attachmentPlaceholders.length - attachments.length + 1).map((attachment, index) => (
                    <AttachmentComponent key={index} attachment={attachment} />
                ))}
            </div>
        </div>
    );
};


export default memo(BlogDetailSection);
