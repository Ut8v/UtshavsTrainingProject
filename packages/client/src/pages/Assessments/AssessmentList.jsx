
import React, { useEffect, useMemo, useState } from 'react';
import { useGlobalFilter, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);
  console.log(assessments);
  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, []);
  const handleDelete = () => {};

  const COLUMNS = [
    {
      Header: `ID`,
      accessor: `id`,
    },
    {
      Header: `Cat Name`,
      accessor: `catName`,
    },
    {
      Header: `Cat Date of Birth`,
      accessor: `catDateOfBirth`,
    },
    {
      Header: `Score`,
      accessor: `score`,
    },
    {
      Header: `Risk Level`,
      accessor: `riskLevel`,
    },
    {
      Header: `Instrument Type`,
      accessor: `instrumentType`,
    },
  ];
  const columns = useMemo(() => COLUMNS, []);
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    setGlobalFilter,
    state,
  } = useTable({ columns, data: assessments }, useGlobalFilter);

  const { globalFilter } = state;

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={globalFilter || ``}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) =>
                <th {...column.getHeaderProps()}>
                  {column.render(`Header`)}
                </th>)}
            </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) =>
                  <td {...cell.getCellProps()}>
                    {cell.render(`Cell`)}
                  </td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
