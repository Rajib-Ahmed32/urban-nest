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
    toast({
      title: `Agreement ${action === "accept" ? "Accepted" : "Rejected"}`,
      variant: action === "accept" ? "default" : "destructive",
    });
  };

  if (loading || isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Agreement Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agreements.map((req) => (
          <div
            key={req._id}
            className="bg-white shadow p-4 rounded-lg space-y-2 border"
          >
            <div>
              <strong>Name:</strong> {req.userName}
            </div>
            <div>
              <strong>Email:</strong> {req.userEmail}
            </div>
            <div>
              <strong>Floor:</strong> {req.floor}
            </div>
            <div>
              <strong>Block:</strong> {req.block}
            </div>
            <div>
              <strong>Apartment No:</strong> {req.apartmentNo}
            </div>
            <div>
              <strong>Rent:</strong> ${req.rent}
            </div>
            <div>
              <strong>Date:</strong>{" "}
              {new Date(req.createdAt).toLocaleDateString()}
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAction(req._id, "accept")}
              >
                Accept
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => handleAction(req._id, "reject")}
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
