import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Message from "../../components/commonReusableComponents/Message";

const fetchMembers = async (token) => {
  const res = await axios.get("/members", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const ManageMembers = () => {
  const { firebaseUser, loading: authLoading } = useAuth();
  const [token, setToken] = useState(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    const getToken = async () => {
      if (firebaseUser) {
        const fetchedToken = await firebaseUser.getIdToken();
        setToken(fetchedToken);
      }
    };
    getToken();
  }, [firebaseUser]);

  const {
    data: members = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["members"],
    queryFn: () => fetchMembers(token),
    enabled: !!token,
  });

  const { mutate: removeMember, isLoading: removing } = useMutation({
    mutationFn: async (email) => {
      await axios.patch(
        `/remove-member/${email}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await axios.delete(`/payment/user/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return email;
    },
    onSuccess: () => {
      toast({
        title: "Member removed",
        description: "Member and related coupons removed successfully!",
        variant: "success",
      });
      queryClient.invalidateQueries(["members"]);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove member or delete coupons.",
        variant: "destructive",
      });
    },
  });

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <Message type="error" text="Failed to load data. Please try again." />
    );
  }

  return (
    <div className="md:p-12">
      <Card className="bg-[#f9f9f7]">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-[#ec5407]">
            Manage Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <Message type="info" text="No records found." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border">
                <thead className="bg-gray-100 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member._id} className="border-t">
                      <td className="px-4 py-2">{member.name}</td>
                      <td className="px-4 py-2">{member.email}</td>
                      <td className="px-4 py-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={removing}
                          onClick={() => removeMember(member.email)}
                        >
                          {removing ? "Removing..." : "Remove"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageMembers;
