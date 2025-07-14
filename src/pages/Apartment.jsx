import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../services/apiClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import Message from "../components/commonReusableComponents/Message";
import RentFilter from "../components/sharedLayoutComponents/apartment/RentFilter";
import ApartmentsGrid from "../components/sharedLayoutComponents/apartment/ApartmentsGrid";
import { Button } from "@/components/ui/button";

const fetchApartments = async ({ queryKey }) => {
  const [_key, { minRent, maxRent, page, limit }] = queryKey;
  const res = await axios.get("/apartments", {
    params: { minRent, maxRent, page, limit },
  });
  return res.data;
};

const fetchUserAgreement = async (token) => {
  const res = await axios.get("/agreements/mine", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data?.agreement;
};

export default function Apartment() {
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({ minRent: "", maxRent: "" });
  const [agreeingId, setAgreeingId] = useState(null);
  const [userAgreement, setUserAgreement] = useState(null);

  const { firebaseUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const limit = 6;

  const { toast } = useToast();

  const { data, error, isLoading } = useQuery({
    queryKey: ["apartments", { ...filter, page, limit }],
    queryFn: fetchApartments,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!firebaseUser) {
      setUserAgreement(null);
      queryClient.removeQueries(["agreements"]);
    }
  }, [firebaseUser, queryClient]);

  useEffect(() => {
    const getAgreement = async () => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const agreement = await fetchUserAgreement(token);
        setUserAgreement(agreement);
      }
    };
    getAgreement();
  }, [firebaseUser]);

  const handleSearch = () => {
    setFilter({ minRent: minRent || "", maxRent: maxRent || "" });
    setPage(1);
  };

  const handleAgreement = async (apartmentId) => {
    if (!firebaseUser) {
      toast({
        title: "Login required",
        description: "Please log in to make an agreement.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      setAgreeingId(apartmentId);
      const token = await firebaseUser.getIdToken();

      await axios.post(
        `/agreements/${apartmentId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: "Agreement Submitted",
        description: "Note: One user can only request one apartment.",
        variant: "default",
      });

      const apartment = data.apartments.find((apt) => apt._id === apartmentId);
      setUserAgreement({ apartmentNo: apartment?.apartmentNo });

      queryClient.invalidateQueries(["agreements"]);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to submit agreement.",
        variant: "destructive",
      });
    } finally {
      setAgreeingId(null);
    }
  };

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 1;

  if (isLoading)
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    );

  if (error)
    return (
      <Message text="Failed to load apartments." className="text-red-500" />
    );

  if (!data?.apartments?.length)
    return (
      <Message text="No apartments available." className="text-gray-600" />
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <RentFilter
        minRent={minRent}
        maxRent={maxRent}
        onMinChange={(e) => setMinRent(e.target.value)}
        onMaxChange={(e) => setMaxRent(e.target.value)}
        onSearch={handleSearch}
      />

      <ApartmentsGrid
        apartments={data.apartments}
        userAgreement={userAgreement}
        agreeingId={agreeingId}
        onAgreementClick={handleAgreement}
      />

      {/* Pagination */}
      <div className="mt-10 flex justify-center gap-2 flex-wrap">
        {[...Array(totalPages)].map((_, idx) => {
          const pageNumber = idx + 1;
          return (
            <Button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`w-10 h-10 p-0 text-sm font-semibold rounded-md ${
                page === pageNumber
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700"
              } hover:bg-blue-500 hover:text-white`}
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
