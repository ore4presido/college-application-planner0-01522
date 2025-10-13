import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash2 } from "lucide-react";
import { School, Recommender } from "@/types/school";

interface RecommendersDialogProps {
  school: School | null;
  open: boolean;
  onClose: () => void;
  onUpdateRecommenders: (schoolId: string, recommenders: Recommender[]) => void;
}

export const RecommendersDialog = ({
  school,
  open,
  onClose,
  onUpdateRecommenders,
}: RecommendersDialogProps) => {
  const [recommenderName, setRecommenderName] = useState("");
  const [recommenderStatus, setRecommenderStatus] = useState<"not-started" | "in-progress" | "completed">("not-started");

  if (!school) return null;

  const handleAddRecommender = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recommenderName.trim()) return;

    const newRecommender: Recommender = {
      id: Date.now().toString(),
      name: recommenderName,
      status: recommenderStatus,
    };

    onUpdateRecommenders(school.id, [...(school.recommenders || []), newRecommender]);
    setRecommenderName("");
    setRecommenderStatus("not-started");
  };

  const handleDeleteRecommender = (recommenderId: string) => {
    onUpdateRecommenders(
      school.id,
      school.recommenders.filter((rec) => rec.id !== recommenderId)
    );
  };

  const handleUpdateStatus = (recommenderId: string, status: Recommender["status"]) => {
    onUpdateRecommenders(
      school.id,
      school.recommenders.map((rec) =>
        rec.id === recommenderId ? { ...rec, status } : rec
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "in-progress":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "not-started":
        return "Not Started";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Recommenders for {school.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleAddRecommender} className="space-y-4 border-b pb-4">
          <div className="space-y-2">
            <Label htmlFor="recommender-name">Recommender Name</Label>
            <Input
              id="recommender-name"
              value={recommenderName}
              onChange={(e) => setRecommenderName(e.target.value)}
              placeholder="e.g., Dr. Smith"
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <RadioGroup
              value={recommenderStatus}
              onValueChange={(value) => setRecommenderStatus(value as any)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-started" id="rec-not-started" />
                <label htmlFor="rec-not-started" className="text-sm cursor-pointer">
                  Not Started
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-progress" id="rec-in-progress" />
                <label htmlFor="rec-in-progress" className="text-sm cursor-pointer">
                  In Progress
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="completed" id="rec-completed" />
                <label htmlFor="rec-completed" className="text-sm cursor-pointer">
                  Completed
                </label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Recommender
          </Button>
        </form>

        <div className="space-y-3">
          {school.recommenders?.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No recommenders added yet
            </p>
          ) : (
            school.recommenders?.map((recommender) => (
              <div
                key={recommender.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-card"
              >
                <div className="flex-1">
                  <p className="font-medium">{recommender.name}</p>
                  <div className="mt-2">
                    <RadioGroup
                      value={recommender.status}
                      onValueChange={(value) =>
                        handleUpdateStatus(recommender.id, value as any)
                      }
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="not-started"
                          id={`${recommender.id}-not-started`}
                        />
                        <label
                          htmlFor={`${recommender.id}-not-started`}
                          className="text-xs cursor-pointer"
                        >
                          Not Started
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="in-progress"
                          id={`${recommender.id}-in-progress`}
                        />
                        <label
                          htmlFor={`${recommender.id}-in-progress`}
                          className="text-xs cursor-pointer"
                        >
                          In Progress
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="completed"
                          id={`${recommender.id}-completed`}
                        />
                        <label
                          htmlFor={`${recommender.id}-completed`}
                          className="text-xs cursor-pointer"
                        >
                          Completed
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteRecommender(recommender.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
