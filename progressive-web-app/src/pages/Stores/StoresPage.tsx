import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  addNewStore,
  fetchStoreData,
  deleteStore,
} from "../../redux/slices/storeSlice";
import Modal from "../../components/common/Modal/Modal";
import Table from "../../components/common/Table/Table";
import { ColumnDef } from "@tanstack/react-table";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./StoresPage.module.scss";

const StorePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const storeData = useSelector((state: RootState) => state.stores.data);

  useEffect(() => {
    dispatch(fetchStoreData());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLabel("");
    setCity("");
    setState("");
  };

  const handleAddStore = () => {
    if (!label || !city || !state) {
      alert("All fields are required!");
      return;
    }

    dispatch(
      addNewStore({
        ID: `ST${Math.floor(Math.random() * 1000)}`,
        Label: label,
        City: city,
        State: state,
      })
    );

    handleCloseModal();
  };

  const handleDeleteStore = (storeId: string) => {
    dispatch(deleteStore(storeId));
  };

  const columns: ColumnDef<any>[] = [
    {
      id: "delete",
      header: "",
      cell: ({ row }) => (
        <div onClick={() => handleDeleteStore(row.original.ID)}>
          <DeleteIcon sx={{ color: "red" }} />
        </div>
      ),
    },
    {
      accessorKey: "ID",
      header: "S.No",
      cell: ({ row }) => (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ViewCompactIcon fontSize="small" />
          {row.original.ID}
        </span>
      ),
    },
    { accessorKey: "Label", header: "Store" },
    { accessorKey: "City", header: "City" },
    { accessorKey: "State", header: "State" },
  ];

  return (
    <div className={styles.container}>
      <Table data={storeData} columns={columns} />
      <div onClick={handleOpenModal} className={styles.addStoreButton}>
        NEW STORE
      </div>

      <Modal
        title="Add New Store"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddStore}
      >
        <div className={styles.inputFieldContainer}>
          <input
            type="text"
            value={label}
            placeholder="Store Name"
            onChange={(e) => setLabel(e.target.value)}
          />

          <input
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="text"
            value={state}
            placeholder="State"
            onChange={(e) => setState(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default StorePage;
