"use client";

import { AdminExport } from "@/components/admin-export";
import { AdminReports } from "@/components/admin-reports";
import { AdminSettings } from "@/components/admin-settings";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Bell,
  Check,
  DollarSign,
  Edit,
  Percent,
  Plus,
  Target,
  Ticket,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Footer } from "./footer";

// Mock data
const dashboardStats = {
  totalTickets: 1247,
  activeSellers: 89,
  totalRevenue: 45680,
  pendingApprovals: 12,
  todaysSales: 23,
  averageTicketPrice: 78,
  conversionRate: 12.5,
  totalCommission: 6852,
};

const mockTickets = [
  {
    id: "1",
    game: "Lions vs Tigers",
    date: "2024-01-15",
    seller: "John Doe",
    price: 75,
    status: "active",
    section: "A-5-12",
  },
  {
    id: "2",
    game: "Lions vs Eagles",
    date: "2024-01-22",
    seller: "Jane Smith",
    price: 90,
    status: "pending",
    section: "B-3-8",
  },
  {
    id: "3",
    game: "Lions vs Wolves",
    date: "2024-01-29",
    seller: "Mike Johnson",
    price: 65,
    status: "sold",
    section: "A-7-15",
  },
];

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@club.com",
    type: "seller",
    joinDate: "2023-08-15",
    ticketsSold: 12,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@club.com",
    type: "seller",
    joinDate: "2023-09-22",
    ticketsSold: 8,
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    type: "buyer",
    joinDate: "2023-10-10",
    ticketsBought: 5,
  },
];

const mockGames = [
  {
    id: "1",
    homeTeam: "Lions",
    awayTeam: "Tigers",
    date: "2024-01-15",
    time: "19:30",
    venue: "Stadium Arena",
    status: "scheduled",
  },
  {
    id: "2",
    homeTeam: "Lions",
    awayTeam: "Eagles",
    date: "2024-01-22",
    time: "20:00",
    venue: "Stadium Arena",
    status: "scheduled",
  },
  {
    id: "3",
    homeTeam: "Lions",
    awayTeam: "Wolves",
    date: "2024-01-29",
    time: "19:00",
    venue: "Stadium Arena",
    status: "scheduled",
  },
];

