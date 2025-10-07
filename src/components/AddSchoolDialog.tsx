import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { School } from "@/types/school";

interface AddSchoolDialogProps {
  onAdd: (school: School) => void;
}

export const AddSchoolDialog = ({ onAdd }: AddSchoolDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    deadline: "",
    applicationFee: "",
    useScoir: false,
    useCommonApp: false,
    useApplyTexas: false,
    useUniversityPortal: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSchool: School = {
      id: Date.now().toString(),
      name: formData.name,
      deadline: formData.deadline,
      applicationFee: parseFloat(formData.applicationFee),
      useScoir: formData.useScoir,
      useCommonApp: formData.useCommonApp,
      useApplyTexas: formData.useApplyTexas,
      useUniversityPortal: formData.useUniversityPortal,
      events: [],
    };
    onAdd(newSchool);
    setFormData({
      name: "",
      deadline: "",
      applicationFee: "",
      useScoir: false,
      useCommonApp: false,
      useApplyTexas: false,
      useUniversityPortal: false,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add School
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New School</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">School Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Application Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fee">Application Fee (USD)</Label>
            <Input
              id="fee"
              type="number"
              step="0.01"
              value={formData.applicationFee}
              onChange={(e) => setFormData({ ...formData, applicationFee: e.target.value })}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Application Platforms</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="scoir"
                  checked={formData.useScoir}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, useScoir: checked as boolean })
                  }
                />
                <label htmlFor="scoir" className="text-sm cursor-pointer">
                  Scoir
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="commonapp"
                  checked={formData.useCommonApp}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, useCommonApp: checked as boolean })
                  }
                />
                <label htmlFor="commonapp" className="text-sm cursor-pointer">
                  CommonApp
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="applytexas"
                  checked={formData.useApplyTexas}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, useApplyTexas: checked as boolean })
                  }
                />
                <label htmlFor="applytexas" className="text-sm cursor-pointer">
                  ApplyTexas
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="portal"
                  checked={formData.useUniversityPortal}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, useUniversityPortal: checked as boolean })
                  }
                />
                <label htmlFor="portal" className="text-sm cursor-pointer">
                  University Portal
                </label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add School
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
