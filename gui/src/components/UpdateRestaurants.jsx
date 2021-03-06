import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Headline,
  DashboardNav as Navigation,
  ComponentWidget,
  WidgetItem,
  styledTable,
} from "../util/RestaurantStyledComponents";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Message,
  Divider,
  Input,
} from "semantic-ui-react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { FormattedMessage } from "react-intl";
import Axios from "axios";
import RestaurantModal from "./RestaurantModal";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";


const UpdateRestaurants = (props) => {
  const [dataToRender, setDataToRender] = useState([]);
  const [selectedRowData, setRowData] = useState({});
  const [show, setShow] = useState(false);
  const [creating, setCreating] = useState();
  const [successfull, setSuccesfull] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  const { addToast } = useToasts();

  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
      setLoading(false);
    }, 500);
    const [loading, setLoading] = useState(false);

    return (
      <Input
        loading={loading}
        placeholder="Search..."
        style={{ marginLeft: "2vw", width: "12vw" }}
        value={value}
        onChange={(e) => {
          setLoading(true);
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    );
  }

  const token = useSelector((state) => state.auth.token);

  useEffect(async () => {
    const result = await Axios.get(
      `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/restaurants/getAllRestaurants`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(result.data);

    setDataToRender(result.data);
  }, []);

  const data = useMemo(() => [...dataToRender], [dataToRender]);

  const columns = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage id="wault.table.reason" defaultMessage="Name" />
        ),
        accessor: "name",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.time" defaultMessage="Address" />
        ),
        accessor: "address",
      },
      {
        Header: (
          <FormattedMessage id="wault.actions" defaultMessage="Actions" />
        ),
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <Button.Group>
              <Button
                basic
                color="blue"
                size="mini"
                onClick={() => {
                  setShow(true);
                  setRowData(row.original);
                }}
              >
                <FormattedMessage
                  id="wault.actions.deposit"
                  defaultMessage="Update"
                />
              </Button>
              <Button
                basic
                color="red"
                size="mini"
                loading={creating}
                onClick={() => {
                  setCreating(true);

                  console.log("Is submitting: ", creating);

                  setTimeout(() => {
                    Axios.post(
                      `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/restaurants/deleteRestaurant`,
                      { ...row.original },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                      .then(async (res) => {
                        Axios.get(
                          `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/restaurant/getAllRestaurants`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                          .then((res) => {
                            setDataToRender(res.data);
                            setCreating(false);
                            addToast("Restaurant deleted successfully!", {
                              appearance: "success",
                            });
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  }, 3000);
                }}
              >
                <FormattedMessage
                  id="wault.actions.withdraw"
                  defaultMessage="Delete"
                />
              </Button>
            </Button.Group>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter
  );

  return (
    <div>
      <Headline>Update existing restaurants</Headline>

      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <styledTable>
        <table
          {...getTableProps()}
          style={{
            width: "55vw",
            height: "15vh",
            borderCollapse: "collapse",
            marginLeft: "2vw",
            marginTop: "4vh",
            fontSize: "15px",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </styledTable>
      {show && (
        <RestaurantModal
          show={show}
          setShow={setShow}
          submitting={creating}
          isSubmitting={setCreating}
          selectedRow={selectedRowData}
          setDataToRender={setDataToRender}
        />
      )}
    </div>
  );
};

export default UpdateRestaurants;
