import useTanStackQuery from "@/hooks/useTanStackQuery.ts";
import { getOrders } from "@/services/orders";
import {
  ColumnDirective,
  ColumnsDirective,
  DetailRow,
  GridComponent,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { Box, Button } from "@mui/material";
const OrdersList = () => {
  const {
    data: orders,
    page,
    increasePage,
    decreasePage,
  } = useTanStackQuery({ queryKeyPrefix: "orders", fetchFn: getOrders });

  const detailTemplate = (props: {
    items: {
      id: number;
      product_title: string;
      variant_title: string;
      price: string;
    }[];
  }) => {
    return (
      <GridComponent dataSource={props.items} cssClass="syncfusion-grid">
        <ColumnsDirective>
          <ColumnDirective
            field="product_title"
            headerText="المنتج"
            textAlign="Center"
          />
          <ColumnDirective
            field="variant_title"
            headerText="الباقة"
            textAlign="Center"
          />
          <ColumnDirective
            field="price"
            headerText="السعر"
            textAlign="Center"
          />
        </ColumnsDirective>
      </GridComponent>
    );
  };

  return (
    <>
      <GridComponent
        dataSource={orders?.results || []}
        enableRtl={true}
        cssClass="syncfusion-grid"
        detailTemplate={detailTemplate}
      >
        <ColumnsDirective>
          <ColumnDirective field="id" headerText="رقم الطلب" />
          <ColumnDirective
            field="created_at"
            headerText="تاريخ الطلب"
            format="dd/MM/yyyy"
            type="date"
          />
          <ColumnDirective field="status" headerText="الحالة" />
          <ColumnDirective
            field="full_name"
            headerText="العميل"
            template={(props: { full_name: string }) =>
              props.full_name ? props.full_name : "لا توجد بيانات"
            }
          />
          <ColumnDirective
            field="total_discount"
            headerText="الخصم"
            template={(props: {
              total_discount: number;
              total_price: number;
            }) =>
              props.total_discount && props.total_price
                ? `${((props.total_discount / props.total_price) * 100).toFixed(
                    2
                  )}%`
                : "لا توجد بيانات"
            }
          />
          <ColumnDirective
            field="total_price"
            headerText="المجموع"
            template={(props: { total_price: string }) =>
              props.total_price ? `${props.total_price} درهم` : "لا توجد بيانات"
            }
          />
        </ColumnsDirective>
        <Inject services={[DetailRow]} />
      </GridComponent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          padding: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            decreasePage();
          }}
          disabled={!orders?.previous}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.76906 11.8159C5.53939 11.577 5.54683 11.1972 5.7857 10.9675L8.9359 8L5.7857 5.0325C5.54683 4.80282 5.53939 4.423 5.76906 4.18413C5.99874 3.94527 6.37857 3.93782 6.61743 4.1675L10.2174 7.5675C10.3351 7.68062 10.4016 7.83679 10.4016 8C10.4016 8.16321 10.3351 8.31938 10.2174 8.4325L6.61743 11.8325C6.37857 12.0622 5.99874 12.0547 5.76906 11.8159Z"
              fill="currentColor"
            />
          </svg>
        </Button>
        {page}
        <Button
          variant="outlined"
          onClick={() => {
            increasePage();
          }}
          disabled={!orders?.next}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.2309 4.18414C10.4606 4.423 10.4532 4.80282 10.2143 5.0325L7.0641 8L10.2143 10.9675C10.4532 11.1972 10.4606 11.577 10.2309 11.8159C10.0013 12.0547 9.62143 12.0622 9.38257 11.8325L5.78257 8.4325C5.66492 8.31938 5.59844 8.16321 5.59844 8C5.59844 7.83679 5.66492 7.68062 5.78257 7.5675L9.38257 4.1675C9.62143 3.93782 10.0013 3.94527 10.2309 4.18414Z"
              fill="currentColor"
            />
          </svg>
        </Button>
      </Box>
    </>
  );
};

export default OrdersList;
