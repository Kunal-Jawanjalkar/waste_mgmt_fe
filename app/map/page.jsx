"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useEffect } from "react";
import { useLocalStorage } from "../hooks";
import { wasteCollectionApi } from "../api";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const MapPage = () => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/custom/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  const { toast } = useToast();
  const router = useRouter();
  const [token, setToken] = useLocalStorage("token", null);

  useEffect(() => {
    if (!router || !token) return;
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const [requests, setRequests] = useState([]);
  const [userDetails, setUserDetails] = useLocalStorage("userDetails", null);
  const [loading, setLoading] = useState({
    isRecentRequestsLoading: false,
    isUpdateWasteLoading: false,
  });
  const [paginationConfig, setPaginationConfig] = useState({
    page: 1,
    limit: 10000,
    count: null,
  });

  const fetchRecentRequests = async (page = 1, limit = 10) => {
    try {
      setLoading({ ...loading, isRecentRequestsLoading: true });
      const response = await wasteCollectionApi.getAllWasteCollections({
        page,
        limit,
        status: "PENDING",
      });
      if (response.status === 200) {
        setRequests(response.data.data);
        setPaginationConfig({
          page: response.data.page,
          limit: response.data.limit,
          count: response.data.count,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: error.message,
      });
      setLoading({ ...loading, isRecentRequestsLoading: false });
    } finally {
      setLoading({ ...loading, isRecentRequestsLoading: false });
    }
  };

  useEffect(() => {
    fetchRecentRequests(paginationConfig.page, paginationConfig.limit);
  }, []);

  const updateWasteCollection = async (id, payload) => {
    try {
      setLoading({ ...loading, isUpdateWasteLoading: true });
      const response = await wasteCollectionApi.updateWasteCollection(
        id,
        payload
      );
      if (response.status === 200) {
        fetchRecentRequests(paginationConfig.page, paginationConfig.limit);
        alert("Order completed successfully");
      }
    } catch (error) {
      setLoading({ ...loading, isUpdateWasteLoading: false });
      toast({
        variant: "destructive",
        description: error.message,
      });
    } finally {
      setLoading({ ...loading, isUpdateWasteLoading: false });
    }
  };

  const markerPositions = requests.map((req) => {
    return {
      tooltipContent: (
        <>
          <strong>{`${req.wasteType.name} waste order by - ${req.user.name}`}</strong>
          <h1>{`${req.user.address}`}</h1>
        </>
      ),
      position: [
        req.user.locationCoordinates[1],
        req.user.locationCoordinates[0],
      ],
      popupContent: (
        <>
          <input
            placeholder="Enter quantity in kg"
            type="number"
            style={{
              border: "2px solid black",
              padding: "0.5rem",
            }}
            id={req.id}
          />

          <button
            disabled={loading.isUpdateWasteLoading}
            style={{
              marginTop: "0.5rem",
              border: "2px solid black",
              borderRadius: "4px",
              padding: "0.5rem",
              background: "#000",
              color: "#fff",
            }}
            onClick={(e) => {
              const wasteInput = document.getElementById(req.id);
              if (!wasteInput.value) return;
              updateWasteCollection(req.id, {
                status: "COMPLETED",
                collectionDate: new Date().toISOString(),
                amount: Number(wasteInput.value),
              });
            }}
          >
            Mark as complete
          </button>
        </>
      ),
    };
  });

  return (
    <>
      <Map
        zoom={10}
        position={markerPositions[0]?.position || [18.523, 73.856]}
        markerPositions={markerPositions}
      />
    </>
  );
};

export default MapPage;
