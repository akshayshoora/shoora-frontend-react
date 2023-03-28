import {
  Box,
  Pagination,
  MenuItem,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select/Select";
import Span from "components/commonComponent/Span";

import useStyles from "./style";

export type Order = "asc" | "desc";

export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  alignment?: "right" | "left" | "center";
}

interface ITableFooterProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  rowsPerPage: number;
  onChangeRowsPerPage: (event: SelectChangeEvent) => void;
  showRow?: boolean;
}

interface ITableHeadingProps {
  headings: readonly HeadCell[];
  order?: Order;
  orderBy?: string;
  onRequestSort?: (event: React.MouseEvent<unknown>, property: string) => void;
  shouldShowActionMenu: boolean;
}

export function TableFooter(props: ITableFooterProps) {
  const {
    totalPages,
    currentPage,
    onPageChange,
    rowsPerPage,
    onChangeRowsPerPage,
    showRow,
  } = props;

  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Pagination
        componentName="div"
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        size="small"
        color="primary"
        className={classes.pagination}
      />
      {showRow && (
        <Box className={classes.numberOfRows}>
          <Span size="small">Shows: </Span>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //@ts-ignore
            value={rowsPerPage}
            onChange={onChangeRowsPerPage}
            size="small"
            className={classes.dropDown}
          >
            <MenuItem value={10} selected>
              <Span size="small" fontType="secondary">
                10 ROWS
              </Span>
            </MenuItem>
            <MenuItem value={25}>
              <Span size="small" fontType="secondary">
                25 ROWS
              </Span>
            </MenuItem>
            <MenuItem value={50}>
              <Span size="small" fontType="secondary">
                50 ROWS
              </Span>
            </MenuItem>
            <MenuItem value={100}>
              <Span size="small" fontType="secondary">
                100 ROWS
              </Span>
            </MenuItem>
          </Select>
        </Box>
      )}
    </Box>
  );
}

TableFooter.defaultProps = {
  showRow: true,
};

export function TableHeader(props: ITableHeadingProps) {
  const { headings, order, orderBy, onRequestSort, shouldShowActionMenu } =
    props;

  const classes = useStyles();

  //   Note: Code is for future use.
  //   const createSortHandler =
  //     (property: string) => (event: React.MouseEvent<unknown>) => {
  //       onRequestSort(event, property);
  //     };

  //   function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  //     if (b[orderBy] < a[orderBy]) {
  //       return -1;
  //     }
  //     if (b[orderBy] > a[orderBy]) {
  //       return 1;
  //     }
  //     return 0;
  //   }

  //   function getComparator<Key extends keyof any>(
  //     order: Order,
  //     orderBy: Key
  //   ): (
  //     a: { [key in Key]: number | string },
  //     b: { [key in Key]: number | string }
  //   ) => number {
  //     return order === "desc"
  //       ? (a, b) => descendingComparator(a, b, orderBy)
  //       : (a, b) => -descendingComparator(a, b, orderBy);
  //   }

  //   function stableSort<T>(
  //     array: readonly T[],
  //     comparator: (a: T, b: T) => number
  //   ) {
  //     const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  //     stabilizedThis.sort((a, b) => {
  //       const order = comparator(a[0], b[0]);
  //       if (order !== 0) {
  //         return order;
  //       }
  //       return a[1] - b[1];
  //     });
  //     return stabilizedThis.map((el) => el[0]);
  //   }

  return (
    <TableHead>
      <TableRow>
        {headings.map((cell) => (
          <TableCell
            key={cell.id}
            align={cell.alignment ? cell.alignment : "left"}
            padding={"none"}
            sortDirection={orderBy === cell.id ? order : false}
            className={classes.tableHeading}
            style={{ paddingRight: 20 }}
          >
            {/* Commenting To prevent Ordering Symbol */}
            {/* <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : "asc"}
            onClick={createSortHandler(headCell.id)}
          > */}
            <Span fontType="secondary" size="small">
              {cell.label}
            </Span>
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
        {/* The code will be useful in the future */}
        {shouldShowActionMenu ? (
          <TableCell
            key={"action"}
            align="left"
            padding={"normal"}
            variant={"head"}
          >
            <Span fontType="secondary" size="small">
              Action
            </Span>
          </TableCell>
        ) : null}
      </TableRow>
    </TableHead>
  );
}


export function TableHeaderUpdated(props: any) {
  const { headings, order, orderBy, onRequestSort, shouldShowActionMenu } =
    props;

  const classes = useStyles();

  return (
    <TableHead style={{ background: "#ECEBF1" }}>
      <TableRow>
        {headings.map((cell: any) => (
          <TableCell
            key={cell.id}
            align={cell.alignment ? cell.alignment : "left"}
            padding={"none"}
            sortDirection={orderBy === cell.id ? order : false}
            className={classes.multiColumnTableHeading}
            style={{ paddingRight: 20 }}
            colSpan={cell.colSpan || 1}
            rowSpan={cell.rowSpan || 1}
          >
            <Span fontType="secondary" size="small">
              {cell.label}
            </Span>
          </TableCell>
        ))}
        {shouldShowActionMenu ? (
          <TableCell
            key={"action"}
            align="left"
            padding={"normal"}
            variant={"head"}
            rowSpan={2}
          >
            <Span fontType="secondary" size="small">
              Action
            </Span>
          </TableCell>
        ) : null}
      </TableRow>
      <TableRow>
        {/* <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} colSpan={2}>
        </TableCell> */}
        <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} align="center">
          Driving Hours
        </TableCell>
        <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} align="center">
          Duty Hours
        </TableCell >
        <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} align="center">
          Driving Hours
        </TableCell>
        <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} align="center">
          Duty Hours
        </TableCell>
      </TableRow>
    </TableHead>
  );
}



