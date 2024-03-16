"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";

const RecentRequestsTable = ({
  fetchRecentRequests,
  requests,
  setRequests,
  isRecentRequestsLoading,
  paginationConfig,
  setpaginationConfig,
}) => {
  if (isRecentRequestsLoading) {
    return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
  }
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sr. No.</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Quantity (kg)</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Collection Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req, index) => {
            return (
              <TableRow key={req.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{req.status}</TableCell>
                <TableCell>{req.amount}</TableCell>
                <TableCell>{req.wasteType.name}</TableCell>
                <TableCell className="text-right">
                  {dayjs(req.collectionDate).format("DD MMM YYYY HH:mm")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default RecentRequestsTable;
