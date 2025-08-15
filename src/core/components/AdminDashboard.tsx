// AdminDashboard.tsx
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// -------------------- Types --------------------
export type Feedback = {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  sentiment: "positive" | "neutral" | "negative";
  createdAt: string;
};

export type DashboardStats = {
  totalReviews: number;
  positive: number;
  neutral: number;
  negative: number;
  averageRating: number;
};

// Mock data for demonstration
const mockReviews: Feedback[] = [
  {
    id: 1,
    userName: "John Doe",
    rating: 5,
    comment: "Excellent service!",
    sentiment: "positive",
    createdAt: "2023-05-15T10:30:00Z"
  },
  {
    id: 2,
    userName: "Jane Smith",
    rating: 3,
    comment: "It was okay, could be better",
    sentiment: "neutral",
    createdAt: "2023-05-14T14:45:00Z"
  },
  {
    id: 3,
    userName: "Robert Johnson",
    rating: 1,
    comment: "Terrible experience",
    sentiment: "negative",
    createdAt: "2023-05-13T09:15:00Z"
  },
  {
    id: 4,
    userName: "Emily Davis",
    rating: 4,
    comment: "Very good, but room for improvement",
    sentiment: "positive",
    createdAt: "2023-05-12T16:20:00Z"
  },
  {
    id: 5,
    userName: "Michael Wilson",
    rating: 2,
    comment: "Disappointed with the service",
    sentiment: "negative",
    createdAt: "2023-05-11T11:10:00Z"
  },
  {
    id: 6,
    userName: "Sarah Brown",
    rating: 5,
    comment: "Absolutely perfect!",
    sentiment: "positive",
    createdAt: "2023-05-10T13:25:00Z"
  },
  {
    id: 7,
    userName: "David Taylor",
    rating: 4,
    comment: "Great overall experience",
    sentiment: "positive",
    createdAt: "2023-05-09T08:40:00Z"
  }
];

const mockStats: DashboardStats = {
  totalReviews: 7,
  positive: 4,
  neutral: 1,
  negative: 2,
  averageRating: 3.57
};

// -------------------- Main Component --------------------
export default function AdminDashboard() {
  const [reviews, setReviews] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalReviews: 0,
    positive: 0,
    neutral: 0,
    negative: 0,
    averageRating: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from your API:
        // const [reviewsRes, statsRes] = await Promise.all([
        //   fetch("/api/admin/reviews"),
        //   fetch("/api/admin/stats"),
        // ]);
        // const reviewsData = await reviewsRes.json();
        // const statsData = await statsRes.json();

        // For demo purposes, using mock data:
        setReviews(mockReviews);
        setStats(mockStats);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare data for rating distribution chart
  const ratingData = [1, 2, 3, 4, 5].map((rating) => ({
    rating,
    count: reviews.filter((r) => Math.round(r.rating) === rating).length
  }));

  // Prepare data for sentiment pie chart
  const sentimentData = [
    { name: "Positive", value: stats.positive, color: "#10B981" },
    { name: "Neutral", value: stats.neutral, color: "#F59E0B" },
    { name: "Negative", value: stats.negative, color: "#EF4444" }
  ];

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 shadow-md rounded-md border border-gray-200">
          <p className="font-semibold">{data.name}</p>
          <p>{data.value} reviews</p>
          <p>{((data.value / stats.totalReviews) * 100).toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Feedback Analytics Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard title="Total Reviews" value={stats.totalReviews} />
        <StatCard
          title="Average Rating"
          value={stats.averageRating.toFixed(1)}
          suffix="/5"
        />
        <StatCard
          title="Positive"
          value={stats.positive}
          color="bg-green-100 text-green-800"
        />
        <StatCard
          title="Neutral"
          value={stats.neutral}
          color="bg-yellow-100 text-yellow-800"
        />
        <StatCard
          title="Negative"
          value={stats.negative}
          color="bg-red-100 text-red-800"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card title="Sentiment Distribution">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent??0* 100).toFixed(0)}%`
                  }
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Rating Distribution">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ratingData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="rating"
                  label={{
                    value: "Rating",
                    position: "insideBottomRight",
                    offset: -5
                  }}
                />
                <YAxis
                  label={{
                    value: "Count",
                    angle: -90,
                    position: "insideLeft"
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem"
                  }}
                />
                <Legend />
                <Bar
                  dataKey="count"
                  name="Reviews"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Reviews Table */}
      <Card title="Recent Feedback">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <TableHeader>User</TableHeader>
                <TableHeader>Rating</TableHeader>
                <TableHeader>Comment</TableHeader>
                <TableHeader>Sentiment</TableHeader>
                <TableHeader>Date</TableHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reviews.map((review) => (
                <TableRow key={review.id} review={review} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// -------------------- UI Components --------------------
function StatCard({
  title,
  value,
  suffix = "",
  color = "bg-blue-100 text-blue-800"
}: {
  title: string;
  value: string | number;
  suffix?: string;
  color?: string;
}) {
  return (
    <div className={`p-6 rounded-lg shadow-sm ${color}`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">
        {value}
        {suffix}
      </p>
    </div>
  );
}

function Card({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {children}
    </th>
  );
}

function TableRow({ review }: { review: Feedback }) {
  const sentimentColors: Record<Feedback["sentiment"], string> = {
    positive: "bg-green-100 text-green-800",
    neutral: "bg-yellow-100 text-yellow-800",
    negative: "bg-red-100 text-red-800"
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {review.userName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${
            review.rating >= 4
              ? "bg-green-500"
              : review.rating >= 3
              ? "bg-yellow-500"
              : "bg-red-500"
          } text-white text-xs font-bold`}
        >
          {review.rating}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
        {review.comment}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            sentimentColors[review.sentiment]
          }`}
        >
          {review.sentiment}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(review.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
}