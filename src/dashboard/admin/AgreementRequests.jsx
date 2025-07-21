import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import Message from "../../components/commonReusableComponents/Message";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../context/AuthContext";

const fetchPendingAgreements = async (token) => {
  const res = await axios.get("/agreements/pending", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateAgreementStatus = async ({ id, action, token }) => {
  const res = await axios.patch(
    `/agreements/${id}/handle`,
    { action },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export default function AgreementRequests() {
  const { firebaseUser, loading } = useAuth();
  const [token, setToken] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    const getToken = async () => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        setToken(idToken);
      }
    };
    getToken();
  }, [firebaseUser]);

  const {
    data: agreements,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pendingAgreements"],
    queryFn: () => fetchPendingAgreements(token),
    enabled: !!token,
  });

  const mutation = useMutation({
    mutationFn: ({ id, action }) =>
      updateAgreementStatus({ id, action, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingAgreements"]);
    },
  });

  const handleAction = (id, action) => {
    mutation.mutate({ id, action });

    if (action === "accept") {
      toast({
        title: "Agreement Accepted",
        description: "The agreement request has been approved successfully.",
        variant: "default",
      });
    } else if (action === "reject") {
      toast({
        title: "Agreement Rejected",
        description: "The agreement request has been rejected.",
        variant: "destructive",
      });
    }
  };

  if (loading || isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-white" />
      </div>
    );
  }

  if (error) {
    return <Message type="error" text="Failed to load agreement requests." />;
  }

  if (!agreements || agreements.length === 0) {
    return <Message type="info" text="No pending agreement requests." />;
  }

  return (
    <div className="max-w-5xl mx-auto bg-[#f9f9f7]/50 px-6 md:px-12 py-8">
      <h1 className="text-2xl font-semibold mb-8 text-center text-[#ec5407]">
        Agreement Requests
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {agreements.map((req) => (
          <div
            key={req._id}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="space-y-2 text-gray-800 text-sm">
              <div>
                <span className="font-bold text-[#373634] mr-2">Name:</span>{" "}
                <span className="font-medium">{req.userName}</span>
              </div>
              <div>
                <span className="font-bold text-[#373634] mr-2">Email:</span>{" "}
                <span className="font-medium">{req.userEmail}</span>
              </div>
              <div>
                <span className="font-bold text-[#373634] mr-2">Floor:</span>{" "}
                <span className="font-medium">{req.floor}</span>
              </div>
              <div>
                <span className="font-bold text-[#373634] mr-2">Block:</span>{" "}
                <span className="font-medium">{req.block}</span>
              </div>
              <div>
                <span className="font-bold text-[#373634] mr-2">
                  Apartment No:
                </span>{" "}
                <span className="font-medium">{req.apartmentNo}</span>
              </div>
              <div>
                <span className="font-bold text-[#373634] mr-2">Rent:</span>{" "}
                <span className="font-medium">{req.rent} ৳</span>
              </div>
              <div>
                <span className="font-bold text-[#373634] mr-2">
                  Request Date:
                </span>{" "}
                <span className="font-medium">
                  {new Date(req.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => handleAction(req._id, "reject")}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md text-xs shadow-sm"
              >
                Reject
              </Button>
              <Button
                onClick={() => handleAction(req._id, "accept")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md text-xs shadow-sm"
              >
                Accept
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
