import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import actSendDataToServer from "@/store/single-actions/actSendDataToServer";
import { useFeedback } from "@/store/context";
import { actDeleteData } from "@/store/single-actions";
import { unwrapResult } from "@reduxjs/toolkit";

interface Option {
  id: string;
  label: string;
  onClick: () => void;
}

const InvoiceOptionsDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { openFeedbackModal } = useFeedback();

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleDelee = () => {
    console.log("Delete clicked");
    openFeedbackModal(
      "confirm",
      "تأكيد حذف الفاتورة",
      "هل انت متأكد أنك تريد حذف الفاتورة؟",
      100000,
      undefined,
      () => {
    dispatch(actDeleteData({ endpoint: `customer/invoices/${id}` }))
      .then(unwrapResult)
      .then(() => {
        openFeedbackModal("succeeded", "تم حذف الفاتورة بنجاح");
        navigate(`/admin/invoices-list`);
      })
      .catch((error: string) => {
        console.log("error", error);
        openFeedbackModal("failed", "حدثت مشكلة أثناء إرسال طلبك.", error);
      })
    })
  };

  const handleVoid = () => {
    console.log("void clicked");
    openFeedbackModal(
      "confirm",
      "تأكيد الغاء الفاتورة",
      "هل انت متأكد أنك تريد الغاء الفاتورة؟",
      10000,
      undefined,
      () => {
        dispatch(
          actSendDataToServer({
            formData: { status: "Void" },
            purpose: "edit_invoice_status",
            isEdit: true,
            id: id,
          })
        )
        .then(unwrapResult)
        .then(() => {
          openFeedbackModal("succeeded", "تم الغاء الفاتورة بنجاح");
          navigate(`/admin/invoices-list`);
        })
        .catch((error: string) => {
          console.log("error", error);
          openFeedbackModal("failed", "حدثت مشكلة أثناء إرسال طلبك.", error, 5000);
        })
      }
    );
  };

  const options: Option[] = [
    {
      id: "copy",
      label: "نسخ",
      onClick: () => {
        console.log("Copy clicked");
        navigate(`/admin/copy-invoice/${id}`);
      },
    },
    {
      id: "edit",
      label: "تعديل",
      onClick: () => {
        console.log("Edit clicked");
        navigate(`/admin/edit-invoice/${id}`);
      },
    },
    {
      id: "delete",
      label: "مسح",
      onClick: () => {
        handleDelee();
      },
    },
    {
      id: "void",
      label: "ملغي",
      onClick: () => {
        handleVoid();
      },
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buttonStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "120px",
    padding: "8px 12px",
    backgroundColor: "white",
    border: "1px solid #E2E8F0",
    borderRadius: "4px",
    color: "#4A5568",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    cursor: "pointer",
    direction: "rtl",
  };

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: "4px",
    width: "120px",
    backgroundColor: "white",
    borderRadius: "4px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    zIndex: 10,
  };

  const optionStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    padding: "8px 12px",
    textAlign: "right",
    backgroundColor: "transparent",
    border: "none",
    color: "#4A5568",
    fontSize: "14px",
    cursor: "pointer",
    direction: "rtl",
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      ref={dropdownRef}
    >
      <button
        type="button"
        style={buttonStyle}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>خيارات الفاتورة</span>
        <span style={{ marginRight: "4px" }}>▼</span>
      </button>

      {isOpen && (
        <div style={dropdownStyle}>
          {options.map((option) => (
            <button
              key={option.id}
              style={optionStyle}
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
              onMouseOver={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "#F7FAFC";
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "transparent";
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceOptionsDropdown;
