import { MouseEvent, memo, useEffect, useId, useMemo, useState } from "react";
import { MenuList, Popover, Stack, popoverClasses } from "@mui/material";
import { IconButton, Text } from "components/shared";
import CircleCloseIcon from "icons/CircleCloseIcon";
import ChevronIcon from "icons/ChevronIcon";

import { usePositionOptions } from "store/global/selectors";
import { NS_PROJECT, NS_COMMON, NS_BLOG } from "constant/index";
import { useTranslations } from "next-intl";
import useTheme from "hooks/useTheme";
import { Search } from "components/Filters";
import CategoryItem from "./CategoryItem";
import { useCategoryBlog } from "store/blog-category/selectors";
import { CategoryBlogData } from "store/blog-category/reducer";

type SelectCategoriesProps = {
    value?: CategoryBlogData[];
    name: string;
    onChange: (name: string, data: CategoryBlogData[]) => void;
    ignoreId?: string;
};


const SelectCategories = (props: SelectCategoriesProps) => {
    const { name, value: categories = [], onChange, ignoreId } = props;
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const popoverId = useId();
    const {
        items,
        filters,
        onGetOptions: onGetCategoryOptions,
    } = useCategoryBlog();
    const blogT = useTranslations("NS_BLOG");
    const commonT = useTranslations("NS_COMMON");

    const [selectedCategories, setSelectedCategories] = useState<CategoryBlogData[]>(categories);
    useEffect(() => {
        setSelectedCategories(categories);
    }, [categories]);

    const ignoreItems = useMemo(() => {
        if (!ignoreId) return items;
        return items.filter((item) => item.id !== ignoreId);
    }, [ignoreId, items]);

    const onOpen = (event: MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
        onGetCategoryOptions({ pageIndex: 1, pageSize: 20 });
    };

    const onClose = () => {
        setAnchorEl(null);
    };

    const onChangeSearch = (name: string, newValue?: string | number) => {
        onGetCategoryOptions({ pageIndex: 1, pageSize: 20, [name]: newValue });
    };

    const onRemoveCategory = (category: CategoryBlogData) => {
        const updatedCategories = selectedCategories.filter((item) => item.id !== category.id);
        setSelectedCategories(updatedCategories);
        // Gọi hàm onChange để cập nhật giá trị trong form
        onChange(name, updatedCategories);
    };

    const onChangeCategory = (id: string | undefined, name: string | undefined) => {
        const indexSelected = selectedCategories.findIndex((item) => item.id == id);
        const updatedCategories = [...selectedCategories];

        if (indexSelected === -1) {
            const category = items.find((item) => item.id === id);
            if (category) {
                updatedCategories.push(category);
            }
        } else {
            updatedCategories.splice(indexSelected, 1);
        }

        setSelectedCategories(updatedCategories);

        if (name) {
            onChange(name, updatedCategories);
        }
    };

    useEffect(() => {
        onGetCategoryOptions({ pageIndex: 1, pageSize: 50 });
    }, [onGetCategoryOptions]);

    return (
        <>
            <Stack
                direction="row"
                py={1}
                px={2.5}
                bgcolor="grey.50"
                justifyContent="space-between"
                onClick={onOpen}
                minHeight={56}
                borderRadius={1}
                sx={{ cursor: "pointer", height: 50 }}
            >
                <Stack flex={1} spacing={0.5}>
                    <Text variant="caption" color="grey.300">
                        {blogT("blogForm.category")}
                    </Text>
                    <Stack
                        direction="row"
                        rowGap={1.5}
                        columnGap={1.5}
                        flex={1}
                        flexWrap="wrap"
                    >
                        {selectedCategories.map((member) => (
                            <DisplayItem
                                key={member.id}
                                {...member}
                                onRemove={() => onRemoveCategory(member)}
                            />
                        ))}
                    </Stack>
                </Stack>

                <ChevronIcon
                    sx={{ color: "grey.400", fontSize: 16, alignSelf: "center" }}
                />
            </Stack>
            <Popover
                id={popoverId}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={onClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{
                    [`& .${popoverClasses.paper}`]: {
                        backgroundImage: "none",
                        width: anchorEl?.offsetWidth ?? 200,
                        maxHeight: 350,
                        boxShadow: "2px 2px 24px rgba(0, 0, 0, 0.1)",
                        border: "1px solid",
                        borderColor: "grey.100",
                        borderBottomLeftRadius: 1,
                        borderBottomRightRadius: 1,
                    },
                }}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 1,
                            mt: 0.5,
                        },
                    },
                }}
            >
                <Stack p={2}>
                    <Search
                        name="searchKey"
                        value={filters?.searchKey}
                        placeholder={commonT("searchBy", { name: "searchKey" })}
                        onChange={onChangeSearch}
                        emitWhenEnter
                    />
                    <MenuList component={Stack} spacing={2}>
                        {ignoreItems.map((item) => {
                            const isChecked = selectedCategories.some((member) => item.id === member.id);
                            return (
                                <CategoryItem
                                    key={item.id}
                                    {...item}
                                    onChange={onChangeCategory}
                                    checked={isChecked}
                                />
                            );
                        })}

                    </MenuList>
                </Stack>
            </Popover>
        </>
    );
};

export default memo(SelectCategories);


const DisplayItem = (props: CategoryBlogData & {
    onRemove: (category: CategoryBlogData) => void;
}) => {
    const { name, onRemove } = props;
    const { isDarkMode } = useTheme();

    const onRemoveCategory = () => {
        onRemove(props);
    };

    return (
        <Stack
            direction="row"
            py={0.1}
            px={0.1}
            height={25}
            bgcolor={isDarkMode ? "background.default" : "primary.light"}
            display="inline-flex"
            width="fit-content"
        >
            <Text variant="body2" maxWidth={150} noWrap tooltip={name}>
                {name}
            </Text>
            <IconButton noPadding onClick={onRemoveCategory}>
                <CircleCloseIcon sx={{ color: "grey.400" }} />
            </IconButton>
        </Stack>
    );
};
