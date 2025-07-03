"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExportService, type ExportFormat } from "@/lib/export-service";
import {
  Calendar,
  CheckCircle,
  DollarSign,
  Download,
  FileText,
  Loader2,
  Ticket,
  Users,
} from "lucide-react";
import { useState } from "react";

export function AdminExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState<{
    success: boolean;
    message: string;
    filename?: string;
    recordCount?: number;
  } | null>(null);

  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    status: "all",
    type: "all",
    format: "csv" as ExportFormat,
  });

  const handleExport = async (exportType: string) => {
    setIsExporting(true);
    setExportResult(null);

    try {
      let result;

      switch (exportType) {
        case "tickets":
          result = await ExportService.exportTickets(filters.format, {
            dateFrom: filters.dateFrom || undefined,
            dateTo: filters.dateTo || undefined,
            status: filters.status === "all" ? undefined : filters.status,
          });
          break;

        case "users":
          result = await ExportService.exportUsers(filters.format, {
            type: filters.type === "all" ? undefined : filters.type,
            joinedAfter: filters.dateFrom || undefined,
          });
          break;

        case "games":
          result = await ExportService.exportGames(filters.format, {
            dateFrom: filters.dateFrom || undefined,
            dateTo: filters.dateTo || undefined,
            status: filters.status === "all" ? undefined : filters.status,
          });
          break;

        case "financial":
          result = await ExportService.exportFinancials(filters.format, {
            dateFrom: filters.dateFrom || undefined,
            dateTo: filters.dateTo || undefined,
            type: filters.type === "all" ? undefined : filters.type,
          });
          break;

        case "comprehensive":
          result = await ExportService.exportComprehensiveReport(
            filters.format,
            "month"
          );
          break;

        default:
          throw new Error("Invalid export type");
      }

      setExportResult({
        success: true,
        message: `Export completed successfully! Downloaded ${result.recordCount} records.`,
        filename: result.filename,
        recordCount: result.recordCount,
      });
    } catch (error) {
      setExportResult({
        success: false,
        message: `Export failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Export Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Export Filters</CardTitle>
          <CardDescription>
            Configure filters and format for your data export
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateFrom">From Date</Label>
              <Input
                id="dateFrom"
                type="date"
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateTo">To Date</Label>
              <Input
                id="dateTo"
                type="date"
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, dateTo: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status Filter</Label>
              <Select
                value={filters.status}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type Filter</Label>
              <Select
                value={filters.type}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="buyer">Buyers</SelectItem>
                  <SelectItem value="seller">Sellers</SelectItem>
                  <SelectItem value="sale">Sales</SelectItem>
                  <SelectItem value="commission">Commission</SelectItem>
                  <SelectItem value="payout">Payouts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Export Format</Label>
              <Select
                value={filters.format}
                onValueChange={(value: ExportFormat) =>
                  setFilters((prev) => ({ ...prev, format: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Result */}
      {exportResult && (
        <Alert variant={exportResult.success ? "default" : "destructive"}>
          {exportResult.success ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          <AlertDescription>
            {exportResult.message}
            {exportResult.filename && (
              <div className="mt-2">
                <Badge variant="outline">{exportResult.filename}</Badge>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Export Options */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Ticket className="h-5 w-5 text-blue-600" />
              <span>Ticket Data</span>
            </CardTitle>
            <CardDescription>
              Export all ticket listings with sales data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <p>• Ticket listings and status</p>
                <p>• Seller information</p>
                <p>• Pricing and commission data</p>
                <p>• Sale dates and performance</p>
              </div>
              <Button
                onClick={() => handleExport("tickets")}
                disabled={isExporting}
                className="w-full"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Export Tickets
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <span>User Data</span>
            </CardTitle>
            <CardDescription>
              Export user accounts and activity data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <p>• User profiles and contact info</p>
                <p>• Account types and status</p>
                <p>• Activity and transaction history</p>
                <p>• Registration and engagement data</p>
              </div>
              <Button
                onClick={() => handleExport("users")}
                disabled={isExporting}
                className="w-full"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Export Users
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span>Game Schedule</span>
            </CardTitle>
            <CardDescription>
              Export game schedule and performance data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <p>• Game schedules and venues</p>
                <p>• Ticket availability</p>
                <p>• Sales performance per game</p>
                <p>• Revenue and attendance data</p>
              </div>
              <Button
                onClick={() => handleExport("games")}
                disabled={isExporting}
                className="w-full"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Export Games
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-orange-600" />
              <span>Financial Report</span>
            </CardTitle>
            <CardDescription>
              Export financial transactions and revenue data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <p>• All financial transactions</p>
                <p>• Commission and fee breakdown</p>
                <p>• Payout and refund records</p>
                <p>• Revenue analytics</p>
              </div>
              <Button
                onClick={() => handleExport("financial")}
                disabled={isExporting}
                className="w-full"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Export Financial
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Comprehensive Report</span>
            </CardTitle>
            <CardDescription>
              Export complete platform analytics and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <p>• Complete platform overview</p>
                <p>• Performance analytics</p>
                <p>• Top performers and trends</p>
                <p>• Executive summary</p>
              </div>
              <Button
                onClick={() => handleExport("comprehensive")}
                disabled={isExporting}
                className="w-full"
                variant="default"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Export Full Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Information */}
      <Card>
        <CardHeader>
          <CardTitle>Export Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Supported Formats</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• CSV - Comma-separated values</li>
                <li>• JSON - JavaScript Object Notation</li>
                <li>• Excel - Microsoft Excel format</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Data Privacy</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• All exports are logged</li>
                <li>• Sensitive data is protected</li>
                <li>• GDPR compliant exports</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">File Information</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Files include timestamp</li>
                <li>• Automatic download starts</li>
                <li>• Data reflects current filters</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
