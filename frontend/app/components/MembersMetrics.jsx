"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const MembersMetrics = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(
          "http://localhost:5229/api/members/metrics"
        );
        const data = await response.json();
        setMetrics(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMetrics();
  }, []);

  if (!metrics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <h2 className="text-4xl font-bold text-gray-800">
        CCFI Dalandanan Metrics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Card className="border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Total Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-4xl font-semibold text-gray-900">
              {metrics.totalMembers}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Active Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-4xl font-semibold text-gray-900">
              {metrics.activeMembers}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">
              Inactive Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-4xl font-semibold text-gray-900">
              {metrics.inactiveMembers}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MembersMetrics;
