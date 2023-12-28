import { Autocomplete, SxProps, MenuItem, Stack, Chip, Popover, MenuList, popoverClasses } from "@mui/material";
import { Search } from "components/Filters";
import { Checkbox, IconButton, Input, Text } from "components/shared";
import { NS_COMMON } from "constant/index";
import useTheme from "hooks/useTheme";
import ArrowDownIcon from "icons/ArrowDownIcon";
import ChevronIcon from "icons/ChevronIcon";
import CircleCloseIcon from "icons/CircleCloseIcon";
import { useTranslations } from "next-intl";
import React, { useId, useMemo, useState ,MouseEvent, useEffect, memo} from "react";
import { CategoryBlogData } from "store/blog-category/reducer";
import { useCategoryBlog } from "store/blog-category/selectors";

type SelectCategoriesProps = {
  value?: string[];
  name: string;
  onChange: (name: string, data: string[]) => void;
  ignoreId?: string;
};

const SelectCategories: React.FC<SelectCategoriesProps> = (props) => {
  const { name, value: members = [], onChange, ignoreId } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const popoverId = useId();
  const {
    items,
    onGetOptions: onGetCategoryOptions,
    filters,
  } = useCategoryBlog();
  const commonT = useTranslations(NS_COMMON);
  const { isDarkMode } = useTheme();

  const ignoreItems = useMemo(() => {
    if (!ignoreId) return items;
    return items.filter((item) => item.id !== ignoreId);
  }, [ignoreId, items]);

  const onClose = () => {
    setAnchorEl(null);
  };

  const onOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    onGetCategoryOptions({ pageIndex: 1, pageSize: 20 });
  };

  const onRemoveMember = (id: string) => {
    const newData = members.filter((item) => item !== id);
    onChange(name, newData);
  };

  const onChangeMembers = (id: string, fullname: string) => {
    const indexSelected = members.findIndex((item) => item === id);

    const newData = [...members];
    if (indexSelected === -1) {
      newData.push(id);
    } else {
      newData.splice(indexSelected, 1);
    }
    onChange(name, newData);
  };

  const onChangeSearch = (name: string, newValue?: string | number) => {
    onGetCategoryOptions({ pageIndex: 1, pageSize: 20, [name]: newValue });
  };

  useEffect(() => {
    onGetCategoryOptions({ pageIndex: 1, pageSize: 200000 });
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
        sx={{ cursor: 'pointer' }}
      >
        <Stack flex={1} spacing={0.5}>
          <Stack
            direction="row"
            rowGap={1.5}
            columnGap={1.5}
            flex={1}
            flexWrap="wrap"
          >
            {ignoreItems
              .filter((item) => members.includes(item.id as string))
              .map((member) => (
                <DisplayItem key={member.id} {...member} onRemove={onRemoveMember} />
              ))}
          </Stack>
        </Stack>

        <ChevronIcon
          sx={{ color: 'grey.400', fontSize: 16, alignSelf: 'center' }}
        />
      </Stack>
      <Popover
        id={popoverId}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          [`& .${popoverClasses.paper}`]: {
            backgroundImage: 'none',
            width: anchorEl?.offsetWidth ?? 200,
            maxHeight: 350,
            boxShadow: '2px 2px 24px rgba(0, 0, 0, 0.1)',
            border: '1px solid',
            borderColor: 'grey.100',
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
            value={filters.searchKey}
            placeholder={commonT('searchBy', { name: 'searchKey' })}
            onChange={onChangeSearch}
            emitWhenEnter
          />
          <MenuList component={Stack} spacing={2}>
            {ignoreItems.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                onClick={() => onChangeMembers(item.id as string, item.name as string)}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Checkbox
                  checked={members.some((member) => item.id === member)}
                />
                <Stack direction={{ sm: 'row' }} spacing={1.5} flex={1}>
                  <Stack>
                    <Text variant="h6">{item.name}</Text>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </MenuList>
        </Stack>
      </Popover>
    </>
  );
};

const DisplayItem: React.FC<CategoryBlogData & { onRemove: (id: string) => void }> = (
  props
) => {
  const { name, id, onRemove } = props;
  const onRemoveMember = (event: React.MouseEvent) => {
    event.stopPropagation();
    onRemove(id as string);
  };
  const { isDarkMode,palette } = useTheme();

  return (
    <Stack
      direction="row"
      borderRadius={5}
      bgcolor={isDarkMode ? 'background.default' : 'primary.light'}
      spacing={1}
      display="inline-flex"
      width="fit-content"
      height={25}
    >
     
      <Chip
          label={name}
          key={id}
          size="small"
          sx={{
            color: "black",
            mt: 2,
            backgroundColor: palette?.primary.light,
          }}
        />
      <IconButton noPadding onClick={onRemoveMember}>
        <CircleCloseIcon sx={{ color: 'grey.400' }} />
      </IconButton>
    </Stack>
  );
};

export default React.memo(SelectCategories);
