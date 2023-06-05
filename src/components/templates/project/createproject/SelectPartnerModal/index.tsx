import { Checkbox } from "@mui/material";
import { UsersGet } from "../../../../../utils/model";
import {
  InputSelectMuiAtom,
  Props as OptionsProps,
} from "../../../../atoms/InputAtom/InputSelectMuiAtom";
import { ModalHeaderAtom } from "../../../../atoms/ModalAtom/ModalHeaderAtom";
import styles from "./styles.module.css";
import { ImageAtom } from "../../../../atoms/ImageAtom";
import { useEffect, useState } from "react";

export type Props = {
  users: UsersGet["responseBody"]["data"];
  positions: OptionsProps["options"];
  handleUpdateListPartner: (
    value?: { userId: string; positionId: string }[]
  ) => void;
  oldSelected?: { userId: string; positionId: string }[];
};

export type DataSelect = {
  selected: boolean;
  userId: string;
  positionId?: string;
}[];

export const SelectPartnerModal = (props: Props) => {
  const { users, positions, handleUpdateListPartner, oldSelected } = props;
  const [data, setData] = useState<DataSelect>([]);

  useEffect(() => {
    if (!props.positions || props.positions.length <= 0) {
      return;
    }
    console.log(oldSelected);
    setData(
      users.map((user) => {
        return {
          userId: user.id,
          selected: !!(
            oldSelected &&
            oldSelected.filter((old) => old.userId === user.id).length > 0
          ),
          positionId:
            (oldSelected &&
              oldSelected.filter((old) => old.userId === user.id)[0]
                ?.positionId) ||
            positions[0].value,
        };
      })
    );
  }, [users, positions, oldSelected]);

  useEffect(() => {
    if (!data || data.length <= 0) {
      return;
    }
    const listSelectedPartner = data
      .filter((r) => r.selected)
      .map((r) => {
        return { userId: r.userId, positionId: r.positionId! };
      });
    handleUpdateListPartner(
      listSelectedPartner && listSelectedPartner.length > 0
        ? listSelectedPartner
        : undefined
    );
  }, [data]);

  const handleCheck = (userId: string) => {
    let newData = [...data];
    const targetChange = newData.map((r) => {
      if (r.userId === userId) {
        return {
          selected: !r.selected,
          userId: r.userId,
          positionId: r.positionId,
        };
      }
      return r;
    });
    setData(targetChange);
  };

  const handleChangePosition = (userId: string, positionId: string) => {
    let newData = [...data];
    const targetChange = newData.map((r) => {
      if (r.userId === userId) {
        return {
          selected: r.selected,
          userId: r.userId,
          positionId: positionId,
        };
      }
      return r;
    });
    setData(targetChange);
  };

  const getDataFromUserId = (userId: string) => {
    return data.filter((d) => d.userId === userId)[0];
  };

  return (
    <div className={styles["selectpartner"]}>
      <table>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((user, index) => (
              <tr className={styles["row"]} key={index}>
                <td className={styles["column1"]}>
                  <Checkbox
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 24 },
                      color: "#999999",
                      "&.Mui-checked": {
                        color: "#1BC5BD",
                      },
                    }}
                    checked={!!getDataFromUserId(user.id)?.selected}
                    onClick={() => handleCheck(user.id)}
                  />
                </td>
                <td className={styles["column2"]}>
                  <div className={styles["column2__user"]}>
                    <ImageAtom src="/images/unknown_avatar.png" />
                    <div>
                      <h6>{user.fullname}</h6>
                      <div>{user.email}</div>
                    </div>
                  </div>
                  <InputSelectMuiAtom
                    label="Vị trí"
                    options={positions}
                    className={styles["positioninput"]}
                    value={getDataFromUserId(user.id)?.positionId}
                    onChange={(value: string) =>
                      handleChangePosition(user.id, value)
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
