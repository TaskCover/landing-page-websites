import { Button, Checkbox } from "@mui/material";
import { ModalBodyAtom } from "../../../../atoms/ModalAtom/ModalBodyAtom";
import { ModalHeaderAtom } from "../../../../atoms/ModalAtom/ModalHeaderAtom";
import styles from "./styles.module.css";
import { useUpdateStatusProjectComponent } from "./useUpdateStatusProjectComponent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
export type Props = {
  currentStatus: string;
  closeModal: () => void;
  projectId: string;
};

export const UpdateStatusProjectComponent = (props: Props) => {
  const [values, handlers] = useUpdateStatusProjectComponent(props);

  return (
    <>
      <ModalHeaderAtom
        label="Thay đổi trạng thái dự án"
        handleClose={props.closeModal}
        className={styles["title"]}
      />
      <ModalBodyAtom>
        <div className={styles["status__container"]}>
          {values.options &&
            values.options.map((option, index) => (
              <div key={index} className={styles["status__option"]}>
                <Checkbox
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 24 },
                    color: "#999999",
                    "&.Mui-checked": {
                      color: "#1BC5BD",
                    },
                  }}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  checked={handlers.isCheckedDefault(option.value)}
                  onChange={(_, checked) => {
                    checked && handlers.setSelected(option.value);
                  }}
                />
                <div>{option.label}</div>
              </div>
            ))}
        </div>
        <div className={styles["status__button"]}>
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
              props.closeModal();
            }}
          >
            Hủy
          </Button>
          <Button
            type="button"
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
            onClick={() => handlers.handleChangeStatus()}
          >
            {"Xác nhận"}
          </Button>
        </div>
      </ModalBodyAtom>
    </>
  );
};
