
import { Endpoint, client } from 'api';
import { NS_SALES, SALE_API_URL } from 'constant/index';
import FileSaver from 'file-saver';
import { useTranslations } from 'next-intl';
import React from 'react'

const useExportDeal = () => {
    const salesT = useTranslations(NS_SALES);
    const [isFetching, setIsFetching] = React.useState(false);
    const exportDeal = async () => {
        setIsFetching(true);
      await client
        .get(
          Endpoint.SALES_DEAL_EXPORT,
          {},
          { responseType: "arraybuffer", baseURL: SALE_API_URL },
        )
        .then((response) => {
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
            setIsFetching(false);
          FileSaver.saveAs(blob, `${salesT("list.title")}.xlsx`);
        });
    };
    return { exportDeal, isFetching }
}

export default useExportDeal