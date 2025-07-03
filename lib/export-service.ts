import { DataService } from "./data-service";

export type ExportFormat = "csv" | "json" | "excel";

export class ExportService {
  // Convert data to CSV format
  private static convertToCSV(data: any[], headers: string[]): string {
    const csvHeaders = headers.join(",");
    const csvRows = data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          // Handle values that might contain commas or quotes
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"'))
          ) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value || "";
        })
        .join(",")
    );

    return [csvHeaders, ...csvRows].join("\n");
  }

  // Download file helper
  private static downloadFile(
    content: string,
    filename: string,
    mimeType: string
  ) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Export tickets data
  static async exportTickets(
    format: ExportFormat = "csv",
    filters?: {
      status?: string;
      dateFrom?: string;
      dateTo?: string;
      seller?: string;
    }
  ) {
    const tickets = await DataService.getTickets(filters);

    const headers = [
      "id",
      "gameName",
      "date",
      "seller",
      "sellerEmail",
      "price",
      "status",
      "section",
      "row",
      "seat",
      "listedDate",
      "soldDate",
      "commission",
    ];

    const timestamp = new Date().toISOString().split("T")[0];

    switch (format) {
      case "csv":
        const csvContent = this.convertToCSV(tickets, headers);
        this.downloadFile(
          csvContent,
          `tickets-export-${timestamp}.csv`,
          "text/csv"
        );
        break;

      case "json":
        const jsonContent = JSON.stringify(tickets, null, 2);
        this.downloadFile(
          jsonContent,
          `tickets-export-${timestamp}.json`,
          "application/json"
        );
        break;

      case "excel":
        // For Excel, we'll use CSV format with .xlsx extension
        // In a real app, you'd use a library like xlsx or exceljs
        const excelContent = this.convertToCSV(tickets, headers);
        this.downloadFile(
          excelContent,
          `tickets-export-${timestamp}.xlsx`,
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        break;
    }

    return {
      success: true,
      recordCount: tickets.length,
      filename: `tickets-export-${timestamp}.${format}`,
    };
  }

  // Export users data
  static async exportUsers(
    format: ExportFormat = "csv",
    filters?: {
      type?: string;
      status?: string;
      joinedAfter?: string;
    }
  ) {
    const users = await DataService.getUsers(filters);

    const headers = [
      "id",
      "name",
      "email",
      "type",
      "joinDate",
      "ticketsSold",
      "ticketsBought",
      "totalSpent",
      "totalEarned",
      "lastActivity",
      "status",
    ];

    const timestamp = new Date().toISOString().split("T")[0];

    switch (format) {
      case "csv":
        const csvContent = this.convertToCSV(users, headers);
        this.downloadFile(
          csvContent,
          `users-export-${timestamp}.csv`,
          "text/csv"
        );
        break;

      case "json":
        const jsonContent = JSON.stringify(users, null, 2);
        this.downloadFile(
          jsonContent,
          `users-export-${timestamp}.json`,
          "application/json"
        );
        break;

      case "excel":
        const excelContent = this.convertToCSV(users, headers);
        this.downloadFile(
          excelContent,
          `users-export-${timestamp}.xlsx`,
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        break;
    }

    return {
      success: true,
      recordCount: users.length,
      filename: `users-export-${timestamp}.${format}`,
    };
  }

  // Export games data
  static async exportGames(
    format: ExportFormat = "csv",
    filters?: {
      status?: string;
      dateFrom?: string;
      dateTo?: string;
    }
  ) {
    const games = await DataService.getGames(filters);

    const headers = [
      "id",
      "homeTeam",
      "awayTeam",
      "date",
      "time",
      "venue",
      "status",
      "ticketsListed",
      "ticketsSold",
      "totalRevenue",
    ];

    const timestamp = new Date().toISOString().split("T")[0];

    switch (format) {
      case "csv":
        const csvContent = this.convertToCSV(games, headers);
        this.downloadFile(
          csvContent,
          `games-export-${timestamp}.csv`,
          "text/csv"
        );
        break;

      case "json":
        const jsonContent = JSON.stringify(games, null, 2);
        this.downloadFile(
          jsonContent,
          `games-export-${timestamp}.json`,
          "application/json"
        );
        break;

      case "excel":
        const excelContent = this.convertToCSV(games, headers);
        this.downloadFile(
          excelContent,
          `games-export-${timestamp}.xlsx`,
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        break;
    }

    return {
      success: true,
      recordCount: games.length,
      filename: `games-export-${timestamp}.${format}`,
    };
  }

  // Export financial data
  static async exportFinancials(
    format: ExportFormat = "csv",
    filters?: {
      type?: string;
      dateFrom?: string;
      dateTo?: string;
      status?: string;
    }
  ) {
    const financials = await DataService.getFinancials(filters);

    const headers = [
      "id",
      "date",
      "type",
      "amount",
      "ticketId",
      "userId",
      "description",
      "status",
    ];

    const timestamp = new Date().toISOString().split("T")[0];

    switch (format) {
      case "csv":
        const csvContent = this.convertToCSV(financials, headers);
        this.downloadFile(
          csvContent,
          `financial-export-${timestamp}.csv`,
          "text/csv"
        );
        break;

      case "json":
        const jsonContent = JSON.stringify(financials, null, 2);
        this.downloadFile(
          jsonContent,
          `financial-export-${timestamp}.json`,
          "application/json"
        );
        break;

      case "excel":
        const excelContent = this.convertToCSV(financials, headers);
        this.downloadFile(
          excelContent,
          `financial-export-${timestamp}.xlsx`,
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        break;
    }

    return {
      success: true,
      recordCount: financials.length,
      filename: `financial-export-${timestamp}.${format}`,
    };
  }

  // Export comprehensive report
  static async exportComprehensiveReport(
    format: ExportFormat = "csv",
    period: "week" | "month" | "quarter" | "year" = "month"
  ) {
    const analytics = await DataService.getAnalytics(period);
    const tickets = await DataService.getTickets();
    const users = await DataService.getUsers();
    const games = await DataService.getGames();

    const report = {
      generatedAt: new Date().toISOString(),
      period,
      analytics,
      summary: {
        totalTickets: tickets.length,
        totalUsers: users.length,
        totalGames: games.length,
        activeListings: tickets.filter((t) => t.status === "active").length,
        pendingApprovals: tickets.filter((t) => t.status === "pending").length,
      },
      topPerformers: {
        bestSellingGame: games.sort((a, b) => b.ticketsSold - a.ticketsSold)[0],
        topSeller: users
          .filter((u) => u.type === "seller")
          .sort((a, b) => (b.ticketsSold || 0) - (a.ticketsSold || 0))[0],
        highestRevenue: games.sort(
          (a, b) => b.totalRevenue - a.totalRevenue
        )[0],
      },
    };

    const timestamp = new Date().toISOString().split("T")[0];

    switch (format) {
      case "json":
        const jsonContent = JSON.stringify(report, null, 2);
        this.downloadFile(
          jsonContent,
          `comprehensive-report-${timestamp}.json`,
          "application/json"
        );
        break;

      case "csv":
        // For CSV, we'll create a summary format
        const csvData = [
          ["Report Type", "Comprehensive Platform Report"],
          ["Generated At", report.generatedAt],
          ["Period", report.period],
          [""],
          ["Analytics"],
          ["Total Tickets", report.analytics.totalTickets],
          ["Sold Tickets", report.analytics.soldTickets],
          ["Total Revenue", `$${report.analytics.totalRevenue.toFixed(2)}`],
          [
            "Total Commission",
            `$${report.analytics.totalCommission.toFixed(2)}`,
          ],
          ["Average Price", `$${report.analytics.averagePrice.toFixed(2)}`],
          ["Conversion Rate", `${report.analytics.conversionRate.toFixed(2)}%`],
          [""],
          ["Summary"],
          ["Total Tickets", report.summary.totalTickets],
          ["Total Users", report.summary.totalUsers],
          ["Total Games", report.summary.totalGames],
          ["Active Listings", report.summary.activeListings],
          ["Pending Approvals", report.summary.pendingApprovals],
        ];

        const csvContent = csvData.map((row) => row.join(",")).join("\n");
        this.downloadFile(
          csvContent,
          `comprehensive-report-${timestamp}.csv`,
          "text/csv"
        );
        break;

      case "excel":
        const excelContent = JSON.stringify(report, null, 2);
        this.downloadFile(
          excelContent,
          `comprehensive-report-${timestamp}.xlsx`,
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        break;
    }

    return {
      success: true,
      filename: `comprehensive-report-${timestamp}.${format}`,
      reportData: report,
    };
  }
}