export function TableHeaderGeofence(props: any) {
  const { headings, order, orderBy, onRequestSort, shouldShowActionMenu } =
    props;

  const classes = useStyles();

  return (
    <TableHead style={{ background: "#ECEBF1" }}>
      <TableRow>
        {headings.map((cell: any) => (
          <TableCell
            key={cell.id}
            align={cell.alignment ? cell.alignment : "left"}
            padding={"none"}
            sortDirection={orderBy === cell.id ? order : false}
            className={classes.multiColumnTableHeading}
            style={{ paddingRight: 20 }}
            colSpan={cell.colSpan || 1}
            rowSpan={cell.rowSpan || 1}
          >
            <Span fontType="secondary" size="small">
              {cell.label}
            </Span>
          </TableCell>
        ))}
        {shouldShowActionMenu ? (
          <TableCell
            key={"action"}
            align="left"
            padding={"normal"}
            variant={"head"}
            rowSpan={2}
          >
            <Span fontType="secondary" size="small">
              Action
            </Span>
          </TableCell>
        ) : null}
      </TableRow>
      <TableRow>
        {/* <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} colSpan={2}>
        </TableCell> */}
        <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} align="center">
          In Time
        </TableCell>
        <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} align="center">
          Out Time
        </TableCell >
        <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} align="center">
          In Time
        </TableCell>
        <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} align="center">
          Out Time
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export function TableHeaderTyre(props: any) {
  const { headings, order, orderBy, onRequestSort, shouldShowActionMenu } =
    props;

  const classes = useStyles();

  return (
    <TableHead style={{ background: "#ECEBF1" }}>
      <TableRow>
        {headings.map((cell: any) => (
          <TableCell
            key={cell.id}
            align={cell.alignment ? cell.alignment : "left"}
            padding={"none"}
            sortDirection={orderBy === cell.id ? order : false}
            className={classes.multiColumnTableHeading}
            style={{ paddingRight: 20 }}
            colSpan={cell.colSpan || 1}
            rowSpan={cell.rowSpan || 1}
          >
            <Span fontType="secondary" size="small">
              {cell.label}
            </Span>
          </TableCell>
        ))}
        {shouldShowActionMenu ? (
          <TableCell
            key={"action"}
            align="left"
            padding={"normal"}
            variant={"head"}
            rowSpan={2}
          >
            <Span fontType="secondary" size="small">
              Action
            </Span>
          </TableCell>
        ) : null}
      </TableRow>
      <TableRow>
        {/* <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} colSpan={2}>
        </TableCell> */}
        <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} align="center">
          UC No.
        </TableCell>
        <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} align="center">
          BRAND
        </TableCell >
        <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} align="center">
          SIZE
        </TableCell>
        <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} align="center">
          PR
        </TableCell>
        <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} align="center">
          PATTERN
        </TableCell>
        <TableCell className={classes.multiColumnTableChildHeading} style={{ paddingRight: 20 }} align="center">
          SET TYPE
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

