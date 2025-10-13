import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Trash2, Users } from "lucide-react";
import { School } from "@/types/school";

interface SchoolCardProps {
  school: School;
  onDelete: (id: string) => void;
  onViewEvents: (school: School) => void;
  onViewRecommenders: (school: School) => void;
}

export const SchoolCard = ({ school, onDelete, onViewEvents, onViewRecommenders }: SchoolCardProps) => {
  const platforms = [
    school.useScoir && "Scoir",
    school.useCommonApp && "CommonApp",
    school.useApplyTexas && "ApplyTexas",
    school.useUniversityPortal && "University Portal",
  ].filter(Boolean);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
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
      case "submitted":
        return "Submitted";
      default:
        return status;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-foreground">{school.name}</CardTitle>
            <Badge variant="outline" className={`mt-2 ${getStatusColor(school.applicationStatus)}`}>
              {getStatusLabel(school.applicationStatus)}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(school.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Deadline: {new Date(school.deadline).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <DollarSign className="mr-2 h-4 w-4" />
          <span>
            Application Fee: ${school.applicationFee.toFixed(2)} USD
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <Badge key={platform} variant="secondary" className="text-xs">
              {platform}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => onViewEvents(school)}
            variant="outline"
            size="sm"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Events ({school.events?.length || 0})
          </Button>
          <Button
            onClick={() => onViewRecommenders(school)}
            variant="outline"
            size="sm"
          >
            <Users className="mr-2 h-4 w-4" />
            Recommenders ({school.recommenders?.length || 0})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
