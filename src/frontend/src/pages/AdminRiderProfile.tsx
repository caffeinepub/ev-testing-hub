import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Clock,
  Loader2,
  RefreshCw,
  Route,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { AiScoreFactors, RiderRating } from "../backend";
import {
  useGetRiderRating,
  useRecalculateRating,
  useSetAdminRating,
} from "../hooks/useBackend";

// ─── Star Selector ────────────────────────────────────────────────────────────

function StarSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;
  return (
    <div className="flex items-center gap-1" aria-label="Select rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={`text-3xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${
            n <= active ? "text-yellow-500" : "text-muted-foreground/30"
          }`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

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
  const colorCls =
    score >= 4
      ? "text-green-500"
      : score >= 3
        ? "text-yellow-500"
        : "text-orange-500";
  const stars = Array.from({ length: 5 }, (_, i) => ({
    filled: score >= i + 1,
    partial: !(score >= i + 1) && score > i,
    index: i,
  }));
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

// ─── Score helpers ────────────────────────────────────────────────────────────

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

// ─── Factor Card ──────────────────────────────────────────────────────────────

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

// ─── Rate Modal ───────────────────────────────────────────────────────────────

function RateModal({
  open,
  onClose,
  username,
  riderName,
  currentAdminRating,
}: {
  open: boolean;
  onClose: () => void;
  username: string;
  riderName: string;
  currentAdminRating: number | null;
}) {
  const setAdminRating = useSetAdminRating();
  const [rating, setRating] = useState(currentAdminRating ?? 0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    setAdminRating.mutate(
      { username, rating, comment: comment.trim() || null },
      {
        onSuccess: () => {
          toast.success(`Rating saved for ${riderName}`);
          onClose();
        },
        onError: (err) =>
          toast.error(
            err instanceof Error ? err.message : "Failed to save rating",
          ),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="bg-card border-border sm:max-w-md"
        data-ocid="rate-rider-modal"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Star size={18} className="text-primary" />
            Rate {riderName}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Performance Rating</Label>
            <div className="flex items-center gap-3">
              <StarSelector value={rating} onChange={setRating} />
              {rating > 0 && (
                <span className="text-sm font-medium text-muted-foreground">
                  {rating}/5 · {scoreLabel(rating)}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating-comment" className="text-sm font-medium">
              Comment <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="rating-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a note about this rider's performance…"
              rows={3}
              className="bg-background border-input resize-none"
              data-ocid="rating-comment-input"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={setAdminRating.isPending || rating === 0}
              data-ocid="submit-rating-btn"
            >
              {setAdminRating.isPending ? (
                <>
                  <Loader2 size={14} className="mr-2 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save Rating"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Rating Card ──────────────────────────────────────────────────────────────

function RatingCard({
  rating,
  username,
  riderName,
}: {
  rating: RiderRating;
  username: string;
  riderName: string;
}) {
  const recalcMutation = useRecalculateRating();
  const [showRateModal, setShowRateModal] = useState(false);

  const aiScore = rating.aiScore ?? null;
  const adminRating = rating.adminRating ? Number(rating.adminRating) : null;
  const factors: AiScoreFactors | null = rating.aiScoreFactors ?? null;

  const handleRecalc = () => {
    recalcMutation.mutate(username, {
      onSuccess: () => toast.success("Rating recalculated"),
      onError: (err) =>
        toast.error(
          err instanceof Error ? err.message : "Recalculation failed",
        ),
    });
  };

  return (
    <>
      <div className="space-y-4">
        {/* AI Score */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <Activity size={18} className="text-primary" />
                AI Performance Rating
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRecalc}
                disabled={recalcMutation.isPending}
                className="h-8 gap-1.5 text-xs"
                data-ocid="recalculate-rating-btn"
              >
                <RefreshCw
                  size={13}
                  className={recalcMutation.isPending ? "animate-spin" : ""}
                />
                Recalculate
              </Button>
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
                      Based on KM, days, issues & behavior
                    </p>
                  </div>
                </div>
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
                    Calculated:{" "}
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
                  No AI score yet
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Click "Recalculate" to generate a score
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Admin Rating */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <User size={18} className="text-primary" />
                Admin Rating
              </span>
              <Button
                size="sm"
                onClick={() => setShowRateModal(true)}
                className="h-8 gap-1.5 text-xs"
                data-ocid="open-rate-modal-btn"
              >
                <Star size={13} />
                {adminRating !== null ? "Update Rating" : "Rate Rider"}
              </Button>
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
                    <p className="text-xs text-muted-foreground mb-1">
                      Comment
                    </p>
                    <p className="text-sm text-foreground">
                      {rating.adminRatingComment}
                    </p>
                  </div>
                )}
                {rating.adminRatingTimestamp && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={11} />
                    Rated:{" "}
                    {new Date(
                      Number(rating.adminRatingTimestamp) / 1_000_000,
                    ).toLocaleString()}
                  </p>
                )}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border py-6 text-center">
                <Star
                  size={24}
                  className="mx-auto text-muted-foreground mb-2"
                />
                <p className="text-sm font-medium text-foreground">
                  Not yet rated
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Click "Rate Rider" to add your assessment
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <RateModal
        open={showRateModal}
        onClose={() => setShowRateModal(false)}
        username={username}
        riderName={riderName}
        currentAdminRating={adminRating}
      />
    </>
  );
}

// ─── AdminRiderProfile Page ───────────────────────────────────────────────────

export default function AdminRiderProfile() {
  const { username } = useParams({ strict: false }) as { username: string };
  const { data: rating, isLoading } = useGetRiderRating(username);
  const recalcMutation = useRecalculateRating();

  const riderName = rating?.username ?? username;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/admin/users">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="Back to Users"
          >
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Rider Profile
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Performance ratings and score breakdown for{" "}
            <span className="font-medium text-foreground">@{username}</span>
          </p>
        </div>
      </div>

      {/* Profile identity card */}
      <Card className="bg-card border-border">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/12 border border-primary/20 text-xl font-bold font-display text-primary">
                {riderName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-lg font-display font-bold text-foreground">
                  {riderName}
                </p>
                <p className="text-sm text-muted-foreground">
                  @{username} · Rider
                </p>
              </div>
            </div>
            {rating?.aiScore != null && (
              <div className="flex items-center gap-2">
                <StarDisplay score={rating.aiScore} size="md" />
                <span className="text-sm font-semibold text-foreground">
                  {rating.aiScore.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rating section */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-60 w-full rounded-xl" />
          <Skeleton className="h-44 w-full rounded-xl" />
        </div>
      ) : rating ? (
        <RatingCard rating={rating} username={username} riderName={riderName} />
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Star size={36} className="mx-auto text-muted-foreground mb-3" />
            <p className="font-medium text-foreground">No rating data found</p>
            <p className="text-sm text-muted-foreground mt-1">
              This rider may not have any test records yet
            </p>
            <Button
              className="mt-4 gap-2"
              onClick={() =>
                recalcMutation.mutate(username, {
                  onSuccess: () => toast.success("Rating calculated"),
                  onError: (err) =>
                    toast.error(
                      err instanceof Error
                        ? err.message
                        : "Failed to calculate rating",
                    ),
                })
              }
              disabled={recalcMutation.isPending}
              data-ocid="no-rating-refresh-btn"
            >
              <RefreshCw
                size={14}
                className={recalcMutation.isPending ? "animate-spin" : ""}
              />
              Calculate Rating
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
