import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, ExternalLink, Trash2 } from "lucide-react";
import { School } from "@/types/school";

interface SchoolCardProps {
  school: School;
  onDelete: (id: string) => void;
  onViewEvents: (school: School) => void;
}

export const SchoolCard = ({ school, onDelete, onViewEvents }: SchoolCardProps) => {
  const platforms = [
    school.useScoir && "Scoir",
    school.useCommonApp && "CommonApp",
    school.useApplyTexas && "ApplyTexas",
    school.useUniversityPortal && "University Portal",
  ].filter(Boolean);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-foreground">{school.name}</CardTitle>
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

        <Button
          onClick={() => onViewEvents(school)}
          variant="outline"
          className="w-full"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Events & Seminars ({school.events?.length || 0})
        </Button>
      </CardContent>
    </Card>
  );
};
