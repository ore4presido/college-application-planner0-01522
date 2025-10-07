import { useState } from "react";
import { School } from "@/types/school";
import { SchoolCard } from "@/components/SchoolCard";
import { AddSchoolDialog } from "@/components/AddSchoolDialog";
import { EventsDialog } from "@/components/EventsDialog";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { WaecUpload } from "@/components/WaecUpload";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [eventsDialogOpen, setEventsDialogOpen] = useState(false);

  const handleAddSchool = (school: School) => {
    setSchools([...schools, school]);
    toast.success("School added successfully!");
  };

  const handleDeleteSchool = (id: string) => {
    setSchools(schools.filter((school) => school.id !== id));
    toast.success("School removed from list");
  };

  const handleViewEvents = (school: School) => {
    setSelectedSchool(school);
    setEventsDialogOpen(true);
  };

  const handleUpdateEvents = (schoolId: string, events: any[]) => {
    setSchools(
      schools.map((school) =>
        school.id === schoolId ? { ...school, events } : school
      )
    );
    toast.success("Events updated successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">College Application Hub</h1>
              <p className="text-muted-foreground">Organize your university applications with ease</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <WaecUpload />
          <CurrencyConverter />
        </div>

        {/* Schools Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground">My Schools</h2>
              <p className="text-muted-foreground">
                {schools.length} {schools.length === 1 ? "school" : "schools"} in your list
              </p>
            </div>
            <AddSchoolDialog onAdd={handleAddSchool} />
          </div>

          {schools.length === 0 ? (
            <div className="text-center py-16">
              <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No schools yet</h3>
              <p className="text-muted-foreground mb-6">
                Start by adding your first school to track your applications
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schools.map((school) => (
                <SchoolCard
                  key={school.id}
                  school={school}
                  onDelete={handleDeleteSchool}
                  onViewEvents={handleViewEvents}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <EventsDialog
        school={selectedSchool}
        open={eventsDialogOpen}
        onClose={() => setEventsDialogOpen(false)}
        onUpdateEvents={handleUpdateEvents}
      />
    </div>
  );
};

export default Index;
