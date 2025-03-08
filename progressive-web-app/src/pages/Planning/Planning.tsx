import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Table from "../../components/common/Table/Table";
import styles from "./Planning.module.scss";
import { planningData } from "../../config/constants";

const PlanningPage: React.FC = () => {
  const getGMPercentageBackgroundColor = (gmPercentage: string) => {
    const percentage = parseFloat(gmPercentage.replace("%", ""));

    if (percentage >= 40) return "green";
    if (percentage >= 10) return "yellow";
    if (percentage > 5) return "orange";
    return "red";
  };

  const columns: ColumnDef<any>[] = [
    { accessorKey: "store", header: "Store" },
    { accessorKey: "sku", header: "SKU" },
    { accessorKey: "week", header: "Week" },
    { accessorKey: "sales_units", header: "Sales Units" },
    { accessorKey: "sales_dollars", header: "Sales Dollars" },
    { accessorKey: "cost_dollars", header: "Cost Dollars" },
    { accessorKey: "gm_dollars", header: "GM Dollars" },
    {
      accessorKey: "gm_percentage",
      header: "GM Percentage",
      cell: ({ getValue }) => {
        const gmPercentage = getValue() as string;
        const backgroundColor = getGMPercentageBackgroundColor(gmPercentage);
        return (
          <span
            style={{
              backgroundColor,
              color: "black",
              padding: "5px",
              borderRadius: "4px",
            }}
          >
            {gmPercentage}
          </span>
        );
      },
    },
  ];

  return (
    <div className={styles.container}>
      <Table data={planningData} columns={columns} />
    </div>
  );
};

export default PlanningPage;
