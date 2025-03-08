import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  fetchSKUData,
  addNewSKU,
  deleteSKU,
} from "../../redux/slices/skuSlice";
import Table from "../../components/common/Table/Table";
import Modal from "../../components/common/Modal/Modal";
import { ColumnDef } from "@tanstack/react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./SKU.module.scss";

const SKUsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const skuData = useSelector((state: RootState) => state.skus.data);

  useEffect(() => {
    dispatch(fetchSKUData());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [error, setError] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLabel("");
    setPrice("");
    setCost("");
    setError("");
  };

  const handleAddSKU = () => {
    if (!label || !price || !cost) {
      setError("All fields are required!");
      return;
    }

    dispatch(
      addNewSKU({
        ID: `SKU${Math.floor(Math.random() * 1000)}`,
        Label: label,
        Price: parseFloat(price),
        Cost: parseFloat(cost),
      })
    );

    handleCloseModal();
  };

  const handleDeleteSKU = (skuId: string) => {
    dispatch(deleteSKU(skuId));
  };

  const columns: ColumnDef<any>[] = [
    {
      id: "delete",
      header: "",
      cell: ({ row }) => (
        <div onClick={() => handleDeleteSKU(row.original.ID)}>
          <DeleteIcon sx={{ color: "red", cursor: "pointer" }} />
        </div>
      ),
    },
    { accessorKey: "Label", header: "SKU" },
    { accessorKey: "Price", header: "Price" },
    { accessorKey: "Cost", header: "Cost" },
  ];

  return (
    <div className={styles.container}>
      <Table data={skuData} columns={columns} />
      <div onClick={handleOpenModal} className={styles.addSKUButton}>
        New SKU
      </div>

      <Modal
        title="Add New SKU"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddSKU}
      >
        <div className={styles.modalContent}>
          <label>SKU Label:</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label>Cost:</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />

          {error && <p className={styles.error}>{error}</p>}
        </div>
      </Modal>
    </div>
  );
};

export default SKUsPage;
