"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  Download,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

const reportData = [
  {
    id: "1",
    type: "Sales Report",
    period: "January 2024",
    revenue: 12450,
    tickets: 156,
    commission: 1867,
    generated: "2024-01-31",
  },
  {
    id: "2",
    type: "User Activity",
    period: "January 2024",
    newUsers: 45,
    activeUsers: 234,
    retention: 78,
    generated: "2024-01-31",
  },
  {
    id: "3",
    type: "Financial Summary",
    period: "Q4 2023",
    revenue: 45680,
    tickets: 567,
    commission: 6852,
    generated: "2024-01-01",
  },
];

export function AdminReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedType, setSelectedType] = useState("all");

  const handleGenerateReport = () => {
    // Mock report generation
    console.log("Generating report:", {
      period: selectedPeriod,
      type: selectedType,
    });
  };

  const handleDownloadReport = (reportId: string) => {
    // Mock download
    console.log("Downloading report:", reportId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Generate New Report</span>
          </CardTitle>
          <CardDescription>
            Create custom reports for analysis and compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="sales">Sales Report</SelectItem>
                  <SelectItem value="users">User Activity</SelectItem>
                  <SelectItem value="financial">Financial Summary</SelectItem>
                  <SelectItem value="tickets">Ticket Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Time Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="format">Export Format</Label>
              <Select defaultValue="csv">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleGenerateReport} className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>
            Previously generated reports available for download
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Key Metrics</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <Badge variant="outline">{report.type}</Badge>
                  </TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {report.revenue && (
                        <p>Revenue: ${report.revenue.toLocaleString()}</p>
                      )}
                      {report.tickets && <p>Tickets: {report.tickets}</p>}
                      {report.newUsers && <p>New Users: {report.newUsers}</p>}
                      {report.commission && (
                        <p>Commission: ${report.commission.toLocaleString()}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(report.generated).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadReport(report.id)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Sales Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">This Month</span>
                <span className="font-medium">$12,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Last Month</span>
                <span className="font-medium">$10,230</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span className="text-sm">Growth</span>
                <span className="font-medium">+21.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>User Growth</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Active Users</span>
                <span className="font-medium">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">New This Month</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span className="text-sm">Retention</span>
                <span className="font-medium">78.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <span>Revenue Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total Revenue</span>
                <span className="font-medium">$156,890</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Commission</span>
                <span className="font-medium">$23,534</span>
              </div>
              <div className="flex justify-between text-purple-600">
                <span className="text-sm">Margin</span>
                <span className="font-medium">15%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
