import { Badge, Chip } from "@mui/material";
import { BodyCell } from "components/Table";
import { NS_BLOG } from "constant/index";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { BlogData } from "store/blog/actions";
import { BLOGS_DETAIL_PATH } from "constant/paths";
import { formatDate, getPath } from "utils/index";

type DesktopCellsProps = {
    item: BlogData;
};

const DesktopCells = (props: DesktopCellsProps) => {
    const blogT = useTranslations(NS_BLOG);
    const { item } = props;
    return (
        <>
            <BodyCell align="left" href={getPath(BLOGS_DETAIL_PATH, undefined, { id: item.slug as string })} linkProps={{
                sx: { color: "text.primary" },
                tooltip: blogT("clickGoDetail", {
                    name: blogT("companyList.company"),
                }),
            }}>{item.title}</BodyCell>
            <BodyCell align="left">
                {item.category?.map((cate, index) => (
                    <Chip key={index} variant="outlined" label={cate.name} size="small" />
                ))}
            </BodyCell>
            <BodyCell align="left">
                {item.tag?.map((tag, index) => (
                    <Chip key={index} variant="outlined" label={tag} size="small" />
                ))}
            </BodyCell>
            <BodyCell align="left">
            {formatDate(item?.created_time, "HH:mm - dd/MM/yyyy")}
            </BodyCell>
            <BodyCell align="left">
                {!item.published ? (
                    <Chip
                        size="small"
                        label={blogT("status.false")}
                        color="primary"
                    />
                ) : (
                    <Chip
                        size="small"
                        label={blogT("status.true")}
                        color="success"
                    />
                )}
            </BodyCell>
        </>
    );
};

export default memo(DesktopCells);
