// Mock database service - در پروژه واقعی از دیتابیس استفاده می‌شود
export interface TicketData {
  id: string;
  gameId: string;
  gameName: string;
  date: string;
  seller: string;
  sellerEmail: string;
  price: number;
  status: "active" | "pending" | "sold" | "rejected";
  section: string;
  row: string;
  seat: string;
  listedDate: string;
  soldDate?: string;
  commission: number;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  type: "buyer" | "seller" | "admin";
  joinDate: string;
  ticketsSold?: number;
  ticketsBought?: number;
  totalSpent?: number;
  totalEarned?: number;
  lastActivity: string;
  status: "active" | "inactive" | "suspended";
}

export interface GameData {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  status: "scheduled" | "completed" | "cancelled";
  ticketsListed: number;
  ticketsSold: number;
  totalRevenue: number;
}

export interface FinancialData {
  id: string;
  date: string;
  type: "sale" | "commission" | "refund" | "payout";
  amount: number;
  ticketId: string;
  userId: string;
  description: string;
  status: "completed" | "pending" | "failed";
}

// Mock data - در پروژه واقعی از API یا دیتابیس می‌آید
const mockTickets: TicketData[] = [
  {
    id: "T001",
    gameId: "G001",
    gameName: "Lions vs Tigers",
    date: "2024-01-15",
    seller: "John Doe",
    sellerEmail: "john@club.com",
    price: 75,
    status: "sold",
    section: "A",
    row: "5",
    seat: "12-13",
    listedDate: "2024-01-01",
    soldDate: "2024-01-10",
    commission: 11.25,
  },
  {
    id: "T002",
    gameId: "G002",
    gameName: "Lions vs Eagles",
    date: "2024-01-22",
    seller: "Jane Smith",
    sellerEmail: "jane@club.com",
    price: 90,
    status: "active",
    section: "B",
    row: "3",
    seat: "8-9",
    listedDate: "2024-01-05",
    commission: 13.5,
  },
  {
    id: "T003",
    gameId: "G003",
    gameName: "Lions vs Wolves",
    date: "2024-01-29",
    seller: "Mike Johnson",
    sellerEmail: "mike@club.com",
    price: 65,
    status: "pending",
    section: "A",
    row: "7",
    seat: "15-16",
    listedDate: "2024-01-08",
    commission: 9.75,
  },
  {
    id: "T004",
    gameId: "G001",
    gameName: "Lions vs Tigers",
    date: "2024-01-15",
    seller: "Sarah Wilson",
    sellerEmail: "sarah@club.com",
    price: 80,
    status: "sold",
    section: "C",
    row: "2",
    seat: "5-6",
    listedDate: "2023-12-28",
    soldDate: "2024-01-12",
    commission: 12.0,
  },
];

const mockUsers: UserData[] = [
  {
    id: "U001",
    name: "John Doe",
    email: "john@club.com",
    type: "seller",
    joinDate: "2023-08-15",
    ticketsSold: 12,
    totalEarned: 850.5,
    lastActivity: "2024-01-10",
    status: "active",
  },
  {
    id: "U002",
    name: "Jane Smith",
    email: "jane@club.com",
    type: "seller",
    joinDate: "2023-09-22",
    ticketsSold: 8,
    totalEarned: 620.0,
    lastActivity: "2024-01-08",
    status: "active",
  },
  {
    id: "U003",
    name: "Bob Wilson",
    email: "bob@example.com",
    type: "buyer",
    joinDate: "2023-10-10",
    ticketsBought: 5,
    totalSpent: 375.0,
    lastActivity: "2024-01-05",
    status: "active",
  },
  {
    id: "U004",
    name: "Alice Brown",
    email: "alice@example.com",
    type: "buyer",
    joinDate: "2023-11-15",
    ticketsBought: 3,
    totalSpent: 225.0,
    lastActivity: "2024-01-03",
    status: "active",
  },
];

const mockGames: GameData[] = [
  {
    id: "G001",
    homeTeam: "Lions",
    awayTeam: "Tigers",
    date: "2024-01-15",
    time: "19:30",
    venue: "Stadium Arena",
    status: "completed",
    ticketsListed: 25,
    ticketsSold: 23,
    totalRevenue: 1725.0,
  },
  {
    id: "G002",
    homeTeam: "Lions",
    awayTeam: "Eagles",
    date: "2024-01-22",
    time: "20:00",
    venue: "Stadium Arena",
    status: "scheduled",
    ticketsListed: 18,
    ticketsSold: 12,
    totalRevenue: 1080.0,
  },
  {
    id: "G003",
    homeTeam: "Lions",
    awayTeam: "Wolves",
    date: "2024-01-29",
    time: "19:00",
    venue: "Stadium Arena",
    status: "scheduled",
    ticketsListed: 15,
    ticketsSold: 8,
    totalRevenue: 520.0,
  },
];

