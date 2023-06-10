import { FunctionComponent, useEffect } from "react";
import { ModalHeaderAtom } from "../../../atoms/ModalAtom/ModalHeaderAtom";
import { ModalBodyAtom } from "../../../atoms/ModalAtom/ModalBodyAtom";
import { InputAtom } from "../../../atoms/InputAtom";
import styles from "./styles.module.css";
import { InputSelectMuiAtom } from "../../../atoms/InputAtom/InputSelectMuiAtom";
import { useCreateProject } from "./useCreateProject";
import { Box, Button, Grid } from "@mui/material";
import { useModalLv2ContextMolecule } from "../../../molecules/ModalContextMolecule";
import { InputSelectMultiMuiAtom } from "../../../atoms/InputAtom/InputSelectMultiMuiAtom";
import { SelectPartnerModal } from "./SelectPartnerModal";
import { InputDatePickerAtom } from "../../../atoms/InputAtom/InputDatePickerAtom";
import { UploadImgMolecule } from "../../../molecules/UploadImgMolecule";
import { InputTextAreaAtom } from "../../../atoms/InputAtom/InputTextAreaAtom";
import clsx from "clsx";
import { ErrorTextAtom } from "../../../atoms/ErrorTextAtom";
import { ProjectGet } from "../../../../utils/model";

export type Props = {
  handleClose: () => void;
  projectUpdate?: ProjectGet["responseBody"]["data"][0];
};

