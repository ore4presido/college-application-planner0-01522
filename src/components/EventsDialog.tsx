import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Calendar } from "lucide-react";
import { School, Event } from "@/types/school";
import { Card, CardContent } from "@/components/ui/card";

interface EventsDialogProps {
  school: School | null;
  open: boolean;
  onClose: () => void;
  onUpdateEvents: (schoolId: string, events: Event[]) => void;
}

export const EventsDialog = ({ school, open, onClose, onUpdateEvents }: EventsDialogProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
  });

  if (!school) return null;

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      id: Date.now().toString(),
      ...newEvent,
    };
    onUpdateEvents(school.id, [...school.events, event]);
    setNewEvent({ title: "", date: "", description: "" });
    setShowAddForm(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    onUpdateEvents(
      school.id,
      school.events.filter((e) => e.id !== eventId)
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Events & Seminars - {school.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {school.events.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No events added yet. Add your first event below.
            </p>
          ) : (
            <div className="space-y-3">
              {school.events.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{event.title}</h4>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="mr-2 h-3 w-3" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteEvent(event.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!showAddForm ? (
            <Button onClick={() => setShowAddForm(true)} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          ) : (
            <form onSubmit={handleAddEvent} className="space-y-3 border border-border rounded-lg p-4">
              <div className="space-y-2">
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input
                  id="eventTitle"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate">Date & Time</Label>
                <Input
                  id="eventDate"
                  type="datetime-local"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDesc">Description</Label>
                <Textarea
                  id="eventDesc"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Add Event
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
