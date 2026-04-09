import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Clock,
  Route,
  Star,
  User,
} from "lucide-react";
import type { AiScoreFactors, RiderRating } from "../backend";
import { useAuth } from "../hooks/useAuth";
import { useGetRiderRating } from "../hooks/useBackend";

// ─── Star Display ─────────────────────────────────────────────────────────────

function StarDisplay({
  score,
  size = "md",
}: {
  score: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeCls =
    size === "lg" ? "text-3xl" : size === "md" ? "text-xl" : "text-sm";
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = score >= i + 1;
    const partial = !filled && score > i;
    return { filled, partial, index: i };
  });

  const colorCls =
    score >= 4
      ? "text-green-500"
      : score >= 3
        ? "text-yellow-500"
        : "text-orange-500";

  return (
    <span
      className={`inline-flex items-center gap-0.5 ${sizeCls}`}
      aria-label={`Rating: ${score.toFixed(1)} out of 5 stars`}
      role="img"
    >
      {stars.map(({ filled, partial, index }) => (
        <span
          key={index}
          className={filled || partial ? colorCls : "text-muted-foreground/30"}
        >
          {filled ? "★" : partial ? "⯨" : "☆"}
        </span>
      ))}
    </span>
  );
}

// ─── Score Color ──────────────────────────────────────────────────────────────

function scoreColor(score: number) {
  if (score >= 4) return "text-green-600 bg-green-50 border-green-200";
  if (score >= 3) return "text-yellow-700 bg-yellow-50 border-yellow-200";
  return "text-orange-700 bg-orange-50 border-orange-200";
}

function scoreLabel(score: number) {
  if (score >= 4.5) return "Excellent";
  if (score >= 4) return "Very Good";
  if (score >= 3) return "Good";
  if (score >= 2) return "Needs Improvement";
  return "Poor";
}

// ─── Rating Card ──────────────────────────────────────────────────────────────

function RatingCard({ rating }: { rating: RiderRating; username: string }) {
  const aiScore = rating.aiScore ?? null;
  const adminRating = rating.adminRating ? Number(rating.adminRating) : null;
  const factors: AiScoreFactors | null = rating.aiScoreFactors ?? null;

  return (
    <div className="space-y-4">
      {/* AI Score */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <Activity size={18} className="text-primary" />
            AI Performance Rating
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiScore !== null ? (
            <>
              <div className="flex items-center gap-4">
                <div
                  className={`inline-flex flex-col items-center rounded-xl border px-5 py-3 ${scoreColor(aiScore)}`}
                >
                  <span className="text-3xl font-display font-bold">
                    {aiScore.toFixed(1)}
                  </span>
                  <span className="text-xs font-medium mt-0.5">
                    {scoreLabel(aiScore)}
                  </span>
                </div>
                <div>
                  <StarDisplay score={aiScore} size="lg" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on ride data and behavior analysis
                  </p>
                </div>
              </div>

              {/* Factor breakdown */}
              {factors && (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <FactorCard
                    icon={<Route size={14} />}
                    label="Total Distance"
                    value={`${factors.totalKm.toFixed(1)} km`}
                  />
                  <FactorCard
                    icon={<Calendar size={14} />}
                    label="Working Days"
                    value={Number(factors.workingDays).toString()}
                  />
                  <FactorCard
                    icon={<AlertTriangle size={14} />}
                    label="Issues Reported"
                    value={Number(factors.issueCount).toString()}
                  />
                  <FactorCard
                    icon={<Activity size={14} />}
                    label="Behavior Score"
                    value={`${(factors.behaviorScore * 100).toFixed(0)}%`}
                  />
                </div>
              )}

              {rating.aiScoreTimestamp && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={11} />
                  Last calculated:{" "}
                  {new Date(
                    Number(rating.aiScoreTimestamp) / 1_000_000,
                  ).toLocaleString()}
                </p>
              )}
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border py-8 text-center">
              <Activity
                size={28}
                className="mx-auto text-muted-foreground mb-2"
              />
              <p className="text-sm font-medium text-foreground">
                No AI rating yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Complete more rides and your score will be calculated
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Admin Rating */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <User size={18} className="text-primary" />
            Admin Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          {adminRating !== null ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={`inline-flex flex-col items-center rounded-xl border px-4 py-2.5 ${scoreColor(adminRating)}`}
                >
                  <span className="text-2xl font-display font-bold">
                    {adminRating}
                  </span>
                  <span className="text-xs font-medium">/ 5</span>
                </div>
                <StarDisplay score={adminRating} size="md" />
              </div>

              {rating.adminRatingComment && (
                <div className="rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                  <p className="text-xs text-muted-foreground mb-1">Comment</p>
                  <p className="text-sm text-foreground">
                    {rating.adminRatingComment}
                  </p>
                </div>
              )}

              {rating.adminRatingTimestamp && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={11} />
                  Rated on:{" "}
                  {new Date(
                    Number(rating.adminRatingTimestamp) / 1_000_000,
                  ).toLocaleString()}
                </p>
              )}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border py-6 text-center">
              <Star size={24} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-foreground font-medium">
                No admin rating yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Your supervisor will rate your performance
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function FactorCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-muted/20 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-sm font-display font-semibold text-foreground">
        {value}
      </p>
    </div>
  );
}

// ─── RiderProfile Page ────────────────────────────────────────────────────────

export default function RiderProfile() {
  const { profile } = useAuth();
  const username = profile?.username ?? "";
  const { data: rating, isLoading } = useGetRiderRating(username);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/rider">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="Back"
          >
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            My Profile & Rating
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            View your performance score and AI-calculated rating
          </p>
        </div>
      </div>

      {/* Profile card */}
      <Card className="bg-card border-border">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/12 border border-primary/20 text-xl font-bold font-display text-primary">
              {profile?.name?.charAt(0).toUpperCase() ?? "R"}
            </div>
            <div>
              <p className="text-lg font-display font-bold text-foreground">
                {profile?.name ?? "Rider"}
              </p>
              <p className="text-sm text-muted-foreground">
                @{username} · Rider
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Member since{" "}
                {profile?.createdAt
                  ? new Date(
                      Number(profile.createdAt) / 1_000_000,
                    ).toLocaleDateString()
                  : "—"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating section */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-52 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      ) : rating ? (
        <RatingCard rating={rating} username={username} />
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Star size={36} className="mx-auto text-muted-foreground mb-3" />
            <p className="font-medium text-foreground">No rating data yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Complete more rides and your rating will appear here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
