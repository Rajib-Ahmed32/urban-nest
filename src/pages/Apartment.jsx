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
  const [_key, { minRent, maxRent, page, limit, token }] = queryKey;
  console.log("Fetching apartments with:", minRent, maxRent, page, limit);

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await axios.get("/apartments", {
    params: { minRent, maxRent, page, limit },
    headers,
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
  const [token, setToken] = useState(null);

  const { firebaseUser, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const limit = 6;

  const { toast } = useToast();

  // Get Firebase token whenever user changes
  useEffect(() => {
    const fetchToken = async () => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        setToken(idToken);
      } else {
        setToken(null);
      }
    };
    fetchToken();
  }, [firebaseUser]);

  // Remove agreements cache if user logs out
  useEffect(() => {
    if (!firebaseUser) {
      setUserAgreement(null);
      queryClient.removeQueries(["agreements"]);
    }
  }, [firebaseUser, queryClient]);

  // Fetch user agreement when token changes
  useEffect(() => {
    const getAgreement = async () => {
      if (!token) return;

      try {
        const agreement = await fetchUserAgreement(token);
        setUserAgreement(agreement);
      } catch (err) {
        console.error("Failed to fetch user agreement:", err);
      }
    };
    getAgreement();
  }, [token]);

  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["apartments", { ...filter, page, limit, token }],
    queryFn: fetchApartments,
    keepPreviousData: true,
    enabled: token !== null || !firebaseUser,
    retry: 2,
    staleTime: 1000 * 60 * 2,
  });

  if (loading || isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    );
  }

  if (error) {
    return <Message type="error" text="Failed to load apartments." />;
  }

  if (!data?.apartments?.length) {
    return <Message type="info" text="No apartments available." />;
  }

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
      const idToken = await firebaseUser.getIdToken();

      await axios.post(
        `/agreements/${apartmentId}`,
        {},
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      toast({
        title: "Agreement Submitted",
        description: "Note: One user can only request one apartment.",
        variant: "error",
      });

      const apartment = data.apartments.find((apt) => apt._id === apartmentId);
      setUserAgreement({ apartmentNo: apartment?.apartmentNo });

      queryClient.invalidateQueries(["agreements"]);
    } catch (error) {
      toast({
        title: "Unable to Proceed",
        description:
          error.response?.data?.message || "Failed to submit agreement.",
        variant: "destructive",
      });
    } finally {
      setAgreeingId(null);
    }
  };

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 1;

  return (
    <div className="bg-[#eaedf0]">
      <div className="pb-24 pt-12 max-w-7xl mx-auto">
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

        <div className="mt-10 flex justify-center gap-2 flex-wrap">
          {[...Array(totalPages)].map((_, idx) => {
            const pageNumber = idx + 1;
            return (
              <Button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`w-10 h-10 p-0 text-sm font-semibold rounded-md transition
                  ${
                    page === pageNumber
                      ? "bg-[#dd4b08] text-white"
                      : "bg-transparent border border-[#dd4b08] text-[#dd4b08]"
                  }
                  hover:bg-[#dd4b08] hover:text-white
                `}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