const mockFinancials: FinancialData[] = [
  {
    id: "F001",
    date: "2024-01-10",
    type: "sale",
    amount: 75.0,
    ticketId: "T001",
    userId: "U001",
    description: "Ticket sale - Lions vs Tigers",
    status: "completed",
  },
  {
    id: "F002",
    date: "2024-01-10",
    type: "commission",
    amount: 11.25,
    ticketId: "T001",
    userId: "U001",
    description: "Platform commission (15%)",
    status: "completed",
  },
  {
    id: "F003",
    date: "2024-01-12",
    type: "payout",
    amount: 63.75,
    ticketId: "T001",
    userId: "U001",
    description: "Seller payout (85%)",
    status: "completed",
  },
];

export class DataService {
  // Ticket data methods
  static async getTickets(filters?: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    seller?: string;
  }): Promise<TicketData[]> {
    let tickets = [...mockTickets];

    if (filters?.status) {
      tickets = tickets.filter((t) => t.status === filters.status);
    }

    if (filters?.dateFrom) {
      tickets = tickets.filter(
        (t) => new Date(t.date) >= new Date(filters.dateFrom!)
      );
    }

    if (filters?.dateTo) {
      tickets = tickets.filter(
        (t) => new Date(t.date) <= new Date(filters.dateTo!)
      );
    }

    if (filters?.seller) {
      tickets = tickets.filter((t) =>
        t.seller.toLowerCase().includes(filters.seller!.toLowerCase())
      );
    }

    return tickets;
  }

  // User data methods
  static async getUsers(filters?: {
    type?: string;
    status?: string;
    joinedAfter?: string;
  }): Promise<UserData[]> {
    let users = [...mockUsers];

    if (filters?.type) {
      users = users.filter((u) => u.type === filters.type);
    }

    if (filters?.status) {
      users = users.filter((u) => u.status === filters.status);
    }

    if (filters?.joinedAfter) {
      users = users.filter(
        (u) => new Date(u.joinDate) >= new Date(filters.joinedAfter!)
      );
    }

    return users;
  }

  // Game data methods
  static async getGames(filters?: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<GameData[]> {
    let games = [...mockGames];

    if (filters?.status) {
      games = games.filter((g) => g.status === filters.status);
    }

    if (filters?.dateFrom) {
      games = games.filter(
        (g) => new Date(g.date) >= new Date(filters.dateFrom!)
      );
    }

    if (filters?.dateTo) {
      games = games.filter(
        (g) => new Date(g.date) <= new Date(filters.dateTo!)
      );
    }

    return games;
  }

  // Financial data methods
  static async getFinancials(filters?: {
    type?: string;
    dateFrom?: string;
    dateTo?: string;
    status?: string;
  }): Promise<FinancialData[]> {
    let financials = [...mockFinancials];

    if (filters?.type) {
      financials = financials.filter((f) => f.type === filters.type);
    }

    if (filters?.dateFrom) {
      financials = financials.filter(
        (f) => new Date(f.date) >= new Date(filters.dateFrom!)
      );
    }

    if (filters?.dateTo) {
      financials = financials.filter(
        (f) => new Date(f.date) <= new Date(filters.dateTo!)
      );
    }

    if (filters?.status) {
      financials = financials.filter((f) => f.status === filters.status);
    }

    return financials;
  }

  // Analytics methods
  static async getAnalytics(period: "week" | "month" | "quarter" | "year") {
    const tickets = await this.getTickets();
    const users = await this.getUsers();
    const games = await this.getGames();

    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        break;
      case "quarter":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 3,
          now.getDate()
        );
        break;
      case "year":
        startDate = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate()
        );
        break;
    }

    const periodTickets = tickets.filter(
      (t) => new Date(t.listedDate) >= startDate
    );
    const soldTickets = periodTickets.filter((t) => t.status === "sold");

    return {
      totalTickets: periodTickets.length,
      soldTickets: soldTickets.length,
      totalRevenue: soldTickets.reduce((sum, t) => sum + t.price, 0),
      totalCommission: soldTickets.reduce((sum, t) => sum + t.commission, 0),
      averagePrice:
        soldTickets.length > 0
          ? soldTickets.reduce((sum, t) => sum + t.price, 0) /
            soldTickets.length
          : 0,
      conversionRate:
        periodTickets.length > 0
          ? (soldTickets.length / periodTickets.length) * 100
          : 0,
    };
  }
}
