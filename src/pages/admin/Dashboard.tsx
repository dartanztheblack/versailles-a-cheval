import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LogOut,
  Calendar,
  Users,
  Euro,
  TrendingUp,
  FileText,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

// Types
interface Reservation {
  id: string;
  customerName: string;
  email: string;
  date: string;
  participants: number;
  tourType: string;
  addOns: string[];
  totalAmount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

interface BlogPost {
  id: string;
  title: string;
  titleEn: string;
  slug: string;
  excerpt: string;
  published: boolean;
  createdAt: string;
  views: number;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("reservations");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState({
    totalReservations: 0,
    totalRevenue: 0,
    pendingReservations: 0,
    totalVisitors: 0,
  });

  // Données de démonstration
  useEffect(() => {
    // Simuler des réservations
    setReservations([
      {
        id: "RES-001",
        customerName: "Marie Dupont",
        email: "marie.dupont@email.com",
        date: "2024-12-20",
        participants: 2,
        tourType: "L'Expérience Royale Complète",
        addOns: ["Transport depuis votre hôtel"],
        totalAmount: 1180,
        status: "confirmed",
        createdAt: "2024-12-15",
      },
      {
        id: "RES-002",
        customerName: "John Smith",
        email: "john.smith@email.com",
        date: "2024-12-22",
        participants: 4,
        tourType: "L'Expérience Royale Complète",
        addOns: [],
        totalAmount: 1960,
        status: "pending",
        createdAt: "2024-12-16",
      },
    ]);

    // Simuler des articles de blog
    setBlogPosts([
      {
        id: "1",
        title: "Les 10 activités immanquables à Paris",
        titleEn: "Top 10 Unmissable Activities in Paris",
        slug: "activites-immanquables-paris",
        excerpt: "Découvrez les expériences incontournables...",
        published: true,
        createdAt: "2024-12-10",
        views: 1250,
      },
      {
        id: "2",
        title: "Pourquoi faire une balade à cheval à Versailles",
        titleEn: "Why Take a Horseback Ride in Versailles",
        slug: "balade-cheval-versailles",
        excerpt: "Une expérience royale unique...",
        published: true,
        createdAt: "2024-12-12",
        views: 890,
      },
    ]);

    setStats({
      totalReservations: 2,
      totalRevenue: 3140,
      pendingReservations: 1,
      totalVisitors: 2140,
    });
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    };
    const labels = {
      pending: "En attente",
      confirmed: "Confirmée",
      completed: "Terminée",
      cancelled: "Annulée",
    };
    return (
      <Badge className={styles[status as keyof typeof styles]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F0EB]">
      {/* Header */}
      <header className="bg-white border-b border-[#EAE4D9]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-serif text-[#1C1C1C]">
              Versailles à Cheval - Admin
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#8C7B6B]">
              {auth.currentUser?.email}
            </span>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#8C7B6B]">
                Total Réservations
              </CardTitle>
              <Calendar className="h-4 w-4 text-[#8C7B6B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1C1C1C]">
                {stats.totalReservations}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#8C7B6B]">
                Revenus Totaux
              </CardTitle>
              <Euro className="h-4 w-4 text-[#8C7B6B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1C1C1C]">
                {stats.totalRevenue.toLocaleString()}€
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#8C7B6B]">
                En Attente
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#8C7B6B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1C1C1C]">
                {stats.pendingReservations}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#8C7B6B]">
                Visiteurs Blog
              </CardTitle>
              <Users className="h-4 w-4 text-[#8C7B6B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1C1C1C]">
                {stats.totalVisitors}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="reservations">
              <Calendar className="h-4 w-4 mr-2" />
              Réservations
            </TabsTrigger>
            <TabsTrigger value="blog">
              <FileText className="h-4 w-4 mr-2" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reservations">
            <Card>
              <CardHeader>
                <CardTitle>Liste des Réservations</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.map((res) => (
                      <TableRow key={res.id}>
                        <TableCell className="font-medium">{res.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{res.customerName}</p>
                            <p className="text-sm text-[#8C7B6B]">{res.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{res.date}</TableCell>
                        <TableCell>{res.participants}</TableCell>
                        <TableCell>{res.totalAmount}€</TableCell>
                        <TableCell>{getStatusBadge(res.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
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

          <TabsContent value="blog">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Articles du Blog</CardTitle>
                <Button onClick={() => navigate("/admin/blog/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvel Article
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Vues</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{post.title}</p>
                            <p className="text-sm text-[#8C7B6B]">{post.titleEn}</p>
                          </div>
                        </TableCell>
                        <TableCell>{post.slug}</TableCell>
                        <TableCell>{post.views}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              post.published
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {post.published ? "Publié" : "Brouillon"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#8C7B6B]">
                  Les paramètres seront disponibles prochainement.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
