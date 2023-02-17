import React, { useCallback, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import { IChannel } from "@/db/services/channels";
import Button from '@mui/material/Button';
import BasicModal from "./modal";
import { Typography } from "@mui/material";
import Progress from "./progress";
import { get } from "lodash";

interface IChannelsTableProps {
  channels: Array<IChannel>;
  recommendedChannels: Array<IChannel>;
  fetchRecommendedChannels: (channelId: string) => void;
}

export const ChannelsTable = ({
  channels = [],
  recommendedChannels = [],
  fetchRecommendedChannels,
}: IChannelsTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showModal, setShowModal] = useState(false);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, [setPage]);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, [setRowsPerPage, setPage]);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, [setShowModal]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const startSearchRecommendations = useCallback((channelId: number) => {
    openModal();
    fetchRecommendedChannels(String(channelId));
  }, [openModal, fetchRecommendedChannels]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Subscribers</TableCell>
                <TableCell align="right">Views</TableCell>
                <TableCell align="right">Video Counts</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Propose Recommendations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {channels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((channel, index) => (
                <TableRow
                  key={channel._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {channel.name}
                  </TableCell>
                  <TableCell align="right">{channel.subs}</TableCell>
                  <TableCell align="right">{channel.views}</TableCell>
                  <TableCell align="right">{channel.videoCounts}</TableCell>
                  <TableCell align="right">{channel.category}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" onClick={() => startSearchRecommendations(channel.id)}>Find Similar Channels</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={channels.length}
          rowsPerPage={10}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <BasicModal open={showModal} handleOpen={openModal} handleClose={closeModal}>
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {recommendedChannels.length === 0 && "Please wait for "} Recommendations
            </Typography>
            {recommendedChannels.length === 0 && <Progress />}
            {recommendedChannels.length !== 0 && (
              recommendedChannels.map((rChannel) => (
                <div key={rChannel._id}>{get(rChannel, "details[0].name", "")}</div>
              ))
            )}
          </>
      </BasicModal>
    </Box>
  );
};

export default ChannelsTable;

