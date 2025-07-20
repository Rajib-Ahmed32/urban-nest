import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../services/apiClient";
import { toast } from "sonner";
import Message from "../../components/commonReusableComponents/Message";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Loader2, Megaphone, CheckCircle } from "lucide-react";

const MemberNotice = () => {
  const { user, firebaseUser } = useAuth();
  const [token, setToken] = useState(null);
  const [noticeInfo, setNoticeInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        setToken(idToken);
      }
    };
    fetchToken();
  }, [firebaseUser]);

  useEffect(() => {
    if (!token || !user?.email) return;

    setLoading(true);
    axios
      .get(`/notices/user/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNoticeInfo(res.data);
      })
      .catch(() => {
        toast.error("Failed to load your notice info.");
      })
      .finally(() => setLoading(false));
  }, [token, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-8 h-8 text-[#ec5407]" />
      </div>
    );
  }

  if (!noticeInfo) {
    return (
      <Message
        type="info"
        text="No notice information found."
        className="max-w-xl mx-auto mt-8"
      />
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-8 px-4">
      <Card className="p-8 rounded-2xl shadow-md border border-gray-200 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-3 mb-6">
          <Megaphone className="text-[#ec5407] w-7 h-7" />
          <CardTitle className="text-2xl font-semibold text-[#ec5407] dark:text-white">
            Your Rent Notice Summary
          </CardTitle>
        </div>

        <CardContent className="space-y-4 text-gray-800 dark:text-gray-300 text-base font-medium">
          <div className="flex justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
            <span>Notice Count:</span>
            <span>{noticeInfo.noticeCount}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
            <span>Last Notice Month:</span>
            <span>{noticeInfo.lastNoticeMonth || "N/A"}</span>
          </div>

          {noticeInfo.noticeMessage && (
            <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-md p-4 mt-6 text-green-800 dark:bg-green-900/30 dark:border-green-700">
              <CheckCircle className="w-6 h-6 mt-0.5 text-green-600 dark:text-green-400" />
              <p className="text-sm">{noticeInfo.noticeMessage}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberNotice;
