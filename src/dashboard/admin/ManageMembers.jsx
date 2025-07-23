import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Message from "../../components/commonReusableComponents/Message";
import PageWrapper from "../../components/commonReusableComponents/PageWrapper";

const fetchMembers = async (token) => {
  const res = await axios.get("/members", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const ManageMembers = () => {
  const { firebaseUser, loading: authLoading } = useAuth();
  const [token, setToken] = useState(null);
  const [removingEmail, setRemovingEmail] = useState(null);
  const [confirmationMsg, setConfirmationMsg] = useState(null);
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

  const { mutate: removeMember } = useMutation({
    mutationFn: async (email) => {
      setRemovingEmail(email);
      await axios.patch(
        `/remove-member/${email}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      try {
        await axios.delete(`/payment/user/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        if (err.response?.status !== 404) {
          throw err;
        }
      }

      return email;
    },
    onSuccess: (email) => {
      queryClient.setQueryData(["members"], (old) =>
        old ? old.filter((m) => m.email !== email) : []
      );

      const removedMember = members.find((m) => m.email === email);
      const name = removedMember?.name || email;

      toast({
        title: "Member Removed",
        description: `${name} has been downgraded to user.`,
        variant: "success",
        duration: 3000,
      });

      setRemovingEmail(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove member access.",
        variant: "destructive",
      });
      setRemovingEmail(null);
    },
  });

  if (authLoading || isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-white dark:bg-gray-900">
        <Loader2 className="w-10 h-10 animate-spin text-[#ec5407]" />
      </div>
    );
  }

  if (isError) {
    return (
      <Message type="error" text="Failed to load data. Please try again." />
    );
  }

  return (
    <PageWrapper>
      <Card className="shadow-xl border border-gray-200 dark:border-gray-700 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#ec5407]">
            Manage Members
          </CardTitle>
        </CardHeader>

        <CardContent>
          {members.length === 0 ? (
            <Message type="info" text="No members found." />
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-800">
              <table className="w-full text-sm text-left border-separate border-spacing-y-2">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr
                      key={member._id}
                      className="bg-white dark:bg-gray-900 hover:shadow transition rounded-md"
                    >
                      <td className="px-4 py-3 rounded-l-md font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {member.email}
                      </td>
                      <td className="px-4 py-3 text-right rounded-r-md">
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={removingEmail === member.email}
                          onClick={() => removeMember(member.email)}
                          className="gap-1"
                        >
                          {removingEmail === member.email ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Removing...
                            </>
                          ) : (
                            <>
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {confirmationMsg && (
            <div className="mt-6 flex justify-center">
              <div className="text-sm bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-md shadow-sm">
                {confirmationMsg}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </PageWrapper>
  );
};

export default ManageMembers;