export function AdminDashboard() {
  const [tickets, setTickets] = useState(mockTickets);
  const [users, setUsers] = useState(mockUsers);
  const [games, setGames] = useState(mockGames);
  const [notification, setNotification] = useState("");
  const [newGame, setNewGame] = useState({
    homeTeam: "",
    awayTeam: "",
    date: "",
    time: "",
    venue: "",
  });

  const handleTicketStatusChange = (ticketId: string, newStatus: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );

    if (newStatus === "sold") {
      setNotification("Ticket marked as resold - seller will be notified");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleDeleteTicket = (ticketId: string) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
    setNotification("Ticket deleted successfully");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleApproveTicket = (ticketId: string) => {
    handleTicketStatusChange(ticketId, "active");
    setNotification("Ticket approved and listed");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleRejectTicket = (ticketId: string) => {
    handleTicketStatusChange(ticketId, "rejected");
    setNotification("Ticket rejected");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleAddGame = () => {
    const game = {
      id: String(games.length + 1),
      ...newGame,
      status: "scheduled",
    };
    setGames((prev) => [...prev, game]);
    setNewGame({ homeTeam: "", awayTeam: "", date: "", time: "", venue: "" });
    setNotification("New game added successfully");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleDeleteGame = (gameId: string) => {
    setGames((prev) => prev.filter((game) => game.id !== gameId));
    setNotification("Game deleted successfully");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleExportData = () => {
    setNotification("Data export initiated - download will begin shortly");
    setTimeout(() => setNotification(""), 3000);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      pending: "secondary",
      sold: "default",
      rejected: "destructive",
    };
    const colors = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      sold: "bg-blue-100 text-blue-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage tickets, users, and games on the Seatwell platform.
          </p>
        </div>

        {notification && (
          <Alert className="mb-6">
            <Bell className="h-4 w-4" />
            <AlertDescription>{notification}</AlertDescription>
          </Alert>
        )}

        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Tickets
              </CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.totalTickets}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Sellers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.activeSellers}
              </div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${dashboardStats.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Approvals
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.pendingApprovals}
              </div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Sales
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.todaysSales}
              </div>
              <p className="text-xs text-muted-foreground">
                +8% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Ticket Price
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${dashboardStats.averageTicketPrice}
              </div>
              <p className="text-xs text-muted-foreground">
                +3% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.conversionRate}%
              </div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Commission
              </CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${dashboardStats.totalCommission.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">15% platform fee</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Management</CardTitle>
                <CardDescription>
                  View, edit, approve, or reject ticket listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Game</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">
                          {ticket.game}
                        </TableCell>
                        <TableCell>
                          {new Date(ticket.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{ticket.seller}</TableCell>
                        <TableCell>{ticket.section}</TableCell>
                        <TableCell>${ticket.price}</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {ticket.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleApproveTicket(ticket.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleRejectTicket(ticket.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {ticket.status === "active" && (
                              <Select
                                onValueChange={(value) =>
                                  handleTicketStatusChange(ticket.id, value)
                                }
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="sold">
                                    Mark Sold
                                  </SelectItem>
                                  <SelectItem value="refunded">
                                    Refund
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteTicket(ticket.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage buyer and seller accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.type === "seller" ? "default" : "secondary"
                            }
                          >
                            {user.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.joinDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {user.type === "seller"
                            ? `${user.ticketsSold} sold`
                            : `${user.ticketsBought} bought`}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Game</CardTitle>
                  <CardDescription>
                    Add a new game to the schedule
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="homeTeam">Home Team</Label>
                      <Input
                        id="homeTeam"
                        value={newGame.homeTeam}
                        onChange={(e) =>
                          setNewGame((prev) => ({
                            ...prev,
                            homeTeam: e.target.value,
                          }))
                        }
                        placeholder="Lions"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="awayTeam">Away Team</Label>
                      <Input
                        id="awayTeam"
                        value={newGame.awayTeam}
                        onChange={(e) =>
                          setNewGame((prev) => ({
                            ...prev,
                            awayTeam: e.target.value,
                          }))
                        }
                        placeholder="Tigers"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newGame.date}
                        onChange={(e) =>
                          setNewGame((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newGame.time}
                        onChange={(e) =>
                          setNewGame((prev) => ({
                            ...prev,
                            time: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue</Label>
                      <Input
                        id="venue"
                        value={newGame.venue}
                        onChange={(e) =>
                          setNewGame((prev) => ({
                            ...prev,
                            venue: e.target.value,
                          }))
                        }
                        placeholder="Stadium Arena"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddGame} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Game
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Game Schedule Manager</CardTitle>
                  <CardDescription>
                    View and manage the game schedule
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Game</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Venue</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {games.map((game) => (
                        <TableRow key={game.id}>
                          <TableCell className="font-medium">
                            {game.homeTeam} vs {game.awayTeam}
                          </TableCell>
                          <TableCell>
                            {new Date(game.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{game.time}</TableCell>
                          <TableCell>{game.venue}</TableCell>
                          <TableCell>
                            <Badge variant="default">{game.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteGame(game.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>
                    Platform revenue and commission tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">
                        This Month
                      </h3>
                      <p className="text-2xl font-bold text-green-600">
                        $12,450
                      </p>
                      <p className="text-sm text-green-600">
                        +18% from last month
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">
                        This Quarter
                      </h3>
                      <p className="text-2xl font-bold text-blue-600">
                        $34,680
                      </p>
                      <p className="text-sm text-blue-600">
                        +12% from last quarter
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-purple-800 mb-2">
                        This Year
                      </h3>
                      <p className="text-2xl font-bold text-purple-600">
                        $156,890
                      </p>
                      <p className="text-sm text-purple-600">
                        +25% from last year
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Games</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">Lions vs Tigers</p>
                          <p className="text-sm text-muted-foreground">
                            Jan 15, 2024
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">$2,340</p>
                          <p className="text-sm text-green-600">
                            156 tickets sold
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">Lions vs Eagles</p>
                          <p className="text-sm text-muted-foreground">
                            Jan 22, 2024
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">$1,980</p>
                          <p className="text-sm text-green-600">
                            132 tickets sold
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">Lions vs Wolves</p>
                          <p className="text-sm text-muted-foreground">
                            Jan 29, 2024
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">$1,560</p>
                          <p className="text-sm text-green-600">
                            98 tickets sold
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Platform Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>System Status</span>
                        </div>
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-800"
                        >
                          Operational
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Payment Processing</span>
                        </div>
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-800"
                        >
                          Healthy
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span>Email Notifications</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-yellow-100 text-yellow-800"
                        >
                          Delayed
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Database</span>
                        </div>
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-800"
                        >
                          Optimal
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <AdminReports />
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>

          <TabsContent value="export">
            <AdminExport />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}