export const CreateProjectTemplate = (props: Props) => {
  const [value, handle] = useCreateProject(props);
  const { openModalLv2 } = useModalLv2ContextMolecule();

  return (
    <>
      <ModalHeaderAtom label="Thêm mới dự án" handleClose={props.handleClose} />
      <ModalBodyAtom>
        <form onSubmit={handle.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <InputAtom
                label="Tên dự án"
                className={styles["input"]}
                isError={!!handle.getErrorMessage("name")}
                defaultValue={value.projectUpdate?.name}
                {...handle.register("name")}
              />
              {handle.getErrorMessage("name") && (
                <ErrorTextAtom error={handle.getErrorMessage("name")!} />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputSelectMuiAtom
                label="Người phụ trách"
                options={value.picOptions}
                className={styles["input"]}
                value={value.projectUpdate?.owner.id}
                onChange={handle.handleOwnerChange}
                isError={!!handle.getErrorMessage("owner")}
              />
              {handle.getErrorMessage("owner") && (
                <ErrorTextAtom error={handle.getErrorMessage("owner")!} />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputSelectMuiAtom
                className={styles["input"]}
                label="Loại dự án"
                options={value.projectTypes}
                value={value.projectUpdate?.type_project.id}
                onChange={handle.handleTypeProjectChange}
                isError={!!handle.getErrorMessage("type_project")}
              />
              {handle.getErrorMessage("type_project") && (
                <ErrorTextAtom
                  error={handle.getErrorMessage("type_project")!}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <InputSelectMultiMuiAtom
                className={styles["input"]}
                label="Danh sách thành viên"
                options={value.picOptions}
                isError={!!handle.getErrorMessage("members")}
                values={
                  value.listPartnerValue &&
                  value.listPartnerValue.map((r) => r.userId)
                }
                openDialog={() => {
                  openModalLv2(
                    <SelectPartnerModal
                      users={value.users}
                      positions={value.positions}
                      handleUpdateListPartner={handle.setListParterValue}
                      oldSelected={value.listPartnerValue}
                    />,
                    652
                  );
                }}
              />
              {handle.getErrorMessage("members") && (
                <ErrorTextAtom error={handle.getErrorMessage("members")!} />
              )}
            </Grid>
            <Grid item xs={6}>
              <InputDatePickerAtom
                className={styles["input"]}
                label="Ngày bắt đầu"
                value={value.projectUpdate?.start_date}
                onChange={handle.handleStartDateChange}
                isError={!!handle.getErrorMessage("start_date")}
              />
              {handle.getErrorMessage("start_date") && (
                <ErrorTextAtom error={handle.getErrorMessage("start_date")!} />
              )}
            </Grid>
            <Grid item xs={6}>
              <InputDatePickerAtom
                className={styles["input"]}
                label="Ngày kết thúc"
                value={value.projectUpdate?.end_date}
                onChange={handle.handleEndDateChange}
                isError={!!handle.getErrorMessage("end_date")}
              />
              {handle.getErrorMessage("end_date") && (
                <ErrorTextAtom error={handle.getErrorMessage("end_date")!} />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputAtom
                className={styles["input"]}
                label="Chi phí dự kiến"
                defaultValue={value.projectUpdate?.expected_cost}
                {...handle.register("expected_cost")}
                isError={!!handle.getErrorMessage("expected_cost")}
              />
              {handle.getErrorMessage("expected_cost") && (
                <ErrorTextAtom
                  error={handle.getErrorMessage("expected_cost")!}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputAtom
                className={styles["input"]}
                label="Số giờ làm việc dự kiến"
                type="number"
                defaultValue={value.projectUpdate?.working_hours}
                {...handle.register("working_hours")}
                isError={!!handle.getErrorMessage("working_hours")}
              />
              {handle.getErrorMessage("working_hours") && (
                <ErrorTextAtom
                  error={handle.getErrorMessage("working_hours")!}
                />
              )}
            </Grid>
            <Grid item xs={6} sx={{ display: { xs: "none", sm: "flex" } }}>
              <UploadImgMolecule
                placeholderImgSrc="/images/unknown_image.png"
                label="Logo dự án"
                className={styles["logo"]}
              />
            </Grid>
            <Grid item xs={6} sx={{ display: { xs: "none", sm: "flex" } }}>
              <InputTextAreaAtom
                className={clsx(styles["input"], styles["description"])}
                label="Mô tả dự án"
                value={value.projectUpdate?.description}
                onChange={(val) => {
                  handle.handleDescriptionChange(val);
                }}
                isError={!!handle.getErrorMessage("description")}
              />
              {handle.getErrorMessage("description") && (
                <ErrorTextAtom error={handle.getErrorMessage("description")!} />
              )}
            </Grid>
            {/* Responsive */}
            <Grid
              item
              xs={12}
              sx={{
                display: { xs: "flex", sm: "none" },
                flexDirection: "column",
              }}
            >
              <InputTextAreaAtom
                className={clsx(styles["input"], styles["description"])}
                label="Mô tả dự án"
                value={value.projectUpdate?.description}
                onChange={(val) => {
                  handle.handleDescriptionChange(val);
                }}
                isError={!!handle.getErrorMessage("description")}
              />
              {handle.getErrorMessage("description") && (
                <ErrorTextAtom error={handle.getErrorMessage("description")!} />
              )}
            </Grid>
            <Grid item xs={12} sx={{ display: { xs: "flex", sm: "none" } }}>
              <UploadImgMolecule
                placeholderImgSrc="/images/unknown_image.png"
                label="Logo dự án"
                className={styles["logo"]}
              />
            </Grid>
            {/*  */}
            <Grid item xs={6} justifyContent={"flex-end"}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  sx={{
                    fontSize: "1.4rem",
                    width: "150px",
                    height: "40px",
                    fontWeight: "600",
                    mr: 1,
                    mt: "5px",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    props.handleClose();
                  }}
                >
                  Hủy
                </Button>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    fontSize: "1.4rem",
                    width: "150px",
                    height: "40px",
                    fontWeight: "600",
                    ml: 1,
                    mt: "5px",
                    textTransform: "none",
                  }}
                >
                  {value.projectUpdate ? "Lưu chỉnh sửa" : "Thêm mới"}
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </ModalBodyAtom>
    </>
  );
};
