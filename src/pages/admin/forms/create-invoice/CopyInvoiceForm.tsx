// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAppDispatch,  } from "@/store/hooks";

// import { Heading } from "@/components";
// import {
//   TCreateInvoiceFormDataForGet,
//   // TCreateInvoiceSchemaFormDataForServer,
// } from "@/schemas/CreateInvoiceSchema";

// import InvoiceForm from "./InvoiceForm";
// import { actGetData } from "@/store/single-actions";

// // ------------------------------------------------------------------------

// const CopyInvoiceForm = () => {
//   const dispatch = useAppDispatch();

//   const { id } = useParams();
//   const [currentInvoice, setCurrentInvoice] =
//     useState<TCreateInvoiceFormDataForGet | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
      
//         dispatch(actGetData({ endpoint: `customer/invoices/${id}/` }))
//         .unwrap()
//         .then((res) => {          
//           setCurrentInvoice(res)})
//         .catch((err) => console.error(err)); 
   
//       }

//     fetchData();


//   }, [dispatch, id]);

//   return (
//     <section>
//       <Heading text="انشاء فاتورة" />

//       <InvoiceForm isCopy  currentInvoice={currentInvoice} id={id} />
//     </section>
//   );
// };

// export default CopyInvoiceForm;
