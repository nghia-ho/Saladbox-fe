// import { format } from "date-fns";
// import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const LatestOrders = ({ orders, sx }) => {
  const navigate = useNavigate();
  return (
    <Card {...sx}>
      <CardHeader title="Latest Orders" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.slice(0, 5).map((order) => (
                <TableRow hover key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>{moment(order.createdAt).calendar()}</TableCell>
                  <TableCell>
                    <SeverityPill
                      color={order.isDeliverd ? "primary" : "error"}
                    >
                      {order.isDeliverd ? "Success" : "Pending"}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
          onClick={() => navigate("/orders", { state: 1 })}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};
